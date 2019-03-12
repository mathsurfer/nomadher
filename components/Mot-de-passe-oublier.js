import React from 'react';
import { ActivityIndicator, AsyncStorage, TextInput, StatusBar, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import t from 'tcomb-form-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import style from './style'

const Form = t.form.Form;

  const User = t.struct({
    email: t.String,
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
}

var options = {
    auto: 'placeholders',
      i18n: {
        optional: '(optionel)',
        required: '',
        underlineColorAndroid: 'transparent',
      },
    fields: {
      email: {
        email:true,
      },
    }
  }



export default class forgottenPassewordScreen extends React.Component {
  static navigationOptions = {
    title: 'Mot de passe oublier',
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

          <Button rounded block title="Réinitialiser mot de passe" onPress={this.mdpOublierAsync} style={style.auth_flow.buttonStyle2}>
              <Text>Réinitialiser mot de passe</Text>
          </Button>
          
        </Content>

      </View>
    );
  }

  mdpOublierAsync = async () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if (value) {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AuthLoading');
    }
  };
}