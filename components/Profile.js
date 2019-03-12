import React from 'react';
import { ActivityIndicator, AsyncStorage, TextInput, StatusBar, StyleSheet, View, ScrollView,Alert,FlatList,Image} from 'react-native';
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
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import style from './style';
import * as firebase from "firebase";
import Feed from './Feed';


//Connect to database
 let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };

 const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();



//Retrieve Posts 
let itemsRef = db.ref('/posts').orderByChild('id');

//Retrieve users
let refi =db.ref('/users').orderByChild('name');




export default class HomeScreen extends React.Component {
  


 //The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
constructor(props) {
  super(props);

  this.state = { items: [],name:'',user:[],isloaded:false};
}
async componentDidMount(){

//Get global parameters
const nom = await AsyncStorage.getItem('userToken');
  

  itemsRef.once('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
            this.setState({name:nom});
  this.setState({isloaded:true});
         });

//**** */Define a function to be called in componentdidmount AND in render
let refia =refi.equalTo(nom);
  refia.on('value', (snapshot) => {
            let data = snapshot.val();
            let user = Object.values(data);
            this.setState({user});
         });

}

static navigationOptions = {
    title: 'NomadHer',
  };





  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    Alert.alert(itemId);
    AsyncStorage.getItem('userToken')
  .then((token) => { 
   
  });
    return (
      <ScrollView>
     <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <FlatList
  data={this.state.user}
  renderItem={({item}) => <View>
  <Image
                  source={{ uri:item.pic }}
                  style={{ width: 100, height: 100, position: 'absolute',alignItems: 'center', borderRadius: 50 }}
                />
  
     <View
            style={{
              flex: 1,
              alignItems: 'center',
              // top:0,
              position: 'absolute',
              top: 150,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
           
            
            </View>
       <Text style={styles.infoText}>{item.name}</Text>
       <Text style={styles.infoText}>{item.pic}</Text>
           <Text style={styles.infoText}>{item.email}</Text>
         
      <View>
 
        <Text>description: {item.description}</Text>
        <Text>I host people for:{item.purpose}</Text>
         <Text>I can host up to: {item.numGuest} People</Text>
        <Text>Pet friendly:{item.petfriendly}</Text>
         <Text>Child Friendly: {item.childfriendly}</Text>
        <Text>Smoking friendly:{item.smokingfriendly}</Text>
        
</View>  
 </View>

 }
/></View>
        <View>
 <Content>
 
        
          <Button rounded block title="Deconnexion" onPress={this.signOutAsync} style={style.auth_flow.buttonStyle3}><Text>Deconnexion</Text></Button>
        </Content>
        </View>
      </ScrollView>
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