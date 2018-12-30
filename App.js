import React from "react";
import { View, Platform, StatusBar } from "react-native";
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
import { Constants } from "expo";

const routes = {
  History: History,
  AddEntry: AddEntry,
};

const navigationOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    header: null,
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

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

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
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
