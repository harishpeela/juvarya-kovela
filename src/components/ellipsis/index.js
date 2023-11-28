import {View, Text, SafeAreaView, Modal, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
const Ellipsis = ({txtColor}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const ellipsisRef = useRef(null);

  const toggleModal = () => {
    if (ellipsisRef.current) {
      ellipsisRef.current.measure((height, px, py) => {
        setModalPosition({top: py + height, left: px});
        console.log('modalPosition is updating ' + height, px, py);
        setModalVisible(!modalVisible);
      });
    }
    console.log('it is calling in the console');
    setModalVisible(!modalVisible);
  };

  const closeToggleModal = () => {
    console.log('Close button is trigeering');
    setModalVisible(false);
  };
  return (
    <SafeAreaView>
      <Pressable onPress={closeToggleModal}>
        <View>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name="ellipsis-vertical"
              size={24}
              color={txtColor === undefined ? colors.black2 : txtColor}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
      {modalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <Pressable style={[styles.overlay]} onPress={closeToggleModal}>
            <View style={[styles.centeredView]}>
              <View style={[styles.modalView]}>
                <Text style={styles.modalText}>Blocked Users</Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};
export default Ellipsis;
