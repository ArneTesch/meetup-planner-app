import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Formik } from "formik";
import React, { createRef, useContext } from "react";
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
import Input, { Ref } from "../components/Input";
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
    createVisitor({
      variables: {
        firstname: data.firstname,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }
    });
  };

  if (loading) <LoadingSpinner size="large" color="#fff" />;

  const firstnameRef = createRef<Ref>();
  const lastNameRef = createRef<Ref>();
  const emailRef = createRef<Ref>();
  const passwordRef = createRef<Ref>();
  const confirmPasswordRef = createRef<Ref>();

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
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{
              firstname: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={RegisterValidationSchema}
            onSubmit={values => registerHandler(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldTouched,
              touched,
              isValid
            }) => (
              <View style={styles.registerFields}>
                <Input
                  textContentType="givenName"
                  placeholder="Firstname"
                  placeholderTextColor={smoke}
                  onChangeText={handleChange("firstname")}
                  onBlur={() => {
                    setFieldTouched("firstname");
                    handleBlur("firstname");
                  }}
                  ref={firstnameRef}
                  onSubmitEditing={() => {
                    if (lastNameRef.current) {
                      lastNameRef.current.focus();
                    }
                  }}
                  blurOnSubmit={false}
                  customStyles={[
                    touched.firstname && errors.firstname
                      ? { marginBottom: 0 }
                      : { marginBottom: 25 }
                  ]}
                  value={values.firstname}
                  autoFocus
                />
                {touched.firstname && errors.firstname && (
                  <Text style={styles.errorMsg}>{errors.firstname}</Text>
                )}
                <Input
                  textContentType="familyName"
                  placeholder="Last name"
                  placeholderTextColor={smoke}
                  onChangeText={handleChange("lastName")}
                  onBlur={() => {
                    setFieldTouched("lastName");
                    handleBlur("lastName");
                  }}
                  ref={lastNameRef}
                  onSubmitEditing={() => {
                    if (emailRef.current) {
                      emailRef.current.focus();
                    }
                  }}
                  blurOnSubmit={false}
                  customStyles={[
                    errors.lastName && touched.lastName
                      ? { marginBottom: 0 }
                      : { marginBottom: 25 }
                  ]}
                  value={values.lastName}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorMsg}>{errors.lastName}</Text>
                )}
                <Input
                  textContentType="emailAddress"
                  keyboardType={"email-address"}
                  placeholder="Email address"
                  placeholderTextColor={smoke}
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    handleBlur("email");
                    setFieldTouched("email");
                  }}
                  ref={emailRef}
                  autoCapitalize="none"
                  onSubmitEditing={() => {
                    if (passwordRef.current) {
                      passwordRef.current.focus();
                    }
                  }}
                  blurOnSubmit={false}
                  customStyles={[
                    errors.email && touched.email
                      ? { marginBottom: 0 }
                      : { marginBottom: 25 }
                  ]}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorMsg}>{errors.email}</Text>
                )}
                <Input
                  textContentType="password"
                  placeholder={"Password"}
                  placeholderTextColor={smoke}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={() => {
                    handleBlur("password");
                    setFieldTouched("password");
                  }}
                  ref={passwordRef}
                  onSubmitEditing={() => {
                    if (confirmPasswordRef.current) {
                      confirmPasswordRef.current.focus();
                    }
                  }}
                  customStyles={[
                    errors.password && touched.password
                      ? { marginBottom: 0 }
                      : { marginBottom: 25 }
                  ]}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                )}
                <Input
                  textContentType="password"
                  placeholder="Confirm password"
                  placeholderTextColor={smoke}
                  secureTextEntry
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => {
                    handleBlur("confirmPassword");
                    setFieldTouched("confirmPassword");
                  }}
                  ref={confirmPasswordRef}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
                )}
                <View style={styles.registerButton}>
                  <Button
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    title="REGISTER"
                    color={text}
                  />
                </View>
              </View>
            )}
          </Formik>
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
    flex: 1,
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
    alignItems: "stretch"
  },
  registerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default RegisterScreen;
