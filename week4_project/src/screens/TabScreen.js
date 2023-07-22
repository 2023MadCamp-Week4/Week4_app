import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import MainScreen from "./Tabs/MainScreen";
import FriendScreen from "./Tabs/FriendScreen";
import WhereScreen from "./Tabs/WhereScreen";
import MypageScreen from "./Tabs/MypageScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigationApp({ route }) {
  const { userInfo } = route.params;
  console.log(userInfo);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="약속"
        options={{
          headerShown: false,
          title: "약속",
          tabBarIcon: ({ color, size }) => (
            <Icon name="next-plan" color={color} size={size} />
          ),
        }}
      >
        {(props) => <MainScreen {...props} userInfo={userInfo} />}
      </Tab.Screen>
      <Tab.Screen
        name="어디야!"
        options={{
          headerShown: false,
          title: "어디야!",
          tabBarIcon: ({ color, size }) => (
            <Icon name="my-location" color={color} size={size} />
          ),
        }}
      >
        {(props) => <WhereScreen {...props} userInfo={userInfo} />}
      </Tab.Screen>
      <Tab.Screen
        name="친구목록"
        options={{
          headerShown: false,
          title: "친구목록",
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="user-friends" color={color} size={size} />
          ),
        }}
      >
        {(props) => <FriendScreen {...props} userInfo={userInfo} />}
      </Tab.Screen>
      <Tab.Screen
        name="내 정보"
        options={{
          headerShown: false,
          title: "내 정보",
          tabBarIcon: ({ color, size }) => (
            <Icon name="contact-page" color={color} size={size} />
          ),
        }}
      >
        {(props) => <MypageScreen {...props} userInfo={userInfo} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomTabNavigationApp;
