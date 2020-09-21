import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getMounts, getCharData } from '../actions/actions';
import MountList from '../components/MountList/MountList.jsx';
import mountsIndex from '../data/mounts';
import Loading from '../components/Loading.jsx';
import Form from '../components/Form/Form';
import Header from '../components/Header/Header.jsx';
import CharacterBar from '../components/CharacterBar/CharacterBar.jsx';

import '../components/MountList/style.css';


const Mounts = () => {
  const [ userMounts, setUserMounts ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ charData, setCharData ] = useState();
  const params = useParams();

  const { region, realm, character } = params;
  useEffect(() => {
    getMounts(region, realm, character).then(res => {
      setUserMounts(res);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
    getCharData(region, realm, character).then(res => {
      setCharData(res);
      setLoading(false);
    })
  },[
    region,
    realm,
    character,
    error,
  ]);
  
  let mountsArr = [];

  for(let mount in mountsIndex) {
    mountsArr.push(mountsIndex[mount]);
  }

  return (
    <Fragment>
      <Header>
        <Form />
        {!loading && !error ? <CharacterBar region={region} {...charData} /> : null}
      </Header>
      {/* TODO: Add 404 component */}
      { loading ? <Loading /> : error ? <p>Not found!</p> : <MountList mounts={mountsArr} userMounts={userMounts} /> }
    </Fragment>
  )
}

export default Mounts;