import React, { useState } from "react";

// Components - RN
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Screen Components
import Login from "../components/_auth/Login";
import Register from "../components/_auth/Register";

const LoginScreen = ({ navigation }) => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Text style={{ color: "black", fontSize: 32, marginBottom: 30 }}>
          Auth Demo
        </Text>
      </View>
      {haveAnAccount ? (
        <Login navigation={navigation} />
      ) : (
        <Register navigation={navigation} />
      )}

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {haveAnAccount ? "Don't have an account?" : "Have an account?"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setHaveAnAccount(!haveAnAccount);
          }}
        >
          <Text style={styles.registerText}>
            {haveAnAccount ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  registerText: {
    fontSize: 14,
    paddingTop: 10,
    textAlign: "center",
    color: "#062f4c",
  },
  questionText: { marginTop: 10, fontSize: 14, marginRight: 5 },
  questionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d7d7d7",
  },
});
