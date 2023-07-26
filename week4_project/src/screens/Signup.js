import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Signup = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { userInfo } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [userid, setID] = useState("");

  const handleSignup = () => {
    console.log(`${process.env.REACT_APP_server_uri}/api/user`);
    const userData = {
      kakao_id: userInfo.id,
      name: username,
      user_id: userid,
      pw: password,
      phone_number: phonenumber,
      location: "Default Location",
      profileURL: userInfo.kakao_account.profile.profile_image_url,
    };
    console.log(userData);

    fetch(`${process.env.REACT_APP_server_uri}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        Toast.show({
          type: "success",
          text1: "회원 가입",
          text2: "회원 가입이 완료되었습니다.",
        });
        navigation.navigate("TabScreen", { userInfo: userInfo });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 가입</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={"이름"}
      />
      <TextInput
        style={styles.input}
        value={userid}
        onChangeText={setID}
        placeholder={"아이디"}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={"비밀번호"}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={phonenumber}
        onChangeText={setPhonenumber}
        placeholder={"휴대폰 번호"}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Signup;
