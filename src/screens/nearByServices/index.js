/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {BackgroundImage} from '../../components';
import {styles} from './styles';
import IconSearch from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Data1} from '../../components/NearBy';
const NearByServices = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ChangeModel = bool => {
    setIsVisible(bool);
  };
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
        </TouchableOpacity>
        <Text style={styles.headText}>NearBy Services</Text>
      </View>
      <View style={styles.searchTabMain}>
        <View style={styles.searchTab}>
          <IconSearch name="search1" size={25} style={{marginHorizontal: 10}} />
          <TextInput placeholder="SearchHere" style={styles.searchTextInput} />
        </View>
        <TouchableOpacity
          style={styles.iconfeed}
          onPress={() => ChangeModel(true)}>
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
