import React, {useEffect} from 'react';
import style from './App.module.css';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Profile from './content/Profile/Profile';
import Registration from './content/Registration/Registration';
import {Navbar} from './common/Navbar';
import SuperInputsDemo from './content/SuperInputsDemo';
import LoginContainer from './content/Login/LoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import RecoverContainer from './content/Recover/RecoverContainer';
import NewPasswordContainer from './content/NewPassword/NewPasswordContainer';
import {setAuthTC} from './redux/auth-reducer';
import {RootStateType} from './redux/store';
import {Loader} from './common/loader/loader';
import RegistrationContainer from './content/Registration/RegistrationContainer';
import CardsPageContainer from './content/CardsPage/CardsPageContainer';

import PacksPageContainer from './content/PacksPage/PacksPageContainer';
import Page404 from "./content/Page404/Page404";
import LearnPageContainer from './content/LearnPage/LearnPageContainer';
export const DEV_MODE = true
export const DEFAULT_EMAIL = 'nya-admin@nya.nya'
export const DEFAULT_PASSWORD = '1qazxcvBG'

function App() {

    const dispatch = useDispatch()
    const appStatus = useSelector((state: RootStateType) => state.appState.status)

    useEffect(() => {
        dispatch(setAuthTC())
    }, [dispatch])

    return (
        <HashRouter>
            <div className="App">
                {appStatus === 'loading' && <Loader/>}
                <Navbar/>
                <div className={style.content}>
                    <Switch>
                        <Route exact path={'/'} render={() => <Profile/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        <Route path='/registration2' render={() => <RegistrationContainer/>}/>
                        <Route path='/profile' render={() => <Profile/>}/>
                        <Route path='/recover' render={() => <RecoverContainer/>}/>
                        <Route path='/set-new-password/:token?' render={() => <NewPasswordContainer/>}/>
                        <Route path='/packs/' render={() => <PacksPageContainer/>}/>
                        <Route path='/cards/:id?/:title?' render={() => <CardsPageContainer/>}/>
                        <Route path='/learn/:id?/:title?/:isMine?' render={() => <LearnPageContainer/>}/>
                        <Route path='/demo' render={() => <SuperInputsDemo/>}/>

                        <Route path={'/404'} render={() => <Page404/>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
