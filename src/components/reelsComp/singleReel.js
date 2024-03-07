// import React, {useRef, useState} from 'react';
// import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
// import Video from 'react-native-video';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

// const SingleReel = ({item, index, currentIndex, onPress, mute}) => {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;

//   const videoRef = useRef(null);

//   const onBuffer = buffer => {
//     console.log('buffring', buffer);
//   };
//   const onError = error => {
//     console.log('error', error);
//   };

//   // const [mute, setMute] = useState(false);

//   const [like, setLike] = useState(item.isLike);

//   return (
//     <View
//       style={{
//         width: windowWidth,
//         height: windowHeight,
//         position: 'relative',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         // onPress={() => setMute(!mute)}
//         onPress={onPress}
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//         }}>
//         <Video
//           videoRef={videoRef}
//           onBuffer={onBuffer}
//           onError={onError}
//           repeat={false}
//           resizeMode="cover"
//           paused={currentIndex == index ? false : true}
//           source={{uri: item?.mediaList[0]?.url}}
//           muted={mute}
//           seek={40}
//           style={{
//             width: '100%',
//             height: '95%',
//             position: 'absolute',
//           }}
//         />
//       </TouchableOpacity>
//       <Ionic
//         name="volume-mute"
//         style={{
//           fontSize: mute ? 20 : 0,
//           color: 'white',
//           position: 'absolute',
//           backgroundColor: 'rgba(52,52,52,0.6)',
//           borderRadius: 100,
//           padding: mute ? 20 : 0,
//         }}
//       />
//       <View
//         style={{
//           position: 'absolute',
//           width: windowWidth,
//           zIndex: 1,
//           bottom: 0, //edited
//           padding: 10,
//         }}>
//         <View style={{marginBottom: '20%'}}>
//           <TouchableOpacity style={{width: 150}}>
//             <View
//               style={{width: 100, flexDirection: 'row', alignItems: 'center'}}>
//               <View
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 100,
//                   backgroundColor: 'white',
//                   margin: 10,
//                 }}>
//                 <Image
//                   source={{uri: item?.user?.customerProfileUrl ? item?.user?.customerProfileUrl : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png'}}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     resizeMode: 'cover',
//                     borderRadius: 100,
//                   }}
//                 />
//               </View>
//               <Text style={{color: 'white', fontSize: 16}}>{item?.user?.firstName}</Text>
//             </View>
//           </TouchableOpacity>
//           <Text style={{color: 'white', fontSize: 14, marginHorizontal: 10}}>
//             {item?.description}
//           </Text>
//           {/* <View style={{flexDirection: 'row', padding: 10, marginBottom: '20%'}}>
//             <Ionic
//               name="ios-musical-note"
//               style={{color: 'white', fontSize: 16}}
//             />
//             <Text style={{color: 'white'}}>Original Audio</Text>
//           </View> */}
//         </View>
//       </View>
//       {/* <View
//         style={{
//           position: 'absolute',
//           bottom: 60, //edited
//           right: 0,
//         }}>
//         <TouchableOpacity onPress={() => setLike(!like)} style={{padding: 10}}>
//           <AntDesign
//             name={like ? 'heart' : 'hearto'}
//             style={{color: like ? 'red' : 'white', fontSize: 25}}
//           />
//           <Text style={{color: 'white'}}>{item?.likes}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{padding: 10}}>
//           <Ionic
//             name="ios-chatbubble-outline"
//             style={{color: 'white', fontSize: 25}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={{padding: 10}}>
//           <Ionic
//             name="paper-plane-outline"
//             style={{color: 'white', fontSize: 25}}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={{padding: 10}}>
//           <Feather
//             name="more-vertical"
//             style={{color: 'white', fontSize: 25}}
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             width: 30,
//             height: 30,
//             borderRadius: 10,
//             borderWidth: 2,
//             borderColor: 'white',
//             margin: 10,
//           }}>
//           <Image
//             source={item?.postProfile}
//             style={{
//               width: '100%',
//               height: '100%',
//               borderRadius: 10,
//               resizeMode: 'cover',
//             }}
//           />
//         </View>
//       </View> */}
//     </View>
//   );
// };

// export default SingleReel;




// import React, { useRef, useState } from 'react';
// import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
// import Video from 'react-native-video';
// import Ionic from 'react-native-vector-icons/Ionicons';

// const SingleReel = ({ item }) => {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;

//   const videoRef = useRef(null);
//   const [mute, setMute] = useState(false);

//   return (
//     <View style={{ width: windowWidth, height: windowHeight }}>
//       <TouchableOpacity
//         activeOpacity={1} // Disable touch events on the video
//         style={{ width: '100%', height: '100%', position: 'absolute' }}>
//         <Video
//           ref={videoRef}
//           resizeMode="cover"
//           source={{ uri: item?.mediaList[0]?.url }}
//           muted={mute}
//           style={{ width: '100%', height: '100%' }}
//           repeat={false}
//         />
//       </TouchableOpacity>
//       <Ionic
//         name="volume-mute"
//         style={{
//           fontSize: 20,
//           color: 'white',
//           position: 'absolute',
//           backgroundColor: 'rgba(52,52,52,0.6)',
//           borderRadius: 100,
//           padding: mute ? 20 : 0,
//         }}
//       />
//       <View style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
//         <Text style={{ color: 'white', fontSize: 16 }}>{item?.user?.firstName}</Text>
//         <Text style={{ color: 'white', fontSize: 14 }}>{item?.description}</Text>
//       </View>
//     </View>
//   );
// };

// export default SingleReel;



import React, { useRef, useEffect, useState } from 'react';

import { View, Dimensions, ActivityIndicator } from 'react-native';

import Video from 'react-native-video';

import Ionic from 'react-native-vector-icons/Ionicons';
 
const SingleReel = ({ item, index, currentIndex, mute, nextVideoUrl }) => {

  const windowWidth = Dimensions.get('window').width;

  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef(null);

  const [isBuffering, setIsBuffering] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {

    setIsLoading(true);

    const prefetchNextVideo = () => {

      if (currentIndex === index + 1 && nextVideoUrl) {

        Video.prefetch(nextVideoUrl)

          .then(() => {

            setIsLoading(false);

          })

          .catch(error => {

            console.log('Error prefetching next video:', error);

            setIsLoading(false);

          });

      }

    };
 
    const bufferTimer = setTimeout(prefetchNextVideo, 10000); 

    return () => clearTimeout(bufferTimer);
 
  }, [currentIndex]);
 
  const onBuffer = buffer => {

    setIsBuffering(buffer.isBuffering);

  };
 
  const onError = error => {

    console.log('Error loading video:', error);

    setIsBuffering(false); 

  };
 
  const onLoad = () => {

    setIsBuffering(false);

  };
 
  return (

    <View

      style={{

        width: windowWidth,

        height: windowHeight,

        position: 'relative',

        justifyContent: 'center',

        alignItems: 'center',

      }}>

      <Video

        ref={videoRef}

        onBuffer={onBuffer}

        onError={onError}

        onLoad={onLoad}

        repeat={false}

        resizeMode="cover"

        paused={currentIndex !== index}

        source={{ uri: item?.mediaList[0]?.url }}

        muted={mute}

        style={{

          width: '100%',

          height: '100%',

          position: 'absolute',

        }}

      />

      {isBuffering && !isLoading && (

        <ActivityIndicator

          size="large"

          color="white"

          style={{

            position: 'absolute',

            zIndex: 1,

          }}

        />

      )}

      <Ionic

        name="volume-mute"

        style={{

          fontSize: mute ? 20 : 0,

          color: 'white',

          position: 'absolute',

          backgroundColor: 'rgba(52,52,52,0.6)',

          borderRadius: 100,

          padding: mute ? 20 : 0,

        }}

      />

    </View>

  );

};
 
export default SingleReel;

 
