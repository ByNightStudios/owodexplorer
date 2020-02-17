import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import { Route, Switch, Link } from 'react-router-dom'
import Home from '../Home/Home';
import MainContentMenu from '../MainContentMenu/MainContentMenu';
import NotFound from '../Helper/NotFound';
import Contentful from '../Contentful';
import './Header.scss';

function Header(){

    const [current, setCurrent] = useState('home')

    useEffect(() => {
        let selectedCurrent = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

        selectedCurrent === 'diagram' 
        ?  setCurrent(selectedCurrent) 
        : ( selectedCurrent === "" ? setCurrent('home') : setCurrent('main_content') )
        
    })


    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
    }

    return(
        <header className='header'>
            <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
                <Menu.Item key="home">
                    <Icon type="home" />
                    <Link className='top-menu-item' to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key="main_content">
                    <Icon type="appstore" />
                    <Link className='top-menu-item' to='/main_content'>Vampire the Masquerade</Link>
                </Menu.Item>
                <Menu.Item key="diagram">
                    <Icon type="appstore" />
                    <Link className='top-menu-item' to='/diagram'>Werewolf the Apocalypse</Link>
                </Menu.Item>
            </Menu>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/main_content' component={MainContentMenu} />
              <Route path='/diagram' component={Contentful} />
              <Route exact path="*" component={NotFound} />
            </Switch>
        </header>
    )
}
export default Header