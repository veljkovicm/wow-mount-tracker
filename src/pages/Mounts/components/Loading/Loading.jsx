import React from 'react';

import './loading.css';

export default function Loading() {
  return (
    <div className="spinner-wrapper">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
