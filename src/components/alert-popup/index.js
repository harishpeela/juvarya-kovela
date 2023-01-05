import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './style';

export const SweetAlert = ({
  onPress,
  onDeletePress,
  login,
  heading,
  text,
  buttonText1,
  buttonText2,
  isSuccess,
  delAcc,
  closeIcon,
  visible,
  children,
  onBackDrop,
}) => {
  return (
    <Modal
      isVisible={visible}
      statusBarTranslucent={true}
      onBackdropPress={onBackDrop}
      coverScreen={false}
      backdropOpacity={0}
      animationIn="bounce"
      animationOut="fadeInLeft"
      style={styles.modal}>
      {children}
    </Modal>
  );
};
