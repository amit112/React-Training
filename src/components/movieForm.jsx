import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import  { getGenres} from '../services/fakeGenreService';
import  { getMovie, saveMovie} from '../services/fakeMovieService';
class MovieForm extends Form {
    state = {
        data: { _id: "", title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        errors: {},
        genres: [],
    }
    schema = {
        _id: Joi.string().allow(''),
        title: Joi.string()
          .required()
          .label("Title"),
        genreId: Joi.string()
          .required()
          .label("Genre"),
        numberInStock: Joi.number()
          .required()
          .min(0)
          .max(100)
          .label("Stock"),
        dailyRentalRate: Joi.number()
          .required()
          .min(0)
          .max(10)
          .label("Rate")
    }
    componentDidMount = () =>{
        const genres =  getGenres();
        this.setState({genres});
        const { match, history} = this.props;
        const movieId = match.params.id;
        if(movieId) {
        if(movieId === 'new') return; 
        const movie = getMovie(movieId);
        if(!movie) return history.replace('/not-found');
        this.setState({data: this.mapToMovie(movie)}); 
        }
        
    }
    mapToMovie = movie => {
        return {
            _id: movie._id, title: movie.title, genreId: movie.genre._id, numberInStock: movie.numberInStock,
             dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = () => {
      const movie = {...this.state.data};
      saveMovie(movie);
      this.props.history.push('/movies');
    }
    render() {
       const { genres} = this.state;
        return (<div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title', 'Title')}
                {this.renderSelect('genreId', 'Genre', genres)}
                {this.renderInput('numberInStock', 'Stock', 'number')}
                {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                {this.renderButton('Submit')}
            </form>
        </div>);
    }
}
export default MovieForm;





