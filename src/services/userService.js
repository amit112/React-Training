
import http from './httpService';
const apiEndPoint ='/users'; 

export function register(user) {
    return http.post(apiEndPoint, {email: user.username, name: user.name, password: user.password});
}

