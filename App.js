import { useState } from "react";
// import { StatusBar } from "expo-status-bar";
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

import Header from "./src/components/header";
import Listing from "./src/screens/listing";
import Search from "./src/screens/search";
import { MOVIE_REQUEST_TYPE, TV_REQUEST_TYPE } from "./src/utils/constants";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   { key: "moviePage", title: "Movies" },
  //   { key: "searchPage", title: "Search Results" },
  //   { key: "tvPage", title: "TV Shows" },
  // ]);

  // const layout = useWindowDimensions();

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Movies"
            children={() => (
              <Listing
                type="Movie"
                initialSelectedRequestTypeIndex={1}
                requestType={MOVIE_REQUEST_TYPE}
              />
            )}
          />
          <Tab.Screen
            options={{
              tabBarLabel: () => <Text>Search Results</Text>,
            }}
            name="Search Results"
            children={() => <Search />}
          />
          <Tab.Screen
            name="TV Shows"
            children={() => (
              <Listing
                type="TV"
                initialSelectedRequestTypeIndex={2}
                requestType={TV_REQUEST_TYPE}
                resultTitleKeys
              />
            )}
          />
        </Tab.Navigator>
        {/* <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={SceneMap({
          moviePage: () =>
            useMemo(
              <Listing
                type="Movie"
                initialSelectedRequestTypeIndex={1}
                requestType={MOVIE_REQUEST_TYPE}
              />
            ),
          searchPage: () => useMemo(<Search />),
          tvPage: () =>
            useMemo(
              <Listing
                type="TV"
                initialSelectedRequestTypeIndex={2}
                requestType={TV_REQUEST_TYPE}
                resultTitleKeys
              />
            ),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      /> */}
        {/* <Header /> */}
        {/* <Search /> */}
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
