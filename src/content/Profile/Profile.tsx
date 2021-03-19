import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';
import style from '../styles/Profile.module.css'
import defaultAvatar from '../../common/images/default_avatar.png';
import {AuthProfileType, logOutTC} from '../../redux/auth-reducer';

function Profile() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const profileData = useSelector((state: RootStateType): AuthProfileType | null => state.auth.profile)

    const logoutHandler = () => dispatch(logOutTC())

    return (
        <div>
            <h1 className={style.profile}>
                Profile
            </h1>
            {
                isLoggedIn && profileData
                    ? <div className={style.profileData}>
                        {profileData.avatar ?
                            <div>
                            <img src={profileData.avatar} alt="" width="100"  height=""></img>
                            </div>
                            : <img src={defaultAvatar} alt="" width="100" height="100"/>
                        }
                        <div className={style.name}>Name: {profileData.name}</div>
                        <div className={style.email}>email: {profileData.email}</div>
                        <div className={style.packsCount}>Public card packs
                            count: {profileData.publicCardPacksCount}</div>

                        {/*<div className={style.name}>{profile.data.name}</div>*/}
                        {/*<div className={style.name}>{userName}</div>*/}
                        <button onClick={logoutHandler}>Log out</button>
                    </div>
                    : <Redirect to={'/login'}/>
            }
        </div>
    )
}

export default Profile;
