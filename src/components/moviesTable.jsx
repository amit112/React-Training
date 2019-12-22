import React , {Component} from 'react';
import Like from './common/like';
import Table from './common/table';


export class MoviesTable extends Component {
    columns = [
        {label: "Title", path :"title"},
        {label: "Genre", path :"genre.name"},
        {label: "Stock", path :"numberInStock"},
        {label: "Rate", path :"dailyRentalRate"},
        {key: "item1", content : movie => {
           return <Like liked= {movie.liked} onClick={()=> this.props.onLike(movie)} ></Like> }},
           {key: "item2", content : movie => {
                return <button onClick={()=> this.props.onDelete(movie) } className="btn btn-danger btn-sm">Delete</button> }},
    ]
    render() { 
        const { movies , onSort , sortColumn  } = this.props;
        return ( 
                <Table data={movies} onSort={onSort}  sortColumn={sortColumn} columns= {this.columns}></Table>
         );
    }
}
export default MoviesTable;