import React, { Component } from 'react';
import Counter from './counter.component';
export class Counters extends Component {
    constructor()  {
        super();
        console.log('App-Constructor');
    }
    componentDidMount() {
        console.log('App-Mount');
    }
render() { 
    console.log('App-Render');
    const {onReset , counters , onIncrement , onDecrement , onDelete } = this.props;
        return ( <React.Fragment>
         <button onClick={onReset} className="btn btn-primary btn-sm m-2">Reset</button>
            { counters.map(counter => <Counter key={counter.id} onIncrement= {onIncrement} onDecrement= {onDecrement} onDelete= {onDelete} 
             counter={counter}  ></Counter>)}
        </React.Fragment> );
    }
}
export default Counters;