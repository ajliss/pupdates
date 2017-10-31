import React from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { ListItem } from "react-native-elements";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ChatRoom from './chatRoom.js';
import * as chatRoomActions from '../../actions/ChatRooms/chatRoomActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class ChatList extends React.Component {
  static navigationOptions = {
    title: 'Chats',
    // drawerLabel: 'Chat',
    // drawerIcon: ({tintColor}) => {
    //   return (
    //     <MaterialIcons
    //       name="chat"
    //       size={24}
    //       style={{color: tintColor}}
    //     >
    //     </MaterialIcons>
    //   );
    // }
  }
  constructor(props) {
    super(props);
  };

  componentDidMount(){
    this.props.actions.getRooms(this.props.uid);
  }

  render() {

    return (
      <View>
        <FlatList
          data={this.props.rooms}
          renderItem={({item}) =>
          <TouchableHighlight
          underlayColor='rgba(192,192,192,0.6)'
        >
        <View>
          <ListItem
          onPress={() =>
            // this.props.navigation.navigate('ChatRoom', item)
            this.props.navigate('ChatRoom', {title: 'test'})
          }
            title={`${item.partner}`}
            id={item._id}
          />
          </View>
          </TouchableHighlight>
          }
        />
        <View>
          {/* <MaterialIcons
              name="menu"
              size={24}
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons> */}
        </View>
      </View>
    )
  };
}

// add rooms to state
const state = (store) => {
  return {
    rooms: store.Rooms.rooms,
    uid: store.Owners.user._id,    
  }
}

const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatRoomActions, dispatch),
  }
};

export default connect(state, chatDispatch)(ChatList);