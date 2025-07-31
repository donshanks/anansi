import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { title } from 'process';

interface Hash {
    [key: string]: string;
}

const openlibUrls: Hash = {
    "base": "https://openlibrary.org/",
    "covers": "https://covers.copenlibrary.org/",
};

function getOpenlibClint(baseUrl: string) {
    return axios.create({
        baseURL: openlibUrls[baseUrl],
    });
}

export async function searchBooks(title: string) {
    try {
        const booksClient = getOpenlibClint('base');
        const jsonResponse: AxiosResponse = await booksClient.get('/search.json', {
            params: {
                q: title,
                fields: 'key,title,author_name,editions',
                limit: 1,
            }
        });
        console.log(jsonResponse.data);
    }
    catch (error) {
        console.log(error);
    }
    return '';
}

