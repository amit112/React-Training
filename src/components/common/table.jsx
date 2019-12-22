import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';

export const Table = ({columns, onSort ,sortColumn ,data }) => {
        return (  
            <table className="table">
            <TableHeader columns= {columns} onSort= {onSort } sortColumn= {sortColumn}></TableHeader>
              <TableBody data={data} columns={columns}></TableBody>
                </table>
        );
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
     onSort: PropTypes.func.isRequired, 
     sortColumn: PropTypes.object.isRequired,
     data: PropTypes.array.isRequired, 
}

export default Table;