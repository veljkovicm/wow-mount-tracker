import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getMounts } from '../actions/actions';
import MountList from '../components/MountList/MountList.jsx';
import mountsIndex from '../data/merged';
import Loading from '../components/Loading.jsx';
import Form from '../components/Form/Form';
import Header from '../components/Header/Header.jsx';

import '../components/MountList/style.css';


const Mounts = () => {
  const [ userMounts, setUserMounts ] = useState();
  const [ loading, setLoading ] = useState(true);
  const params = useParams();

  const { region, realm, character } = params;

  useEffect(() => {
    getMounts(region, realm, character).then(res => {
      console.log('CALLED');
      setUserMounts(res);
      setLoading(false);
    });
  },[region, realm, character]);
  
  let mountsArr = [];

  for(let mount in mountsIndex) {
    mountsArr.push(mountsIndex[mount]);
  }

  return (
    <Fragment>
      <Header>
        <Form />
      </Header>
      { loading ? <Loading /> : <MountList mounts={mountsArr} userMounts={userMounts} /> }
    </Fragment>
  )
}

export default Mounts;