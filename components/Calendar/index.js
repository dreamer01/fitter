import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default class MyCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendarbox}>
          <Calendar
            style={{
              height: 350,
              width: "100%"
            }}
            theme={{
              textSectionTitleColor: "#fff",
              monthTextColor: "#00adf5",
              calendarBackground: "#3e3947",
              todayTextColor: "#00adf5",
              dayTextColor: "#fff"
            }}
            markedDates={{
              "2018-07-02": { selected: true, selectedColor: "#ff7961" }
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e3947"
  },
  calendarbox: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    width: "100%"
  },
  text: {
    fontFamily: "ElMessiri",
    color: "#8bffdd",
    fontSize: 32
  }
});
