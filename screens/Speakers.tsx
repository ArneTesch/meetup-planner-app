import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { colors } from "../styles/colors";

type Props = {};

const SpeakersScreen: React.FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Speakers</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hr: {
    backgroundColor: "rgba(0,0,0,.1)",
    height: 1,
    width: "100%",
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingTop: 75
  },
  screenContent: {
    flex: 1
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 25,
    marginBottom: 50
  }
});

export default SpeakersScreen;
