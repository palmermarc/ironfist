import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import logo from '../logo.svg';

const SiteHeader = () => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' >
      <img src={logo} className="App-logo" alt="logo" />
      <Link to={'/dashboard'}>
        <Menu.Item>
          <Icon name="dashboard" />
          Summary
        </Menu.Item>
      </Link>
      <Link to={'/members'}>
        <Menu.Item>
          <Icon name="list ul" />
          Roster
        </Menu.Item>
      </Link>
      <Link to={'/mplus'}>
        <Menu.Item>
          <Icon name="trophy" />
          Mythic+
        </Menu.Item>
      </Link>
      <Link to={'/ahead-of-the-curve'}>
        <Menu.Item>
          <Icon name="weight" />
          Ahead of the Curve
        </Menu.Item>
      </Link>
    </Sidebar>
  )
}

export default SiteHeader