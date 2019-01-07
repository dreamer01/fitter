import React, { Component } from "react";
import { Alert, View } from "react-native";
import PropTypes from "prop-types";
import Swipeout from "react-native-swipeout";

import SwipeButton from "./swipe-button";
import styles from "./styles";

class SwipeCard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    buttonIcon: PropTypes.string,
    containerStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    buttonComponentStyle: PropTypes.object,
    isAlert: PropTypes.bool,
    alertText: PropTypes.object,
    rightConfig: PropTypes.array
  };

  static defaultProps = {
    index: "",
    buttonIcon: "ios-trash-outline",
    iconStyle: {},
    containerStyle: {},
    buttonComponentStyle: {},
    isAlert: true,
    alertText: {
      title: "",
      alertMessage: ""
    },
    rightConfig: []
  };

  state = {
    activeRowKey: null
  };

  onSwipeClose = this.onSwipeClose.bind(this);
  onSwipeOpen = this.onSwipeOpen.bind(this);
  renderSwipeButton = this.renderSwipeButton.bind(this);

  onSwipeClose() {
    if (this.state.activeRowKey !== null) {
      this.setState({ activeRowKey: null });
    }
  }

  onSwipeOpen() {
    this.setState({ activeRowKey: this.props.index });
  }

  renderSwipeButton({
    buttonIcon,
    iconStyle,
    iconLabel,
    buttonComponentStyle,
    onPress
  }) {
    return {
      component: (
        <SwipeButton
          buttonIcon={buttonIcon}
          iconStyle={iconStyle}
          iconLabel={iconLabel}
          buttonComponentStyle={buttonComponentStyle}
        />
      ),
      onPress
    };
  }

  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: this.onSwipeClose,
      onOpen: this.onSwipeOpen,
      right: this.props.rightConfig.map(this.renderSwipeButton),
      rowId: this.props.index,
      sectionId: 1
    };

    return (
      <Swipeout
        style={[styles.containerStyle, this.props.containerStyle]}
        {...swipeSettings}
      >
        {this.props.children}
      </Swipeout>
    );
  }
}

export default SwipeCard;
