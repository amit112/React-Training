import React, { Component } from 'react';

class TableHeader extends Component {
    onSortRaise = path => {
        const sortColumn = {...this.props.sortColumn};
         if(path === sortColumn.path) {
           sortColumn.order = sortColumn.order ==='asc' ? 'desc' : 'asc';
         } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
         }
         this.props.onSort(sortColumn);
    }
    renderSortIcon = column => {
const {sortColumn} = this.props;
        if(column.path !==  sortColumn.path)  return null; 
        else  {
            let classes = "fa fa-sort-";
            classes+=sortColumn.order
            return  <i className={classes}></i>
        }
        
    }
    render() { 
        const { columns  } = this.props;
        return ( <thead><tr>
        {columns.map(column =>   
        column.label ?  <th className="clickable" key={column.path} onClick= {()=> this.onSortRaise(column.path) }>{column.label} {this.renderSortIcon(column)}</th> : <th key={column.key}></th>
        )}
        </tr>
        </thead>);
    }
}
 
export default TableHeader;