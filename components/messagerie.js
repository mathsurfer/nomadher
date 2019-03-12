import React, { Component } from 'react';
import { View, StyleSheet, Button,ActivityIndicator,Image,Text,Share,Clipboard,StatusBar,Alert,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import * as firebase from "firebase";


// You can import from local files
global.self = global;
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { List, ListItem,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';




const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();
let itemsRef = db.ref('/messages');

const Form = t.form.Form;
const Message = t.struct({
  content: t.String,

   
});



global.self = global;

var config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
};


   if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const auth = firebase.auth();


const Post = t.struct({
  content: t.String,

   
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'green',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    content: {
      error: 'Without a content  how are you going to post ?'
    },
    
   
  },
  stylesheet: formStyles,
};



export default class NewPost extends Component {

componentWillMount() {
	
	
	
   auth.onAuthStateChanged(user => {
       let itemsRef = firebase.database().ref('/users').orderByChild("email").equalTo(user.email);
      if (user == null) {
 //GO to Signup Page
            
	  }  });


   
   
   }

  handleSubmit = () => {
    
    const value = this._form.getValue();
     db.ref('/messages').push({
        text:value.content,
        userpic: firebase.auth().currentUser.pic,
        date:new Date().toLocaleString(),
        from:firebase.auth().currentUser.displayName,
       
    });
     Alert.alert("Posted Successfully!");
     
  }
  
  

 state = {
    image: null,
     content: null,
    uploading: false,
    
  };

  render() {

let {
      image
    } = this.state;


    return (
  
       <ScrollView >
 


 <Form 
          ref={c => this._form = c}
          value={this.state.form_values}
          type={Post} 
          options={options}
        />
 
        <Icon.Button
        backgroundColor="#84DC7A"
          title="Submit !"
          onPress={this.handleSubmit}>Submit !</Icon.Button>



           </ScrollView>
  
    );
  }


  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return(<Text>No image(If the screenshot is not visible,please try again)</Text>);
    }

    return (
      <View
        >
        <View>
       
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          image: uploadResult.location,
        //  content:getValue().content
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };


}




async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = { 
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
  //let  values = this.refs.form.getValue();
}


const styles = StyleSheet.create({
  
    
  
  
   
  
  
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
