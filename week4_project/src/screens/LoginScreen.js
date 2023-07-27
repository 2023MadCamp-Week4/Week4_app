import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
let imagePath = require("../../assets/map.png");
let buttonImagePath = require("../../assets/kakao_login.png");
import * as Font from "expo-font";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFont, setIsFont] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Titlefont: require("../../assets/fonts/Titlefont.ttf"),
      });
      setIsFont(true);
    };
    loadFonts();
  }, []);

  const handleLogin2 = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_server_uri}/api/login`,
        data: {
          userid: username,
          pw: password,
        },
      });

      const userInfo = response.data;
      Toast.show({
        type: "success",
        text1: "입장",
        text2: `${userInfo.name}님, 안녕하세요!`,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "TabScreen", params: { userInfo: userInfo } }],
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogin = () => {
    navigation.navigate("KakaoLogin");
  };

  return (
    <View style={styles.container}>
      {isFont && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imagePath} />
          <Text
            style={{
              fontFamily: "Titlefont",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            너 어디야!
          </Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={"아이디"}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={"비밀번호"}
        secureTextEntry // 텍스트가 가려짐
      />
      <TouchableOpacity onPress={handleLogin2} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <Image source={buttonImagePath} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: 218,
    width: 360,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  buttonImage: {
    width: 300,
    height: 45,
  },
  text: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonStyle: {
    marginTop: 30,
    backgroundColor: "#ff5c5c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default LoginScreen;
