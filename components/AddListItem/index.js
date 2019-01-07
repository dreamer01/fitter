import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Icon, Button } from "react-native-elements";

import { getId } from "../../utilities";
export default class AddListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeType: true,
      type: "workout",
      title: null,
      details: null
    };
    this.returnItem = this.returnItem.bind(this);
  }

  returnItem() {
    let itemObj = {
      id: getId(),
      type: this.state.type,
      title: this.state.title,
      details: this.state.details,
      status: false
    };
    this.props.addCard(itemObj);
  }

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.prompt}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Icon
              raised
              reverse={this.state.activeType}
              name="md-bicycle"
              type="ionicon"
              color="#8594D6"
              size={25}
              onPress={() =>
                this.setState({ type: "workout", activeType: true })
              }
            />

            <Icon
              raised
              reverse={!this.state.activeType}
              name="md-restaurant"
              type="ionicon"
              color="#8594D6"
              size={25}
              onPress={() => this.setState({ type: "diet", activeType: false })}
            />
          </View>

          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ title: text })}
            placeholder="Title"
            placeholderTextColor="#4b4e70"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ details: text })}
            placeholder="Details"
            placeholderTextColor="#4b4e70"
            underlineColorAndroid="transparent"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10
            }}
          >
            <Button
              buttonStyle={[styles.button, { backgroundColor: "#C3614B" }]}
              onPress={() => this.props.close()}
              title="Cancel"
            />

            <Button
              buttonStyle={[styles.button, { backgroundColor: "#96D581" }]}
              onPress={() => this.returnItem()}
              title="Add"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9D9F2"
  },
  prompt: {
    backgroundColor: "#202060",
    width: "85%",
    padding: 15,
    borderRadius: 5
  },
  textInput: {
    width: "90%",
    height: 50,
    fontSize: 20,
    fontFamily: "Quicksand",
    padding: 10,
    margin: 5,
    color: "#E9D9F2",
    borderBottomWidth: 1,
    borderColor: "#4b4e70"
  },
  button: {
    width: 100,
    padding: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 10
  }
});
