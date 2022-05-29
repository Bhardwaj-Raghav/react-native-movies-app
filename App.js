import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MoviesListing from "./src/screens/movies-listing";
import Header from "./src/components/header";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Header /> */}
      <MoviesListing />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
