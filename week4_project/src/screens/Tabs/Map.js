import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ selectedAppointment, receivedRequest2 }) {
  // Ensure selectedAppointment is not null and contains the required properties

  console.log(selectedAppointment);
  const lng = Number(selectedAppointment.location.longitude);
  const lat = Number(selectedAppointment.location.latitude);

  const friend_lat = Number(receivedRequest2.latitude);
  const friend_lng = Number(receivedRequest2.longitude);
  console.log(lat, lng);
  console.log(friend_lat, friend_lng);

  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView style={{ flex: 1, marginBottom: 10 }} region={region}>
      <Marker
        coordinate={{ latitude: lat, longitude: lng }}
        title="약속 장소 "
      />
      <Marker
        coordinate={{ latitude: friend_lat, longitude: friend_lng }}
        title="너의 위치 "
        pinColor="blue"
      />
    </MapView>
  );
}
