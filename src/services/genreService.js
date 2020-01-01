import config from '../config.json'
import http from './httpService';

const apiEndPoint = config.apiEndPoint +  '/genres';
export async function  getGenres() {
     return await  http.get(apiEndPoint);
    }