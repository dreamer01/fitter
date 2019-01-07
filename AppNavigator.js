import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import RunMap from "./components/Run";
import Planner from "./components/Planner";
import MyCalendar from "./components/Calendar";
import Profile from "./components/Profile";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person" color={tintColor} size={24} />
        )
      }
    },
    Planner: {
      screen: createStackNavigator(
        {
          Planner: {
            screen: Planner,
            navigationOptions: () => ({
              header: null
            })
          },
          RunMap: {
            screen: RunMap,
            navigationOptions: () => ({
              title: `Run Map`,
              headerTintColor: "#03a87c",
              headerStyle: {
                backgroundColor: "#3e3947"
              },
              headerTitleStyle: {
                color: "#03a87c"
              }
            })
          }
        },
        {
          initialRouteName: "Planner"
        }
      ),
      navigationOptions: {
        tabBarLabel: "Planner",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-clipboard" color={tintColor} size={24} />
        )
      }
    },
    Calendar: {
      screen: MyCalendar,
      navigationOptions: {
        tabBarLabel: "Calendar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-calendar" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Planner",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: "#52e2ab",
      inactiveTintColor: "#696372",
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: "#181320"
      },
      indicatorStyle: {
        height: 0
      }
    }
  }
);

export default AppTabNavigator;
