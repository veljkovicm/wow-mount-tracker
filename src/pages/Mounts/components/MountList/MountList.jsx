import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MountItem,
  ProgressBar,
} from '../';

import './style.css';

const MountList = (props) => {
  let { mounts, userMounts } = props;

  const [ filter, setFilter ] = useState('collected');
  const [ active, setActive ] = useState('collected');
  const [ search, setSearch ] = useState('');
  
  let count = userMounts.length;

  let filteredMounts = mounts;
  mounts.map((mount, i) => {
    if(userMounts.includes(mount.id)) {
      return mount.collected = true;
    } else {
      return mount.uncollected = true;
    }
  })
  
  if(filter) {
    filteredMounts = mounts.filter(mount => mount[filter] === true);
    count = filteredMounts.length;
  }

  if(search) {
    filteredMounts = filteredMounts.filter(
      mount => mount.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleButton = (event) => {
    setActive(event.target.name);
    if(event.target.name !== 'all') {
      setFilter(event.target.name);
    } else {
      setFilter(null);
    }
  }

  return (
    <div className="mounts">
      <div className="controls-wrapper">
        <div className="filters-wrapper">
          <p><b>Mounts:</b> {count} Mounts {filter === 'uncollected' ? 'Uncollected' : 'Collected'}</p>
          <button onClick={handleButton} name="all" className={active === 'all' ? 'active' : ''}>All</button>
          <button onClick={handleButton} name="collected" className={active === 'collected' ? 'active' : ''}>Collected</button>
          <button onClick={handleButton} name="uncollected" className={active === 'uncollected' ? 'active' : ''}>Uncollected</button>
        </div>
        <ProgressBar collectedMounts={userMounts.length} totalMounts={mounts.length} />
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
      <div className="mount-list__wrapper">
        <MountItem mounts={filteredMounts} />
      </div>
    </div>
  );
}

MountList.propTypes = {
  mounts: PropTypes.array.isRequired,
  userMounts: PropTypes.array.isRequired,
}

export default MountList;