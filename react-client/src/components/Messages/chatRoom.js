import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    }
    // this.props.roomid
  };
  
  componentDidMount() {
    // get messages, or filter messages from store
    this.socket = io();
    this.socket.on('message', (message) => {
      this.setState({
        messages: [...this.state.message, message]
      })
    })
  }

  handleSubmit() {
    // post message to database
    
    this.socket.to(this.props.roomid).emit('message', {
      // message object with room id
    })
  }

  render() {
    return (
      <View><Text>test</Text></View>
    )
  } 

}

  export default ChatRoom;