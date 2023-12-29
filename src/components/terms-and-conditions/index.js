import React from 'react';
import {
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {colors} from '../../common';
export const Terms_And_Conditions = ({isModal, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal
      visible={isModal}
      transparent={true}
      animationType="slide"
      style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={{...styles.header, marginTop: 20}}>
          Terms &Conditions for Kovela App
        </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          The Temple Update App (the "App") and the services made available
          through it are subject to the terms and conditions set out in this
          document (the "Terms"). You acknowledge and accept that you are bound
          by these Terms by using the App. Please don't use the App if you
          disagree with these Terms.
        </Text>
        <Text style={styles.header}>1. Using apps</Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          1.1. In order to use this app, you must be at least 18 years old. By
          utilizing the App, you guarantee that you are at least 18 years old.
        </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          1.2. You acknowledge that you will only use the App for the updates
          and information it is designed to deliver about the temple.
        </Text>
        <Text style={styles.header}>2.User's Accounts</Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          2.1. In order to use some App features, you might need to register for
          an account. The confidentiality of your account information and all
          activities that take place under it are your responsibility. 2.2. By
          making an account, you commit to submit true, current, and complete
          information. You also agree to update your information as needed to
          keep it true.{' '}
        </Text>
        <Text style={styles.header}>3.Content </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          3.1.The App might let you post, upload, or otherwise submit material.
          You thereby provide us a non-exclusive, worldwide, royalty-free,
          perpetual, irrevocable, and sublicensable right to use, reproduce,
          modify, adapt, publish, translate, distribute, and display such
          content. 3.2. You acknowledge that you are solely responsible for the
          content that you upload to the App and that you will not upload any
          material that violates these terms, is objectionable, illegal, or
          infringes on the rights of any third party.{' '}
        </Text>
        <Text style={styles.header}>4. Security</Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          4.1. Our Privacy Policy controls how personal data obtained through
          the App is gathered, used, and shared. You agree to the terms of our
          Privacy Policy by using the App.{' '}
        </Text>
        <Text style={styles.header}>5. The conclusion </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          5.1. We reserve the right, in our sole discretion, and without prior
          warning, to suspend or terminate your access to the App for any
          reason, including but not limited to a violation of these Terms.{' '}
        </Text>
        <Text style={styles.header}>6. Disclamations </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          6.1. The App is supplied "as is" and without any express or implied
          warranties of any kind. The accuracy and completeness of the data made
          available through the App are not guaranteed by us.{' '}
        </Text>
        <Text style={styles.header}>7.Limitation of Liability </Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          7.1. To the fullest extent allowed by applicable law, we will not be
          responsible for any indirect, incidental, special, consequential, or
          punitive damages, any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses resulting from your use of the App.{' '}
        </Text>
        <Text style={styles.header}>8. Regulatory Law</Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          8.1. Without regard to its rules on conflicts of law, the laws of
          [Your Jurisdiction] govern these terms and their interpretation.{' '}
        </Text>
        <Text style={styles.header}>9. Information for Contact</Text>
        <Text style={{...styles.peragraph, color: isDarkMode ? 'black' : 'black'}}>
          9.1 You can reach us at [Your Contact Information] with any questions
          or concerns you may have regarding these Terms.{' '}
        </Text>
        <Text style={{...styles.conclusion, color : isDarkMode ? 'black' : 'black'}}>
          These Terms and Conditions are accepted by you by using the Temple
          Update App. You're welcome for utilizing our app.{' '}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '90%',
    margin: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 1.16,
    elevation: 20,
    borderRadius: 30,
    padding: 15,
  },
  mainContainer: {
    marginTop: 10,
    // borderRadius: 80,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orangeColor,
  },
  peragraph: {
    fontSize: 14,
    margin: 10,
    // color: isDarkMode
  },
  conclusion: {
    fontSize: 15,
  },
  button: {
    height: 50,
    width: 90,
    backgroundColor: colors.orangeColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: colors.white,
  },
});
