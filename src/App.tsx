import React from 'react';
import style from './App.module.css';
import {HashRouter, Route} from 'react-router-dom';
import Password from './content/Password';
import Profile from './content/Profile';
import Recover from './content/Recover/Recover';
import Registration from './content/Registration';
import {Navbar} from './common/Navbar';
import SuperInputsDemo from './content/SuperInputsDemo';
import LoginContainer from './content/Login/LoginContainer';
import {Provider} from 'react-redux';
import store from './redux/store';
import RecoverContainer from './content/Recover/RecoverContainer';
import NewPasswordContainer from './content/NewPassword/NewPasswordContainer';

function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
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
            </Provider>
        </HashRouter>
    );
}

export default App;
