import React from 'react';

import './loading.css';

export default function Loading() {
  return (
    <div className="spinner-wrapper">
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
