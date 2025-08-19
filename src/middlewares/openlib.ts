import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import Book from '../models/book';
import { request } from 'http';

const openlibUrls: UrlHash = {
    "base": "https://openlibrary.org/",
    "covers": "https://covers.copenlibrary.org/",
};

const getOpenlibClient = (baseUrl: string) => {
    return axios.create({
        baseURL: openlibUrls[baseUrl],
    });
};

export const getBookList = async (title: string, limit = "10") => {
    try {
        let bookList = [];
        const response = await getOpenlibClient('base').get('/search.json', {
            params: {
                q: title,
                limit: limit,
            }
        });
        // console.log(response.request.path)
        return response.data.docs;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};

export const getBookByISBN = async (isbn: string) => {
    try {
        const response = await getOpenlibClient('base').get(`/isbn/${isbn}.json`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return {};
    };
};

export const getEditionsByWorkID = async (olid: string) => {
    try {
        const response = await getOpenlibClient('base').get(`/works/${olid}/editions.json`);
        return response.data.entries;
    }
    catch (error) {
        console.log(error);
        return {};
    }
}

export class OpenLibBook {
    public olid: string;
    public publishers: string[];
    public source_records: string[];
    public title: string;
    public number_of_pages: number;
    public covers: number[];
    public coverKey: string;
    public isbn_13: string[];
    public full_title: string;
    public isbn_10: string[];
    public publish_date: string;
    public key: string;
    public authors: KeyObject[];
    public authorKeys: string[];
    public works: KeyObject[];
    public type: KeyObject;
    public latest_revision: number;
    public revision: number;
    public created: DateTimeObject;
    public last_modified: DateTimeObject;

    constructor(data: {
        publishers: string[];
        source_records: string[];
        title: string;
        number_of_pages: number;
        covers: number[];
        isbn_13: string[];
        full_title: string;
        isbn_10: string[];
        publish_date: string;
        key: string;
        authors: KeyObject[];
        works: KeyObject[];
        type: KeyObject;
        latest_revision: number;
        revision: number;
        created: DateTimeObject;
        last_modified: DateTimeObject;
    }) {
        this.publishers = data.publishers;
        this.source_records = data.source_records;
        this.title = data.title;
        this.number_of_pages = data.number_of_pages;
        this.covers = data.covers;
        this.isbn_13 = data.isbn_13;
        this.full_title = data.full_title;
        this.isbn_10 = data.isbn_10;
        this.publish_date = data.publish_date;
        this.key = data.key;
        this.authors = data.authors;
        this.works = data.works;
        this.type = data.type;
        this.latest_revision = data.latest_revision;
        this.revision = data.revision;
        this.created = data.created;
        this.last_modified = data.last_modified;

        if (this.type === undefined && this.key.includes('work')) {
            this.type = { key: '/type/work' };
        }

        this.olid = '';
        if (this.key) {
            this.olid = `${this.key.split(/\//).pop()}`;
        }

        this.authorKeys = [];
        if (this.authors) {
            for (let i = 0; i < this.authors.length; i++) {
                this.authorKeys.push(this.authors[i].key);
            }
        }

        if (this.covers) {
            this.coverKey = `/b/id/${this.covers[0]}`;
        }
        else if (this.olid) {
            this.coverKey = `/b/olid/${this.olid}`;
        }
        else {
            this.coverKey = '';
        }
    }
}

// Interface for the book entry
export class OpenLibBookEdition {
    public publishers: string[];
    public number_of_pages: number;
    public subtitle: string;
    public weight: string;
    public covers: number[];
    public physical_format: string;
    public last_modified: DateTimeObject;
    public latest_revision: number;
    public key: string;
    public authors: KeyObject[];
    public subjects: string[];
    public isbn_13: string[];
    public title: string;
    public identifiers: IdentifierObject;
    public created: DateTimeObject;
    public languages: KeyObject[];
    public isbn_10: string[];
    public publish_date: string;
    public oclc_numbers: string[];
    public works: KeyObject[];
    public type: KeyObject;
    public physical_dimensions: string;
    public revision: number;
    public table_of_contents: TableOfContentsEntry[];
    public lc_classifications: string[];
    public url: string[];
    public publish_places: string[];
    public contributions: string[];
    public uri_descriptions: string[];
    public pagination: string;
    public source_records: string[];
    public dewey_decimal_class: string[];
    public lccn: string[];
    public publish_country: string;
    public by_statement: string;
    public uris: string[];

    constructor(entry: {
        publishers: string[];
        number_of_pages: number;
        subtitle: string;
        weight: string;
        covers: number[];
        physical_format: string;
        last_modified: DateTimeObject;
        latest_revision: number;
        key: string;
        authors: KeyObject[];
        subjects: string[];
        isbn_13: string[];
        title: string;
        identifiers: IdentifierObject;
        created: DateTimeObject;
        languages: KeyObject[];
        isbn_10: string[];
        publish_date: string;
        oclc_numbers: string[];
        works: KeyObject[];
        type: KeyObject;
        physical_dimensions: string;
        revision: number;
        table_of_contents: TableOfContentsEntry[];
        lc_classifications: string[];
        url: string[];
        publish_places: string[];
        contributions: string[];
        uri_descriptions: string[];
        pagination: string;
        source_records: string[];
        dewey_decimal_class: string[];
        lccn: string[];
        publish_country: string;
        by_statement: string;
        uris: string[];
    }) {
        this.publishers = entry.publishers;
        this.number_of_pages = entry.number_of_pages;
        this.subtitle = entry.subtitle;
        this.weight = entry.weight;
        this.covers = entry.covers;
        this.physical_format = entry.physical_format;
        this.last_modified = entry.last_modified;
        this.latest_revision = entry.latest_revision;
        this.key = entry.key;
        this.authors = entry.authors;
        this.subjects = entry.subjects;
        this.isbn_13 = entry.isbn_13;
        this.title = entry.title;
        this.identifiers = entry.identifiers;
        this.created = entry.created;
        this.languages = entry.languages;
        this.isbn_10 = entry.isbn_10;
        this.publish_date = entry.publish_date;
        this.oclc_numbers = entry.oclc_numbers;
        this.works = entry.works;
        this.type = entry.type;
        this.physical_dimensions = entry.physical_dimensions;
        this.revision = entry.revision;
        this.table_of_contents = entry.table_of_contents;
        this.lc_classifications = entry.lc_classifications;
        this.url = entry.url;
        this.publish_places = entry.publish_places;
        this.contributions = entry.contributions;
        this.uri_descriptions = entry.uri_descriptions;
        this.pagination = entry.pagination;
        this.source_records = entry.source_records;
        this.dewey_decimal_class = entry.dewey_decimal_class;
        this.lccn = entry.lccn;
        this.publish_country = entry.publish_country;
        this.by_statement = entry.by_statement;
        this.uris = entry.uris;
    }
}

interface UrlHash {
    [key: string]: string;
}
interface KeyObject {
    key: string;
}
interface DateTimeObject {
    type: "/type/datetime";
    value: string;
}

interface IdentifierObject {
    goodreads?: string[];
    librarything?: string[];
    [key: string]: string[] | undefined;
}

interface TableOfContentsEntry {
    level: number;
    label: string;
    title: string;
    pagenum: string;
}
