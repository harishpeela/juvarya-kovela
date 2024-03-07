import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Loader, SearchBar} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {AdminTemples, deleteCommunityTemple} from '../../utils/api';
import {FavTempleListCard} from '../../components';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

const MyTemples = ({navigation}) => {
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  const deleteSeasonal = (id) => {
    // console.log('=====', id)
    Alert.alert('Alert', 'Are You Sure You Want To Delete This Temple ?', [
      { text: 'Yes', onPress: async () => {
        let responce = await deleteCommunityTemple(id);
      //  console.log(responce?.data, 'responce of delete');
       if(responce){
        AdminTempleDetails();
       }
      }, style: 'destructive' },
      { text: 'No', onPress: () => console.log('Cancel Pressed') },
    ])
  }

  const AdminTempleDetails = async () => {
    setLoading(true);
    try {
      let result = await AdminTemples();
      console.log('admin', result?.data)
      let adminData = result?.data;
      if(adminData){
      setTempleList(adminData);
      setFilteredArray(adminData);
      setLoading(false);
      } else{
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('error in admin temples', error);
    }
  };
  useEffect(() => {
    AdminTempleDetails();
  }, []);

  const onSelect = data => {};
  const performFilter = value => {
    setFilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };
  const MyCustShare = async item => {
    const ShareOptions = {
      message: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      URL: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
      title: 'https://play.google.com/store/apps/dev?id=7922971542322060805',
    };
    const options = {
      message: item.jtProfileDTO?.name,
      URL: item.jtProfileDTO?.logo,
      title: item.jtProfileDTO?.desciption,
    };
    try {
      const shareResponce = await Share.open(ShareOptions, options);
      return shareResponce;
    } catch (error) {
      console.log('error in share', error);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{minHeight: 120, marginTop: '3%'}}>
        <TopBarCard2
          isPlus={true}
          txt={'Communities'}
          marginLeft={'15%'}
          back={true}
          navigation={navigation}
        />
      </View>

      <View style={styles.cardContainer}>
        {loading === true ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.green} />
          </View>
        ) : (
          [
            filteredArray?.length ? (
              <FlatList
                data={filteredArray}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item, index) => item?.id}
                renderItem={({item, index}) => {
                  if (item?.name) {
                    return (
                      <FavTempleListCard
                        name={item.name}
                        location={item.line1}
                        date={item.creationTime}  
                        onSharePress={() => MyCustShare(item)}                    
                        img={item?.logo}
                        seasonal={item?.seasonal}
                        type={'Community Temple'}
                        onPressDelete={() => deleteSeasonal(item?.id)}
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.viewtempleprofile,
                            {
                              data: item,
                              onSelect: onSelect,
                            },
                          );
                        }}
                      />
                    );
                  }
                }}
              />
            ) : (
              <View style={styles.loaderContainer}>
                <FontAwesome5 name="gopuram" size={50} color={'orange'} />
                <Text
                  style={styles.noAvailable}
                  onPress={() =>
                    navigation.navigate(allTexts.screenNames.communityTemple)
                  }>
                  {'Create Your Community Temple'}
                </Text>
              </View>
            ),
          ]
        )}
        {searchedText && !filteredArray?.length ? (
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: colors.orangeColor,
              marginTop: '3%',
            }}>
            No Temples To Display
          </Text>
        ) : (
          ''
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyTemples;