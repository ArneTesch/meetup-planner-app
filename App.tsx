import { ApolloProvider } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { HttpLink } from "apollo-boost";
import * as React from "react";
import { useState } from "react";
import { AsyncStorage, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "./context/auth-context";
import LoginScreen from "./screens/Login";
import MeetupsScreen from "./screens/Meetups";
import RegisterScreen from "./screens/Register";
import { colors } from "./styles/colors";

export type RootParamList = {
  Login: undefined;
  Register: undefined;
  Meetups: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const httpLink = new HttpLink({ uri: "http://localhost:8000/graphql" });

const client = new ApolloClient({
  uri: "http://192.168.10.143:8000/graphql"
});

const Stack = createStackNavigator<RootParamList>();

const App: React.FC = () => {
  const { primary, accent } = colors.dark;
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

  // const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

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
            {!token ? (
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: primary
                  },
                  headerTintColor: accent
                }}
              >
                <React.Fragment>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </React.Fragment>
              </Stack.Navigator>
            ) : (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;
                    if (route.name === "Meetups") {
                      iconName = `${
                        Platform.OS === "ios" ? "ios-list" : "md-list"
                      }`;
                    } else if (route.name === "Speakers") {
                      iconName = `${
                        Platform.OS === "ios" ? "ios-people" : "md-people"
                      }`;
                    }
                    return <Ionicons name={iconName} size={24} color={color} />;
                  }
                })}
                tabBarOptions={{
                  activeTintColor: accent,
                  inactiveTintColor: "rgba(255, 255, 255, .5)",
                  labelStyle: {
                    fontSize: 14
                  },
                  style: {
                    borderTopWidth: 1,
                    borderTopColor: "rgba(255,255,255, .3)",
                    backgroundColor: primary,
                    height: 80,
                    paddingBottom: 25,
                    paddingTop: 5
                  }
                }}
              >
                <Tab.Screen
                  name="Meetups"
                  component={MeetupsScreen}
                  navigationOptions={{
                    backgroundColor: colors.dark.accent
                  }}
                />
                <Tab.Screen name="Speakers" component={MeetupsScreen} />
              </Tab.Navigator>
            )}
          </AuthContext.Provider>
        </NavigationNativeContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
