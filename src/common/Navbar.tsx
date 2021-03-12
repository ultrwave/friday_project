import React from 'react';
import style from './styles/Navbar.module.css'
import {NavbarItem} from './NavbarItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {logOutTC} from '../redux/auth-reducer';

export function Navbar() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType) => state.auth.isLoggedIn)
    const logout = () => dispatch(logOutTC())

    return (
        <nav className={style.navbar}>
            {isLoggedIn
                ? <button onClick={logout}>Logout</button>
                : <NavbarItem to='/login' title='Login'/>
            }
            <NavbarItem to='/registration' title='Registration'/>
            <NavbarItem to='/profile' title='Profile'/>
            <NavbarItem to='/password' title='Password'/>
            <NavbarItem to='/recover' title='Recover'/>
            <NavbarItem to='/demo' title='Demo'/>
        </nav>
    )
}