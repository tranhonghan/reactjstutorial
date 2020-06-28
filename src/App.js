import React, { Component } from 'react';
import {BrowserRouter, Switch,  Route, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Common from './pages/Common'
import Customer from './pages/Customer'
import AdminCommon from './pages/admin/AdminCommon'
import UserList from './pages/admin/UserList';
import Order from './pages/admin/Order';
import {authentication} from './pages/authentication'

function App() {
  return (
    <BrowserRouter>
      <RouteWrapper exact path="/" component={Home} layout={Common}/>
      <RouteWrapper path="/customer" component={Customer} layout={Common}/>

      <PrivateRoute path="/admin" component={UserList} layout={AdminCommon}/>
      <RouteWrapper path="/order" component={Order} layout={AdminCommon}/>

      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </BrowserRouter>
  );
}

function RouteWrapper ({component: Component,  layout: Layout,  ...rest}) {
  return (
    <Route
      {...rest}
      render = {(props) => (
        <Layout {...props}>
          <Component {...props}/>
        </Layout>
      )}
    />
  )
}

function PrivateRoute({component: Component, layout: Layout, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => (
        authentication.isAuthentication() ?
        (<Layout {...props}>
          <Component {...props}/>
        </Layout>)
        :
        (<Redirect to="/login" />)
        )}
    />
  )
}

function PrivateRoute2({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => (
        authentication.isAuthentication() ?
        (<Component {...props}/>)
        :
        (<Redirect to="/login" />)
        )}
    />
  )
}

export default App;
