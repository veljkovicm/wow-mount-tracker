import axios from 'axios';
// import config from '../config/config.js';

export const getToken = async () => {
    const accessToken =  await axios.post(`https://eu.battle.net/oauth/token`, {}, {
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

  const userMounts = await axios.get(
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

  const mountIDsArray = userMounts.data.mounts.map((mount) => mount.mount.id);

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

  return charMedia.data.assets[0].value;
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
    guildId: guildId,
    level: charData.data.level,
    avatar: avatarUrl,
    activeSpec: charData.data.active_spec.name,
    name: charData.data.name,
    realm: charData.data.realm.name,
    guild,
    title,
  }
}