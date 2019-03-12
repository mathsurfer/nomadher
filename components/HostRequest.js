import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,StatusBar,ScrollView,CheckBox,TextInput,Picker,Button } from 'react-native';
import { Constants } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';

import { Card } from 'react-native-paper';

export default class App extends React.Component {
  




 //The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
  constructor(props) {
    super(props);
    this.state = {
      childfriendly: false,
      petfriendly: false,
      smokingfriendly: false,
      number: 0,
      description: '',
      publicTransport: '',
      additionalInformation: '',
      purpose: '',
     
    };
  }



  state = {
         data: null,
        numGuests:null,
    }



  render() {
  const data = [
      { value: 'for free in exchange for cultural/language exchange' },
      { value: 'to get extra income' },
    ];
  const  numGuests = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
      { value: 11 },
      { value: 12 },
      { value: 13 },
      { value: 14 },
      { value: 15 },
      { value: 16 },
      { value: 17 },
      { value: 18 },
      { value: 19 },
      { value: 20 },
    ];


const yesno= [
      { value: 'Yes' },
      { value: 'No' },
    ];
    return (
      <View>
       
      <View>

        <Dropdown
        label='Purpose of you hosting'
        data={data}
      />

       <Dropdown
        label='How many guests are you willing to host?'
        data={numGuests}
      />

<Dropdown
        label='Child friendly?'
        data={yesno}
      />

      <Dropdown
        label='Child friendly?'
        data={yesno}
      />

       <Dropdown
        label='Pet friendly?'
        data={yesno}
      />

       <Dropdown
        label='Smoking friendly?'
        data={yesno}
      />


<Text>Description of my place</Text>
 <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />

      <Text>Related Public Transport description</Text>
 <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />


      <Text>Additional Info</Text>
 <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />


<Button title='submit' onPress={() => this.saveBoard()} />


      </View></View>
    );
  }

}

const styles = StyleSheet.create({
 
});
