
import http from './httpService';
const apiEndPoint ='/movies';

export async function getMovies() {
    return await http.get(apiEndPoint);
}
function movieUrl(id) {
    return `${apiEndPoint}/${id}`;
}
export async function getMovie(id) {
    return await http.get(movieUrl(id));
}
export async function saveMovie(movie) {
    const {_id: id} = {...movie}
    delete movie._id;
    if (id) {
        return await http.put(movieUrl(id), movie);
    } else return await http.post(apiEndPoint, movie);
}
export async function deleteMovie(id) {
    return await http.delete(movieUrl(id));
}
