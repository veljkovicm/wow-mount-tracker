import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { realmsEU, realmsUS } from '../../data/realmsSortedSeparate';

import '../../App.css';
import './form.css';
const Form = () => {
  const [ isFormValid, setIsFormValid ] = useState(false);
  const history = useHistory();


  const [ userData, setUserData ] = useState({
    region: '',
    realm: '',
    character: ''
  });

  useEffect(() => {
    setIsFormValid(Object.values(userData).every(e => (e !== null && e !== '')));
  }, [ userData ])

  const handleChange = (event) => {
    setUserData({
      ...userData,
      character: event.target.value
    });
  }

  const handleSelect = (value) => {
    setUserData({
      ...userData,
      region: value.split('-')[1],
      realm: value.split('-')[0],
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(isFormValid) {
      history.push(`/mounts/${userData.region}/${userData.realm}/${userData.character}`);
      history.go(0);
    }
  }
  const options = [
    {
        type: 'group',
        name: 'EU',
        items: [ ...realmsEU ],
    },
    {
        type: 'group',
        name: 'US',
        items: [ ...realmsUS ],
    },
];


  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <input type="text" name="character" placeholder="Character name" onChange={handleChange} value={userData.character} />
        <SelectSearch options={options} name="testname" search value="sv" onChange={handleSelect} name="realm" placeholder="Choose your realm" />
        <button type="submit" disabled={!isFormValid}>submit</button>
      </form>
    </div>
  )
}




export default Form;