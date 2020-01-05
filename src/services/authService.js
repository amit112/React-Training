
import http from './httpService';
import jwtDecode from 'jwt-decode';
const apiEndPoint = '/auth'; 
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(loginData) {
    const {data: jwt} = await http.post(apiEndPoint, loginData);
    loginWithJwt(jwt);
}

export function loginWithJwt(token) {
    localStorage.setItem(tokenKey, token);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
    try {
        return jwtDecode(localStorage.getItem(tokenKey));;
        } catch(ex) { return null }
}
export function getJwt() {
 return  localStorage.getItem(tokenKey);
}
export default {
    login,
    loginWithJwt,
    logout ,
    getCurrentUser,
    getJwt  
}