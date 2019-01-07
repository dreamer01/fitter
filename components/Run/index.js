import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import moment from "moment";
import haversine from "haversine";
import { Icon } from "react-native-elements";

import { mapOptions } from "./utilities";
import { addRun } from "../../Realm/Model";

const formatDuration = seconds =>
  moment
    .utc(moment.duration(seconds, "seconds").asMilliseconds())
    .format("mm:ss");

export default class RunMap extends Component {
  state = {
    mapRegion: null,
    positions: [],
    prevPosition: null,
    distance: 0,
    duration: 0,
    isRunning: false,
    isPause: false,
    isStop: false,
    speed: ""
  };

  currentPostion = this.currentPostion.bind(this);
  togglePause = this.togglePause.bind(this);
  stopRun = this.stopRun.bind(this);
  watchPosition = this.watchPosition.bind(this);

  componentDidMount() {
    this.currentPostion();
  }

  watchPosition() {
    const options = {
      enableHighAccuracy: true,
      distanceFilter: 2
    };
    //TODO:: Add this.updatePosition listener
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { positions, distance, prevPosition } = this.state;

        //Create the object to update this.state.mapRegion
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        };

        //Calculating Distance
        let newDistance = 0;
        if (prevPosition) {
          newDistance =
            distance +
            haversine(prevPosition.coords, position.coords, { unit: "meter" });
        }

        //Updating State
        this.setState({
          mapRegion: region,
          positions: [...positions, position],
          prevPosition: position,
          speed: position.coords.speed,
          distance: parseInt(newDistance)
        });
      },
      error => console.log(error),
      options
    );
  }

  currentPostion() {
    navigator.geolocation.getCurrentPosition(position => {
      //Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      };
      this.setState({ mapRegion: region });
    });
  }

  togglePause() {
    if (!this.state.isRunning) {
      this.watchPosition();
      this.interval = setInterval(
        () => this.setState({ duration: this.state.duration + 1 }),
        1000
      );
      this.setState({ isRunning: true, isPause: true });
    } else {
      navigator.geolocation.clearWatch(this.watchID);
      clearInterval(this.interval);
      this.setState({
        isPause: !this.state.isPause,
        isRunning: !this.state.isRunning
      });
    }
  }

  stopRun() {
    navigator.geolocation.clearWatch(this.watchID);
    const runItem = {
      positions: this.state.positions,
      duration: this.state.duration,
      distance: this.state.distance,
      speed: this.state.speed,
      date: new Date()
    };
    // TODO Adding Run Item to Realm Database
    // addRun(runItem);
    this.props.navigation.goBack();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: "100%", height: "80%" }}>
          <MapView
            {...mapOptions}
            style={styles.map}
            region={this.state.mapRegion}
            //onRegionChange={this.onRegionChange}
          >
            <Polyline
              coordinates={this.state.positions.map(
                position => position.coords
              )}
              strokeWidth={5}
              strokeColor="#03a87c"
            />
          </MapView>
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.runInfo}>Distance: {this.state.distance}m</Text>
            <Text style={styles.runInfo}>
              Duration: {formatDuration(this.state.duration)}
            </Text>
            <Text style={styles.runInfo}>Speed: {this.state.speed} km/hr </Text>
          </View>
          <View style={styles.controls}>
            <Icon
              name={this.state.isPause ? "pause-circle" : "play-circle"}
              containerStyle={styles.icon}
              type="font-awesome"
              color="#03a87c"
              underlayColor="transparent"
              size={50}
              onPress={() => this.togglePause()}
            />
            <Icon
              name="stop-circle"
              containerStyle={styles.icon}
              type="font-awesome"
              color="#03a87c"
              underlayColor="transparent"
              size={50}
              onPress={() => this.stopRun()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  details: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#3e3947",
    padding: 10
  },
  runInfo: {
    color: "#03a87c",
    fontFamily: "Quicksand",
    fontSize: 20
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    margin: 10
  }
});
