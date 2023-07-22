import React from "react";
import { Text, View, StyleSheet } from "react-native";

function WhereScreen({ userInfo }) {
  console.log(userInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>어디야! 페이지</Text>
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

export default WhereScreen;
