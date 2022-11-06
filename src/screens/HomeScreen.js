import React, { useEffect, useState } from "react";

// Components
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  ScrollView,
} from "react-native";

// firebase
const {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore");
import { db } from "../../firebase";

// firebase
import { authentication } from "../../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = (props) => {
  const [userList, setUserList] = useState(null);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [updateUserName, setUpdateUserName] = useState("");
  const [updateUserSurname, setUpdateUserSurname] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const userCredential = props.route.params.user;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) =>
      Object({ id: doc.id, name: doc.data().name, surname: doc.data().surname })
    );

    return setUserList(userList);
  };

  const addNewDocument = async () => {
    await addDoc(collection(db, "users"), {
      name: userName,
      surname: userSurname,
    })
      .then((re) => {
        console.log(re.id, "Add New");
        getUsers();
        setUserName("");
        setUserSurname("");
      })
      .catch((error) => console.log(error));
  };

  const updateDocument = async (id, name, surname) => {
    await updateDoc(doc(db, "users", id), {
      name,
      surname,
    }).then(() => {
      getUsers();
      setModalVisible(false);
      setUpdateUserName("");
      setUpdateUserSurname("");
    });
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "users", id))
      .then((re) => {
        getUsers();
      })
      .catch((error) => console.log(error));
  };

  const SignOutUser = () => {
    signOut(authentication)
      .then((re) => props.navigation.navigate("Login"))
      .catch((error) => console.log(error));
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: modalVisible ? "rgba(0,0,0,0.3)" : null,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.emailText}>{userCredential.email}</Text>
        <TouchableOpacity
          onPress={() => {
            SignOutUser();
          }}
        >
          <Text style={styles.signoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={userSurname}
          onChangeText={setUserSurname}
          placeholder="Surame"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addNewDocument();
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>User List</Text>
      <ScrollView>
        {userList &&
          userList.map((item) => (
            <View style={styles.userCredentialStyle} key={item.id}>
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Surname: {item.surname}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    deleteDocument(item.id);
                  }}
                >
                  <Text style={{ fontSize: 14, color: "red" }}>Delete</Text>
                </TouchableOpacity>
                <Text>{`  |  `}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ fontSize: 14, color: "green" }}>Update</Text>
                </TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.updateContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          style={styles.updateInput}
                          value={updateUserName}
                          onChangeText={setUpdateUserName}
                          placeholder={`N - ${item.name}`}
                        />
                        <TextInput
                          style={styles.updateInput}
                          value={updateUserSurname}
                          onChangeText={setUpdateUserSurname}
                          placeholder={`SN - ${item.surname}`}
                        />
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.updateButton,
                            { backgroundColor: "#7f0000" },
                          ]}
                          onPress={() => {
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.addButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.updateButton}
                          onPress={() => {
                            updateDocument(
                              item.id,
                              updateUserName,
                              updateUserSurname
                            );
                          }}
                        >
                          <Text style={styles.addButtonText}>Update</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  userCredentialStyle: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: "#0b4f7f",
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7.5,
  },
  addContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  updateContainer: {
    display: "flex",
    flexDirection: "column",
  },
  addButtonText: { textAlign: "left", color: "white" },
  addButton: {
    width: "20%",
    borderRadius: 2,
    borderWidth: 0.2,
    backgroundColor: "green",
    height: 35,
    paddingTop: 6,
    display: "flex",
    alignItems: "center",
  },
  updateButton: {
    width: "40%",
    borderRadius: 2,
    borderWidth: 0.2,
    backgroundColor: "green",
    height: 35,
    paddingTop: 6,
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
  input: {
    width: "37.5%",
    borderRadius: 2,
    borderWidth: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  updateInput: {
    width: "47.5%",
    borderRadius: 2,
    borderWidth: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  signoutText: { color: "red", fontSize: 16 },
  emailText: { fontSize: 20 },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
