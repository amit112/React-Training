import React, { Component } from 'react';
import { getMovies , deleteMovie } from '../services/movieService';
import {getGenres} from '../services/genreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';
export class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize : 4,
        currentPage : 1,
        currentGenre: null,
        sortColumn: {path: 'title' , order: 'asc' },
        searchQuery : ""
    }
    async componentDidMount() {
        const {data} = await getGenres();
        const currentGenre = {_id: '', name: "All Genres"};
        const genres = [currentGenre , ...data]; 
        const  {data: movies} = await getMovies();
        debugger;
        this.setState({movies  , genres , currentGenre });
    }
    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        try {
            await deleteMovie(movie._id);
            const movies = [...this.state.movies.filter(m=> m._id !== movie._id)];
            this.setState({movies});
        } catch(ex) {
if(ex.response && ex.response.status === 404) {
    toast.error("This movie has been already deleted")
}
this.setState({movies: originalMovies});
}
    
    }


    handleLike = movie => {
        const movies =  [...this.state.movies];
        const index =  this.state.movies.indexOf(movie);
        movies[index].liked =!movies[index].liked;
        this.setState({movies});
      }
      handlePageChange = currentPage => {
      this.setState( {currentPage});
      } 
      handleGenreSelect = currentGenre => {
        this.setState( {currentGenre, currentPage: 1});
     }
     handleSort = sortColumn => {
      this.setState({sortColumn});
     }
     getPagedData =()=> {
        const  {movies: allMovies,currentPage , pageSize ,currentGenre , sortColumn, searchQuery} =this.state;
        let filtered = allMovies;
        if(searchQuery) {
            filtered = allMovies.filter(r=> r.title.toLowerCase().includes(searchQuery.toLowerCase()));
        } else if(currentGenre && currentGenre._id) {
            filtered= allMovies.filter(r=>r.genre._id === currentGenre._id)
        }
        const sorted =  _.orderBy(filtered,sortColumn.path ,sortColumn.order);
        const data =  paginate(sorted,currentPage ,pageSize);
         return {totalCount: filtered.length , data };

     }
     handleSearch = query => {
        const currentGenre = {_id: '', name: "All Genres"};
        this.setState({searchQuery: query  ,currentGenre , currentPage: 1});

    }
    render() {
        const  {currentPage , pageSize , genres ,currentGenre , sortColumn ,searchQuery} =this.state;
        const {totalCount ,data: movies } = this.getPagedData();
        if ( totalCount === 0)  return <p>There is no movies in database</p>
        const {user } = this.props;
        return (
            <div className="row">  
                <div className="col-3">
                    <ListGroup  items={genres} selectedItem ={currentGenre}  onItemSelect={this.handleGenreSelect}  ></ListGroup>
                </div>
                <div className="col">
                   {user && <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>}
                <p>Showing {totalCount} movies in the database.</p>
                <SearchBox value= {searchQuery}  onChange={this.handleSearch}></SearchBox>
                <MoviesTable movies={movies} sortColumn = {sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort}></MoviesTable>
                <Pagination pageSize={pageSize} totalItems={totalCount} onPageChange = {this.handlePageChange} currentPage = {currentPage} ></Pagination>
                </div>
            </div>
        );
    }
}
export default Movies;