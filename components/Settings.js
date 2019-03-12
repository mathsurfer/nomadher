import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import DocForm from 'react-cross-form';
// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-elements'; // Version can be specified in package.json
import TextInput from './TextInput';
import CheckBox from './CheckBox';
import ImageInput from './ImageInput';
import * as firebase from "firebase";
 let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };
const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();

const FORM_FIELDS = [
  {
    key: 'bio',
    label: 'About Me',
    required: true,
    component: TextInput,
    defaultValue:"Bio",
    placeholder: 'Type your bio...',
    validators: {
     // presence: { message: 'is required' },
      length: { minimum: 3 },
    },
  },
 
];




const FORM_FIELDS2 = [
  
  {
    key: 'currentplace',
    label: 'Current Place',
   // required: true,
    component: TextInput,
    placeholder: 'Type your current place...',
    validators: {
     // presence: { message: 'is required' },
      length: { minimum: 3 },
    },
  }
];



const FORM_FIELDS3 = [
 
 
 {
    key:"image",
    label:"Upload Profile Picture",
    component:ImageInput,
    placeholder:'Upload Image'
    //validator:{presence:{message:"is required"}}
  },
];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        listitems: [],
        userid:null,
        userpic:null,
        currentp:null,
        

      form: {
        bio: null,
        email: null,
         currentplace:null,
        image:null,
      },
      isFormValid: false,
      validateType: 'onFocus',
    };
  }



 componentDidMount(){
  var items = [];
  const Ref = db.ref('users/').orderByChild('email').equalTo(firebase.auth().currentUser.email);
  Ref.once("value", snapshot=>{
       snapshot.forEach((child)=>{
         items.push({key:child.child("name").val(), id:child.key});
         this.setState({userid:child.key, userpic:child.child("userpic").val(),
        currentp:child.child("current_place").val()})
       });
    this.setState({listitems:items})
  });
  }



  render() {
    console.log(this.state.listitems);
    return (
      <View style={styles.container}>
       
        <Card>
          <DocForm
            fields={FORM_FIELDS}
            data={this.state.form}
            onChange={({ key, updateData }) => {
              this.setState({ form: updateData });
             
            }}
            validateType={this.state.validateType}
            onValidateStateChanged={({ isValid }) => {
              this.setState({ isFormValid: isValid });
            }}
          />
          <Button
            disabled={!this.state.isFormValid}
            title={'Submit'}
            onPress={() => {alert(JSON.stringify(this.state.form.bio));  
            
  firebase.database().ref('users/'+this.state.userid).update({
      
            bio: JSON.stringify(this.state.form.bio)
           // current_place:"",

        });


            }}
          />

           <DocForm
            fields={FORM_FIELDS2}
            data={this.state.form}
            onChange={({ key, updateData }) => {
              this.setState({ form: updateData });
             
            }}
            validateType={this.state.validateType}
            onValidateStateChanged={({ isValid }) => {
              this.setState({ isFormValid: isValid });
            }}
          />
          <Button
            disabled={!this.state.isFormValid}
            title={'Submit'}
            onPress={() => {alert(JSON.stringify(this.state.form.currentplace));  
            
  firebase.database().ref('users/'+this.state.userid).update({
      
            current_place: JSON.stringify(this.state.form.currentplace)
           // current_place:"",

        });


            }}
          />

           <DocForm
            fields={FORM_FIELDS3}
            data={this.state.form}
            onChange={({ key, updateData }) => {
              this.setState({ form: updateData });
             
            }}
            validateType={this.state.validateType}
            onValidateStateChanged={({ isValid }) => {
              this.setState({ isFormValid: isValid });
            }}
          />
          <Button
            disabled={!this.state.isFormValid}
            title={'Submit'}
            onPress={() => {alert(JSON.stringify(this.state.form.image));  
            
  firebase.database().ref('users/'+this.state.userid).update({
      
            userpic: JSON.stringify(this.state.form.image)
           // current_place:"",

        });


            }}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  }
});
