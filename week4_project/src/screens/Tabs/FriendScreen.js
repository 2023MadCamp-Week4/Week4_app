import React from "react";
import { Text, View, StyleSheet } from "react-native";
import "react-native-get-random-values";

function FriendScreen({ userInfo }) {
  console.log(userInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>친구 목록 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  texts: {
    fontSize: 25,
    justifyContent: "center",
  },
});

export default FriendScreen;
