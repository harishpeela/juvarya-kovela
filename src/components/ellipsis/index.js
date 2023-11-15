import {View, Text, SafeAreaView, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
const Ellipsis = ({txtColor}) => {
  // const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const toggleModal = () => {
    console.log('it is calling in the console');
    setModalVisible(!modalVisible);
  };
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={toggleModal}>
          {/* <Icon name="ellipsis-v" size={24} color={txtColor === undefined ? (colors.black2):txtColor} /> */}
          <Icon
            name="ellipsis-vertical"
            size={24}
            color={txtColor === undefined ? colors.black2 : txtColor}
          />
        </TouchableOpacity>
      </View>
      {modalVisible ? (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Show Blocked Contacts</Text>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={[styles.button, styles.openButton]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>View List</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};
export default Ellipsis;
