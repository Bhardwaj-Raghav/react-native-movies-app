import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home";
import { HEADER_COLOR } from "../utils/constants";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: "Movies App",
            headerStyle: {
              backgroundColor: HEADER_COLOR,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
