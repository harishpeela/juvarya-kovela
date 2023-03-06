/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {styles} from './styles';
import IconSearch from 'react-native-vector-icons/AntDesign';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {Data1} from '../../components/NearBy';
const NearByServices = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowButton}>
          <BackIcon name="arrow-back" size={35} color={'orange'} />
        </TouchableOpacity>
        <Text style={styles.headText}>NearBy Services</Text>
      </View>
      {/* <TouchableOpacity /> */}
      <View style={styles.searchTabMain}>
        <View style={styles.searchTab}>
          <IconSearch name="search1" size={25} style={{marginHorizontal: 10}} />
          <TextInput placeholder="SearchHere" style={styles.searchTextInput} />
        </View>
        <TouchableOpacity style={styles.iconfeed}>
          <Image
            source={require('../../../assets/images/feedback.png')}
            height={30}
            width={30}
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginRight: 10, width: '100%'}}>
        <FlatList
          data={Data1}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <View style={styles.cardContainer}>
              <View style={styles.planCardView1}>
                <Text> {''} </Text>
              </View>
              <View style={{marginLeft: '10%', marginTop: 10}}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  services
                </Text>
                <Text style={{color: 'orange', fontSize: 16}}>$ {'250'} </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default NearByServices;
