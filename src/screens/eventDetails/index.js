import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import React, {useState, useEffect} from 'react';
import {colors, allTexts} from '../../common';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import FontAwsIcon from 'react-native-vector-icons/FontAwesome';
import Card from '../../common/Card';
import { IntrestedEvents, Event_Highlights,Event_Info } from '../../utils/api';
import { FlatList } from 'react-native-gesture-handler';
const EventDetails = ({ navigation, route }) => {
  const { item } = route?.params || {};
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [Info, setInfo] = useState([]);
  const EventsIntrested = async () => {
    let payload = {
      eventId: item?.id,
      interested: true,
    };
    // console.log('payload', payload);
    try {
      let result = await IntrestedEvents(payload);
      // console.log('result of intrested', result?.data);
    } catch (error) {
      console.log('error in event details intresteed api', error);
    }
  }
  // console.log('item ', item);
const EventHighLights = async() => {
  try{
    let result = await Event_Highlights(item?.id);
    // console.log('res of hightlightevents', result?.data);
    if(result?.data){
      setHighlights(result?.data);
    } else {
      setHighlights([]);
    }
  } catch(error){
    console.log('error in event highlights screen api', error);
  }
}
useEffect(() => {
  EventHighLights();
}, []);

const EventInfo = async() => {
  console.log('item?.id', item?.id)
  try{
    let result = await Event_Info(item?.id);
    console.log('res of info', result?.data);
    if(result?.data){
      setInfo(result?.data);
    } else {
      setInfo([]);
    }
  } catch(error){
    console.log('error in event Info screen api', error);
  }
  
}
console.log("info ",Info)

useEffect(() => {
  EventInfo();
}, [item]);



  const renderHighlight = () => {
    return (
      highlights?.length ? (
        <FlatList 
        data={highlights}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <Card style={styles.highLightCard}>
          <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.editHightlights, {
            item: item,
          })} style={{marginLeft:'94%',marginBottom:'-3%',backgroundColor:'orange',height:25,width:25,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
          <EntypoIcon
              name="edit"
              size={13}
              style={{color:'white'}}
              
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../../assets/images/tempimg1.jpg')}
              style={styles.img1}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.tab3}>{item?.highLight} </Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={{ width: 250 }}>
                {item?.description}
              </Text>
            </View>
          </View>
        </Card>
        )}
      />
      ): (
        <TouchableOpacity 
        style={{justifyContent:'center',alignItems:'center', marginTop: '20%'}}
        onPress={()=> navigation.navigate(allTexts.screenNames.savehighlight, {
          id: item?.id
        })}>
        <Text style={{color: colors.blue}}>+ No Highlights here at this time</Text>
       </TouchableOpacity>
      )
    )
  };

  const renderInfo = () => {
    return Info ? 
      <Card>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.tab2Text}>{Info[0]?.information}</Text>
          <View
            style={{
              marginBottom: '-3%',
              backgroundColor: 'orange',
              height: 25,
              width: 25,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() =>navigation.navigate(allTexts.screenNames.editInfo,{data: Info?.data})}>
            <EntypoIcon name="edit" size={13} style={{color: 'white'}} />
            </TouchableOpacity>
            
          </View>
        </View>
        {/* <Text>
        {Info?.data[0]?.eventDto?.description}
        </Text> */}
      </Card>
      :
      <TouchableOpacity 
      style={{justifyContent:'center',alignItems:'center', marginTop: '20%'}}
      onPress={()=> navigation.navigate(allTexts.screenNames.info, {
        data: item
      })}
     >
      <Text style={{color: colors.blue}}>+ No info here at this time</Text>
     </TouchableOpacity>
    
  };

  const renderContribute = (contribute = false) => {
    return contribute ? 
      <Card style={styles.contributeCard}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '110%',
          }}>
          <Text
            style={{
              backgroundColor: colors.orangeColor,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            Temple
          </Text>
          <View
            style={{
              backgroundColor: 'orange',
              height: 25,
              width: 25,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EntypoIcon name="edit" size={13} style={{color: 'white'}} />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Image
            style={styles.tab1Img}
            source={require('../../../assets/images/tempimg1.jpg')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.tab1Text}>Holi Festival</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesignIcon name="heart" size={15} color={colors.orangeColor} />
            <Text style={styles.tab1Name}>Shiva prasad</Text>
          </View>
        </View>
      </Card>
      :
      <TouchableOpacity 
      style={{justifyContent:'center',alignItems:'center', marginTop: '20%'}}
      onPress={()=> navigation.navigate(allTexts.screenNames.editContribute)}>
      <Text style={{color: colors.blue}}>+ No contributes here at this time</Text>
     </TouchableOpacity>
    
  }
  const actionsArr = [
    {
      id: 1,
      label: 'Highlights',
      component: renderHighlight,
      activeTab: false,
    },
    {
      id: 2,
      label: 'Info',
      component: renderInfo,
      activeTab: false,
    },
    {
      id: 3,
      label: 'Contribute',
      component: renderContribute,
      activeTab: false,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{borderWidth: 0}}>
        <View style={{minHeight: '10%'}}>
          <TopBarCard2
            txt={'Event Details'}
            arrow={true}
            onPress={() => navigation.goBack()}
          />
        </View>
        {item?.mediaList ? (
            <ImageBackground
            source={{uri: item?.mediaList[activeImgIndex]?.url}}
            style={styles.bgImg}
            imageStyle={styles.bgImg1}>
            <View style={styles.bgContainer}>
              <AntDesignIcon
                name="left"
                size={20}
                color="white"
                disabled={activeImgIndex === 0}
                onPress={() => setActiveImgIndex(imgIndex => imgIndex - 1)}
              />
              <AntDesignIcon
                name="right"
                size={20}
                color="white"
                disabled={activeImgIndex === item?.mediaList?.length - 1}
                onPress={() => setActiveImgIndex(imgIndex => imgIndex + 1)}
              />
            </View>
            <View style={styles.multiImgs}>
              {item?.mediaList?.map((url, index) => {
                return (
                  <TouchableOpacity
                    style={styles.clickImg}
                    onPress={() => setActiveImgIndex(index)}
                    key={url?.id?.toString()}>
                    <Image
                      source={{uri: url?.url}}
                      style={{height: 50, width: 50, borderRadius: 10}}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ImageBackground>
        ): (
          <ImageBackground
          source={{uri: 'https://fanfun.s3.ap-south-1.amazonaws.com/17065220870951706522085550.jpg'}}
          style={styles.bgImg}
          imageStyle={styles.bgImg1} />
        )}
        <View>
          <View style={styles.eveName}>
            <F5Icon name="archway" size={30} color={colors.orangeColor} />
            <Text style={styles.eveText}>{item?.name} </Text>
          </View>
        </View>
        <View style={styles.dateCon}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontisoIcon
              style={styles.dateIcon}
              name="date"
              size={20}
              color="white"
            />
            <Text style={styles.dateText}>
              {item?.creationTime.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.locCon}>
            <FontAwsIcon
              style={styles.locIcon}
              name="location-arrow"
              size={20}
              color="white"
            />
            <Text style={styles.locText}>Anakapalle</Text>
          </View>
        </View>
        <View style={styles.underline}></View>
        <View style={{flexDirection: 'row'}}>
          {actionsArr.map((action, index) => {
            return (
              <TouchableOpacity
                key={action?.id?.toString()}
                onPress={() => setActiveTabIndex(index)}
                style={{
                  backgroundColor:
                    activeTabIndex === index ? colors.orangeColor : '#dddddd',
                  borderRadius: 30,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: activeTabIndex === index ? 'white' : 'grey',
                    fontWeight: '400',
                  }}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{margin: 10}}>
          {actionsArr[activeTabIndex].component()}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => EventsIntrested()}>
          <Text style={styles.btnText}>Interested</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetails;
