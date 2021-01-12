import React from 'react';
import PropTypes from 'prop-types';

import './controls.css';

const Controls = (props) => {
  const {
    count,
    filter,
    active,
    search,
    handleSearch,
    handleButton,
  } = props;

  return (
    <div className="controls-wrapper">
      <div className="filters-wrapper">
        <p><b>Mounts:</b> {count} Mounts {filter === 'uncollected' ? 'Uncollected' : 'Collected'}</p>
        <button onClick={handleButton} name="all" className={active === 'all' ? 'active' : ''}>All</button>
        <button onClick={handleButton} name="collected" className={active === 'collected' ? 'active' : ''}>Collected</button>
        <button onClick={handleButton} name="uncollected" className={active === 'uncollected' ? 'active' : ''}>Uncollected</button>
      </div>
      <div className="search-wrapper">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Mount name"
        />
      </div>
    </div>
  )
}

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.string,
  handleButton: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  collectedMounts: PropTypes.number.isRequired,
  totalMounts: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
}

export default Controls;