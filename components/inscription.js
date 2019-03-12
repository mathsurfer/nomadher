import React from 'react';
import { ActivityIndicator, AsyncStorage,TextInput, StatusBar, StyleSheet, View, Component,Label, Image} from 'react-native';
import t from 'tcomb-form-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import style from './style'


const Form = t.form.Form;

  const User = t.struct({
    pseudo: t.String,
    email: t.String,
    password: t.String,
  });


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
    }
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
      underlineColorAndroid:'#fff',
      borderRadius: 5,
    },
    normal: {
      color: '#ffffff',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      underlineColorAndroid:'#fff',
    },
    error: {
      color: '#ffffff',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      underlineColorAndroid:'#fff',
      borderColor: '#c0392b',
      borderWidth: 2,
      borderRadius: 5,
    },
  },
  datetext: {
     normal: {
      color: '#ffffff',
      backgroundColor: '#ffffff',
      placeholderColor:"#ffffff",
    },
    error: {
      color: 'red',
      backgroundColor: 'red',
    },
  },
  }


  var options = {
    auto: 'placeholders',
      i18n: {
        optional: '(optionel)',
        required: '',
        underlineColorAndroid: 'transparent',
      },
    fields: {
      pseudo: {
          editable : true,
          placeholder: 'Name',
          underlineColorAndroid: 'transparent',
        },
        password:{
          password: true,
          secureTextEntry: true,
          underlineColorAndroid:'transparent',
        },
      email: {
        email:true,
      },
      birthDate: {
        mode: 'date',  // display the Date field as a DatePickerAndroid
      },
    }
  }


  


export default class SignUpScreen extends React.Component {
 
//The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }


 static navigationOptions = {
    title: 'Inscription',
  };
  
  render() {
    return (
      <View style={style.auth_flow.containerAuth}>

        <Content>

        <View style={{alignItems: 'center', height: 120,}}>
          <Image source={{ uri: 'http://digital-innovation-experience.fr/images/uploads/DIXsmall-whiteblue.png' }} 
            style={{
              height: 80,
              width : 250,
              backgroundColor: '#151e27',
            }}  
          />
        </View>
       
        <Form
          underlineColorAndroid='transparent'
          ref={c => this._form = c} // assign a ref
          type={User}
          options={options}
          stylesheet={formStyles}
        />


        <Text style={{color: '#2980b9',
          fontSize: 18,
          marginBottom: 10,
          fontWeight: '600',
          marginHorizontal: 20,
          }}>
          Date d'Anniversaire (optionnel)
        </Text>

        <DatePicker
          style={{width: 350, height: 100,}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="01-10-2018"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: {
              backgroundColor: '#fff',
              marginHorizontal: 20,
              borderRadius: 50,
              height: 40,
              borderColor: '#ffffff',
              borderWidth: 1,
            },
            dateText : {
              color: '#151e27',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
          /> 

      
        <Button rounded block title="Inscription" onPress={this.signUpAsync} style={style.auth_flow.buttonStyle}>
            <Text>Inscription</Text>
        </Button>

        </Content>
      </View>
    );
  }

  signUpAsync = async () => {
    const value = this._form.getValue();// use that ref to get the form value
    console.log('value: ', value);
    if (value) {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
    }
  };
}