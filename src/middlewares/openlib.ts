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
