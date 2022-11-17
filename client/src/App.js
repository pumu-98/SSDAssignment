import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FirstPage from './Components/FirstPage';
import AdminLogin from './Components/AdminLogin';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/home" component={Home}/>
      <Route path="/adminlogin" component={AdminLogin}/>
      <Route exact path="/" component={FirstPage}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/todos" roles={["worker","manager"]} component={Todos}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
    </Router>
  );
}

export default App;
