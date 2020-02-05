import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
import SignUp from './Signup'
import Map from './Map'
import FileCatcher from './FileCatcher'
import * as serviceWorker from './serviceWorker';
import Xlsx from './xlsxtry'
import {
    BrowserRouter,
    Route,
    Switch,
    Link
  } from 'react-router-dom'
// import { Switch } from 'antd';
// ReactDOM.render(<App />, document.getElementById('root'));
const routing=(
    <BrowserRouter>
    <div>
        <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/map" component={Map}></Route>
        <Route exact path="/filecatcher"component={FileCatcher}></Route>
        </Switch>
    </div>
    </BrowserRouter>
)
ReactDOM.render(<Xlsx/>,document.getElementById('root'))
serviceWorker.unregister();
