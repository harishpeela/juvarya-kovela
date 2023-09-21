/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../../common';
const ContactModal = ({isModal, setIsModal}) => {
  return (
    <Modal visible={isModal} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.bar} />
        <Text style={styles.header}>Contact Details</Text>
        <View style={styles.detailsView}>
          <View>
            <Text style={styles.text}>Temple Creator </Text>
            <Text style={styles.text2}> Contact</Text>
          </View>
          <View>
            <Text style={styles.text}>: Juvarya Technologies</Text>
            <Text style={styles.text2}>: 9999999999</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setIsModal(false)}
          style={styles.button}>
          <Text style={{color: colors.white, fontSize: 16, fontWeight: 'bold'}}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '70%',
    backgroundColor: 'white',
    marginTop: '60%',
    margin: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  header: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 20,
    color: colors.black,
  },
  button: {
    width: 90,
    padding: 10,
    backgroundColor: colors.orangeColor,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '40%',
    borderRadius: 10,
  },
  detailsView: {marginTop: '20%', flexDirection: 'row', marginLeft: 10},
  text: {fontSize: 18, color: colors.black},
  text2: {fontSize: 18, color: colors.black, marginTop: 5},
});
export default ContactModal;
