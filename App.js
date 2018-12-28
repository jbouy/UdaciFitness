import React from "react";
import { View, Platform, Text } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const routes = {
  History: History,
  AddEntry: AddEntry,
};

const navigationOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;

      switch (routeName) {
        case "History":
          return <Ionicons name="ios-bookmarks" size={30} color={tintColor} />;
        case "AddEntry":
          return <FontAwesome name="plus-square" size={30} color={tintColor} />;
      }
    },
    title:
      navigation.state.routeName === "AddEntry"
        ? "Add Entry"
        : navigation.state.routeName,
  }),
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(routes, navigationOptions)
    : createMaterialTopTabNavigator(routes, navigationOptions);

const AppNavigator = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
