import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react'
import logo from '../logo.svg';

const SiteHeader = () => {
  const [activeItem, visible, setVisible] = React.useState(false)

  const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' >
      <img src={logo} className="App-logo" alt="logo" />
      <Menu.Item active={activeItem === 'roster'}>
        <Icon name="trophy" />
        Summary
      </Menu.Item>
      <Menu.Item>
        <Icon name="meh outline" />
        Roster
      </Menu.Item>
      <Menu.Item>
        <Icon name="plus square outline" />
        Mythic+
      </Menu.Item>
      <Menu.Item>
        <Icon name="newspaper outline" />
        Player Breakdown
      </Menu.Item>
    </Sidebar>
  )
}

export default SiteHeader