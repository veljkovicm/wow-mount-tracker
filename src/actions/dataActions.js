import axios from 'axios';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sortData } from '../helpers/helpers.js';


import { getToken } from './actions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getRealms = async () => {
  const token = await getToken();
  const getEU = await axios.get(
    `https://eu.api.blizzard.com/data/wow/realm/index`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: 'dynamic-eu',
        locale: 'en_GB',
      }
    }
  )
  .catch(err => console.log(err));

  getEU.data.realms.map(realm => {
    realm.value = `${realm.slug}+eu`;
    delete realm.key;
  })

  const sortedEu = sortData(getEU.data.realms);

  const getUS = await axios.get(
    `https://us.api.blizzard.com/data/wow/realm/index`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: 'dynamic-us',
        locale: 'en_US',
      }
    }
  );
    
  getUS.data.realms.map(realm => {
    realm.value = `${realm.slug}+us`;
    delete realm.key;
  });

  const sortedUS = sortData(getUS.data.realms);

  const writeString = `
    export const realmsEU = ${JSON.stringify(sortedEU, null, 2)};
    \n export const realmsUS = ${JSON.stringify(sortedUS, null, 2)};\n
  `

  fs.writeFile(__dirname + '/realmsSortedSeparate.js', writeString, () => {});
}

// getRealms();

const getMountIndex = async () => {
  let mountsArr = [];
  const token = await getToken();
  const mounts = await axios.get(
    'https://eu.api.blizzard.com/data/wow/mount/index',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: 'static-eu',
        locale: 'en_GB',
      }
    }
    )
    .catch(err => console.log(err));

  mountsArr = mounts.data.mounts;

  fs.writeFile(__dirname + '/mounts.json', JSON.stringify(mounts.data.mounts, null, 2), () => {});
}
getMountIndex();

const getCreatureData = async () => {
  let creaturesArr = [];

  const token = await getToken();
  const fileData = JSON.parse(fs.readFileSync(__dirname + '/mounts.json', 'utf-8'));

  for(let mount in fileData) {
    await axios.get(
    `https://eu.api.blizzard.com/data/wow/mount/${fileData[mount].id}`,
    {
      params: {
        namespace: 'static-eu',
        locale: 'en_GB',
        access_token: token
      }
    })
    .then((res) => {
      creaturesArr.push(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  fs.writeFile(__dirname + '/creatures.json', JSON.stringify(creaturesArr, null, 2), () => {});
}

getCreatureData();
