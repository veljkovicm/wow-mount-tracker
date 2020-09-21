import React, { useState } from 'react'
import './style.css';
const MountList = (props) => {
  let { mounts, userMounts } = props;

  // set default filter and active to 'collected'
  const [ filter, setFilter ] = useState();
  const [ active, setActive ] = useState('all');
  const [ search, setSearch ] = useState('');
  
  let count = userMounts.length;

  let filteredMounts = mounts;
  mounts.map((mount, i) => {
    if(userMounts.includes(mount.id)) {
      mount.collected = true;
    } else {
      mount.uncollected = true;
    }
  })
  // mounts = mounts.filter(mount => mount.uncollected);
  
  if(filter) {
    filteredMounts = mounts.filter(mount => mount[filter] === true);
    count = filteredMounts.length;
  }

  if(search) {
    filteredMounts = filteredMounts.filter(
      mount => mount.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  let markup = (
    filteredMounts.map((mount, i) => {
      return <div className={`mount-item ${mount.collected ? 'collected': ''}`} key={i}>
        <div
          className="mount-item-image"
          style={{
            backgroundImage:`url(https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${mount.creature_displays[0].id}.jpg)`
          }}
        >
        </div>
        { mount.faction ? <img src={`/${mount.faction.name}.png`} alt="faction-symbol" /> : null }
        <p>{mount.name}</p>
      </div>
    })
  )
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleButton = (event) => {
    setActive(event.target.name);
    if(event.target.name === 'collected' || event.target.name === 'uncollected') {
      setFilter(event.target.name);
    } else {
      setFilter(null);
    }
  }

  return (
    <div className="mounts">
      {/* Export controls to separate component */}
      {/* perc = ((pEarned/pPos) * 100).toFixed(3); */}
      <div className="controls-wrapper">
        <div className="filters-wrapper">
          <p>Count: {count}</p>
          <button onClick={handleButton} name="all" className={active === 'all' ? 'active' : ''}>All</button>
          <button onClick={handleButton} name="collected" className={active === 'collected' ? 'active' : ''}>Collected</button>
          <button onClick={handleButton} name="uncollected" className={active === 'uncollected' ? 'active' : ''}>Uncollected</button>
        </div>
        <div className="search-wrapper">
          <input type="text" name="search" value={search} onChange={handleSearch} placeholder="Mount name" />
        </div>
      </div>
      <div className="mount-list__wrapper">
        {markup}
      </div>
    </div>
  );
}

MountList.propTypes = {
  mounts: PropTypes.array.isRequired,
  userMounts: PropTypes.array.isRequired,
}

export default MountList;