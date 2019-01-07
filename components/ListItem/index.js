import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";

export default class ListCard extends Component {
  render() {
    var icon =
      this.props.type == "diet"
        ? require("../../assets/images/diet.png")
        : require("../../assets/images/workout.png");

    const bgColor = this.props.status ? "#bfffb3" : "#6c93d1";
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.icon}>
          <Image style={{ width: 40, height: 40 }} source={icon} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}> {this.props.title} </Text>
          <Text style={styles.details}> {this.props.details} </Text>
        </View>
        <View style={styles.checkboxView}>
          <Switch
            value={this.props.status}
            onValueChange={() =>
              this.props.updateStatus({
                id: this.props.id,
                status: this.props.status
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderRadius: 4
  },
  icon: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 2,
    borderColor: "#435984"
  },
  content: {
    flex: 1,
    padding: 3
  },
  title: {
    fontFamily: "Quicksand",
    fontSize: 14
  },
  details: {
    fontFamily: "Quicksand",
    fontSize: 12
  },
  checkboxView: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
