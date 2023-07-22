import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

function MypageScreen({ userInfo }) {
  console.log(userInfo);

  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchName() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/get_user?id=${userInfo.id}`
      );
      const userData = await response.json();
      setName(userData.name);
    }

    fetchName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollcontainer}>
        <Text style={styles.profile_title}>내 프로필</Text>
        <View style={styles.separator} />
        <View style={styles.container}>
          <View style={styles.centercontainer}>
            <Image
              source={{ uri: userInfo.properties.profile_image }}
              style={styles.image}
            />
          </View>
          <View style={styles.information_row}>
            <Text style={styles.text2}>{"이름"}</Text>
            <Text style={styles.text3}>{name}</Text>
          </View>
          <View style={styles.information_row}>
            <Text style={styles.text2}>{"이메일"}</Text>
            <Text style={styles.text3}>{userInfo.kakao_account.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  centercontainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "7%",
  },
  scrollcontainer: {
    backgroundColor: "white",
    flex: 1,
  },
  profile_title: {
    padding: 20,
    alignItems: "flex-start",
    fontSize: 25,
    fontWeight: "bold",
  },
  information_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "gray",
  },
  text2: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "gray",
  },
  text3: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "black",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  textinputView: {
    fontSize: 20,
  },
});

export default MypageScreen;
