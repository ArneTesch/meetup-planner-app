import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { HttpLink } from "apollo-boost";
import * as React from "react";
import { useState } from "react";
import { AsyncStorage } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "./context/auth-context";
import LoginScreen from "./screens/Login";
import MeetupsScreen from "./screens/Meetups";
import RegisterScreen from "./screens/Register";
import { colors } from "./styles/colors";

export type RootParamList = {
  Home: undefined;
  Meetups: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const httpLink = new HttpLink({ uri: "http://localhost:8000/graphql" });

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

const Stack = createStackNavigator<RootParamList>();

function App() {
  const { primary, accent } = colors.light;
  const [token, setToken] = useState();
  const [visitorId, setVisitorId] = useState();

  const login = (token: string, visitorId: string, tokenExpiration: string) => {
    setToken(token);
    setVisitorId(visitorId);
    AsyncStorage.setItem("auth_token", token);
  };

  const logout = () => {
    setToken(null);
    setVisitorId(null);
    AsyncStorage.setItem("auth_token", null);
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationNativeContainer>
          <AuthContext.Provider
            value={{
              login: login,
              logout: logout,
              token: token,
              visitorId: visitorId
            }}
          >
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: primary
                },
                headerTintColor: accent
              }}
            >
              {!token ? (
                <React.Fragment>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </React.Fragment>
              ) : (
                <Stack.Screen name="Meetups" component={MeetupsScreen} />
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationNativeContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
