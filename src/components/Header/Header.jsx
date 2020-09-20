import React from 'react'
import { Link } from 'react-router-dom';
import './header.css';


export default function Header(props) {
  const { children } = props;

  return (
    <div className="header-bar">
      <div className="header-bar__logo">
        <Link to="/">
          <img src="/Shadowlands_Logo.png" alt="shadowlands-logo" />
        </Link>
      </div>
      {children}
    </div>
  )
}
