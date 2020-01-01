import React from 'react';
import './App.css';
import { Movies} from './components/movies';
import { Route, Redirect, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <React.Fragment>
    <ToastContainer></ToastContainer>
    <NavBar></NavBar>
    <main className="container">
    <Switch>
    <Route path="/register"    component={RegisterForm}></Route>
    <Route path="/login"    component={LoginForm}></Route>
    <Route path="/movies/new"    component={MovieForm}></Route>
    <Route path="/movies/:id"    component={MovieForm}></Route>
    <Route path="/movies"    component={Movies}></Route>
    <Route path="/customers" component={Customers}></Route>
    <Route path="/rentals"   component={Rentals}></Route>
    <Route path="/not-found" component={NotFound}></Route>
    <Redirect from="/" exact to="/movies" ></Redirect>
    <Redirect  to="/not-found" ></Redirect>
    </Switch>
    </main>
    </React.Fragment>
  );
}
export default App;
