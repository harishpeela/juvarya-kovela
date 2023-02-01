import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './style';

export const SweetAlert = ({visible, children, onBackDrop}) => {
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
