import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  Image,
  Button,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import MultiSelectExample from "../../common/multiSelect";
import styles from "../../styles/styles";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Ionicons";

function MainScreen({ userInfo, navigation }) {
  const [appmtList, setAppmtList] = useState([]);
  const [user, setUser] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [allUserList, setAllUserList] = useState([]);

  useEffect(() => {
    async function fetchFutureAppointments() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/future_appointments?id=${userInfo.id}`
      );
      const futureAppointmentsData = await response.json();
      setAppmtList(futureAppointmentsData.data || []);
    }
    fetchFutureAppointments();

    async function fetchAllUserList() {
      const response = await fetch(
        `${process.env.REACT_APP_server_uri}/api/get_all_users`
      );
      const allUsersData = await response.json();

      setAllUserList(allUsersData || []);
    }
    fetchAllUserList();
  }, []);

  const addBtnOnPress = () => {
    setModalVisible(true);
  };

  //----------------- modal
  const ModalComponent = () => {
    const [modalName, setModalName] = useState("");
    const [modalPlace, setModalPlace] = useState("");
    const [modalLocation, setModalLocation] = useState({
      latitude: 37.51239355407258,
      longitude: 127.08445797334993,
    });
    const [modalContent, setModalContent] = useState("");
    const [modalMembers, setModalMembers] = useState([]);
    //date picker in modal
    const [date, setDate] = useState(new Date(1598051730000));
    const [dateMode, setDateMode] = useState("date");
    const [dateShow, setdateShow] = useState(false);

    // 현재 날짜와 시간을 구하는 함수
    const getCurrentDateTime = () => {
      return new Date();
    };
    //on date Change
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setdateShow(false);
      setDate(currentDate);
    };

    // on date show change
    const showMode = (currentMode) => {
      setdateShow(true);
      setDateMode(currentMode);
    };

    const showDatepicker = () => {
      showMode("date");
    };

    const showTimepicker = () => {
      showMode("time");
    };

    const closeModal = () => {
      setModalName("");
      setModalContent("");
      setDate(new Date(1598051730000));
      setModalMembers([]);
      setModalVisible(false);
    };

    const saveBtnOnPress = async () => {
      //appLocation  구하기.
      const currentDate = getCurrentDateTime();
      if (date < currentDate) {
        // 모달에서 선택한 날짜와 시간이 현재 날짜와 시간보다 이전인 경우
        alert("과거 날짜와 시간으로 약속을 추가할 수 없습니다.");
        return;
      }
      function formatDate(date) {
        var yyyy = date.getUTCFullYear();
        var mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // months from 0 to 11
        var dd = String(date.getUTCDate()).padStart(2, "0");
        var hh = String(date.getUTCHours()).padStart(2, "0");
        var mi = String(date.getUTCMinutes()).padStart(2, "0");
        var ss = String(date.getUTCSeconds()).padStart(2, "0");

        return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
      }
      const newDate = formatDate(date); // 출력: "2020-08-22 08:15:30"
      const newData = {
        members: modalMembers,
        times: newDate,
        place: modalPlace,
        content: modalContent,
        location: modalLocation,
      };
      console.log(newData, "checking Null");
      if (
        newData.members.length === 0 ||
        newData.place === "" ||
        newData.content === "" ||
        newData.location === ""
      ) {
        // One of the newData values is null or undefined
        alert("모든 필드를 채워주세요!");
        return; // Stop the function execution
      }

      fetch(`${process.env.REACT_APP_server_uri}/api/appointment_add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          appmtList.push(newData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      closeModal();
    };

    const onSearchPlace = (data, details) => {
      setModalPlace(data.description);
      const newLoc = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      setModalLocation(newLoc);
    };

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="arrow-back" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          <ScrollView nestedScrollEnabled={true}>
            <TextInput
              style={styles.input}
              placeholder="모임명"
              value={modalName}
              onChangeText={setModalName}
            />

            <MultiSelectExample
              allUserList={allUserList}
              setModalMembers={setModalMembers}
              style={styles.input}
            ></MultiSelectExample>

            <View style={styles.dateTimePicker}>
              <Text>{date.toLocaleString()}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.dateButton}
                >
                  <Text style={styles.buttonText}>📆</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={showTimepicker}
                  style={styles.dateButton}
                >
                  <Text style={styles.buttonText}> ⏰</Text>
                </TouchableOpacity>
              </View>
              {dateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={dateMode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="세부 내용"
              value={modalContent}
              onChangeText={setModalContent}
            />
            <TextInput
              style={styles.input}
              placeholder="장소"
              value={modalPlace}
              onChangeText={setModalPlace}
            />
            <GooglePlacesAutocomplete
              minLength={2}
              placeholder="장소를 검색해보세요!"
              query={{
                key: "AIzaSyCgWeh53QjAlUl9ECiymJ5rHWHrbJrNvPU",
                language: "ko",
                components: "country:kr",
              }}
              fetchDetails={true}
              onPress={(data, details) => {
                onSearchPlace(data, details);
              }}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={styles.search}
            />

            <TouchableOpacity onPress={saveBtnOnPress} style={styles.button}>
              <Text style={styles.buttonText}>저장하기 </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  // ITEM Component ----------------------------------------
  const ItemView = ({ item }) => {
    const deleteItem = (item) => {
      // 여기에 삭제를 위한 로직을 추가하세요.
      console.log(`Deleting item: ${item}`);
    };

    const updateItem = (item) => {
      // 여기에 수정을 위한 로직을 추가하세요.
      navigation.navigate("UpdateScreen", { itemData: item });
    };
    return (
      <TouchableOpacity style={styles.itemBox}>
        <View style={styles.valueBox}>
          <Text>{item.place}</Text>
          <Text style={styles.nickname}>{item.content}</Text>
          <Text style={styles.text}>
            일시:{" "}
            {new Date(item.times).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => deleteItem(item)}>
            <Text style={styles.buttonText}>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateItem(item)}>
            <Text style={styles.buttonText}> ⚙️</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container2}>
      <Text style={styles.profile_title}>약속 리스트</Text>
      <View style={styles.separator2} />
      <View>
        <ModalComponent />
        <FlatList
          data={appmtList}
          renderItem={ItemView}
          ListFooterComponent={() => (
            <TouchableOpacity onPress={addBtnOnPress} style={styles.button}>
              <Text style={styles.buttonText}>추가하기 </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;
