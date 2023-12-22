import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
// import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {allTexts} from '../../common';
import {useState} from 'react';
import { MemberShipCreate } from '../../utils/api';
// import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import Snackbar from 'react-native-snackbar';
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
});

const ForgetPassword = () => {
  const navigation = useNavigation();

  const [memType, setMemType] = useState();
  const [memName, setMemName] = useState();
  // const [memFee, setMemFee] = useState('');
  // const [memDur, setMemDur] = useState('');
  const [memberShip, setMemberShip] = useState([]);
  const submit = async () => {
    const payload = {
      name: 'commitee',
      profileId: 1,
      type: 'TEMPORARY',
    };
    try {
      // Invoke MemberShipInvite with the id and email
      let result = await MemberShipCreate(payload);
      console.log('result =>>>>>>>>>>>>' + result);
      if (result) {
        setMemberShip(result?.data);
        console.log('New_Member');
        console.log(result?.data);
        // Show a custom alert for a successful API call
        Snackbar.show({
          text: 'MemberShip Created Successfully',
          backgroundColor: 'green',
          duration: 2000,
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {
              <></>;
            },
          },
        });
        Alert.alert(
          'Create New MemberShip',
          'Navigating to MemberShips Screen',
          [
            {
              text: 'New',
              onPress: () => {
                setMemName(''), setMemType('');
              },
            },
            {
              text: 'Ok',
              onPress: () => navigation.pop(),
            },
          ],
          {cancelable: false},
        );
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('Error in sending the request', error);
      // Handle error and show an appropriate alert if needed
      Alert.alert(
        'Error',
        'Failed to Create MemberShip...Please try again.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const onPressDone = () => {
    if (memType == undefined) {
      Alert.alert(
        'INVALID INPUT',
        'Please Enter the type of the MemberShip.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (memName == undefined) {
      console.log('It is  printing inside the MemName');
      Alert.alert(
        'INVALID INPUT',
        'Please Enter the Name of the MemberShip.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else {
      submit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <View style={styles.logoStyle}></View> */}
        <Ionicons
          onPress={() => navigation.navigate(allTexts.screenNames.signin)}
          size={30}
          style={styles.backButton}
          color={'black'}
          name="arrow-back"
        />
      </View>
      {/* <Formik
       initialValues={{
         email:'',
         password:'',
         
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
        console.log('values', values);
      }}
     >
        {({ errors,touched,values,handleChange,handleBlur,handleSubmit }) => (
      <View style={styles.signupContainer}>
        <Text style={styles.text}>Forgot Password?</Text>
        <View style={styles.alrdContainer}>
        <Text style={styles.Alrdmember}>Don't worry we have got your back! Just enter your email and reset your password</Text>
        </View>
        <View style={styles.textinputContainer}>
        <MaterialIconsIcon name='alternate-email' color="#454545" size={19} style={styles.userIcon}/>
        <View style={styles.line} /> 
        <TextInput style={styles.textinput}
         placeholder='Email Address' 
         keyboardType='email-address'
         value={values.email}
         onChangeText={handleChange('email')}
         onBlur={handleBlur('email')}
         />
        </View>
        {errors.email && touched.email ? (
             <Text style={styles.errtxt}>{errors.email}</Text>
           ):null}
        <TouchableOpacity style={styles.signupButton}  onPress={() => handleSubmit()}>
          <Text style={styles.signupText}>SEND</Text>
        </TouchableOpacity>
      </View>
          )}
      </Formik> */}

      <TextInput
        style={styles.textinputContainer}
        placeholder="Type"
        onChangeText={v => setMemType(v)}
        value={memType}
      />
      <TextInput
        style={styles.textinputContainer}
        placeholder="MemberShip Name"
        onChangeText={v => setMemName(v)}
        value={memName}
      />



      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => handleSubmit()}>
        <Text style={styles.signupText}>SEND</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        {/* <View style={styles.loginTextLine}>
        <TouchableOpacity style={styles.loginTouchable} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login Again</Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  logoStyle: {
    height: 60,
    width: 20,
    backgroundColor: '#e4007c',
    marginTop: 10,
    borderRadius: 30,
    marginLeft: -10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    fontSize: 35,
    // fontFamily:'SedgwickAve-Regular',
    color: 'black',
    marginLeft: 15,
    marginTop: 10,
    height: 60,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  signupContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: '40%',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  Alrdmember: {
    fontSize: 15,
  },
  alrdContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLink: {
    color: '#e4007c',
    marginLeft: 5,
    fontSize: 18,
    marginBottom: 20,
  },
  textinputContainer: {
    // borderWidth:0.3,
    borderRadius: 50,
    // height:responsiveScreenHeight(5),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    backgroundColor: '#E5E4E2',
  },
  line: {
    borderWidth: 0.5,
    height: 30,
    marginLeft: 25,
  },
  textinput: {
    marginLeft: 20,
    fontSize: 14,
  },
  userIcon: {
    left: 10,
  },
  signupButton: {
    marginTop: 30,
    borderRadius: 20,
    height: 45,
    // height:responsiveScreenHeight(5),
    backgroundColor: 'orange',
    justifyContent: 'center',
    fontSize: 14,
  },
  signupText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  emailIcon: {
    left: 10,
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginBottom: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '3%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginTextLine: {
    borderTopWidth: 0.2,
    width: '90%',
    marginTop: '30%',
  },
  backButton: {
    marginTop: '2%',
    marginLeft: '2%',
  },
  
  errtxt: {
    marginLeft: 55,
    marginTop: 10,
    color: '#FFA001',
  },
});
