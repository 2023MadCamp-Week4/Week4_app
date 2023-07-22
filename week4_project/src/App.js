import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import LoginScreen from "./screens/LoginScreen";
import TabScreen from "./screens/TabScreen";
import KaKaoLogin from "./screens/KakaoLogin";
import Signup from "./screens/Signup";
import FriendScreen from "./screens/Tabs/FriendScreen";
import WhereScreen from "./screens/Tabs/WhereScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="KakaoLogin" component={KaKaoLogin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="FriendScreen" component={FriendScreen} />
          <Stack.Screen name="WhereScreen" component={WhereScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
