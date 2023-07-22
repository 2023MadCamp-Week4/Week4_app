import React from "react";
import { View, StyleSheet, Text } from "react-native";

function MainScreen({ userInfo }) {
  console.log(userInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>약속 페이지</Text>
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

export default MainScreen;
