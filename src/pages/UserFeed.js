import React from "react";
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import firebase from "firebase/app";

require("firebase/auth");
require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyC6bysAEkvs5x3tqxO5-DmsrNmjIL4X9Z8",
  authDomain: "thelema-855af.firebaseapp.com",
  databaseURL: "https://thelema-855af-default-rtdb.firebaseio.com",
  projectId: "thelema-855af",
  storageBucket: "thelema-855af.appspot.com",
  messagingSenderId: "884135292327",
  appId: "1:884135292327:web:5037ccb7471dd9be935a82",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      data: 0,
      main:0,
      tarea: "",
      key: localStorage.getItem("keyUser"),
    };

    this.agregarTarea = this.agregarTarea.bind(this);
    this.cambiarTarea = this.cambiarTarea.bind(this);

    console.log("Estamos buscando la key: "+this.state.key)
    
    firebase.database().ref('Usuarios/').orderByChild('id').on('value', snapshot => {
      let items = snapshot.val()
      Object.values(items).map(i => {
        if (i.id==this.state.key){
          console.log("Encontre al usuario "+i.nombreUsuario+" con id: "+i.id)
          this.state.userID = i.id;
          
          var queue = i.queue

          this.setState({data: queue})


          console.log(queue)
          

          for (let x in queue){
            console.log("que:"+queue[x])
          }
          
          
        }
      })
  })

  }

  cambiarTarea(e){
    this.setState({
        tarea: e.target.value,
    })
  }

  

  agregarTarea(){

    var mID = this.state.userID
    var mKey = this.state.key
    var mTarea= this.state.tarea
      firebase.database().ref('Usuarios').orderByChild('id').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snap) {

          if(snap.val().id == mKey){
            snap.child('queue').ref.push(mTarea);
          }

        });
        
      });
  }

  render() {

    var rows = [];

    for (let x in this.state.data){
      rows.push(<p>{this.state.data[x]}</p>)
    }


    return (
      
      <div>
        Hello


    <InputGroup size="sm" className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl onChange={this.cambiarTarea.bind(this)} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
  </InputGroup>

  <Button onClick={this.agregarTarea}>Ingresar</Button>

  <tbody>{rows}</tbody>

      </div>
    );
  }
}

export default UserFeed;
