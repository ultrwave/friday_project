import React from 'react';
import style from './App.module.css';
import {HashRouter, Route} from 'react-router-dom';
import Password from './content/Password';
import Profile from './content/Profile';
import Recover from './content/Recover';
import Registration from './content/Registration';
import {Navbar} from './common/Navbar';
import LoginContainer from './content/Login/LoginContainer';

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Navbar/>
                <div className={style.content}>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/password' render={() => <Password/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/recover' render={() => <Recover/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
