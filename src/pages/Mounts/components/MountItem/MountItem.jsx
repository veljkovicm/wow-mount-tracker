import React from 'react';
import PropTypes from 'prop-types';

import './mountItem.css';

const MountItem = ({ mounts }) => {
  let markup = (
    mounts.map((mount, i) => {
      return <div className={`mount-item ${mount.collected ? 'collected': ''}`} key={mount.id}>
        <div
          className="mount-item__image"
          style={{
            backgroundImage:`url(https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${mount.creature_displays[0].id}.jpg)`
          }}
        />
        {
          mount.faction
            ?
              <img
                src={`/${mount.faction.name}.png`}
                alt="faction-symbol"
                className={`mount-item__faction-image ${mount.faction.name}`}
                />
            :
              null 
        }
        <p className="mount-item__name">{mount.name}</p>
      </div>
    })
  )
  return markup
}

MountItem.propTypes = {
  mounts: PropTypes.array.isRequired,
}

export default MountItem;