import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BackgroundImage, NearBy, UpComingEvents} from '../../components';
import {styles} from './style';
import ApplicationContext from '../../utils/context-api/Context';
import {
  getMoreExploreAPI,
  getPopularTemples,
  getSearchedTemple,
} from '../../utils/api';
import {allTexts} from '../../common';
import {getUserDetails} from '../../utils/preferences/localStorage';
import Snackbar from 'react-native-snackbar';

const Search = ({navigation}) => {
  const {userDetails, setUserDetails} = useContext(ApplicationContext);
  const [popTemples, setPopTemples] = useState([]);
  const [moreExploreTemples, setMoreExploreTemples] = useState([]);
  const [popTempleLoader, setPopTempleLoader] = useState(false);
  const [moreExploreLoader, setmoreExploreLoader] = useState(false);
  useEffect(() => {
    getLatestTemples();
    if (!userDetails?.username) {
      getDetails();
    }
  }, []);
  // console.log('popTemples', popTemples);
  const getDetails = async () => {
    let result = await getUserDetails();
    setUserDetails(result);
  };

  const getLatestTemples = async () => {
    try {
      setPopTempleLoader(true);
      let response = await getPopularTemples(0);
      // console.log('response', response?.data);
      if (response && response.status === 200) {
        // console.log('Latest Temples API Calling response', response);
        setPopTempleLoader(false);
        const {
          data: {items},
        } = response || {};
        setPopTemples(items);
      } else {
        Snackbar.show({
          text: allTexts.constants.noInternet,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Try again',
            textColor: 'green',
            onPress: () => {
              getLatestTemples();
            },
          },
        });
      }
    } catch (error) {
      console.log('Newtwork Error 786', error);
    }
    try {
      setmoreExploreLoader(true);
      let moreTempleResponse = await getMoreExploreAPI(0, 10);
      // console.log('more exam', moreTempleResponse?.data);
      if (moreTempleResponse && moreTempleResponse.status === 200) {
        setmoreExploreLoader(false);
        const {
          data: {items: moreTemple},
        } = moreTempleResponse || {};
        setMoreExploreTemples(moreTemple);
        // console.log('55555555555555555555555555', moreTemple);
        // console.log('temppppppppppp', moreExploreTemples);
      }
    } catch (error) {
      console.log('Newtwork Error  786 --->', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <View style={{marginTop: '10%'}}>
        <NearBy />
        <UpComingEvents />
      </View>
    </ScrollView>
  );
};
export default Search;
