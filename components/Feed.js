
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions,FlatList,Animated,Button} from 'react-native';
import { Constants, AppLoading } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from "firebase";
import PropTypes from 'prop-types';
 import {
  Header,
  ThemeProvider,
  ListItem,
  Icon,
  CheckBox,
  TextInput,
} from 'react-native-elements';

import { FontAwesome,
MaterialCommunityIcons,
Feather,
Ionicons,
MaterialIcons
} from "@expo/vector-icons"



//Firebase Database parameters
 let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };


//Retrieve Database
 const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();
 


 //A Reference represents a specific location in your Database and can be used for reading or writing data to that Database location.
let itemsRef = db.ref('/posts').orderByChild('id');


 
export default class List extends Component {
 
   constructor(props) {
    super(props);
    this.state = {
         items: []
    };
  }
 


//Retireve All the posts
    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
    
    render() {

        return (

         <View style={styles.container}>
         
                {
                    this.state.items.length > 0 //If there are posts
                    ? <FlatList
  data={this.state.items}
  //Deals with each element at a time
  renderItem={({item}) => <View>
   <Image style={styles.image} source={{ uri: item.image }}  
   />
  <View style={styles.info}>
       <Image source={{ uri: item.userpic }}/><Text style={styles.infoText}>{item.by}</Text><Text style={styles.infoText}>{item.content}</Text>
              <Button rounded block title="Comment" 
              // onPress={   this.props.navigation.navigate('CommentSection')} 
                />
     </View></View>}
/>

//Return "no item"
                    :<Text>No items</Text>}
            </View>
        );
    }
} 
class ItemComponent extends Component {
 
  static propTypes = {
      items: PropTypes.array.isRequired
  };
 
  render() {
    return (
      <View >
    
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                <Image style={styles.image} source={{ uri: item.image }} />
                      <View style={styles.info}><Text style={styles.itemtext_}>{item.by}</Text></View>
                </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
   
    itemtext_: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
 
});


