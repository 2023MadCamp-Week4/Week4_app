import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Image, Button, Modal, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import MultiSelectExample from "../../common/multiSelect";
import styles from "../../styles/styles";
import axios from "axios";


function MainScreen({ userInfo, navigation }) {
    const [appmtList , setAppmtList]  = useState([]);
    const [user, setUser] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalName, setModalName] = useState("");
    const [modalPlace, setModalPlace] = useState("");
    const [modalLocation, setModalLocation] = useState("");
    const [modalContent, setModalContent] = useState("");
    //date picker in modal
    const [date, setDate] = useState(new Date(1598051730000));
    const [dateMode, setDateMode] = useState('date');
    const [dateShow, setdateShow] = useState(false);
    const [modalMembers, setModalMembers] = useState([]);

    useEffect(() => {
        async function fetchFutureAppointments() {
            const response = await fetch(
            `${process.env.REACT_APP_server_uri}/api/future_appointments?id=${userInfo.id}`
            );
            const futureAppointmentsData = await response.json();
            setAppmtList(futureAppointmentsData.data || []);
        }
        fetchFutureAppointments();
    }, []);

    // Modal--------------------------------------------------------------
    //on date Change
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        set(false);
        setDate(currentDate);
    };

    // on date show change
    const showMode = (currentMode) => {
        setdateShow(true);
        setDateMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const addBtnOnPress = async () => {
        // add data on DATABASE
        setModalVisible(true)
    }
    const closeModal = () =>{
        setModalName("");
        setModalContent("");
        setDate(new Date(1598051730000));
        setModalMembers([]);
        setModalVisible(false)
    }

    const saveBtnOnPress = async () => {
        //appLocation  구하기. 
        const newData = {
            members:modalMembers,
            time: date.toLocaleString(),
            place: modalPlace,
            content: modalContent,
            location : modalLocation
        };
        appmtList.push(newData);
        await axios.post(`${process.env.REACT_APP_server_uri}/api/appointment_add`, newData)     
            .then((response) => {
                    console.log(response.data.message)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
       
    }
    //----------------- select people 
    const ModalComponent = () => {
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}   
            >
                <TextInput 
                    style={styles.input} 
                    placeholder="모임명"
                    value={modalName}
                    onChangeText={setModalName}/>
                <MultiSelectExample setModalMembers={setModalMembers}></MultiSelectExample>
                <TextInput 
                    style={styles.input} 
                    placeholder="장소"
                    value={modalPlace}
                    onChangeText={setModalPlace}/>
                <View style={styles.dateTimePicker}>
                    <Text>{date.toLocaleString()}</Text>
                    <Button style={styles.dateButton} onPress={showDatepicker} title="📆" />
                    <Button style={styles.dateButton} onPress={showTimepicker} title="⏰" />
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
                    onChangeText={setModalContent}/>
                <Button title="완료" onPress={saveBtnOnPress} />
            </Modal>
        )

    }
    
    // ITEM Component ----------------------------------------
    const ItemView = ({item}) => {
        return(
            <TouchableOpacity style={styles.itemBox} onPress={() => { navigation.navigate('WhereScreen', {itemData: item}) }} >
                <View style={styles.imageContainer}>
                </View>
                <View style={styles.valueBox}>
                        <Text>{item.place}</Text>
                        <Text style={styles.nickname}>{item.content}</Text>
                        <Text>{item.times}</Text>
                </View>
            </TouchableOpacity>
        );
    };

  return (
    <View >
      <ModalComponent/>
            <FlatList
                data={appmtList}
                renderItem={ItemView}
            />
            <Button title="추가하기" onPress={addBtnOnPress}/>
    </View>
  );
}


export default MainScreen;
