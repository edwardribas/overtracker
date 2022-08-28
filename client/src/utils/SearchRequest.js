const BASE_URL = 'http://localhost:3001';

export default class SearchRequest{
    memo = new Map();

    constructor(path, isJson = true){
        this.path = path;
        this.isJson = isJson;
    }

    async fetch(obj = {}) {
        const params = SearchRequest.convert(obj);
        if (this.memo.has(params)) 
            return this.memo.get(params);

        const res = await fetch(`${BASE_URL}${this.path}${params}`);
        if (!res || !res.ok) throw new Error(res);
        let result;
        if (this.isJson) {
            result = await res.json();
        } else {
            result = await res.text();
        }
        this.memo.set(params, result);
        return result;
    }

    static convert(obj) {
        const entries = Object.entries(obj);
        return entries.reduce((str, [key, value]) => `${str}${str ? '&' : '?'}${key}=${value}`, '');
    }
}