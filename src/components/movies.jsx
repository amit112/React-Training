import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
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
    componentDidMount() {
        const currentGenre = {_id: '', name: "All Genres"};
        const genres = [currentGenre , ...getGenres()]; 
        this.setState({movies: getMovies() , genres , currentGenre });
    }
    handleDelete = movie => {
      const movies =  this.state.movies.filter(m=> m._id !== movie._id);
      this.setState({movies});
    }

    handleDelete = movie => {
        const movies =  this.state.movies.filter(m=> m._id !== movie._id);
        this.setState({movies});
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
        return (
            <div className="row">  
                <div className="col-3">
                    <ListGroup  items={genres} selectedItem ={currentGenre}  onItemSelect={this.handleGenreSelect}  ></ListGroup>
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>
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