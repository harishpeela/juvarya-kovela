/* eslint-disable react/react-in-jsx-scope */
import {Text, View, ScrollView} from 'react-native';
import {styles} from './style';
// import RadioButton from '../../components/RadioButton';
import {Switch} from '@react-native-material/core';
import {RadioButton, PageHeader, TempleInput} from '../../components';
const AddTempleNew = ({navigation}) => {
  return (
    <View style={styles.container}>
      <PageHeader
        pageTitle={'Add Temples'}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.formContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subFormHeading}>Details</Text>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Name of Temple'}
              placeholder={'Type here'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Description'}
              placeholder={'Type here'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Date of Establishment'}
              placeholder={'Type here'}
              width={'100%'}
            />
          </View>
        </View>

        <View style={styles.subFormContainer}>
          <Text style={styles.subFormHeading}>Address</Text>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 1'}
              placeholder={'Address Line 1'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 2'}
              placeholder={'Adress Line 2'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Address Line 3'}
              placeholder={'Adress Line 3'}
              width={'100%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Pincode'}
              placeholder={'Enter Pincode'}
              width={'40%'}
            />
            <TempleInput
              label={'State'}
              placeholder={'Enter State'}
              width={'50%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Latitude'}
              placeholder={'Enter Latitude'}
              width={'45%'}
            />
            <TempleInput
              label={'Longitude'}
              placeholder={'Enter Longitude'}
              width={'45%'}
            />
          </View>
        </View>

        <View style={styles.subFormContainer}>
          <Text style={styles.subFormHeading}>Drop Location Pin</Text>
          <View style={styles.mapContainer} />
        </View>

        <View style={styles.subFormContainer}>
          <Text style={styles.subFormHeading}>Miscellaneous</Text>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Category'}
              placeholder={'Select Category'}
              width={'70%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <TempleInput
              label={'Communities'}
              placeholder={'Select Community'}
              width={'70%'}
            />
          </View>
          <View style={styles.subFormElement}>
            <Text style={styles.choiceText}>Popular Temple</Text>
            <View>
              <Text>
                Yes &nbsp;
                <RadioButton selected={true} />
              </Text>
            </View>
            <View>
              <Text>
                No &nbsp;
                <RadioButton selected={false} />
              </Text>
            </View>
          </View>
          <View style={styles.subFormElement}>
            <Text style={styles.choiceText}>Seasonal</Text>
            <Switch value={true} />
          </View>
        </View>

        {/* <View style={styles.buttonContainer}>
                <Text>Seasonal</Text>
            </View> */}
      </ScrollView>
    </View>
  );
};

export default AddTempleNew;
