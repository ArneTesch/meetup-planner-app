import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  icon?: {
    name: string;
    size: number;
  };
  textContentType:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode";
  keyboardType?: KeyboardTypeOptions;
  customStyles?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = props => {
  const { customStyles, icon, textContentType, keyboardType } = props;

  return (
    <View style={[styles["inputContainer"], customStyles]}>
      <TextInput
        style={[styles.input, !icon && { paddingRight: 0 }]}
        textContentType={textContentType ? textContentType : "none"}
        keyboardType={keyboardType ? keyboardType : "default"}
        {...props}
      />
      {icon && (
        <AntDesign
          name={icon.name}
          size={icon.size}
          color="#fff"
          style={styles.iconWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    flex: 1,
    paddingTop: 5,
    paddingRight: 24,
    paddingBottom: 5,
    paddingLeft: 3,
    color: "#fff"
  },
  iconWrapper: {
    position: "absolute",
    bottom: 3,
    right: 0
  }
});

export default Input;