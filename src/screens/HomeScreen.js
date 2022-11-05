import { StyleSheet, Text, View } from "react-native";
import React from "react";
const { collection, getDocs } = require("firebase/firestore");
import { db } from "../../firebase";

const HomeScreen = (props) => {
  const userCredential = props.route.params.user;

  const getUsers = async () => {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());

    console.log(userList);
  };

  getUsers();

  return (
    <View style={{}}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
