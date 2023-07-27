import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

function FriendScreen({ userInfo }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_server_uri}/api/get_all_users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const renderItem = ({ item }) => {
    const formattedPhoneNumber = item.phone_number.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );

    return (
      <View style={styles.userContainer}>
        <Image style={styles.profileImage} source={{ uri: item.profileURL }} />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPhone}>{formattedPhoneNumber}</Text>
        </View>
        <Text style={styles.stateMessage}>{item.stateMessage}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.profile_title}>친구 목록</Text>
      <View style={styles.separator} />
    
      <FlatList
        contentContainerStyle={styles.list}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
  profile_title: {
    marginTop:20,
    padding: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
 
  userContainer: {
    width:325,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  list: {
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  userPhone: {
    fontSize: 14,
    color: "gray",
  },
  stateMessage: {
    flex:1,
    fontSize: 15,
    marginLeft: 20,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginBottom: 10,
  },
});

export default FriendScreen;