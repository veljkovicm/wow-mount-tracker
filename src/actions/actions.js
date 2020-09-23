import axios from 'axios';
// import config from '../config/config.js';

export const getToken = async () => {
   const accessToken =  await axios.get(`https://eu.battle.net/oauth/token`, {
    auth: {
      username: process.env.REACT_APP_PUBLIC_KEY,
      password: process.env.REACT_APP_SECRET_KEY,
    },
    params: {
      grant_type: 'client_credentials',
    },
  });
  return accessToken.data.access_token;
};


export const getMounts = async (region, realm, character) => {
  const token = await getToken();

  const mounts = await axios.get(
    `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${character}/collections/mounts`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: `profile-${region}`,
        locale: 'en_GB',
      }
    }
  );
  let mountIDsArray = [];

  const mountsArray = mounts.data.mounts;

  for(let mount in mountsArray) {
    mountIDsArray.push(mountsArray[mount].mount.id);
  }

  return mountIDsArray;
}

export const getAvatar = async (region, realm, character) => {
  const token = await getToken();

  const charMedia = await axios.get(
    `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${character}/character-media`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: `profile-${region}`,
        locale: 'en_GB',
      }
    }
  );
  return charMedia.data.avatar_url;
}

export const getCharData = async (region, realm, character) => {
  let guild, guildId, title;

  const token = await getToken();

  const charData = await axios.get(
    `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${character}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: `profile-${region}`,
        locale: 'en_GB',
      }
    }
  );
  const avatarUrl = await getAvatar(region, realm, character);


  if(charData.data.guild) {
    guild = charData.data.guild.name;
    guildId = charData.data.guild.id;
  }

  if(charData.data.active_title) {
    title = charData.data.active_title.name;
  }

  return {
    charClass: charData.data.character_class.name,
    guild: guild,
    guildId: guildId,
    level: charData.data.level,
    avatar: avatarUrl,
    title: title,
    activeSpec: charData.data.active_spec.name,
    name: charData.data.name,
    realm: charData.data.realm.name,
  }
}