import React from 'react';
import PropTypes from 'prop-types';

import './mountItem.css';

const MountItem = (props) => {
  const mounts = props.mounts;
  let markup = (
    mounts.map((mount, i) => {
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
  return markup
}

MountItem.propTypes = {
  mounts: PropTypes.array.isRequired,
}

export default MountItem;