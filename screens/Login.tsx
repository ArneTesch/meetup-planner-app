import { useLazyQuery } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import React, { useContext } from "react";
import useForm from "react-hook-form";
import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import * as yup from "yup";
import { RootParamList } from "../App";
import Input from "../components/Input";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../context/auth-context";
import { colors } from "../styles/colors";

type MeetupsScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "Meetups"
>;

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: MeetupsScreenNavigationProp;
};

type FormData = {
  email: string;
  password: string;
};

const LOGIN = gql`
  query VisitorLogin($email: String!, $password: String!) {
    visitorLogin(email: $email, password: $password) {
      visitorId
      token
      tokenExpiration
    }
  }
`;

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is a required field."),
  password: yup.string().required("Password is a required field.")
});

const LoginScreen: React.FC<Props> = props => {
  const { navigation } = props;
  const { primary, accent, smoke, text } = colors.light;
  const authContext = useContext(AuthContext);
  const [login, { loading, data }] = useLazyQuery(LOGIN, {
    onCompleted: data => {
      authContext.login(
        data.visitorLogin.token,
        data.visitorLogin.visitorId,
        data.visitorLogin.tokenExpiration
      );
    }
  });
  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    validationSchema: LoginValidationSchema
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    login({
      variables: {
        email: email,
        password: password
      }
    });
  });

  if (loading) {
    return <LoadingSpinner size="large" color="#fff" />;
  }

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
          customStyles={[
            errors.email ? { marginBottom: 0 } : { marginBottom: 25 }
          ]}
          ref={register({ name: "email" })}
          onChangeText={value => setValue("email", value)}
          autoCapitalize="none"
        />
        {errors.email && (
          <Text style={styles.errorMsg}>{errors.email.message}</Text>
        )}
        <Input
          textContentType="password"
          icon={{ name: "key", size: 21 }}
          placeholder={"Password"}
          placeholderTextColor={smoke}
          secureTextEntry
          ref={register({ name: "password" })}
          onChangeText={value => setValue("password", value)}
        />
        {errors.password && (
          <Text style={styles.errorMsg}>{errors.password.message}</Text>
        )}
        <View style={styles.loginButton}>
          <Button onPress={onSubmit} title="LOGIN" color={text} />
        </View>

        <View style={styles.registerContainer}>
          <Text
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            No account yet? Register!
          </Text>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 160,
    marginVertical: 15,
    overlayColor: "#fff"
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
  },
  registerButton: {
    color: "#fff",
    textDecorationLine: "underline",
    textDecorationColor: "#fff"
  },
  registerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  errorMsg: {
    color: colors.light.error,
    fontSize: 12,
    textAlign: "left",
    width: "100%",
    marginTop: 5,
    marginBottom: 25
  }
});

export default LoginScreen;
