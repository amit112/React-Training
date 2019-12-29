import React, { Component} from 'react';
import './App.css';
import http from './services/httpService';
import Table from './Components/common/table';
import config from './config.json';
import{ ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = { posts:[],
    sortColumn: {path: 'title' , order: 'asc' },
  }
  handleDelete = async(post) => {
    const originalPosts = [ ...this.state.posts];
    const posts = [ ...this.state.posts];
    try {
      this.setState({posts: posts.filter(x=>x.id !== post.id)});
    const response = await http.delete('s'+ config.apiEndPoint + post.id, post);
    console.log(response);
    } catch (e) {
      if(e.response && e.response.status === 404) {
        toast('This post has already been deleted');
      }
      this.setState({posts: originalPosts});
    }
  }

  handleAdd = async() =>{
  const obj= {
  title: 'test amit',
  body: 'test amit',
  userId: 1
  };
  const {data: post} = await http.post(config.apiEndPoint,obj );
  const posts = [post, ...this.state.posts];
  this.setState({posts})
  }
  handleUpdate = async (post) => {
  const originalPosts = [ ...this.state.posts];
  const posts = [ ...this.state.posts];
  const index = posts.indexOf(post);
  post.title = "UPDATED";
  posts[index] = post
  try {
  this.setState({posts});
  const {data } = await http.put(config.apiEndPoint + post.id, post);
  console.log(data);
  } catch (e) {
  this.setState({posts: originalPosts});
  console.log(e);
  }
  }
  handleSort = sortColumn => {
  this.setState({sortColumn});
  }
  columns = [
  {label: "Title", path :"title", },
  { key:'Update' , content : post => {
  return <button onClick={()=> this.handleUpdate(post) } className="btn btn-info btn-sm">Update</button> }},
  {key:'Delete', content : post => {
  return <button onClick={()=> this.handleDelete(post) } className="btn btn-danger btn-sm">Delete</button> }},
  ]
  render() { 
      const { posts  , sortColumn  } = this.state;
      return ( 
      <div className="container">
      <ToastContainer></ToastContainer>
      <button  onClick={this.handleAdd} className="btn btn-primary" style={{margin:20}}>Add</button>
      <Table data={posts} onSort={this.handleSort}  sortColumn={sortColumn} columns= {this.columns}></Table>
      </div>  );
  }
  componentDidMount = async () =>{
  const {data:posts} = await http.get(config.apiEndPoint);
  this.setState({posts})
  }
}


export default App;
