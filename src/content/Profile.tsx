import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {NavLink} from "react-router-dom";
import style from './styles/Profile.module.css'
import defaultAvatar from './images/default_avatar.png';

function Profile() {
    // const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    const auth = useSelector((state: RootStateType): any => state.auth)
    // const profile = useSelector((state: RootStateType): any => state.pageProfile)
// debugger
    let profileData = null


    if (isLoggedIn) {
        profileData = auth.profile.data
        // const [userName] = auth.profile.data

    }

    // debugger
    return (
        <div>
            <h1 className={style.profile}>
                Profile
            </h1>
            {
                isLoggedIn ?
                    <div className={style.profileData}>
                        {profileData.avatar ?
                            <div>
                            <img src={profileData.avatar} alt="" width="400" height="400" ></img>
                            <div className={style.avatar}>{profileData.avatar}</div>
                            </div>
                            : <img src={defaultAvatar} alt="" width="100" height="100"/>

                        }
                        <div className={style.name}>Name: {profileData.name}</div>
                        <div className={style.email}>email: {profileData.email}</div>
                        <div className={style.packsCount}>Public card packs
                            count: {profileData.publicCardPacksCount}</div>

                        {/*<div className={style.name}>{profile.data.name}</div>*/}
                        {/*<div className={style.name}>{userName}</div>*/}
                        <button>Log out</button>
                    </div>
                    : <div>
                        <div>You are not logged in</div>
                        <NavLink to={'/login'}>
                            <div>Sign in</div>
                        </NavLink>
                        <NavLink to={'/registration'}>
                            <div>Sign up</div>
                        </NavLink>
                    </div>
            }
        </div>
    )
}

export default Profile;
