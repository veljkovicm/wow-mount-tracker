import React from 'react';
import PropTypes from 'prop-types';

import  './characterBar.css';
import classColors from './classColors';

const CharacterBar = (props) => {
  const {
    avatar,
    charClass,
    activeSpec,
    guild,
    level,
    title,
    name,
    realm,
    region,
  } = props;

  let guildLink;
  const locale = region === 'eu' ? 'gb' : 'us';

  const characterLink = `https://worldofwarcraft.com/en-${locale}/character/${region}/${realm}/${name}`;
  if (guild) {
    guildLink = `https://worldofwarcraft.com/en-${locale}/guild/${region}/${realm}/${guild.replace(" ", "-")}`;
  }

  return (
    <div className="character-bar">
      <div className="character-bar__avatar">
        <a
          href={characterLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={avatar}
            alt="character-avatar"
            width="50"
          />
        </a>
      </div>
      <div className="character-bar__name-wrapper">
        <a
          href={characterLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p
            className="character-bar__name"
            style={{ color: classColors[charClass.replace(" ", "")] }}
          >
            {name}
          </p>
        </a>
          <p className="character-bar__title" title={title}>{title}</p>
      </div>
      <div className="character-bar__info">
        <span>{level}</span>
        <span>{` ${activeSpec}  ${charClass} `}</span>
        <div className="character-bar__guild">
          {
            guild ?
              <a
                href={guildLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                ❮{guild}❯
              </a>
            :
              null
          }
          <span>{` ${realm}`}</span>
        </div>
      </div>
    </div>
  )
}

CharacterBar.propTypes = {
  avatar: PropTypes.string,
  charClass: PropTypes.string.isRequired,
  activeSpec: PropTypes.string.isRequired,
  guild: PropTypes.string,
  level: PropTypes.number.isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  realm: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}

export default CharacterBar;