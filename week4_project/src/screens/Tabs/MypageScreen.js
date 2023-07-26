import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

function MypageScreen({ userInfo }) {
  const [name, setName] = useState("");
  const [stateMessage, setStateMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [pastAppointments, setPastAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [membersNames, setMembersNames] = useState([]);

  const openAppointmentDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible2(true);
  };

  useEffect(() => {
    async function fetchPastAppointments() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/past_appointments?id=${userInfo.id}`
      );
      const pastAppointmentsData = await response.json();
      console.log(pastAppointmentsData);
      setPastAppointments(pastAppointmentsData.data || []);
    }

    fetchPastAppointments();
  }, []);

  const openPastAppointment = () => {
    if (pastAppointments.length > 0) {
      setSelectedAppointment(pastAppointments[0]);
      setModalVisible2(true);
    }
  };

  useEffect(() => {
    async function fetchName() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/get_user?id=${userInfo.id}`
      );
      const userData = await response.json();
      setName(userData.name);
    }

    fetchName();
  }, []);

  useEffect(() => {
    async function fetchStateMessage() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/get_user_state_message?id=${userInfo.id}`
      );
      const userData = await response.json();
      setStateMessage(userData.stateMessage || "");
    }

    fetchStateMessage();
  }, []);

  const updateStateMessage = async () => {
    console.log(userInfo.id);
    const response = await fetch(
      `${process.env.REACT_APP_server_uri}/api/update_state_message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo.id,
          stateMessage: stateMessage,
        }),
      }
    );
    if (response.ok) {
      setModalVisible(false);
    }
  };

  const fetchUserNameById = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_server_uri}/api/get_username_byid?id=${userId}`
    );
    const userData = await response.json();
    return userData.name;
  };

  useEffect(() => {
    if (selectedAppointment) {
      const fetchMembersNames = async () => {
        const names = await Promise.all(
          selectedAppointment.members.map((memberId) =>
            fetchUserNameById(memberId)
          )
        );
        setMembersNames(names);
      };
      fetchMembersNames();
    }
  }, [selectedAppointment]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollcontainer}>
        <Text style={styles.profile_title}>내 프로필</Text>
        <View style={styles.separator} />
        <View style={styles.container}>
          <View style={styles.centercontainer}>
            <Image
              source={{ uri: userInfo.properties.profile_image }}
              style={styles.image}
            />
          </View>
          <View style={styles.information_row}>
            <Text style={styles.text2}>{"이름"}</Text>
            <Text style={styles.text3}>{name}</Text>
          </View>
          <View style={styles.information_row}>
            <Text style={styles.text2}>{"이메일"}</Text>
            <Text style={styles.text3}>{userInfo.kakao_account.email}</Text>
          </View>
          <View style={styles.information_row}>
            <Text style={styles.text2}>{"상태 메시지"}</Text>
            <Text style={styles.text3}>{stateMessage}</Text>
          </View>
          <View style={styles.btbt}>
            <TouchableOpacity
              style={styles.btstyle}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>상태 메시지 변경</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator2} />
        </View>
        <View>
          <Text style={styles.modalText2}>이전 약속</Text>
        </View>
        <View>
          {pastAppointments.map((appointment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openAppointmentDetail(appointment)}
            >
              <Text style={styles.appointmentText}>
                {new Date(appointment.times).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - " + appointment.place}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
            <Text style={styles.modalText}>상태 메시지 변경</Text>
            <TextInput
              style={styles.textinputView}
              value={stateMessage}
              onChangeText={setStateMessage}
            />
            <View style={styles.buttonContainer}>
              <Button title="완료" onPress={updateStateMessage} />
              <Button title="취소" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedAppointment ? (
              <View>
                {membersNames.map((name, index) => (
                  <Text key={index} style={styles.text}>
                    멤버 {index + 1}: {name}
                  </Text>
                ))}
                <Text style={styles.text}>
                  일시:{" "}
                  {new Date(selectedAppointment.times).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Text>

                <Text style={styles.text}>
                  장소: {selectedAppointment.place}
                </Text>
                <Text style={styles.text}>
                  내용: {selectedAppointment.content}
                </Text>
                <Text style={styles.text}>
                  위치:{" "}
                  {`위도: ${selectedAppointment.location.latitude}, 경도: ${selectedAppointment.location.longitude}`}
                </Text>
              </View>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button title="닫기" onPress={() => setModalVisible2(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  centercontainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "7%",
  },
  scrollcontainer: {
    backgroundColor: "white",
    flex: 1,
  },
  profile_title: {
    padding: 20,
    alignItems: "flex-start",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalText2: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  information_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "gray",
  },
  text2: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "gray",
  },
  text3: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "black",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
  separator2: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginTop: 20,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  appointmentText: {
    textAlign: "left",
    marginHorizontal: 40,
    marginBottom: 15,
    fontSize: 20,
    color: "gray",
  },
  textinputView: {
    marginTop: 15,
    fontSize: 30,
    marginBottom: -5,
  },
  btstyle: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  btbt: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MypageScreen;
