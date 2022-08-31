import Constants from "expo-constants"

const BASE_API_URL = `http:${Constants.experienceUrl.split(':')[1]}:5000`


export default class ApiClient {
    constructor(){
        this.base_url = BASE_API_URL + '/api';
    }

    async request(options) {
        let query = new URLSearchParams(options.query || {}).toString();
        query = query ? '?'+query : query

        let response;
        try {
            response = await fetch(this.base_url + options.url + query,{
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : null
            })
        }
        catch(error){
            response = {
                ok : false,
                status : 500,
                json : async () => {return {
                    code: 500,
                    message: 'error from api',
                    description: error.toString()
                }},
            };
        }
        return {
            ok : response.ok,
            status : response.status,
            body : response.status !== 204 ? await response.json() : null
        };
    }

    async get(url, query, options) {
        return this.request({method: 'GET', url, query, ...options});
      }
    
      async post(url, body, options) {
        return this.request({method: 'POST', url, body, ...options});
      }
    
      async put(url, body, options) {
        return this.request({method: 'PUT', url, body, ...options});
      }
    
      async delete(url, options) {
        return this.request({method: 'DELETE', url, ...options});
      }
}


