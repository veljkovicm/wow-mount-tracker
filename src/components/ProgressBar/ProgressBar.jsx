import React from 'react';
import PropTypes from 'prop-types';
import './progressBar.css';

const ProgressBar = (props) => {
  const {
    collectedMounts,
    totalMounts
  } = props;

  const percentage = ((collectedMounts / totalMounts) * 100).toFixed();

  return (
    <div>
      <p className="progress-bar__label">Unique mounts collected</p>
      <div className="progress-bar__notice-wrapper">
        i
        <span className="progress-bar__notice">Counts toward the mount collection achievements.</span>
      </div>
      <div className="progress-bar__wrapper">
        <i>{collectedMounts} / {totalMounts}</i>
        <div className="progress-bar__filler" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  collectedMounts: PropTypes.number.isRequired,
  totalMounts: PropTypes.number.isRequired,
}


export default ProgressBar;