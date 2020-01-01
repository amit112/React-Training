import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import  { getGenres} from '../services/genreService';
import  { getMovie, saveMovie} from '../services/movieService';
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
    populateGenres = async () => {
      const {data:genres} =await  getGenres();
        this.setState({genres});
    }
    populateMovies = async () => {
      const { match, history} = this.props;
      const movieId = match.params.id;
      if(movieId) {
      if(movieId === 'new') return; 
      try {
        const {data:movie} =  await getMovie(movieId);
        this.setState({data: this.mapToMovie(movie)}); 
      }
      catch(ex) {
        if(ex.response && ex.response.status === 404)  history.replace('/not-found');
      }
      }
    }
    componentDidMount = async () => {
      await this.populateGenres();
       await this.populateMovies();
        
    }
    mapToMovie = movie => {
        return {
            _id: movie._id, title: movie.title, genreId: movie.genre._id, numberInStock: movie.numberInStock,
             dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = async () => {
      const movie = {...this.state.data};
      const {data } =   await saveMovie(movie);
      if(data) this.props.history.push('/movies');
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





