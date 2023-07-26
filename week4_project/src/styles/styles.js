import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  itemBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  valueBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateTimePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    width: "95%",
  },
  dateButton: {
    backgroundColor: "transparent", // This will make the button's background color transparent
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  nickname: {
    color: "#333333",
    fontSize: 17,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    width: "95%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  flatList: {
    flex: 1,
  },
  button: {
    borderColor: "#4B9CD3",
    backgroundColor: "transparent", // This will make the button's background color transparent
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#4B9CD3",
    fontSize: 16,
  },
  multiSelectContainer: {
    margin: 10, // 이 값은 다른 TextInput과의 margin을 맞추기 위해 조정하세요.
  },
});
