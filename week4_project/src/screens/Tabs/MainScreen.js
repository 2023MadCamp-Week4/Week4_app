import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Image, Button, Modal, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import MultiSelectExample from "../../common/multiSelect";
import styles from "../../styles/styles";

function MainScreen({ userInfo, navigation }) {
  console.log(userInfo);
   const DATA= [{
        id:"0", 
        name:"지민",
        members:[1, 2, 3],
        time: "2023-07-21 13:10",
        place: "shin non",
        content: "meeting",
        imageUri:2
    },{
        id:"1", 
        name:"밥밥",
        members:[1, 2, 5],
        time: "2023-07-21 13:10",
        place: "s",
        content: "meeting",
        imageUri:1
    }];
    const [appmtList , setAppmtList]  = useState(DATA);
    const [user, setUser] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalName, setModalName] = useState("");
    const [modalPlace, setModalPlace] = useState("");
    const [modalContent, setModalContent] = useState("");
    //date picker in modal
    const [date, setDate] = useState(new Date(1598051730000));
    const [dateMode, setDateMode] = useState('date');
    const [dateShow, setdateShow] = useState(false);

    const [modalMembers, setModalMembers] = useState([]);

    useEffect(() =>{
        // API 로부터 데이터 받아서 FETCH
    },[appmtList])
   
    
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
        const newData = {
            id:"5",
            name:modalName,
            members:modalMembers,
            time: date.toLocaleString(),
            place: modalPlace,
            content: modalContent,
            imageUri:""
        }
        appmtList.push(newData) //await
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
                        <Text>{item.name}</Text>
                        <Text style={styles.nickname}>{item.id}</Text>
                        <Text>{item.time}</Text>
                </View>
            </TouchableOpacity>
        );
    };

  return (
    <View style={styles.container}>
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
