import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Image, StatusBar, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { RootParamList } from "../App";
import Input from "../components/Input";
import { colors } from "../styles/colors";

type MeetupsScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "Meetups"
>;

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: MeetupsScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = props => {
  const { navigation } = props;
  const { primary, accent, smoke, text } = colors.light;

  const loginHandler = () => {
    console.log("LOGIN");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.main}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Input
          textContentType="emailAddress"
          icon={{ name: "user", size: 21 }}
          keyboardType={"email-address"}
          placeholder={"Email address"}
          placeholderTextColor={smoke}
          customStyles={styles.inputContainer}
        />
        <Input
          textContentType="password"
          icon={{ name: "key", size: 21 }}
          placeholder={"Password"}
          placeholderTextColor={smoke}
          secureTextEntry
        />
        <View style={styles.loginButton}>
          <Button onPress={loginHandler} title="LOGIN" color={text} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.primary,
    flex: 1,
    padding: 15
  },
  main: {
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 160,
    marginVertical: 15,
    overlayColor: "#fff"
  },
  inputContainer: {
    marginBottom: 25
  },
  loginButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 38,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default LoginScreen;
