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

const MeetupsScreen: React.FC<Props> = props => {
  const { navigation, route } = props;
  // const { data, loading, error } = useQuery(GET_MEETUPS, {
  //   onCompleted: data => {
  //     console.log(data);
  //   }
  // });

  return (
    <SafeAreaView style={[{ backgroundColor: "#222631" }]}>
      <StatusBar barStyle="light-content" />
      <View>
        <Text>Meetups Screen</Text>
        <Button title="Back to meetups" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MeetupsScreen;
