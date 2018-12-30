import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class Live extends Component {
  static navigationOptions = {
    tabBarLabel: "Live",
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-speedometer" size={30} color={tintColor} />
    ),
  };

  state = {
    coords: null,
    status: null,
    direction: "",
  };

  render() {
    const { status, coords, direction } = this.state;

    if (status === null) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }

    if (status === "denied") {
      return (
        <View>
          <Text>Denied</Text>
        </View>
      );
    }

    if (status === "undetermined") {
      return (
        <View>
          <Text>undetermined</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Live</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

export default Live;
