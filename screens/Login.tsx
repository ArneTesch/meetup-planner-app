import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { RootParamList } from "../App";

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View>
        <Text style={styles.content__text}>Login Screen</Text>
        <Button
          title="Meetups"
          onPress={() => navigation.navigate("Meetups")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222631",
    flex: 1,
    padding: 15
  },
  content__text: {
    color: "#fff"
  }
});

export default LoginScreen;
