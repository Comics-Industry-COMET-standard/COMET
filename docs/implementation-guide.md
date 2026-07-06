#### This guide is intended to introduce the concepts of the COMET standard, and provide context for the fields within the COMET standard. It is a living document, and will change over time.

## About this Implementation Guide

The COMET Standard implementation guide comes in two parts.

### Part 1: The COMET Data Dictionary, this spreadsheet displays all data fields in their preferred formatting

The Comet standard contains 108 total fields, including 33 required fields, which describe the details of a product. Within the data, there are three key types of information which describe a product: essential data, core data, and extended data.

**Essential Data (6 fields, 3 required for periodical content, 5 required for book content); Owned by Publisher**

The minimum data required to create a product: a title, a primary identifier (UPC for periodical content, ISBN/EAN for book-formatted content) which will remain unchanged through the lifecycle of the product, and a retail price. This data is provided by a publisher and will be updated throughout the lifecycle of the product by the publisher. This data should remain the same no matter who the distributor is.

**Core Data (67 fields, 28 required); Owned by Publisher**

Data that describes what the product is. This data is provided by the publisher and will be updated throughout the lifecycle of the product by the publisher. This data should remain the same no matter who the distributor is.

**Extended Data (35 fields, 1 required); Owned by Distributor**

Data added by the distributor, which explains how to order a product. This data is provided by a distributor, and will be updated throughout the lifecycle of the product by the distributor.

### Part 2: The COMET Implementation Guide

The COMET Implementation guide is intended to show, in text format, what each field represents, where it belongs in the file structure, and gives any additional context around the field.

## About Required Data and the COMET Standard

The Comet Standard describes 107 fields, but these are not all reqiured, between 30 and 34 fields are required to create a product.

- **Essential Data** – The basic data required to describe a product, provided by the publisher.
    - 4 Required fields for comics, 5 Required fields for books
- **Core Data** – Publisher data that describes the contents of the product
    - 25 Reqiured fields, 28 Required fields for Comics, 29 Required fields for Variant Covers
- **Extended Data** – Distributor data that describes how to order the product from a distributor
    - 1 Required field

## Essential Data

- UPC (for Comics)
- ISBN (for Books)
- EAN (for Books)
- FullTitle
- PriceUSD
- ProductCategory (From List)

## Core Data

- SeriesName
- SeriesNumber
- CoverDescription
- PrimaryFormatType (From List)
- Description
- OnSaleDate
- PublisherName
- SeriesFrequency
- VariantNumber
- SeriesCode (For Comics)
- SeriesType (For Comics)
- PageCount
- PrimaryContentType (From List)
- BISAC1 (From List)
- BISAC1Description (From List)
- Language (From List)
- AgeRange (From List)
- MediaRating (From List)
- PublisherCode
- Reprint
- Printing
- Writer
- Artist
- CoverArtist
- UnitMeasurements
- Unit Width
- Unit Height
- Unit Depth
- Unit Weight

## Extended Data

- StockCode