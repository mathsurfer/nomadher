import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { Container, Header, Content, Button, Text } from 'native-base';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { RkButton, RkTextInput } from 'react-native-ui-kitten';
import { Constants, Facebook, Google,Expo } from 'expo';

import style from './style';
const FACEBOOK_APP_ID = '371838250023467';

//the database configuration
let config = {
  apiKey: 'AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs',
  authDomain: 'nomadherdb.firebaseapp.com',
  databaseURL: 'https://nomadherdb.firebaseio.com',
  projectId: 'nomadherdb',
  storageBucket: 'nomadherdb.appspot.com',
  messagingSenderId: '409543702217',
};


//check if the Fireabse  app is already initialized 
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


//Retrieve the Firebase DB
export const db = firebase.database();


//Retrieve the current user
const auth = firebase.auth();






//Define form
const Form = t.form.Form;


//Define User data structure
const User = t.struct({
  username: t.String,
  password: t.String,
});



//Forms style
const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: '#2980b9',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      marginHorizontal: 20,
    },
    error: {
      color: '#c0392b',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      marginHorizontal: 20,
    },
  },
  textbox: {
    notEditable: {
      color: '#ccc',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      underlineColorAndroid: '#fff',
    },
    normal: {
      color: '#ffffff',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      underlineColorAndroid: '#fff',
    },
    error: {
      color: '#ffffff',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      underlineColorAndroid: '#fff',
      borderColor: '#c0392b',
      borderWidth: 2,
      borderRadius: 5,
    },
  },
};



export default class SignInScreen extends React.Component {
  /*********************************************** */
constructor(props) {
    super(props);
  }
  

  //Initialize the states
  state = {
    logInStatus: 'signed out',
    errorMessage: 'none',
    session: null,
  };

  
  
  componentWillMount() {}
  
//Function that logs you in or signs you up via facebook
  handleFacebookButton = async () => {
    


//Asynchronous, persistent, key-value storage system that is global to the app.Here we fetch global parameter
    const nom = await AsyncStorage.getItem('userToken');



//Define the facebook login permission: here we allow the app to fetch user profile data
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APP_ID,
      {
        permissions: ['public_profile'],
      }
    );
/*const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APP_ID,
      {
        permissions: ['public_profile'],
      }
);*/

    //If the login/signup is successful
    if (type === 'success') {



//make a request to Facebook API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );


      //Retrieve data in JSON form
      const profile = await response.json();


//Use AsyncStrorage to change global parameter
      await AsyncStorage.setItem('userToken', profile.name);

      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        console.log(error.message);
      });

    

     
      //auth.onAuthStateChanged(user => {
        const itemsRefo = firebase
          .database()
          .ref('users/')
          .orderByChild('name')
          .equalTo(firebase.auth().currentUser.displayName)
          .once('value', snapshot => {
            const userData = snapshot.val();

            //If user account is already created
            if (userData !== null) {
              console.log('exists!', userData);
            } 
            
            //If user signs up for the first time
            else {

              //Insert user data into DB
              db.ref('/users').push({
                address: '',
                email: profile.email,
                name:  profile.name,
                pic: 'firebase.auth().currentUser.photoURL',
                surname: ' ',
                current_place: '',
                bio: ' ',
              });
              console.log('Created');
            }
          });

        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            //return firebase.auth().signInWithEmailAndPassword(email, password);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    //  });

     

      console.log('Logged ! :)');




      console.log(firebase.auth().currentUser.email);
    }

    //Redirect to Home Page
    this.props.navigation.navigate('App');
  };




//Google Authentication (in progress...)
  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId:
          '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId:
          '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      switch (type) {
        case 'success': {
          Alert.alert('Logged in!', `Hi ${user.name}!`);

          break;
        }
        case 'cancel': {
          Alert.alert('Cancelled!', 'Login was cancelled!');
          break;
        }
        default: {
          Alert.alert('Oops!', 'Login failed!');
        }
      }
    } catch (e) {
      Alert.alert('Oops!', 'Login failed!');
    }
  };

  


  //Page title
  static navigationOptions = {
    title: 'Connexion',
  };





  render() {


    //go to another screen, figures out the action it needs to take to do it
    const { navigate } = this.props.navigation;


    //Test is user authentication is successful
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('Logged in!!! yay');
        console.log(user);
        navigate('App');
      } else {
        // No user is signed in.
        console.log('Logged out');
      }
    });

    return (
      <View style={style.auth_flow.containerAuth}>
        <View style={{ alignItems: 'center', height: 120 }} />

        <View underlineColorAndroid={'transparent'}>
          <Button
            rounded
            block
            title="Facebook"
            onPress={this.handleFacebookButton}
            style={style.auth_flow.buttonStyle}>
            <Text>Facebook</Text>
          </Button>

          <Button
            rounded
            block
            title="Gmail"
            onPress={this.signUpAsync}
            style={style.auth_flow.buttonStyle2}>
            <Text>inscription</Text>
          </Button>
        </View>
      </View>
    );
  }

  
}
