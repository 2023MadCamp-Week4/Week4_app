import { useState, useEffect, useRef } from "react";
import { WebView } from 'react-native-webview';
import {  Text, Image, Button, Modal, TextInput } from "react-native";
import { FlatList, View, TouchableOpacity } from "react-native";
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import styles from "../../styles/styles";
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';


function WhereScreen({ userInfo, route, navigation }) {
  console.log(userInfo);
  const [latitude, setLatitude] = useState(37.402056);
  const [longtitude, setLongtitude] = useState(127.108212);
  const [memberList, setMemberList] = useState([
      {
          id:1, 
          kakao_id:1,
          name:"hanmin",
          user_id:"hanhan",
          pw:"aaa",
          phone_number:"010-9913-6179",
          location:"ddd"
      },
      {
          id:2, 
          kakao_id:2,
          name:"jihyeon ",
          user_id:"jijian",
          pw:"aaa",
          phone_number:"010-9913-6179",
          location:"ddd"
      }
  ])

  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(`ws://172.10.5.169:80`)
    console.log(ws.current)
    ws.current.onopen = () => {
        // connection opened
        console.log('connected')
        // send a message
    };

    ws.current.onmessage = (e) => {
        // a message was received
        console.log(e.data);
    };

    ws.current.onerror = (e) => {
        // an error occurred
        console.log(e.message);
    };

    ws.current.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };

    return () => {
        ws.current.close();
    };
}, [])
  
  /* 현위치 가져오기 .
  async function getLocationAsync() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
          return Location.getCurrentPositionAsync({enableHighAccuracy: true});
      } else {
          throw new Error('Location permission not granted');
      }
  }

  getLocationAsync()
      .then(location => {
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongtitude(location.coords.longtitude)
      })
      .catch(error => {
          console.error(error);
  });*/

  // 친구 목록 
  const ItemView = ({item}) => {
      return(
          <TouchableOpacity style={styles.itemBox}>
              <View style={styles.valueBox}>
                      <Text>{item.name}</Text>
                      <Text style={styles.nickname}>{item.id}</Text>
                      <Text>{item.location}</Text>
              </View>
          </TouchableOpacity>
      );
  };

  return (
    <View style={styles.container}>
      <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
        style={styles.map}
        initialRegion={{
                latitude: latitude,
                longitude: longtitude,
              }}
            provider={PROVIDER_GOOGLE}
      >
        <Marker
            coordinate={{
            latitude:  latitude,
            longitude: longtitude,
          }}
            pinColor="#2D63E2"
            title="하이"
            description="테스트"
          />
      </MapView>
      <FlatList
          data={memberList}
          renderItem={ItemView}>
      </FlatList>
    </View>
  );
}


export default WhereScreen;
