import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Listing from "../screens/listing";
import Search from "../screens/search";
import { MOVIE_REQUEST_TYPE, TV_REQUEST_TYPE } from "../utils/constants";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
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
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
