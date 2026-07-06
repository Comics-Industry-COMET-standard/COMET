## The Comet Standard for Addressing Challenges in Comics Industry Metadata: A White Paper

**From the ComicsPro Metadata Working Group**

Katie Pryde, Django Bohren, Jessica Wells, Brian Garside  
cometstandard.com

## The Comet Standard for Addressing Challenges in Comics Industry Metadata

### Executive Summary

This document is a white paper produced by the ComicsPro Metadata Working Group, which was formed in February 2023 to address growing data concerns in the comics industry. The committee consists of stakeholders from across the industry, including representatives from major comics publishers, distributors, software developers, and retailers. This white paper discusses the history of commercial comics metadata, the problems with the current state of comics metadata, and the proposed solution of the Comet Standard. The Comet Standard aims to create a standardized approach to comics metadata by implementing atomic data principles and adopting the BISAC categorization system in order to achieve consistency, improve data accuracy, and streamline processes for retailers, distributors, and publishers. The committee proposes a timeline for industry-wide adoption of the Comet Standard by the end of 2025.

## About the ComicsPro Metadata Subcommittee

In February 2023, at the annual ComicsPro meeting for industry professionals, ComicsPro board member Katie Pryde announced that she and several other retailers and comics professionals, who had been meeting privately about data concerns for the past year, would be putting together a committee of stakeholders from across the industry, including representatives from major comics publishers, distributors, point of sale systems, digital tools, and more, in order to address the growing data issues head-on. This white paper is the product of a year’s worth of meetings of that working group, as well as its subcommittees on data formats, data standards, product categories, and data workflow.

## Why Metadata?

Metadata, in the broadest sense, means data about data. Coined by Philip Bagley in 1968 in a text about concepts in computer programming, it is a concept that has grown up with the digital world. In publishing, product metadata can tell you a book’s title, publisher, author, publication date, format, price, and more. In comics publishing, metadata also contains the elements that retailers use to create and manage customer subscriptions, distinguish between variant covers, and give information about genre, age rating, similar products, and more, both in brick-and-mortar stores and online.

## History of Commercial Comics Metadata

### The Diamond-Exclusive Era, 1997-2020

While the history of distribution in the direct market for comic books goes back to the 1970s and includes dozens of distributors, the story about digital comic book product data is much more concise: between 1994 and 1997, Diamond Comic Distributors acquired (or outlasted) all of its major competitors, and, in the same period, signed exclusive distribution agreements with nearly all major comic book publishers. Therefore, by the time Diamond launched its online “Retailer Services Area” in 1998 and its “Vendor Services Area” in 1999, they were the sole player in comic book direct market distribution.

Because Diamond was the only major comic book distributor at the dawn of the digital age, that company also had full control over how comics product data would be structured. Other major milestones in Diamond’s work in comics data management include: introducing online ordering in 2000, creating the ComicsSuite Point-of-Sale software in 2007, and the introduction of the customer-facing comics website _PreviewsWorld_ in 2008. In 2008, Diamond also introduced a standardized UPC code system, with 5-digit supplemental codes representing issue number, cover designation and printing following a standard 13 digit code (for a total of 18 digits which could be auto-discriminated by UPC code readers).

In 2009, Diamond implemented two major upgrades to the retailer services website focusing on better product information, and in 2016, improved search function and incentive variant cover information.

The metadata schema created by Diamond Comics is explained in the “Key Guide to Diamond’s Master Data File,” which is intended to contain “all the fields necessary to build full title descriptions, databases, pull-and-hold subscription services, cycle sheets, sales reports and more in point-of-sale (POS) and inventory tracking systems.” This undated document, available for download from the Diamond Comics Retailer Services site, contains descriptions of 45 data fields which, together, describe the data that Diamond uses to describe the products it distributes.

For more detail about some of these fields, definitions can be found in the Diamond Dictionary, a resource also found on the Diamond Comics Retailer Services website. For example, the Diamond Dictionary explains the codes given to Brand Families, Product Types, and Genres, as shown in the screenshots below:

Diamond Comics Distributors established the standard for comics product metadata, and while their work was pioneering, it was also sometimes quirky and idiosyncratic. An example of this is the brand codes and genre categories delineated above, where one might note separate genre codes for “Halloween” and “Seasonal,” as well as brand codes including “Lost in Space,” “Xena,” and “Yaoi.”

### Comics Metadata Since 2020

In 2020, the comics distribution landscape began seeing a series of radical changes. First, in March 2020, during the initial phases of the Covid-19 pandemic lockdowns, Diamond Comics shut down comics distribution indefinitely–a period that wound up being about two months. Then, On June 5, 2020, DC Comics announced that they were leaving their exclusive distribution relationship with Diamond, and would instead make their products available from two new-to-the-market distributors: UCS Comics Distributors and Lunar Distribution.

Lunar and UCS quickly came up with their own data formats, each slightly different from the other, as well as different from Diamond’s. Both Lunar and UCS made a best effort to keep files similar to the existing Diamond standard, and at the time of this writing Lunar continues to provide a Diamond Formatted Master Data File and Previews Text file each month.

With a very short turnaround time (Lunar and UCS began shipping DC product within one month of the announcement), data formats were created quickly with some conversations with retailers and other stakeholders. Lunar and UCS both iterated on their formats quickly after initially delivering them, but even so, significant differences remained between Lunar and UCS data formats. Meanwhile, Diamond continued to provide DC series codes through the end of 2020, and in January 2021 Lunar began providing their own series codes for all new DC titles. The fragmentation of series codes on DC product provide a key example of the breaks in the data landscape.

DC’s use of in-house “series codes” differs materially from Diamond’s use of the industry standard “series codes.” DC’s in-house “series code” is used more like a “family code.” For example, their code for “Titans” is included in data feeds for _Titans_, _Knight Terrors: Titans_, and _Tales of the Titans_. The same code is also used for collections as well as periodicals. Conversely, the Diamond series code, which point of sale systems and websites have relied on for more than a decade, assigns a unique series code to each individual series in each format. So _Titans, Knight Terrors: Titans_, and _Tales of the Titans_ would have three separate series codes in periodicals, three in softcover collections and three in hardcover collections. As you can likely intuit, the matching name of this field between Diamond and DC, and the subsequent intermixing of the two has caused many confusing and sometimes expensive moments for retailers and software developers.

Secondly,  in March of 2021, Marvel Comics announced that they, too, were leaving their exclusive distribution with Diamond Comics, and were moving to a primary distribution relationship with Penguin Random House (PRH). In this transition, retailers were given significantly more time to prepare, announcing that products would begin shipping through PRH in  October. In anticipation of this change, PRH representatives began meeting with retailers, including the ComicsPro leadership team. While the initial transition had hiccups, including frustrations around series codes and search tools, PRH’s team quickly smoothed many of the initial wrinkles.

PRH brought new rigor to the data, informed by their history with the book industry. Notably, PRH employs a philosophical standpoint that publishers are responsible for their own data, and that data would be normalized and translated via PRH’s standard files. PRH also provided detailed data definitions for all of their files, supplying information not previously available anywhere, including but not limited to the book-industry standard BISAC (Book Industry Standards and Communication) categorization for comics products.

However, due to its experience with the book industry, PRH did not provide some key elements of data that comics retail requires. One example of PRH’s critical data omissions was the “Issue Sequence Number,” a field Diamond had always provided, but PRH did not provide originally, because PRH data originates solely with the publisher. The absence of that information caused problems with Marvel’s titles until the data was eventually provided. PRH also uses the same series code across formats (between single issues, trade paperbacks, and hard covers), which can cause issues with creating and ordering correct subscriptions for customers.

PRH also adopted a new model for the distribution of Marvel comics by creating a wholesaler relationship with Diamond. Direct Market retailers were able to choose to order Marvel products directly from PRH or through Diamond, who receives product wholesale from PRH. This relationship resulted in two different sets of data files that needed to be reconciled for every single Marvel product, containing substantively different information and often conflicting key identifiers, as with different naming conventions around titles. Diamond often truncates titles, while Marvel originally omitted the # sign from issue numbers in data transmitted to PRH. So, for instance, Diamond’s “_Fall of House of X_ #1” was the same issue as PRH’s “_Fall of the House of X_ 1.”

## State of the Problem, 2024

At the time of this writing, there are three core problems in comics metadata. First, because of the multiple sources through which data comes into the market, different metadata regarding the same item proliferates. This causes confusion in point of sale systems, online marketplaces, and elsewhere.

A second problem comes from each distributor presenting data in a different structure. This creates more work downstream for retailers and POS systems using this data. If all files and data fields are different, then separate ingestion mappings and processes must be maintained to support each file type. This will become extremely cumbersome for data users over time.

The third problem is perhaps the most knotty: publishers persistently releasing poor or inconsistent data. Errors in variant cover designations, capricious title changes, and recycled barcodes have become increasingly common in the past four years. Added to different information being fed out from the various distributors, it has become extremely burdensome for point-of-sale systems and individual stores to import and manage data, as no single source of information is guaranteed to match another.

## The Hidden Costs of Bad Data

With different sources providing data in different ways, there are many ways that bad data can result in bad outcomes.

Three primary effects of bad data are:

1. **Increased labor costs.** Bad data has to be reviewed and re-processed by hand, and errors need to be unwound within various systems. Processing these changes takes time, and requires person-hours to process it.
2. **Loss of sales.** Bad data causes a marked loss of sales, due to information either not being available to the end customer or not available to the retailer in time to make correct orders.
3. **Improper retailer ordering.** Mismatches in codes can cause a retailer to over-order or under-order on a product, which can have devastating results such as ordering the same number of an oversized hardcover as was intended to be ordered for single issues.

### Increased Labor Costs

A single barcode can have multiple different versions of the same information, depending on a publisher’s different distribution partners.  This means that a DC trade paperback may have data from Diamond UK, Lunar, and Penguin Random House.  That ISBN needs to be tied together via different order codes, and the data needs to be ingested and normalized.  Each distributor has different product types, categorizations, and more.  Even material things like prices, associated images, creator information, and description text can vary significantly between feeds.

This requires stores to use a solution that can turn all of these items into a single ordering SKU so that orders can be placed through multiple vendors for a single product.  That solution should also normalize all data and provide a single source of truth.

On check-in, stores need to validate titles so that they comply with their standardization; for instance, since most of the market uses a # symbol in front of an issue number, anyone currently getting Marvel Data from Penguin Random House must manually update that symbol.

As a specific example, the Point of Sale System Manage Comics recently had to unravel the multiple versions of _Suicide Squad: Kill Arkham Asylum_ #1, where covers had different designations compared to UPC codes, and certain UPC codes were missing from the sequence, causing their system to throw an error. Covers had been changed from a 1:25 ratio ordering requirement to open order, another cover had been canceled, and a new cover had been selected to replace an older cover. This required Manage Comics to manually review all of the information about the titles, remove the variants that had been canceled, and add new information.  It took about 30 minutes to completely review, match, and verify all information for just one of twenty eight total titles on sale that week from that publisher and distributor.

### Loss of Sales

With data coming in at different times during the ordering cycle, from months before the orders begin through the day of the product’s release (and occasionally beyond), retailers urgently need to have current data. In many cases, trade paperback and graphic novel products are marketed to customers whose local comic shop does not have the data available to place an order, although the book trade – especially e-commerce giant Amazon –  may already have that solicitation information. Improper Final Order Cutoff dates can also result in customers not knowing about a last available date to order a product.

In addition, every month, solicitation information is released to online comic news sites the week before product data is released to retailers. This leads to customers coming in to reserve items that are not even in the system yet.  (As of this writing, on January 16, 2024, The Beat has published DC product solicitations for April 2024 – data that won’t be available to retailers to act on for at least another week.)

### Improper Retail Ordering

Bad data can cause retailers to order products that they do not intend to order. A retailer relies on series codes to order the same products month-to-month, but if a series code for a comic is placed on a collected edition, they may order the same number of items of the collected edition as they do the individual copies. Say, for instance, that a retailer has 3 subscribers to _Darth Vader: Black, White and Red_. When the collected treasury edition comes out, they see the same series code and order three copies for the treasury edition of the series they previously purchased.

A similar problem is retailers under-ordering because the data does not properly connect items, or does not communicate enough information to retailers to make a decision to order extra copies for specific customers.

Less quantifiable, but also important, is damage to the publisher/product/brand. Bad information to consumers persists on the Internet. As data moves along the pipeline, a specific UPC code can bring up vastly different product results, ranging from bad images for products to incorrect creator information to entirely incorrect products. A simple search for recently solicited products will show a vast array of different listings, thanks to the ways the data is currently consumed and displayed.

## The Path Forward: The Comet Standard

Creating an industry-accepted standard approach to comics metadata has several benefits. Most notably, POS systems will be able to create a standard ingestion pipeline for comics data regardless of where the data is sourced. Although providers may supply slightly different values, those values will come from an approved list and will be communicated in a standard file format. Retailers will be able to trust the data they receive, as they will know which data fields are required and which are optional. And finally, through the continued review and enhancement of the standard, a consistent feedback loop back to publishers will be created, and help them meet the marketplace’s data needs. Having a centralized, cross-functional team maintain the standard will ensure buy-in and benefits across publishers, distributors and retailers.

Comet Data Formats and Standards

## The Comet Standard Data Formats and Standards

A cross-functional team, including publishers, distributors, retailers, and software developers, held a series of meetings to determine the best way to describe comic books with data fields. The mission was to provide accurate information about each comic, with an eye to the flexibility comics need, and a goal of using the data for better sorting and sales at every level of the product chain.

Previously, data existed in a number of different formats, and the data had different definitions, as well as different rules for each data element. There were a number of data definitions which could be found across multiple documents. There were different ideas of who owned which pieces of data, and who was responsible for the creation, maintenance, and modification of data.

For the Comet Data Formats and Standards, we collaboratively determined what each data field should contain, what type of data it holds, whether it is required or optional, what order that data should be presented in, the rules that the data conforms to, and the validation rules around that data.

#### Atomic Data as a Guiding Principle

During the creation of the Data Formats and Standards, “Atomic Data” was a guiding principle for our thought process. Atomic Data is data that is broken down into its smallest useful parts. As an example, the title _Something is Killing the Children #1 Fall of the House of Slaughter Artgerm Full Art (Mature)_ breaks down into several atomic components:

- Main Title: Something is Killing the Children
- Issue Number: #1
- Subtitle: Fall of the House of Slaughter
- Cover Description: Artgerm Full Art
- Rating Code: Mature

Having each of these pieces of data in its own discrete field gives a system the ability to rearrange the data as it needs to, and allows for various groupings of data.

#### The Key Types of Data and Their Owners (Field Classes)

The Comet standard contains 108 total fields, including 33 required fields, which describe the details of a product. Within the data, there are three key types of information which describe a product: essential data, core data, and extended data.

### Essential Data (6 fields, 3 required for periodical content, 5 required for book content); Owned by Publisher

The minimum data required to create a product: a title, a primary identifier (UPC for periodical content, ISBN/EAN for book-formatted content) which will remain unchanged through the lifecycle of the product, and a retail price. This data is provided by a publisher and will be updated throughout the lifecycle of the product by the publisher. This data should remain the same no matter who the distributor is.

### Core Data (67 fields, 28 required); Owned by Publisher

Data that describes what the product is. This data is provided by the publisher and will be updated throughout the lifecycle of the product by the publisher. This data should remain the same no matter who the distributor is.

### Extended Data (35 fields, 1 required); Owned by Distributor

Data added by the distributor, which explains how to order a product. This data is provided by a distributor, and will be updated throughout the lifecycle of the product by the distributor.

## UPC and ISBN As Unique Identifiers

Re-using a primary identifier after it has been solicited will result in that identifier causing data corruption. UPC and ISBN codes are unique identifiers, therefore a UPC Code can not be reused after being solicited, even if the product is never released. Likewise, an ISBN number can not be reused after being solicited, even if the product is never released.

#### Field Descriptions:

The initial version of the standard describes the fields, as well as various attributes. These fields are as follows:

- Field Name – The name of the field, expressed in CamelCase
- Field Position – The column position of a field
- Field Class – The key type of data (Essential, Core, or Extended)
- Field Type – Number, Text, Composite, Pick List (Enum), Date, Y/N
- Required – Y/N whether a field is required
- Field Length – The length (in # of characters) a field is allowed to be
- Field Description – A text description of the field
- Field Example – An example of the data that the field will contain
- Field Media – Where applicable, an image representing the information in the field
- Field Notes – Other notes required to describe the field, its purpose, field dependencies, and expected outputs

#### Field Naming Structure:

All fields use CamelCase. Camel case is a way of writing phrases without spaces, where the first letter of each word is capitalized.  For example the field “product category” is expressed as “ProductCategory”.

#### Enum (Pick List) values

Some fields require us to have separate tables of values that can be used in the pick lists. All values are provided in the Comet Standard Data Dictionary – Data Definitions table. The following values are currently provided (see data definitions table):

- ProductCategory
- FormatType
- VariantType
- VariantMechanics
- MediaRating
- SeriesFrequency
- SeriesType
- PrimaryContentType
- VolumeType
- ReturnType
- ReturnQualifier
- AgeRange
- LanguageCode
- BISACCode
- CountryCode

Changes to the values within the Data Definitions will  go through the Data Formats and Standards process to ensure everyone is using the same data.

#### Naming Conventions

To avoid the squiggles, question marks, and boxes that result from mismatched character encodings, the working group will adopt the UTF-8 encoding for the unicode character  to use across the entire system. UTF-8 is the best choice for us because:

- UTF-8 supports the full unicode character set, which includes not just the core ASCII characters but all accented characters, characters in other languages, and emojis.
- UTF-8 is the most common encoding for the modern web and internet by a wide margin
- HTML5 spec encourages use of UTF-8
- Of the available encodings for unicode (UTF-8, UTF-16, UTF-32), UTF-8 is more commonly used because it is the most space-efficient for data in western languages.

Collations govern how choices are made in sorting text values across a character set (e.g., does **Ñ** sort the same as **N**, or before or after it?). Collations can be case-sensitive or case-insensitive.

In a MySQL context, programmers will want to select the following databases:

- Database charset = utf8mb4 (not plain utf8 [see notes](https://adamhooper.medium.com/in-mysql-never-use-utf8-use-utf8mb4-11761243e434))
- Database collation = utf8mb4_unicode_ci ([see notes](https://medium.com/@nilesh.patil.d/utf8-general-ci-vs-utf8-unicode-ci-what-should-we-use-cc01b58c00cc))

## Comics Categorization: Adoption of BISAC

BISAC (Book Industry Standards and Communication) has been the standard of categorization for the trade book industry for many years. BISAC is a dynamic standard of subject categories that is owned and maintained annually by The Book Industry Study Group (BISG). It was created as a method for the electronic transmission of subject category information for use as keywords in databases, online genre organization, as well as shelving direction for brick-and-mortar retailers.

Comic publishers already assign BISAC subject codes to their titles for distribution to the Trade Market. Therefore, utilizing BISAC in the Direct Market will streamline categorization and ensure seamless adoption from both publishers and distributors.

### BISAC Subject Code Structure

BISAC subjects are represented by a 9-digit alphanumeric code. Each code refers to an industry-maintained literal translation consisting of two, three, or four levels of subject descriptors. There are 54 major sections (e.g. Comics & Graphic Novels), and a number of detailed descriptors that represent subtopics within each category.

_Examples:_

CGN004400  COMICS & GRAPHIC NOVELS / Science Fiction / Apocalyptic & Post-Apocalyptic

CGN004420  COMICS & GRAPHIC NOVELS / Science Fiction / Steampunk

### Terms to Describe the BISAC Structure

- **Code** –The 9-character alphanumeric code associated with each subject heading. Each code begins with a 3-character alpha section representing the primary subject category, followed by a 6-digit numeric string. The numeric codes no longer have a hierarchical meaning. In electronic communications between systems, these codes are typically the only data element transmitted to represent the entire subject string.
- **Heading**/**Literal/Descriptor** – The English-language description of the subject category attached to each code. These can contain two, three, or four levels separated by a forward slash (/). A two-part subject consists of the primary section, such as COMICS & GRAPHIC NOVELS, as well as a secondary subheading to represent the primary category within that section, such as “Science Fiction.” Most headings consist of only two levels, but more detail can be provided using a third and sometimes fourth level of categorization, as shown in the examples above.
- **Tree** – A group of headings with the same first and second level. The two examples above are both within the same “COMICS & GRAPHIC NOVELS/Science Fiction” tree.
- **Branch** – The distinctive third-level heading as part of the tree. This is represented above as “Apocalyptic & Post-Apocalyptic” and “Steampunk.”

### Using BISAC Codes

BISAC is completely free to use, and publishers do not need permission to assign BISAC codes to their titles. BISG makes the full list of BISAC Subject Headings available online for a one-to-one lookup. Downloading the full list of codes for use in your systems is also possible with a paid license. The complete list of BISAC Subject Headings can be found on the BISG website here: [Complete BISAC Subject Heading List](https://www.bisg.org/complete-bisac-subject-headings-list)

### Selecting BISAC Codes: Best Practices

BISG also publishes a best practices document for the selection and implementation of BISAC codes. To summarize, BISG recommends that publishers select a maximum of three BISAC codes for each title or work. Using fewer than three categories is preferred if those subject headings fully describe the associated work. Retailers and data systems within the trade market already require that all titles have at least one category assigned.

Most BISAC sections are intended for the general reading audience. To illustrate titles that are intended for a children’s or young reader’s audience, publishers should select subjects within the sections beginning with: JUVENILE FICTION, JUVENILE NONFICTION, YOUNG ADULT FICTION, YOUNG ADULT NONFICTION. Once an audience is selected for a title, all subsequent BISAC codes should fall within that same audience section. For example, publishers should not mix Fiction and Non-fiction codes in the same work, nor should general codes be mixed with juvenile codes, etc.

It is recommended to use the most specific heading as possible to describe a given title. The committee discourages the combination of general codes with more specific codes; all subjects should be listed in the order of importance. First determine the major heading associated with a title (such as COMICS & GRAPHIC NOVELS), then choose the most specific heading that best describes the content within a title.

### Requesting New Subject Headings

The BISG Subject Codes Committee reviews and updates the Subject Heading List on an annual basis. The revision to each list with additions and deletions is published by February of each year. If you feel a new subject code should be added, you may submit your suggestions to BISG via their website [HERE](https://docs.google.com/forms/d/e/1FAIpQLScnKvp8gaHMA8x9wICT5Gcy_r6B5q78sq9lg5Omwuo7T9SNsQ/viewform). The committee will consider new codes that apply to a range of titles, so it is required to provide at least 10 already published examples that could be associated with the new code.

## Trimming Whitespace

All text values should always be trimmed of any leading or trailing whitespace at the input and output interfaces of any entities handling data.

## Comet Implementation Guide

This implementation guide provides the standards that the comics industry expects within metadata as agreed upon by the Metadata Standards Working Group which held comprehensive working meetings with key industry stakeholders including retailers publishers, distributors and software vendors between March 2023 and October 2023.

This document is the full explanation of the Comet Standard Data Dictionary, and the Comet Standard example file.

## Changes and Revisions

This document is a living standard. Changes and revisions are expected.  For change requests, please contact:

Katie Pryde – [katie@bookswithpictures.com](mailto:katie@bookswithpictures.com)

Brian Garside – [brian@managecomics.com](mailto:brian@managecomics.com)

Django Bohren – [django@comicshopassistant.com](mailto:django@comicshopassistant.com)

The full guide can be found here: [Comet Implementation Guide](https://drive.google.com/file/d/10Sr7DjtaCaXXKWsUHFk5oN7k2kZOjHAR/view?usp=sharing)

The full Data Dictionary guide can be found here: [Comet Standard Data Dictionary](https://docs.google.com/spreadsheets/d/1mSeq1dG43Y3_DnKWKZpQnLGgZIXErQCgarFPN7YgiAk/edit?usp=sharing)

The official Comet Standard website is here: [The Comet Standard](https://cometstandard.com/)

## Conclusion

The ComicsPro Metadata Subcommittee has made significant progress in addressing the data concerns within the comics industry. The establishment of this committee, consisting of stakeholders from major publishers, distributors, and point-of-sale systems, and ComicsPro, the trade association for comics retailers, marks a proactive step toward resolving the growing errors and fragmentation in comics product data. The committee’s year-long efforts, as documented in this white paper, have resulted in the development of the Comet Standard, which aims to create a standardized approach to comics metadata. By adopting the BISAC categorization system and implementing atomic data principles, the industry can achieve consistency, improve data accuracy, and streamline processes for retailers, distributors, and publishers.

## Next Steps

Now that the committee has established the first iteration of the Comet standard, the next objective  is to encourage adoption. The committee recognizes the substantial effort an initiative like this takes to achieve across all stakeholders. It will require development at all levels. Publishers will likely need to provide additional title data not supplied previously. Distributors will need to code for a new file format, and create additional fields in their systems to hold each data element. POS system providers and retailers will need to code new data ingestion pipelines, and possibly new UI displays across their systems and websites.

With this in mind, the committee proposes the following prioritization timeline:

1. Distributors will first work to convert their current files into the new format structure by the end of 2024 – earlier adoption is encouraged.
2. Publishers will redouble their attention to providing correct and complete data, as described in this standard, to their distribution partners.
3. POS system providers will work to code ingestion pipelines for the new format structure. This goal should align with distributors – by the end of 2024, or Q1 2025 at the latest.
4. Publishers and distributors will then work together to supply additional Comet Standard data fields that are not currently being supplied. This will continue to be an evolution over time, with the objective of seeing significant improvement to all elements of the data stream by the end of 2025.