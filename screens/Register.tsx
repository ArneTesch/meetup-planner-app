import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useContext } from "react";
import useForm from "react-hook-form";
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import * as yup from "yup";
import Input from "../components/Input";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../context/auth-context";
import { colors } from "../styles/colors";

type RegisterFormData = {
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const REGISTER_USER = gql`
  mutation CreateVisitor(
    $firstname: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createVisitor(
      visitorInput: {
        firstname: $firstname
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      visitorId
      token
      tokenExpiration
    }
  }
`;

const RegisterValidationSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  email: yup
    .string()
    .required("Email address is a required field")
    .email("Please provide a valid email address"),
  password: yup.string().required("Password is a required field"),
  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match!")
});

const RegisterScreen: React.FC = () => {
  const { smoke, text } = colors.light;
  const { register, setValue, handleSubmit, errors } = useForm<
    RegisterFormData
  >({
    validationSchema: RegisterValidationSchema
  });
  const authContext = useContext(AuthContext);
  const [createVisitor, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: ({ createVisitor }) => {
      console.log(createVisitor);
      authContext.login(
        createVisitor.token,
        createVisitor.visitorId,
        createVisitor.tokenExpiration
      );
    }
  });

  const registerHandler = (data: RegisterFormData) => {
    console.log(data);
    createVisitor({
      variables: {
        firstname: data.firstname,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }
    }).then(console.log);
  };

  if (loading) <LoadingSpinner size="large" color="#fff" />;
  let lastnameRef;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.main}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.introText}>
            Register today and stay informed of upcoming meetups and events!
          </Text>
        </View>
        <View style={styles.registerFields}>
          <Input
            textContentType="givenName"
            placeholder="Firstname"
            placeholderTextColor={smoke}
            customStyles={[
              errors.firstname ? { marginBottom: 0 } : { marginBottom: 25 }
            ]}
            ref={register({ name: "firstname" })}
            onChangeText={value => setValue("firstname", value)}
          />
          {errors.firstname && (
            <Text style={styles.errorMsg}>{errors.firstname.message}</Text>
          )}
          <Input
            textContentType="familyName"
            placeholder="Last name"
            placeholderTextColor={smoke}
            customStyles={[
              errors.lastName ? { marginBottom: 0 } : { marginBottom: 25 }
            ]}
            ref={register({ name: "lastName" })}
            onChangeText={value => setValue("lastName", value)}
          />
          {errors.lastName && (
            <Text style={styles.errorMsg}>{errors.lastName.message}</Text>
          )}
          <Input
            textContentType="emailAddress"
            keyboardType={"email-address"}
            placeholder="Email address"
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
            textContentType="newPassword"
            placeholder={"Password"}
            placeholderTextColor={smoke}
            customStyles={[
              errors.password ? { marginBottom: 0 } : { marginBottom: 25 }
            ]}
            secureTextEntry
            ref={register({ name: "password" })}
            onChangeText={value => setValue("password", value)}
          />
          {errors.password && (
            <Text style={styles.errorMsg}>{errors.password.message}</Text>
          )}
          <Input
            textContentType="newPassword"
            placeholder="Confirm password"
            placeholderTextColor={smoke}
            secureTextEntry
            ref={register({ name: "confirmPassword" })}
            onChangeText={value => setValue("confirmPassword", value)}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorMsg}>
              {errors.confirmPassword.message}
            </Text>
          )}
          <View style={styles.loginButton}>
            <Button
              onPress={handleSubmit(registerHandler)}
              title="REGISTER"
              color={text}
            />
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 106.5,
    marginVertical: 15,
    overlayColor: "#fff"
  },
  introText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15
  },
  errorMsg: {
    color: colors.light.error,
    fontSize: 12,
    textAlign: "left",
    width: "100%",
    marginTop: 5,
    marginBottom: 25
  },
  registerFields: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
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

export default RegisterScreen;
