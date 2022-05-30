import { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { TabView, SceneMap } from "react-native-tab-view";
import { NavigationContainer } from "@react-navigation/native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { HEADER_COLOR } from "./src/utils/constants";
import AppStack from "./src/stack/app-stack";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <>
      <AppStack />
      <ExpoStatusBar style="light" backgroundColor={HEADER_COLOR} />
    </>
  );
}

const styles = StyleSheet.create({});
