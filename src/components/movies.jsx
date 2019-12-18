import React, { Component } from 'react';
import { getMovies} from '../services/fakeMovieService';

export class Movies extends Component {
    state = {
        movies: getMovies(),
    }
    handleDelete = movie => {
      const movies =  this.state.movies.filter(m=> m._id !== movie._id);
      this.setState({movies});
    }
    render() {
        const  {length: count} =this.state.movies;
        if ( count === 0) 
        return <p>There is no movies in database</p>
        return (
            <React.Fragment>
                <p>Showing {count} movies in the database.</p>
                <table className="table"><thead><tr><th>Title</th><th>Genre</th><th>Stock</th><th>Rate</th><th></th></tr>
                </thead>
                <tbody>
                    { this.state.movies.map(m => <tr key={m._id}>
                        <td>{m.title}</td>
                        <td>{m.genre.name}</td>
                        <td>{m.numberInStock}</td>
                        <td>{m.dailyRentalRate}</td>
                        <td><button onClick={()=> this.handleDelete(m) } className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>) }
                </tbody>
                </table>
            </React.Fragment>
        );
    }
}
export default Movies;