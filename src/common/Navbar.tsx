import React from 'react';
import style from './styles/Navbar.module.css'
import {NavbarItem} from './NavbarItem';

export function Navbar() {
    return (
        <nav className={style.navbar}>
            <NavbarItem to='/login' title='Login'/>
            <NavbarItem to='/registration' title='Registration'/>
            <NavbarItem to='/profile' title='Profile'/>
            <NavbarItem to='/password' title='Password'/>
            <NavbarItem to='/recover' title='Recover'/>
            <NavbarItem to='/demo' title='Demo'/>
        </nav>
    )
}