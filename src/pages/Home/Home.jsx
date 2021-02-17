import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../components/Form/Form';

import './home.css';

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-container">
      <Form />
      <div className="home-link-container">
        <p>or</p>
        <button onClick={() => history.push('/mounts/eu/kazzak/tebra')}>Proceed with a predefined entry</button>
      </div>
    </div>
  )
}

export default Home;