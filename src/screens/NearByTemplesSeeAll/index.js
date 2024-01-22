/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {Loader} from '../../components';
const NearByTemplesSeeAll = ({navigation, route}) => {
  const {data} = route?.params || {};
  const isDarkMode = useColorScheme() === 'dark';
  const [popTemples, setPopTemples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPageNo, setApiPageNo] = useState(0);
 
  console.log('pop see all temples', popTemples);
  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="caret-back-circle"
            size={36}
            color={'#ffffff'}
            style={{alignSelf: 'flex-start', justifyContent: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>{'All Temples'}</Text>
      </View>
      {!data?.length > 0 ? (
        <View style={styles.loaderContainer}>
          {/* <Loader color={colors.orangeColor} /> */}
          <Text>No items to display</Text>
        </View>
      ) : data?.length ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: '5%'}}>
          <FlatList
            data={data}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => alert('page under development')
                  // navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                  //   data: item,
                  // })
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: item?.logo
                        ? item?.logo
                        : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
                    }}
                    style={{height: 60, width: 60, borderRadius: 70 / 2}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: isDarkMode ? 'black' : 'black'}}>
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        maxWidth: '90%',
                        color: isDarkMode ? 'black' : 'black',
                      }}>
                      {item.description}{' '}
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
export default NearByTemplesSeeAll;
