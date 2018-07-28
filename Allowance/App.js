import React from 'react';
import { Button, Picker, StyleSheet, Text, View } from 'react-native';
import { TextInput, Slider } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-2';

export default class App extends React.Component {
  state = {
    allowance: 40,
    description: "coffee",
    price: 1
  }

  componentWillMount() {
    const db = SQLite.openDatabase('allowance.db', '1.0', '', 1);

    db.transaction(function (txn) {
      txn.executeSql('CREATE TABLE IF NOT EXISTS Budget(id INTEGER PRIMARY KEY NOT NULL, description VARCHAR(30), price VARCHAR(5), current_allowance VARCHAR(5), datetime TEXT)', [])
    })
  }

  submit = () => {
    const {
      allowance,
      price,
    } = this.state

    this.setState({allowance: allowance - price}, this.save())
  }

  save = () => {
    const {
      allowance,
      description,
      price,
    } = this.state

    // let datetime = new Date()
    let datetime = 'testing 123'

    const db = SQLite.openDatabase('allowance.db', '1.0', '', 1);
    db.transaction(function (txn) {
      txn.executeSql('INSERT INTO Budget (description,price,current_allowance,datetime) VALUES ('+description+','+price+','+allowance+','+datetime+')')
    })
    console.log("saving...")
  }

  render() {
    const {
      allowance,
      description,
      price
    } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.TextAppName}>Allowance</Text>
        <Text style={styles.TextSubtitle}>Simple budgeting.</Text>
        <Text style={styles.TextAllowance}>${allowance}</Text>
        <Text style={styles.TextPrice}>I just paid ${price} for {description}</Text>
        <Slider
          onValueChange={value=>{
            let modifiedvalue = value.toFixed(0)
            this.setState({price: modifiedvalue})}}
          style={{width: "80%"}}
          minimumValue={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="red"
          maximumValue={100}
          thumbTintColor="red"
          
        />
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "coffee"})}>coffee</Text>
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "lunch"})}>lunch</Text>
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "dinner"})}>dinner</Text>
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "breakfast"})}>breakfast</Text>
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "amazon"})}>amazon</Text>
          <Text style={styles.TextDesc} onPress={()=>this.setState({description: "tea"})}>tea</Text>
          <Button 
            color="black"
            style={styles.ButtonSubmit}
            onPress={this.submit}
            title={"Submit"}
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
    color: "black",
    width: "50%"
  },
  TextAppName: {
    fontSize: 40,
    fontWeight: "800",
  },
  TextAllowance: {
    fontSize: 40,
    fontWeight: "500",
    color: "green"
  },
  TextDesc: {
    fontSize: 20,
    fontWeight: "500",
    color: "lightgrey"
  },
  TextPrice: {
    fontSize: 20,
    fontWeight: "500",
  },
  TextSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "lightgreen"
  },
  TextInputPrice: {
    width: "20%"
  }, 
  TextInputChargeDesc: {
    width: "75%"
  }

});