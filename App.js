import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "./src/components/header";
import Listing from "./src/screens/listing";
import Search from "./src/screens/search";
import { MOVIE_REQUEST_TYPE, TV_REQUEST_TYPE } from "./src/utils/constants";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Header /> */}
      <Search />
      {/* <Listing
        type="Movie"
        initialSelectedRequestTypeIndex={1}
        requestType={MOVIE_REQUEST_TYPE}
      /> */}
      {/* <Listing
        type="TV"
        initialSelectedRequestTypeIndex={2}
        requestType={TV_REQUEST_TYPE}
        resultTitleKeys
      /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
