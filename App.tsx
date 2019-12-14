import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/Login";
import MeetupsScreen from "./screens/Meetups";

export type RootParamList = {
  Home: undefined;
  Meetups: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createStackNavigator<RootParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationNativeContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#222631"
            },
            headerTintColor: "#D8535C"
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Meetups" component={MeetupsScreen} />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </SafeAreaProvider>
  );
}

export default App;
