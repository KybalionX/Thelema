import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {Nav, Navbar} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ingresar from './pages/Ingresar'
import Home from './pages/Home.js'
import Registrarme from './pages/Registrarme'
import ReactDOM from 'react-dom';
import UserFeed from './pages/UserFeed'
import userEvent from '@testing-library/user-event';

class App extends React.Component{

  constructor(props){
    super(props);
    //0 si es registro, 1 si se ha iniciado sesion
    
    this.state = {
      type: 0,
      userID: 0
    }

    this.cambioEstado = this.cambioEstado.bind(this);
    this.setRender = this.setRender.bind(this);
    this.setUserID = this.setUserID.bind(this)
    this.handler = this.handler.bind(this);

    if (localStorage.getItem("keyUser") > 0) {
      this.state.type=1
    }

  }

  cambioEstado(val){
    this.setState({
      type: val
    })
  }

  setUserID(val){
    this.setState({
      userID: val
    })
  }

  handler(){
    this.cambioEstado(1);
  }

  setRender(){
    if(this.state.type == 0){
      return (
        <div>
          <Router>
          <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Thelema</Navbar.Brand>
              <Nav style={{flex: 'auto', placeContent: "flex-end"}} className="mr-auto">
                <Button href="/Registrarme">Registrarme</Button>
                <Button variant="outline-primary" style={{color: "#FFFFFF", marginLeft: '8px'}} href="/ingresar">Ingresar</Button>
              </Nav>
          </Navbar>
           <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Registrarme"  component={() => <Registrarme seter={this.setUserID} handler={this.handler} />} />
              <Route exact path="/ingresar" component={Ingresar}/>
          </Switch>
        </Router>
        </div>
      )
    }else if(this.state.type == 1){
      return(
        <UserFeed />
      )
    }
  }

  render(){
    return this.setRender()
  }

	
};


export default App;