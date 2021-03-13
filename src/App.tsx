import React, {useEffect} from 'react';
import style from './App.module.css';
import {HashRouter, Route} from 'react-router-dom';
import Profile from './content/Profile';
import Registration from './content/Registration';
import {Navbar} from './common/Navbar';
import SuperInputsDemo from './content/SuperInputsDemo';
import LoginContainer from './content/Login/LoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import RecoverContainer from './content/Recover/RecoverContainer';
import NewPasswordContainer from './content/NewPassword/NewPasswordContainer';
import {setAuthTC} from './redux/auth-reducer';
import {RootStateType} from './redux/store';
import {Loader} from './common/loader/loader';

function App() {

    const dispatch = useDispatch()
    const appStatus = useSelector((state: RootStateType) => state.appState.status)

    useEffect(() => {
        dispatch(setAuthTC())
    }, [])

    return (
        <HashRouter>
            <div className="App">
                {appStatus === 'loading' && <Loader/>}
                <Navbar/>
                <div className={style.content}>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/recover' render={() => <RecoverContainer/>}/>
                    <Route path='/password/:token?' render={() => <NewPasswordContainer/>}/>
                    <Route path='/demo' render={() => <SuperInputsDemo/>}/>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
