import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";

import styles from "./styles";

class SwipeButton extends Component {
  static propTypes = {
    buttonIcon: PropTypes.string,
    iconStyle: PropTypes.object,
    iconLabel: PropTypes.string,
    buttonComponentStyle: PropTypes.any
  };

  static defaultProps = {
    buttonIcon: "ios-trash-outline",
    iconStyle: {},
    iconLabel: "",
    buttonComponentStyle: {}
  };
  render() {
    return (
      <View
        style={[styles.buttonComponentStyle, this.props.buttonComponentStyle]}
      >
        <Icon
          name={this.props.buttonIcon}
          type="font-awesome"
          size={25}
          color="white"
        />
        <Text style={styles.iconLabel}>{this.props.iconLabel}</Text>
      </View>
    );
  }
}

export default SwipeButton;
