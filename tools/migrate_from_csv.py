import csv, os, re, yaml, json
from collections import OrderedDict

SRC = "/sessions/quirky-charming-noether/mnt/COMET-Standard/COMET-Data/Data/Dictionary"
REPO = "/sessions/quirky-charming-noether/mnt/COMET-Standard/comet-standard-repo"

# ---- yaml: preserve order, block scalars for long text ----
class Lit(str): pass
def lit_rep(dumper, data):
    return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|' if '\n' in data or len(data)>90 else None)
yaml.add_representer(Lit, lit_rep)
yaml.add_representer(OrderedDict, lambda d,x: d.represent_dict(x.items()))

REQ_MAP = {
 'Yes':'yes','No':'no','For Comics':'for_comics','For Books':'for_books',
 'Comics & Graphic Novels':'for_comics_and_graphic_novels',
 'For any non-main cover':'for_variant_covers','For Kids Items':'for_kids_items'}
TIER_MAP = {'Essential Data':'essential','Core Data':'core','Extended Data':'extended'}
OWNER = {'essential':'publisher','core':'publisher','extended':'distributor'}

# field name -> picklist file stem
PICKLIST_OF = {
 'ProductCategory':'ProductCategories','PrimaryFormatType':'FormatType',
 'SecondaryFormatTypes':'FormatType','PrimaryContentType':'PrimaryContentType',
 'BISAC1':'BISACCode','BISAC2':'BISACCode','BISAC3':'BISACCode',
 'Language':'LanguageCode','AgeRange':'AgeRange','MediaRating':'MediaRating',
 'SeriesType':'SeriesType','SeriesFrequency':'SeriesFrequency','VariantType':'VariantType',
 'SalesStatusCode':'SalesStatusCode','ReturnType':'ReturnType','ReturnQualifier':'ReturnQualifier',
 'VolumeTag':'VolumeType','CountryOfOrigin':'HTSCountryCode'}

def clean(s): return (s or '').strip()

# ---------- FIELDS ----------
rows = list(csv.reader(open(os.path.join(SRC,'00-DataDictionary.csv'), newline='')))
fields = [r for r in rows[1:] if r and clean(r[0])]
os.makedirs(os.path.join(REPO,'standard/fields'), exist_ok=True)

field_index = []
for r in fields:
    name=clean(r[0]); pos=clean(r[1]); tier=TIER_MAP.get(clean(r[2]),clean(r[2]))
    ftype=clean(r[3]); req=REQ_MAP.get(clean(r[4]),clean(r[4]).lower())
    length=clean(r[5]); desc=clean(r[6]); ex=clean(r[7]); notes=clean(r[9]) if len(r)>9 else ''
    slug = re.sub(r'[^A-Za-z0-9]+','',name)
    d = OrderedDict()
    d['name']=name.replace(' ','')  # normalize "Unit Width"->UnitWidth
    d['label']=name
    d['position']=int(pos)
    d['tier']=tier
    d['owner']=OWNER.get(tier,'publisher')
    d['type']=ftype
    d['required']=req
    if length: d['length']=length
    if ftype.lower().replace(' ','')=='picklist':
        d['picklist']=PICKLIST_OF.get(name)
    if desc: d['description']=Lit(desc)
    if ex: d['example']=ex
    if notes: d['notes']=Lit(notes)
    fn = f"{int(pos):03d}-{slug}.yaml"
    with open(os.path.join(REPO,'standard/fields',fn),'w') as f:
        yaml.dump(d,f,default_flow_style=False,sort_keys=False,allow_unicode=True,width=100)
    field_index.append((int(pos),d['name'],tier,req,d.get('picklist')))

# ---------- PICKLISTS ----------
os.makedirs(os.path.join(REPO,'standard/picklists'), exist_ok=True)
PL_FILES = {'AgeRange':'AgeRange','BISACCode':'BISACCode','FormatType':'FormatType',
 'LanguageCode':'LanguageCode','MediaRating':'MediaRating','ProductCategories':'ProductCategories',
 'PrimaryContentType':'PirmaryContentType','ReturnQualifier':'ReturnQualifier','ReturnType':'ReturnType',
 'SalesStatusCode':'SalesStatusCode','SeriesFrequency':'SeriesFrequency','SeriesType':'SeriesType',
 'VariantType':'VariantType','VolumeType':'VolumeType','HTSCountryCode':'HTSCountryCode'}
pl_counts={}
for outname, stem in PL_FILES.items():
    path=os.path.join(SRC,stem+'.csv')
    if not os.path.exists(path): continue
    prows=list(csv.reader(open(path,newline='')))
    header=[clean(h) for h in prows[0]]
    values=[]
    for pr in prows[1:]:
        if not pr or not clean(pr[0]): continue
        item=OrderedDict()
        for i,h in enumerate(header):
            if not h: continue
            val=clean(pr[i]) if i<len(pr) else ''
            if val: item[h]=val
        if item: values.append(item)
    d=OrderedDict(name=outname, source_columns=[h for h in header if h], count=len(values), values=values)
    with open(os.path.join(REPO,'standard/picklists',outname+'.yaml'),'w') as f:
        yaml.dump(d,f,default_flow_style=False,sort_keys=False,allow_unicode=True,width=120)
    pl_counts[outname]=len(values)

# ---------- JSON SCHEMA ----------
TYPE_JSON={'number':'string','decimal':'string','text':'string','date':'string',
 'boolean':'boolean','picklist':'string'}
props=OrderedDict(); required=[]
for pos,name,tier,req,pl in sorted(field_index):
    t=re.sub(r'\s+','','').join if False else None
    key=name
    base=TYPE_JSON.get(''.join(''), 'string')
props=OrderedDict()
required=[]
for pos,name,tier,req,pl in sorted(field_index):
    props[name]={'type':'string','x-tier':tier,'x-required':req}
    if pl: props[name]['x-picklist']=pl
    if req=='yes': required.append(name)
schema=OrderedDict()
schema['$schema']='http://json-schema.org/draft-07/schema#'
schema['$id']='https://cometstandard.com/schema/comet.schema.json'
schema['title']='COMET Standard'
schema['description']='Machine-readable schema for the COMET comics metadata standard, generated from standard/fields/*.yaml'
schema['version']='1.1.10'
schema['type']='object'
schema['properties']=props
schema['required']=required
schema['additionalProperties']=False
os.makedirs(os.path.join(REPO,'schema'), exist_ok=True)
json.dump(schema, open(os.path.join(REPO,'schema/comet.schema.json'),'w'), indent=2)

# ---------- REPORT ----------
print("FIELDS written:", len(field_index))
from collections import Counter
print("by tier:", dict(Counter(t for _,_,t,_,_ in field_index)))
print("by required:", dict(Counter(r for _,_,_,r,_ in field_index)))
print("unconditionally required (schema.required):", len(required))
print("conditionally/always required (not 'no'):", sum(1 for *_,r,_ in [(0,0,0,x[3],0) for x in field_index] if r!='no'))
print("picklists written:", len(pl_counts), pl_counts)
