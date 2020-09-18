import axios from 'axios';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


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

  // TODO export sorting as helper function
  const sortedEU = getEU.data.realms.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));


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
    // realm.region = 'us';
    realm.value = `${realm.slug}+us`;
    delete realm.key;
  });
  // const sorted = realms.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

  const sortedUS = getUS.data.realms.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  const writeString = `export const realmsEU = ${JSON.stringify(sortedEU, null, 2)};\n export const realmsUS = ${JSON.stringify(sortedUS, null, 2)};\n`


  fs.writeFile(__dirname + '/realmsSortedSeparate.js', writeString, () => {});
}

getRealms();
let mountsArr = [];

const getMountIndex = async () => {
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
  // console.log(mounts);
  mountsArr = mounts.data.mounts;
  console.log(mountsArr.length);
  // fs.writeFile(__dirname + '/mounts.json', JSON.stringify(mounts.data.mounts, null, 2), () => {});
}
// getMountIndex();
// console.log('array',mountsArr);

// const loopThroughRealms = () => {
//   fs.readFile(__dirname + '/realmsEU.json', 'utf-8', (err, data) => {
//     if(err) { throw err; }
//     // console.log(data);
//     const parsed = JSON.parse(data);
//     const options = [];
//     parsed.map(realm => {
//       options.push({
//         label: realm.name,
//         region: realm.region,
//         value: realm.slug
//       })
//     });
//     console.log(options);
//   });
// }

// loopThroughRealms();


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
let creaturesArr = [];
const getCreatureData = async () => {
  const token = await getToken();
  const fileData = JSON.parse(fs.readFileSync(__dirname + '/mounts.json', 'utf-8'));
  // const fileData = await fs.readFileSync(__dirname + '/mounts.json', 'utf-8', (err, data) => {
  //   if(err) { throw err; }
  //   console.log('DATA',typeof data);
  //   const parsed = JSON.parse(data);
  //   // console.log('parsed', parsed);
  //   return data;
  // });
  let i = 0;
  // console.log(fileData);


  
  for(let mount in fileData) {
    await sleep(1000);
    console.log('mount ID',fileData[mount].id);
    await axios.get(
    `https://eu.api.blizzard.com/data/wow/mount/${fileData[mount].id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: 'static-8.3.7_35114-eu',
        locale: 'en_GB',
      }
    }
    ).then(res => {
      console.log(res.data);
      creaturesArr.push(res.data);
    })
    .catch(err => console.log(err));
  };
  fs.writeFile(__dirname + '/creatures.json', JSON.stringify(creaturesArr, null, 2), () => {});
}

// getCreatureData();

// const mountData = JSON.parse(fs.readFileSync(__dirname + '/mounts.json', 'utf-8'));
// const creatureData = JSON.parse(fs.readFileSync(__dirname + '/creatures.json', 'utf-8'));

// console.log('mount', mountData.length);
// console.log('creature', creatureData.length);

const mergeArrayObjects = (arr1,arr2) => {
  return arr1.map((item,i)=>{
    if(item.id === arr2[i].id){
      
      console.log('iterator', i);
      console.log('arr2[i].id',arr2[i].id);
         //merging two objects
      return Object.assign({},item,arr2[i])
    }
  })
}

// const allData = mergeArrayObjects(mountData, creatureData);

// console.log(allData);

// fs.writeFile(__dirname + '/merged.json', JSON.stringify(allData, null, 2), () => {});



// import { EU } from './realmsTEST.js';

// for (let realm in EU) {

//   console.log('REALM',EU[realm].name);
// }