/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getProfileNearByTemples } from '../../utils/api';
const Profile_Near_By_Temples = ({navigation, route}) => {
  const {jtProfile} = route?.params || {};
  const isDarkMode = useColorScheme() === 'dark';
const [data, setData] = useState([]);
  const onSelect = data => {
     };

    const NearByTemples = async() => {
        let responce = await getProfileNearByTemples(0, 20, jtProfile);
        console.log('responce', responce?.data)
        if(responce?.status === 200){
            setData(responce?.data?.data);
        } else {
            alert('something went wrong');
        }
    } 
    useEffect(() => {
        NearByTemples();
    }, []);
  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <View style={{minHeight: '15%'}}>
        <TopBarCard2 back={true} txt={'Near By Temples'} navigation={navigation} />
      </View>
      {!data?.length ? (
        <View style={styles.loaderContainer}>
          <FontAwesome5
                  name="gopuram"
                  size={50}
                  color={'orange'}
                  style={{marginBottom:'5%'}}
                 
                />
                <Text style={{fontFamily:'Poppins-Medium',color:'orange',fontSize:15}}>{'No Temples Available'}</Text>
        </View>
      ) : data ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: '5%'}}>
          <FlatList
            data={data}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.card}
                >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: item?.toProfile?.logo
                        ? item?.toProfile?.logo
                        : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
                    }}
                    
                    style={{height: 60, width: 60, borderRadius: 70 / 2}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: isDarkMode ? 'black' : 'orange',marginTop:'10%'}}>
                      {item.fromProfile?.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        maxWidth: '90%',
                        color: isDarkMode ? 'black' : 'orange',
                      }}>
                      {/* {item.description}{' '} */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            // ListFooterComponent={renderLoder}
            // onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
          />
        </ScrollView>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{color: colors.orangeColor, fontWeight: 'bold'}}>
            {' '}
            No items to displayy
          </Text>
        </View>
      )}
    </View>
  );
};
export default Profile_Near_By_Temples;