import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { Icon, Button } from "react-native-elements";

import { addItem, getItems, deleteItem, updateItem } from "../../Realm/Model";
import ListCard from "../ListItem";
import EditListItem from "../EditListItem";
import AddListItem from "../AddListItem";
import SwipeCard from "../SwipeCard";

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      list: [],
      isEdit: false,
      editItem: {}
    };
    this.togglePrompt = this.togglePrompt.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    const list = getItems({ day: this.props.day });
    this.setState({ list });
  };

  togglePrompt() {
    if (this.state.isEdit) this.setState({ isEdit: false });
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  addCard(itemObj) {
    if (itemObj.title != null) {
      this.setState({
        list: [...this.state.list, itemObj]
      });
    }
    addItem({ ...itemObj, ...{ day: this.props.day } });
    this.togglePrompt();
  }

  updateCard = itemObj => {
    updateItem(itemObj);
    this.getItems();
    this.togglePrompt();
  };

  updateStatus({ id, status }) {
    updateItem({ id, status: !status });
    this.getItems();
  }

  deleteItem = item => {
    deleteItem({ id: item.id });
    this.getItems();
  };

  editItem = item => {
    this.setState({ isEdit: true, modalVisible: true, editItem: item });
  };

  renderList = item => {
    const editConfig = {
      buttonIcon: "edit",
      iconLabel: "Edit",
      buttonComponentStyle: styles.editButton,
      onPress: () => this.editItem(item)
    };
    const deleteConfig = {
      buttonIcon: "trash",
      iconLabel: "Delete",
      buttonComponentStyle: styles.cancelButton,
      onPress: () => this.deleteItem(item)
    };
    return (
      <SwipeCard key={item.title} rightConfig={[editConfig, deleteConfig]}>
        <ListCard {...item} updateStatus={this.updateStatus} />
      </SwipeCard>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Image style={styles.img} source={this.props.imageUrl} />
            <Text style={styles.day}>{this.props.day}</Text>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{this.props.workout}</Text>
            </View>
          </View>
        </View>

        <View style={styles.todo}>
          <Button
            buttonStyle={styles.btnRun}
            small
            rightIcon={{ name: "accessibility" }}
            title="Lets Run"
            onPress={() => this.props.gotoRun()}
          />

          <Icon
            name="md-add-circle"
            underlayColor="transparent"
            type="ionicon"
            color="#03a87c"
            onPress={() => this.togglePrompt()}
          />

          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => this.togglePrompt()}
          >
            {!this.state.isEdit && (
              <AddListItem addCard={this.addCard} close={this.togglePrompt} />
            )}
            {this.state.isEdit && (
              <EditListItem
                updateCard={this.updateCard}
                close={this.togglePrompt}
                {...this.state.editItem}
              />
            )}
          </Modal>
        </View>

        <ScrollView style={{ margin: 10 }} showsVerticalScrollIndicator={false}>
          {this.state.list.map(this.renderList)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#3e3947"
  },
  card: {
    padding: 10,
    marginTop: 20,
    height: "40%"
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5
  },
  day: {
    fontFamily: "Quicksand",
    color: "#8bffdd",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10
  },
  titleBox: {
    backgroundColor: "#696372",
    width: "70%",
    position: "absolute",
    left: 10,
    bottom: -10,
    paddingLeft: 5,
    borderRadius: 4,
    opacity: 0.9
  },
  title: {
    fontFamily: "Quicksand",
    color: "#fff",
    fontSize: 22,
    textAlign: "left",
    opacity: 1.0
  },
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 10,
    alignItems: "flex-end"
  },
  btnRun: {
    borderRadius: 5,
    height: 40,
    backgroundColor: "#03a87c"
  },
  editButton: {
    backgroundColor: "#376F86"
  },
  cancelButton: {
    backgroundColor: "#FF5035"
  }
});
