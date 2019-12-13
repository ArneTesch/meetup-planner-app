import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { RootParamList } from "../App";

type MeetupsScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "Meetups"
>;

type Props = {
  navigation: any;
  route: MeetupsScreenNavigationProp;
};

const MeetupsScreen: React.FC<Props> = props => {
  console.log(props);
  const { navigation } = props;
  return (
    <SafeAreaView style={[{ backgroundColor: "#110133" }]}>
      <StatusBar barStyle="light-content" backgroundColor="#110133" />
      <View>
        <Text>Meetups Screen</Text>
        <Button title="Back to meetups" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MeetupsScreen;
