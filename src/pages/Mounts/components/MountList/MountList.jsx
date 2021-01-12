import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MountItem,
  Pagination,
  Controls,
} from '../';

import './mountList.css';

const MountList = ({ mounts, userMounts }) => {
  const [ filter, setFilter ] = useState('collected');
  const [ active, setActive ] = useState('collected');
  const [ search, setSearch ] = useState('');
  const [ offset, setOffset ] = useState(0);
  const [ page, setPage ] = useState(1);

  let count = userMounts ? userMounts.length : 0;
  let filteredMounts = mounts;
  let maxPage = 1;
  const perPage = 24;

  mounts.map((mount) => {
    if(userMounts.includes(mount.id)) {
      return mount.collected = true;
    } else {
      return mount.uncollected = true;
    }
  })

  useEffect(() => {
    setOffset(0);
  }, [ filter ]);

  if(filter === null) {
    maxPage = Math.ceil(filteredMounts.length / perPage);
  } else {
    filteredMounts = mounts.filter(mount => mount[filter] === true);
    count = filteredMounts.length;
    maxPage = Math.ceil(filteredMounts.length / perPage);
  }

  useEffect(() => {
    maxPage = Math.ceil(filteredMounts.length / perPage);
  }, [ maxPage ])

  if(search) {
    const searchResult = filteredMounts.filter(
      mount => mount.name.toLowerCase().includes(search.toLowerCase())
    );
    filteredMounts = searchResult;
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

  const handlePage = (event) => {
    if(event.target.name === 'next') {
      setOffset(offset + perPage);
      setPage(page + 1)
    } else {
      setOffset(offset - perPage)
      setPage(page - 1)
    }
  }

  let pageMounts = filteredMounts.slice(offset, offset > 0 ? offset + perPage : perPage);
  filteredMounts = pageMounts;

  return (
    <div className="mounts">
        <Controls
          count={count}
          filter={filter}
          active={active}
          search={search}
          handleButton={handleButton}
          handleSearch={handleSearch}
        />
      <div className="mount-list__wrapper">
        <MountItem mounts={filteredMounts} />
        <div className="mount-list__pagination-wrapper">
          <Pagination
            offset={offset}
            handlePage={handlePage}
            maxPage={maxPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

MountList.propTypes = {
  mounts: PropTypes.array.isRequired,
  userMounts: PropTypes.array.isRequired,
}

export default MountList;