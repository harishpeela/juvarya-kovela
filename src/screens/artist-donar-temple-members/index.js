import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {Artist_Donar_List_Card} from '../../components';
import {getArtistDonar} from '../../utils/api';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts} from '../../common';
const Artist_Donar_details_list = ({route, navigation}) => {
  const {data, id} = route?.params || {};
  const [artist, setArtistDonar] = useState();
  console.log('data ===', data);
  const artistDonar = async () => {
    let responce = await getArtistDonar(id, 0, 100);
    console.log('responce odf artist', responce?.data);
    if (responce?.status === 200) {
      setArtistDonar(responce?.data);
    } else {
      setArtistDonar([]);
    }
  };

  useEffect(() => {
    artistDonar();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarCard2
          txt={'Artist & Donor'}
          back={true}
          navigation={navigation}
          navBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={{marginHorizontal: '5%', marginTop: '3%'}}>
        <FlatList
          data={artist}
          keyExtractor={({item, index}) => item?.year}
          style={{}}
          renderItem={({item, index}) => (
            <Artist_Donar_List_Card
              onPressArtist={() =>
                navigation.navigate(allTexts.screenNames.addartist, {
                  id: id,
                })
              }
              data={item}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};
export default Artist_Donar_details_list;
