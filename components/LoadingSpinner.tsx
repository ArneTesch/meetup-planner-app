import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

type LoadingSpinnerProps = {
  size: "large" | "small" | number;
  color: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={props.size} color={props.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.primary,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingSpinner;
