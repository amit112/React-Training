import React from 'react';

const Like = props => {
    let classes = 'fa fa-heart';
    classes += !props.liked ? '-o' : ''; 
    return ( <i className={classes} onClick={props.onClick} style = {{cursor : "pointer"}}></i>);
}
export default Like;