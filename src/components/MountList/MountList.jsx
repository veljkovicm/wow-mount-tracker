import React, { useState, Fragment } from 'react'
import './style.css';
const MountList = (props) => {
  let { mounts, userMounts } = props;

  const [ filter, setFilter ] = useState();
  const [ active, setActive ] = useState();
  
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



  let markup = (
    filteredMounts.map((mount, i) => {
      return <div className={`mount-item ${mount.collected ? 'collected': ''}`} key={i}>
        <div
          className="mount-item-image"
          style={{backgroundImage:`url(https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${mount.creature_displays[0].id}.jpg)`}}>
          </div>
          <p>{mount.name}</p>
      </div>
    })
  )

  const handleButton = (event) => {
    setActive(event.target.name);
    if(event.target.name === 'collected' || event.target.name === 'uncollected') {
      setFilter(event.target.name);
    } else {
      setFilter(null);
    }
  }

  return (
    <Fragment>
      <div className="controls-wrapper">
        <p>Count: {count}</p>
        <button onClick={handleButton} name="all" className={active === 'all' ? 'active' : ''}>all</button>
        <button onClick={handleButton} name="uncollected" className={active === 'uncollected' ? 'active' : ''}>uncollected</button>
        <button onClick={handleButton} name="collected" className={active === 'collected' ? 'active' : ''}>collected</button>
      </div>
      <div className="mount-list__wrapper">
        {markup}
      </div>
    </Fragment>
  );
}

// PropTypes

export default MountList;