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
import io from 'socket.io-client';

const socketEndpoint = "http://172.10.5.169:80";
const socket = io(socketEndpoint,{transports: ['websocket']});


function WhereScreen({ userInfo, route, navigation }) {
  const [latitude, setLatitude] = useState(37.402056);
  const [longtitude, setLongtitude] = useState(127.108212);
  const [locationList, setLocationList] = useState([
    {
        user: "a",                      
        latitude: 37.51239355407258,
        longitude: 127.08445797334993,
        isFocused: false
    },
    {
        user: "b",                      
        latitude: 37.547391660236286, 
        longitude: 127.04602265013317,
        isFocused: false
    }
    ])
  const itemData = route.params?.itemData;



  useEffect(() => {  
    socket.on('connect', () => {
            console.log('Connected to server!');
            
            //자신의 위치 json으로 전송
            const location = {
                user: "a",                      
                latitude: latitude,
                longitude: longitude
            };
            const locationJsonString = JSON.stringify(location);
            socket.emit('location', locationJsonString);
        });

    // 다른 사람의 위치를 전달 받은 후, LocationList state 로 저장한 뒤, marker로 띄우기. 
    socket.on('location', (data) => {
        setLocationList(data)
    });

}, [])
  
  // 현위치 가져오기 .
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
  });

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
                latitude: itemData.location.latitude,
                longitude: itemData.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,

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
          {locationList.map( i => (
            <Marker
                coordinate={{ latitude: i.latitude, longitude: i.longitude }}
                title={i.user}
                description={i.user}
                pinColor={i.isFocused ? "blue" : "red"} // 포커싱 여부에 따라 색상 변경
            />
        ))}
      </MapView>
      <FlatList
          style={styles.flatList}
          data={locationList}
          renderItem={ItemView}>
      </FlatList>
    </View>
  );
}


export default WhereScreen;
