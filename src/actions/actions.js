import axios from 'axios';
import config from '../config/config.js';

export const getToken = async () => {
   const accessToken =  await axios.get(`https://eu.battle.net/oauth/token`, {
    auth: {
      username: config.publicKey,
      password: config.secretKey,
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

  return {
    charClass: charData.data.character_class.name,
    guild: charData.data.guild.name,
    guildId: charData.data.guild.id,
    level: charData.data.level,
    avatar: avatarUrl,
    title: charData.data.active_title.name,
    activeSpec: charData.data.active_spec.name,
    name: charData.data.name,
    realm: charData.data.realm.name,
  }
}