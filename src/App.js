import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar.component';
import { Counters} from './components/counters.component';

export class App extends Component {
  state = {
    counters : [{id: 1, value:4},{id: 2, value:0},{id: 3, value:0},{id: 4, value:0}]
  }
handleReset = () => {
    let counters = [...this.state.counters];
    counters = counters.map( c=> { c.value = 0; return c; });
    this.setState({counters});

}
handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.findIndex(c=> c.id === counter.id);
    counters[index].value++;
    this.setState({counters});
}
handleDecrement = counter => {
  const counters = [...this.state.counters];
  const index = counters.findIndex(c=> c.id === counter.id);
  counters[index].value--;
  this.setState({counters});
}
handleDelete = counter => {
    debugger;
    let counters = [...this.state.counters];
    counters = counters.filter(c=> c.id !== counter.id);
    this.setState({counters})
}
  render() { 
    return ( <React.Fragment>
      <NavBar  totalCounters = {this.state.counters.filter(r=>r.value > 0).length}> </NavBar>
      <main className="container">
      <Counters counters= {this.state.counters} onReset={this.handleReset} onIncrement= {this.handleIncrement}
      onDecrement= {this.handleDecrement} 
       onDelete= {this.handleDelete}></Counters>
      </main>
      </React.Fragment> );
  }
}
export default App;