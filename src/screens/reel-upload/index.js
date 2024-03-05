import React, {useEffect, useState, useRef} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { saveReels } from "../../utils/api";
import { TopBarCard2 } from "../../components/topBar1/topBarCard";
import { styles } from "./styles";
import Video from "react-native-video";
import Feather from 'react-native-vector-icons/Feather';
import { allTexts, colors } from "../../common";
import { Loader } from "../../components";
import { launchImageLibrary } from "react-native-image-picker";
const ReelUpload = ({navigation, route}) => {
    const {id} = route.params || {};
    console.log('id in reels craetion', id)
    const videoRef = useRef(null);
    const [videoRes, setVideoRes] = useState(null);
    const [description, setDescription] = useState('');
    const [isVideo, setIsVideo] = useState(false);
    const [loader, setLoader] = useState(false);


    const onBuffer = buffer => {
        console.log('buffring', buffer);
      };
      const onError = error => {
        console.log('error', error);
      };
    
      const [mute, setMute] = useState(true);
    
      const uploadVideo = async () => {
        try {
          launchImageLibrary(
            {
              mediaType: 'video',
              require: 'video',
              includeBase64: true,
            },
            res  =>  {
              if (!res?.didCancel) {
                console.log('Image URI:', res);
                let video = getImageObj(res?.assets[0]?.uri);
                let fileSizeInBytes = res?.assets[0]?.fileSize;
                const fileSizeInMB = fileSizeInBytes / 1048576;
                if(fileSizeInMB > 50){
                    alert('please upload video below 50mb')
                } else{
                    setVideoRes(video)
                    setIsVideo(true)
                }                
              } else {
                console.log(res?.errorMessage);
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
        formdata.append("jtProfile", id ? id : '' );
        formdata.append('file', videoRes);
        console.log('formdata', formdata?._parts);
        if(!videoRes){
            alert('please upload video');
            setLoader(false);
        } 
        // else if(description === ''){
        //     alert('please add description');
        //     setLoader(false);
        // } 
        else{
            let responce = await saveReels(formdata)
        console.log('responce', responce?.data?.message);
        if(responce?.data?.message === "Reel uploaded"){
            navigation.navigate(allTexts.tabNames.kovelareels);
            setLoader(false);
        } else {
            alert('something went wrong')
            setLoader(false);
        }
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

    console.log('isvideo', isVideo);
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{height: '10%'}}>
                <TopBarCard2 back={true} txt={'Upload Spiritual'} navigation={navigation} marginLeft={'22%'} />
            </View>
            {isVideo ? (
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setMute(!mute)}
                style={{
                  width: '100%',
                  height: '40%',
                //   backgroundColor: 'green'
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
                    <Text style={{color: 'black', fontSize: 14, color: colors.orangeColor}}>Please Upload Video </Text>
                </TouchableOpacity>
            )}
            <View style={{marginTop: '5%', marginLeft: 20}}>
                <Text style={style.label}> Description</Text>
                <TextInput placeholder="Please enter description" onChangeText={e => setDescription(e)} style={style.input} multiline={true} />
                {/* <EventInput lable={'Description'} value1={description} placeholder={'Please enter description'} editable={true} onChangeText={e => setDescription(e)} /> */}
            </View>
            
            <TouchableOpacity style={style.button} onPress={() => uploadVideoToServer()}>
                {loader ? (
                    <Loader size={'small'} color={'white'} />
                ) : (
                    <Text style={style.butText}>Upload</Text>
                )}
            </TouchableOpacity>
        </View>
    )
};
export default ReelUpload;








