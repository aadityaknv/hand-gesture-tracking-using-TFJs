import React, { Component } from "react";
import Websocket from "react-websocket";


class WebSocketComponent extends Component {
    constructor(props){
        super(props);
        this.state = { messages : [] }
      }
    
      componentDidMount(){
        // this is an "echo" websocket service
        this.connection = new WebSocket('ws://localhost:8080');
        // listen to onmessage event
        this.connection.onmessage = evt => { 
          // add the new message to state
            this.setState({
            messages : this.state.messages.concat([ evt.data ])
          })
        };
    
        // for testing purposes: sending to the echo service which will send it back back
        //make it a function to send data (array)
        setInterval( _ =>{
            this.connection.send("hello")
        }, 2000 )
      }
    
      render() {
        // slice(-5) gives us the five most recent messages
        return <ul>{ this.state.messages.slice(-5).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
      }
    };

export default WebSocketComponent;
