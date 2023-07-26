import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/colors';


export default styles = StyleSheet.create({
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
  itemBox: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10, // Add margin horizontally
    elevation: 3, // for Android
    shadowColor: "black", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.2, // for iOS
    shadowRadius: 2, // for iOS
  },
  itemBoxrow: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align vertically to the bottom of the text
    paddingVertical: 2,
  },
  valueBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start", // Align vertically to the bottom of the text
  },
  dateTimePicker: {
    flexDirection: 'row',   // 수평 방향으로 요소 배치
    justifyContent: 'space-between',  // 공간을 균등하게 배분하여 양 끝에 요소 배치
    alignItems: 'center',   // 세로 방향으로 중앙 정렬
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 18,
    backgroundColor: "#F1F1F1",
    padding: 10,
    width: "95%",
  },
  dateButton: {
    backgroundColor: 'transparent',  // 투명 배
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    // marginHorizontal: 10,
  },
  nickname: {
    color: "black",
    // fontWeight: "bold",
    alignItems: "center",
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
    backgroundColor: "#F1F1F1",
    padding: 10,
    width: "95%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  screen:{
      flex:1
    },
  map:{
    flex:1,
	  width: "100%",
  	height : "100%"
	},
  flatList:{
    flex:1
  }
});
