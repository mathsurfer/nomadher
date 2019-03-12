import React from 'react';
import { ActivityIndicator, AsyncStorage, TextInput, StatusBar, StyleSheet, View, ScrollView,Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Container, Content, Button, Text } from 'native-base';
import {
  Header,
  ThemeProvider,
  ListItem,
  List,
  Icon,
  CheckBox,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';
import {  createSwitchNavigator } from 'react-navigation';
import style from './style';
import * as firebase from "firebase";
import Feed from './Feed';
import { FontAwesome,
MaterialCommunityIcons,
Feather,
Ionicons,
MaterialIcons
} from "@expo/vector-icons";
import BottomMenu from './BottomMenu';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';




////the database configuration
 let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };

 const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();

//Retrieve posts
let itemsRef = db.ref('/posts').orderByChild('id');

//Retrieve users 
let refi =db.ref('/users').orderByChild('name');


export default class HomeScreen extends React.Component {


   //The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
constructor(props) {
  super(props);

  this.state = { items: []};
}


async componentDidMount(){


const nom = await AsyncStorage.getItem('userToken');
  

  itemsRef.once('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
            this.setState({name:nom});
  this.setState({isloaded:true});
         });

//Retrive information of the current user
let refia =refi.equalTo(firebase.auth().currentUser.displayName);
  refia.on('value', (snapshot) => {
            let data = snapshot.val();
            let user = Object.values(data);
            this.setState({user});
         });

}

renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
 

  static navigationOptions = {
    title: 'NomadHer',
  };

state={name:'',user:[],isloaded:false};



  render() {


     
    AsyncStorage.getItem('userToken')
  .then((token) => { 
  
  });
    return (
    <View><ScrollView>
     <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <Feed/>
        </View>

        <View>
 <Content><Text>{this.state.name}</Text><Button rounded block title="Deconnexion" onPress={this.signOutAsync} style={style.auth_flow.buttonStyle3}><Text>Deconnexion</Text></Button></Content></View></ScrollView><View></View></View>
    );
  }

  showMore = () => {
    this.props.navigation.navigate('Other');
  };

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}


const styles = StyleSheet.create({

header:{
flex: 1,
marginTop:0,

  }

});