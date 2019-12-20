import React, { Component } from 'react';
export class Counter extends Component {
    
    render() {

        const { onIncrement , counter , onDelete , onDecrement} = this.props;
        return (
            <div className="row">
                <div className="col-1">
                <span  className={this.getBadgeClasses()}>{this.formatCount()}</span>
                </div>
                <div className="col">
                <button onClick={()=> onIncrement(counter)} className="btn btn-secondary btn-sm">+</button>
                <button onClick={()=> onDecrement(counter)} disabled={this.props.counter.value === 0 ? 'disabled' : ''} className="btn btn-secondary btn-sm m-2">-</button>
                <button onClick={()=> onDelete(counter)} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        );
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value : count } = this.props.counter;
        return count === 0 ? <h6>Zero</h6> : count;
    }
    componentDidUpdate() {
        console.log('App-Update');
    }
    componentWillUnmount() {
        console.log('App-Unmount');
    }
}
export default Counter;