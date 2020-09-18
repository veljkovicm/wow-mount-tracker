import axios from 'axios';
import config from '../config/config';

export const getToken = async () => {
   const accessToken =  await axios.get(`https://eu.battle.net/oauth/token`, {
    auth: {
      username: config.publicKey,
      password: config.secretKey,
    },
    headers: {
      'User-Agent': `Node.js/${process.versions.node} Blizzard.js/1.0.0`,
    },
    params: {
      grant_type: 'client_credentials',
    },
  });
  return accessToken.data.access_token;
};


export const getMounts = async (region = 'eu', realm = 'kazzak', character = 'gilipter') => {
  const token = await getToken();
  console.log('token', token);
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
  
  // fs.writeFile('mounts.txt', JSON.stringify(mounts.data.mounts), () => {});
  // console.log(JSON.stringify('mounts',mounts.data.mounts));
  // console.log('actions.js',mounts.data.mounts);
  const mountsArray = mounts.data.mounts;
  for(let mount in mountsArray) {
    mountIDsArray.push(mountsArray[mount].mount.id);
  }

  // console.log('mountIDsArray',mountIDsArray);
  
  
  return mountIDsArray;
}