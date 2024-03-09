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
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const NearByTemplesSeeAll = ({navigation, route}) => {
  const {data} = route?.params || {};
  const isDarkMode = useColorScheme() === 'dark';

  const onSelect = data => {
     };
  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <View style={{height: '9%', marginTop: '3%'}}>
        <TopBarCard2 marginLeft={'16%'} back={true} txt={'Nearby Temples'} navigation={navigation} />
      </View>
      {!data?.length > 0 ? (
        <View style={styles.loaderContainer}>
          {/* <Loader color={colors.orangeColor} /> */}
          <FontAwesome5
                  name="gopuram"
                  size={50}
                  color={'orange'}
                  style={{marginBottom:'5%'}}
                 
                />
                <Text style={{fontFamily:'Poppins-Medium',color:'orange',fontSize:15}}>{'No Temples Available'}</Text>
        </View>
      ) : data?.length ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: '5%'}}>
          <FlatList
            data={data}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={
                  () => 
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    data: item,
                    onSelect: onSelect
                  })
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: item?.profileDTO?.logo
                        ? item?.profileDTO?.logo
                        : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                    }}
                    
                    style={{height: 72, width: 72, borderRadius: 70 / 2}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: isDarkMode ? 'black' : 'orange',marginTop:'15%',fontSize:17}}>
                      {item.profileDTO?.name}
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
            No Items To Display
          </Text>
        </View>
      )}
    </View>
  );
};
export default NearByTemplesSeeAll;

// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import MapView, { Marker } from '@mapmyindia/react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
 
// const API_KEY = 'YOUR_API_KEY'; // Replace with your actual key
 
// const NearByTemplesSeeAll = () => {
//   const [region, setRegion] = useState({
//     latitude: 0, // Initial location to be set to user's location
//     longitude: 0,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.02,
//   });
//   const [temples, setTemples] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     getLocation();
//   }, []); // Get location on initial render
 
//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         setRegion({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//         searchTemples();
//       },
//       (error) => {
//         setError('Error getting location: ' + error.message);
//       }
//     );
//   };
 
//   const searchTemples = async () => {
//     setIsLoading(true);
//     setError(null);
 
//     try {
//       const response = await fetch(
//         `https://api.mapmyindia.com/api/v1/places/nearbysearch/json?
//           location=${region.latitude},${region.longitude}&
//           radius=5000&
//           type=religious_place&
//           sub_type=temple&
//           api_key=${API_KEY}`
//       );
 
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
 
//       const data = await response.json();
 
//       if (data.results.length === 0) {
//         setTemples([]);
//         setError('No temples found in the specified radius.');
//       } else {
//         setTemples(data.results);
//       }
//     } catch (error) {
//       setError('Error fetching temples: ' + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
//   const renderTempleItem = ({ item }) => {
//     return(
//     <TouchableOpacity style={styles.templeItem}>
//      <Text> {item.name}</Text>
//       <Text>{item.address.formatted}</Text>
//       <Text>Distance: {item.distance} meters</Text>
//     </TouchableOpacity>
//  ) };
 
//   return (
//     <SafeAreaView style={styles.container}>
//       <MapView
//         region={region}
//         onRegionChange={setRegion}
//         style={styles.map}
//       >
//         {temples.map((temple) => (
//           <Marker
//             key={temple.id}
//             coordinate={{ latitude: temple.latitude, longitude: temple.longitude }}
//             title={temple.name}
//           />
//         ))}
//       </MapView>
//       <FlatList
//         data={temples}
//         renderItem={renderTempleItem}
//         keyExtractor={(item) => item.id}
//         ListHeaderComponent={() => (
//           <View style={styles.listHeader}>
//             <Text style={styles.headerText}>Nearby Temples</Text>
//           </View>
//         )}
//         ListFooterComponent={() => (
//           <View style={styles.listFooter}>
//             {isLoading && <Text>Loading...</Text>}
//             {error && <Text>Error: {error}</Text>}
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };
 
// const styles = StyleSheet.create({
//   // ... (Add your styling here)
// });
 
// export default NearByTemplesSeeAll;