import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import logo from '../logo.svg';

const SiteHeader = () => {
  return (
    <div className="site-header">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
}

export default SiteHeader