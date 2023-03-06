/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Data1} from '../../components/NearBy';
const NearByProducts = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowButton}>
          <BackIcon name="arrow-back" size={35} color={'orange'} />
        </TouchableOpacity>
        <Text style={styles.headText}>NearBy Products</Text>
      </View>
      <TouchableOpacity style={styles.iconfeed}>
        <Image
          source={require('../../../assets/images/feedback.png')}
          height={30}
          width={30}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
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
                  inSence Sticks
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
export default NearByProducts;
