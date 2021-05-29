import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import {Card, ListGroup, Button, Form, Alert} from 'react-bootstrap'
import firebase from 'firebase/app'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Feed from './Feed'
import ReactDOM from 'react-dom';
import App from '../App'

require('firebase/auth');
require('firebase/database');


var firebaseConfig = {
    apiKey: "AIzaSyC6bysAEkvs5x3tqxO5-DmsrNmjIL4X9Z8",
    authDomain: "thelema-855af.firebaseapp.com",
    databaseURL: "https://thelema-855af-default-rtdb.firebaseio.com",
    projectId: "thelema-855af",
    storageBucket: "thelema-855af.appspot.com",
    messagingSenderId: "884135292327",
    appId: "1:884135292327:web:5037ccb7471dd9be935a82"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }    

class Registrarme extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: "",
            nombreUsuario: "",
            correo: "",
            contraseña: "",
            contraseñaVerificada: "",
            show: false,
            setShow: false,
            mensaje: "",
            happy: false
        }

        

        this.state.invalidContraseña = false;
        this.state.invalidCorreo = false;

        this.contraseñaRef = React.createRef();
        this.callHappy = this.callHappy.bind(this);
        this.cambiarEstadoNombreUsuario = this.cambiarEstadoNombreUsuario.bind(this);
        this.cambiarEstadoCorreo = this.cambiarEstadoCorreo.bind(this);
        this.cambiarEstadoContraseña = this.cambiarEstadoContraseña.bind(this);
        this.cambiarEstadoContraseñaVerificada = this.cambiarEstadoContraseñaVerificada.bind(this);
        this.mostrarValores = this.mostrarValores.bind(this);
        this.AlertDismissibleExample = this.AlertDismissibleExample.bind(this);
        this.RegistrarUsuario = this.RegistrarUsuario.bind(this)

        var hiadix = firebase.database().ref().child("Usuarios");
        hiadix.on('value', snapshot => {
            console.log("Returned children val: "+snapshot.numChildren());
            this.setState({id: snapshot.numChildren()+1})
        });
    }

    AlertDismissibleExample() {
        if (this.state.show) {
          return (
            <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
              <Alert.Heading>Oops!, parece que ha sucedido un error</Alert.Heading>
              <p>
                {this.state.mensaje}
              </p>
            </Alert>
          );
        }
    }

    callHappy(){
        if(this.state.happy == true){
            console.log("I'M HAPPY");
            this.props.seter(this.state.id);
            this.props.handler();
        }else{

        }
    }

    cambiarEstadoNombreUsuario(e){
        this.setState({
            nombreUsuario: e.target.value,
        })
    }

    cambiarEstadoCorreo(e){
        this.setState({
            correo: e.target.value,
        })
    }

    cambiarEstadoContraseña(e){
        this.setState({
            contraseña: e.target.value,
        })
    }

    cambiarEstadoContraseñaVerificada(e){
        this.setState({
            contraseñaVerificada: e.target.value,
        })
    }

    mostrarValores(){

        if(this.state.contraseña === "" || this.state.contraseñaVerificada === ""){
            this.setState({
                show: true,
                mensaje: "Las contraseñas están vacías",
                invalidContraseña: true,
            })
            return;
        }
        if(this.state.contraseña !== this.state.contraseñaVerificada){
            this.setState({
                show: true,
                mensaje: "Las contraseñas no son iguales",
                invalidContraseña: true,
            })
            return;
        }

        this.RegistrarUsuario();

    }


    RegistrarUsuario(){
        var Usuario = Object();
        Usuario.id = this.state.id;
        Usuario.nombreUsuario = this.state.nombreUsuario;
        Usuario.correo = this.state.correo;
        Usuario.contraseña = this.state.contraseña;
        console.log("Se ha creado el usuario "+Usuario.nombreUsuario+" con id "+Usuario.id);
        console.log(Usuario);

        var users = firebase.database();
        var usuarioExistente = false;
        users.ref("/Usuarios").on('value', snapshot => {
            snapshot.forEach(item => {
                console.log("item: "+item.val().correo)
                if(item.val().correo == Usuario.correo){
                    console.log("Ya existe un usuario con correo similar");
                    usuarioExistente = true;
                    
                }
            })
        });

        if(usuarioExistente){
            this.setState({
                show: true,
                mensaje: "Ya hay un usuario registrado con ese correo",
                invalidCorreo: true
            })
            return;
        }else{
            firebase
            .database()
            .ref("Usuarios")
            .push(Usuario);
            localStorage.setItem("keyUser", this.state.id);
            this.setState({
                happy: true,
            })
            console.log("Value Seter: "+localStorage.getItem("keyUser"));
        }
        
    }

    render(props){
        return(
            <div style={{padding: '12px'}}>
                {this.AlertDismissibleExample()}
                {this.callHappy()}
                <Card style={{margin: '12px auto',maxWidth: '1200px'}}>
                    <Card.Header>Registrate</Card.Header>
                    <Card.Body>
                    <Form>
                    <Form.Group>
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control onChange={this.cambiarEstadoNombreUsuario.bind(this)} type="email" placeholder="Nombre de usuario" />
                        <Form.Text className="text-muted">
                        Recuerdalo muy bien!, con el iniciarás sesión
                        </Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control isInvalid={this.state.invalidCorreo} onChange={this.cambiarEstadoCorreo.bind(this)} type="email" placeholder="Correo Electronico" />
    
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control isInvalid={this.state.invalidContraseña} onChange={this.cambiarEstadoContraseña.bind(this)} type="password" placeholder="Contraseña" />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control isInvalid={this.state.invalidContraseña} onChange={this.cambiarEstadoContraseñaVerificada.bind(this)} type="password" placeholder="Verificar Contraseña" />
                        
                    </Form.Group>
                    <Button style={{width: '100%'}} onClick={this.mostrarValores} variant="primary">
                        Registrarme
                    </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default Registrarme;