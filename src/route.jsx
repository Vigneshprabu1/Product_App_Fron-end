import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import Cart from './components/cart';
import Order from './components/order';
import CheckOut from './components/checkout';
import UserDashBoard from './components/userdashboard';
import Signup from './components/signup';
import Login from './components/login';
import Men from './components/men';
import Women  from './components/women';
 const Routes =() => (
     <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/cart' component={Cart}></Route>
            <Route path='/order' component={Order}></Route>
            <Route path='/checkout' component={CheckOut}></Route>
            <Route path='/userdash' component={UserDashBoard}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/men' component={Men}/>
            <Route path='/women' component={Women}/>

        </Switch>
    </BrowserRouter>
 )

 export default Routes;
