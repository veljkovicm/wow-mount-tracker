import React  from 'react';
import PropTypes from 'prop-types';

 const Pagination = (props) => {
   const {
    offset,
    handlePage,
    maxPage,
    page,
   } = props;

  return (
    <div className="mount-list__pagination-wrapper">
      <button onClick={handlePage} name="previous" disabled={offset <= 0}>previous</button>
      <button onClick={handlePage} name="next" disabled={page >= maxPage}>next</button>
    </div>
  )
}

Pagination.propTypes = {
  offset: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
}

export default Pagination;