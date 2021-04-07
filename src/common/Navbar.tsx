import React from 'react';
import style from './styles/Navbar.module.css'
import {NavbarItem} from './NavbarItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {logOutTC} from '../redux/auth-reducer';
import logo from '../common/images/cards_logo.png'

export function Navbar() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType) => state.auth.isLoggedIn)
    const logout = () => dispatch(logOutTC())

    return (
        <nav className={style.navbar}>
            <img src={logo} className={style.logo} alt="logo"/>
            <div className={style.menu}>
                {!isLoggedIn && <NavbarItem to='/registration2' title='Registration'/>}
                <NavbarItem to='/profile' title='Profile'/>
                <NavbarItem to='/set-new-password' title='Password'/>
                <NavbarItem to='/recover' title='Recover Pass'/>
                <NavbarItem to='/packs' title='Packs'/>
                <NavbarItem to='/cards' title='Cards'/>
                {isLoggedIn
                    ? <button className={style.logoutButton} onClick={logout}>Logout</button>
                    : <span className={style.logoutButton}><NavbarItem to='/login' title='Login'/></span>
                }
            </div>
        </nav>
    )
}