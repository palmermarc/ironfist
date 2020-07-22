import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react'
import logo from '../logo.svg';

const SiteHeader = () => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' >
      <img src={logo} className="App-logo" alt="logo" />
      <Menu.Item>
        <Icon name="dashboard" />
        Summary
      </Menu.Item>
      <Menu.Item>
        <Icon name="list ul" />
        Roster
      </Menu.Item>
      <Menu.Item>
        <Icon name="trophy" />
        Mythic+
      </Menu.Item>
      <Menu.Item>
        <Icon name="zoom" />
        Player Breakdown
      </Menu.Item>
    </Sidebar>
  )
}

export default SiteHeader