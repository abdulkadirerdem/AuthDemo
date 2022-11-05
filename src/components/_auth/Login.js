import React, { useState } from "react";

// Components
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// firebase
import { authentication } from "../../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Logs
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSingedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log("User account created & signed in!", re);
        setIsSignedIn(true);
        props.navigation.navigate("Home", re);
      })
      .catch((error) => {
        console.error(error);
        setIsSignedIn(false);
      });
  };

  const SignOutUser = () => {
    signOut(authentication)
      .then((re) => console.log(re))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonRange}>
        <TouchableOpacity
          onPress={() => {
            handleSignIn();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonRange: { width: "60%" },
  buttonText: { textAlign: "center", color: "white" },
  button: {
    paddinHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: "#0b4f7f",
    backgroundColor: "#138fe5",
  },
  input: {
    borderRadius: 2,
    borderColor: "black",
    borderWidth: 0.2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
});
