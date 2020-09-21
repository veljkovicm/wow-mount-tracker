import React from 'react'
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

  const locale = region === 'eu' ? 'gb' : 'us';

  const characterLink = `https://worldofwarcraft.com/en-${locale}/character/${region}/${realm}/${name}`;
  const guildLink = `https://worldofwarcraft.com/en-${locale}/guild/${region}/${realm}/${guild.replace(" ", "-")}`;

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
          <a
            href={guildLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            ❮{guild}❯
          </a>
          <span>{` ${realm}`}</span>
        </div>
      </div>
    </div>
  )
}

// PropTypes

export default CharacterBar;