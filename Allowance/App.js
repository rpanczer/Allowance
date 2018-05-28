import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends React.Component {
  state = {
    allowance: 40.00,
    price: null
  }

  submit = () => {
    const {
      allowance,
      price,
    } = this.state

    this.setState({allowance: allowance - price})
  }

  render() {
    const {
      allowance
    } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.TextAppName}>Allowance</Text>
        <Text>Simple budgeting.</Text>
        <Text style={styles.TextAllowance}>${allowance.toFixed(2)}</Text>
        <TextInput 
          style={styles.TextInputPrice}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={value => this.setState({price: value})}
          placeholder="$0.00"
          value={this.state.price}
        />
        <TextInput 
          style={styles.TextInputChargeDesc}
          textAlign="center"
          placeholder="Item Description"
        />
        <Button 
          style={styles.ButtonSubmit}
          onPress={this.submit}
          title="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonSubmit: {
    backgroundColor: "black",
  },
  TextAppName: {
    fontSize: 40,
    fontWeight: "800",
  },
  TextAllowance: {
    fontSize: 20,
    fontWeight: "500",
    color: "green"
  },
  TextInputPrice: {
    width: "20%"
  }, 
  TextInputChargeDesc: {

    width: "75%"
  }
});
