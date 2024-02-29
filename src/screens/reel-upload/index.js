import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { saveReels } from "../../utils/api";
import { TopBarCard2 } from "../../components/topBar1/topBarCard";
import { style } from "./styles";
import Video from "react-native-video";
import Feather from 'react-native-vector-icons/Feather';
import { allTexts, colors } from "../../common";
import { Loader } from "../../components";
import { launchImageLibrary } from "react-native-image-picker";
import {EventInput} from "../../components/eventCreateInput";
const ReelUpload = ({navigation, route}) => {
    const {id} = route.params || {};
    const videoRef = useRef(null);
    const [videoRes, setVideoRes] = useState(null);
    const [imgLoader, setImgLoader] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [description, setDescription] = useState('');
    const [isVideo, setIsVideo] = useState(false);
    const [loader, setLoader] = useState(false);
    const onBuffer = buffer => {
        console.log('buffring', buffer);
      };
      const onError = error => {
        console.log('error', error);
      };
    
      const [mute, setMute] = useState(false);
    
    async function requestCameraPermission() {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.GALLERY,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to take pictures.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          uploadVideo(); // Call your function to launch the camera
        } else {
          console.log('Camera permission denied');
        }
      }
      const uploadVideo = () => {
        setImgLoader(true);
        try {
          launchImageLibrary(
            {
              mediaType: 'video',
              require: 'video',
              includeBase64: true,
            },
            res => {
              if (!res?.didCancel) {
                console.log('Image URI:', res?.assets[0]?.uri);
                // setVideoRes(res?.assets[0]?.url);
                setImgLoader(false);
                let video = getImageObj(res?.assets[0]?.uri);
                console.log('video state', video);
                setVideoRes(video)
                setIsVideo(true)

              } else {
                console.log(res?.errorMessage);
                setImgLoader(false);
              }
            },
          );
        } catch (error) {
          console.error(error);
        }
      };
    
      const uploadVideoToServer = async () => {
        setLoader(true);
        // console.log('videourl', videoUri);
        // let video = getImageObj(videoUri);
        const formdata = new FormData();
        formdata.append("description", description);
        formdata.append("jtProfile", "1" );
        formdata.append('files', videoRes);
        console.log('formdata', formdata?._parts);
        let responce = await saveReels(formdata)
        console.log('responce', responce?.data?.message);
        if(responce?.data?.message === "Reel uploaded"){
            navigation.navigate(allTexts.tabNames.kovelareels);
            setLoader(false);
        } else {
            alert('something went wrong')
            setLoader(false);
        }
      };
    
      const getImageObj = video => {
        let imageObj = {
          uri: video,
          name: 'myvideo.mp4',
          type: 'video/mp4',
        };
        return imageObj;
      };
console.log('videiisjnns', isVideo);
    return(
        <View style={style.container}>
            <View style={{height: '10%'}}>
                <TopBarCard2 back={true} txt={'Upload Reel'} navigation={navigation} marginLeft={'22%'} />
            </View>
            {isVideo ? (
                <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => setMute(!mute)}
                style={{
                  width: '100%',
                  height: '40%',
                  backgroundColor: 'green'
                }}>
                <Video
                  videoRef={videoRef}
                  onBuffer={onBuffer}
                  onError={onError}
                  repeat={true}
                  resizeMode="cover"
                  paused={mute}
                  source={{uri: videoRes?.uri ? videoRes?.uri : 'https://fanfun.s3.ap-south-1.amazonaws.com/1709102901449Snapinsta.app_video_10000000_264234150048421_8277687317139642213_n.mp4'}}
                  muted={mute}
                  seek={40}
                  style={{
                    width: '100%',
                    height: '100%',
                    // position: 'absolute',
                  }}
                />
              </TouchableOpacity>
            ): (
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {setMute(!mute); uploadVideo()}}
                style={{
                  width: '100%',
                  height: '30%',
                  alignItems: 'center',
                  backgroundColor: colors.gray3,
                  justifyContent: 'center',
                  marginTop: '3%',
                }}>
                    <Feather name="video" size={60} color={colors.orangeColor} />
                    <Text style={{color: 'black', fontSize: 14}}>Please Upload Video </Text>
                </TouchableOpacity>
            )}
            <View style={{marginTop: '5%'}}>
                <EventInput lable={'Description'} value1={description} placeholder={'Please enter description'} editable={true} onChangeText={e => setDescription(e)} />
            </View>
            
            <TouchableOpacity style={style.button} onPress={() => uploadVideoToServer()}>
                {loader ? (
                    <Loader size={'small'} color={'white'} />
                ) : (
                    <Text style={style.butText}> Upload Reel</Text>
                )}
            </TouchableOpacity>
        </View>
    )
};
export default ReelUpload;