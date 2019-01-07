import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import { getDays } from "./utilities";
import Day from "../Day";

export default class Planner extends Component {
  constructor() {
    super();
    this.renderDays = this.renderDays.bind(this);
  }

  state = {
    days: getDays()
  };

  componentDidMount() {
    this.myScroll.scrollTo({
      x: Dimensions.get("window").width * (new Date().getDay() - 1),
      y: 0,
      animated: false
    });
  }

  renderDays(day, index) {
    return (
      <Day
        key={index}
        day={day.day}
        imageUrl={day.imageUrl}
        workout={day.workout}
        gotoRun={this.gotoRun}
      />
    );
  }

  gotoRun = () => {
    this.props.navigation.navigate("RunMap");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={ref => (this.myScroll = ref)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.days.map(this.renderDays)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e3947"
  }
});
