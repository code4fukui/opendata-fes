# 福井県の野外フェスオープンデータ (opendata-fes)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository provides open data for outdoor music festivals held in Fukui Prefecture, Japan. The data is automatically processed to generate a user-friendly HTML page, a downloadable iCalendar (.ics) file, and a raw CSV file.

The project scrapes Open Graph Protocol (OGP) metadata from festival websites to enrich a source CSV file with images and descriptions.

## Demo & Data Formats

The generated HTML page displays a responsive grid of festival cards. Each card features a prominent image, the festival's title and city, and a brief description.

- **[View the HTML Page](https://code4fukui.github.io/opendata-fes/)**
- **[Download iCalendar File (.ics)](https://code4fukui.github.io/opendata-fes/fes-fukui.ics)**
- **[Download CSV File (.csv)](https://code4fukui.github.io/opendata-fes/fes-fukui.csv)**

## How It Works

The data generation follows a simple, automated workflow:

1.  **Source Data**: Festival information (name, URL, dates, location) is manually maintained in `fes-fukui_src.csv`.
2.  **Enrichment**: The `addOGP.js` script reads the source CSV, fetches OGP metadata (like `og:image` and `og:description`) from each festival's URL, and writes the combined data to `fes-fukui.csv`.
3.  **Output Generation**:
    - `makeHTML.js` converts `fes-fukui.csv` into a static HTML page (`fes-fukui.html`).
    - `makeICAL.js` converts `fes-fukui.csv` into a standard iCalendar file (`fes-fukui.ics`) that can be imported into calendar applications.

## How to Update Data

To add a new festival or update existing information, follow these steps:

1.  **Edit the Source File**: Add or modify a row in `fes-fukui_src.csv`. You only need to provide the `start`, `end`, `title`, `url`, `city`, and `geo3x3` fields.

2.  **Run the Scripts**: Execute the following Deno commands in order to regenerate all outputs.

    ```bash
    # 1. Fetch OGP data and create the main fes-fukui.csv
    deno run -A addOGP.js

    # 2. Generate the HTML page
    deno run -A makeHTML.js

    # 3. Generate the iCalendar file
    deno run -A makeICAL.js
    ```

## Development

### Requirements

- [Deno](https://deno.land/) runtime

### Dependencies

This project relies on several external ES modules:
- [scrapeutil.js](https://code4fukui.github.io/scrapeutil/scrapeutil.js) for web scraping.
- [ICAL.js](https://code4fukui.github.io/ICAL/ICAL.js) for iCalendar file generation.
- [CSV.js](https://js.sabae.cc/CSV.js) for CSV parsing and stringifying.
- [DateTime.js](https://js.sabae.cc/DateTime.js) for date handling.
- [Geo3x3.js](https://geo3x3.com/Geo3x3.js) for encoding and decoding geographic coordinates.

## Data Schema

The primary data file, `fes-fukui.csv`, contains the following columns:

- `start`: Event start date (YYYY-MM-DD).
- `end`: Event end date (YYYY-MM-DD).
- `title`: Official name of the festival.
- `url`: The URL of the festival's official website.
- `city`: The host city in Fukui Prefecture.
- `geo3x3`: A [Geo3x3](https://geo3x3.com/) encoded string representing the event's location.
- `ogpimage`: URL of the OGP image, fetched automatically.
- `ogpdescription`: The OGP description text, fetched automatically.

## Contributing

Contributions are welcome! To add or update a festival, please open a pull request modifying the `fes-fukui_src.csv` file.
