import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapScreen from "./Map";

function WhereScreen({ userInfo }) {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedMemberName, setSelectedMemberName] = useState(null);
  const [receivedRequest2, setReceivedRequest2] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [latitude, setLatitude] = useState(37.402056);
  const [longitude, setLongitude] = useState(127.108212);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [Flagflag, setFlagflag] = useState(true);

  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/get_username_byid?id=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
        setLoading(false); // 데이터가 성공적으로 로드되면 로딩 상태를 false로 설정
      } else {
        console.error("Failed to fetch user name");
      }
    } catch (err) {
      console.error("Error while fetching user name:", err);
    }
  };

  useEffect(() => {
    if (selectedAppointment?.send_userid) {
      fetchUserName(selectedAppointment.send_userid);
    }
  }, [selectedAppointment]);

  // 현위치 가져오기
  async function getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error("Location permission not granted");
    }
  }

  getLocationAsync()
    .then((location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })
    .catch((error) => {
      console.error(error);
    });

  useEffect(() => {
    if (
      selectedAppointment &&
      selectedAppointment.latitude &&
      selectedAppointment.longitude
    ) {
      getPlace(
        selectedAppointment.latitude,
        selectedAppointment.longitude
      ).then((data) => {
        if (data.status === "OK") {
          setCurrentPlace(data.results[0].formatted_address);
        } else {
          console.log("No results found");
        }
      });
    }
  }, [selectedAppointment]);
  useEffect(() => {
    if (selectedMemberName) {
      handleMemberPress(selectedMemberName, selectedAppointment.id);
    }
  }, [selectedMemberName]);

  const handlePress = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedItem(appointment);
    setModalVisible(true);
  };
  // Request 탐지
  const checkRequests = async () => {
    if (Flagflag) {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/check_requests?id=${userInfo.id}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        if (Flagflag) {
          console.log("Request1이 있습니다!");
          setAlert(data[0]);
          setModalVisible2(true);
        }
      }
    }
  };

  // Request2 탐지
  const checkRequest2 = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_server_uri}/api/check_request2?id=${userInfo.id}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      console.log("Request2가 있습니다!");
      setSelectedAppointment(data[0]);
      setReceivedRequest2(data[0]);
      setModalVisible3(true);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkRequest2, 5000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (Flagflag) {
      const intervalId = setInterval(checkRequests, 5000);

      return () => clearInterval(intervalId);
    }
  }, [Flagflag]);

  // 수락 버튼 동작
  const handleAccept = async () => {
    setAlert(null);
    setFlagflag(false);
    const location = await getLocationAsync();
    const response1 = await fetch(
      `${process.env.REACT_APP_server_uri}/api/update_request1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: alert.id,
          flag: 1,
        }),
      }
    );

    // request2 Table에 정보 삽입
    const response2 = await fetch(
      `${process.env.REACT_APP_server_uri}/api/insert_request2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          send_userid: alert.receive_userid,
          receive_userid: alert.send_userid,
          appointment_id: alert.appointment_id,
          latitude: location.coords.latitude, // 현위치 위도
          longitude: location.coords.longitude, // 현위치 경도
          flag: 0,
        }),
      }
    );
  };

  // 거절 버튼 동작
  const handleReject = async () => {
    setAlert(null);
  };

  // Modal3 닫기 버튼 누르면 request2 Table의 항목 flag 1로 수정
  const handleCloseModal3 = async () => {
    setFlagflag(true);
    const response = await fetch(
      `${process.env.REACT_APP_server_uri}/api/update_request2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: receivedRequest2.id,
          flag: 1,
        }),
      }
    );

    const data = await response.json();
    if (data.message === "request2 table updated!") {
      setModalVisible3(false);
    }
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_server_uri}/api/today_appointments?id=${userInfo.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        const appointmentsWithMemberInfoPromises = data.data.map(
          async (appointment) => {
            const membersInfo = await Promise.all(
              appointment.members.map((memberId) =>
                fetch(
                  `${process.env.REACT_APP_server_uri}/api/get_username_byid?id=${memberId}`
                ).then((response) => response.json())
              )
            );
            return { ...appointment, membersInfo };
          }
        );
        Promise.all(appointmentsWithMemberInfoPromises)
          .then(setAppointments)
          .catch((error) => console.error(error));
      });
  }, []);

  async function getPlace(lat, lng) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgWeh53QjAlUl9ECiymJ5rHWHrbJrNvPU`
    );
    return response.data;
  }

  getPlace(36.37410292330847, 127.36577209586405).then((data) => {
    if (data.status === "OK") {
    } else {
      console.log("No results found");
    }
  });

  const handleMemberPress = async (memberName, appointmentId) => {
    const response = await fetch(
      `${process.env.REACT_APP_server_uri}/api/get_userid_byname?name=${memberName}`
    );
    const data = await response.json();
    const receiverid = data;

    fetch(`${process.env.REACT_APP_server_uri}/api/send_request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send_userid: userInfo.id,
        receive_userid: receiverid,
        appointment_id: appointmentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.times);

    const formattedTime = date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedMembers = item.membersInfo
      ? item.membersInfo
          .map((memberInfo, index) => `멤버${index + 1}: ${memberInfo.name}`)
          .join("\n")
      : "Loading members...";

    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.appointmentContainer}>
          <Text style={styles.time}>{formattedTime}</Text>
          <Text style={styles.members}>{formattedMembers}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollcontainer}>
        <Text style={styles.profile_title}>오늘의 약속</Text>
        <View style={styles.separator} />
        {selectedAppointment &&
          selectedAppointment.latitude &&
          selectedAppointment.longitude &&
          receivedRequest2 && (
            <MapScreen
              selectedAppointment={selectedItem}
              receivedRequest2={receivedRequest2}
            />
          )}
        <FlatList
          contentContainerStyle={styles.list}
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                위치를 요청할 멤버를 고르세요.
              </Text>
              {selectedAppointment?.membersInfo ? (
                selectedAppointment?.membersInfo.map((memberInfo, index) => (
                  <Text
                    style={styles.TextinModal}
                    key={index}
                    onPress={() => setSelectedMemberName(memberInfo.name)}
                  >
                    {memberInfo.name}
                  </Text>
                ))
              ) : (
                <Text>Loading...</Text>
              )}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>위치 요청이 발생했습니다.</Text>
              <Text style={styles.modalText}>
                수락하시면 내 위치가 요청자에게 발송됩니다.
              </Text>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => {
                  // 수락 버튼 클릭
                  handleAccept();
                  setModalVisible2(false);
                }}
              >
                <Text style={styles.textStyle}>수락</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // 거절 버튼 클릭
                  handleReject();
                  setModalVisible2(false);
                }}
              >
                <Text style={styles.textStyle}>거절</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            setModalVisible3(false);
          }}
        >
          {!loading && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>위치 정보가 도착했습니다.</Text>
                <Text style={styles.modalText}>이름: {userName}</Text>
                <Text style={styles.modalText}>주소: {currentPlace}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleCloseModal3}
                >
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  profile_title: {
    padding: 20,
    alignItems: "flex-start",
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollcontainer: {
    backgroundColor: "white",
    flex: 1,
  },
  appointmentContainer: {
    backgroundColor: "#F5DA81",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: "#F5DA81",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  time: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  members: {
    fontSize: 14,
    marginBottom: 5,
  },
  place: {
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
    color: "grey",
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
    color: "grey",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  TextinModal: {
    fontSize: 20,
    margin: 10,
    marginBottom: 15,
    marginHorizontal: 50,
  },
});

export default WhereScreen;
