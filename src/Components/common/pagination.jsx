/* eslint-disable jsx-a11y/anchor-is-valid */
import React  from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
const Pagination = props => {
    const { pageSize , totalItems , currentPage , onPageChange} = props;
    const totalPages = Math.ceil(totalItems/pageSize);
    const pages = _.range(1,totalPages+1);
    return (
    <ul className="pagination pagination-sm"> {
        pages.map(page =>  (
        <li key={page} className={ page === currentPage ? "page-item active" : "page-item" }
          onClick = {() =>  onPageChange(page) }><a className="page-link">{page}</a>
        </li>))
    }
  </ul>);
}

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    totalItems : PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired ,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;