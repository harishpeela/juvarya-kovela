import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import RNFS from 'react-native-fs';
import Video from "react-native-video";
import { createThumbnail } from "react-native-create-thumbnail";
export const Video_Player = ({ video }) => {
  console.log('video[[[[[', video);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track thumbnail loading
    const width = Dimensions.get('window').width;

    const generateThumbnail = async (video) => {

      console.log('2', video);
      try {
        const uri  = await RNFS.getUriForFileURL(video[0]?.url); // Get local video path
        console.log('uri===', uri)
        const videoOptions = { format: 'JPEG', quality: 0.5 }; // Adjust quality as needed
        console.log('uri===?????', videoOptions)

        const thumbnailPath = `${RNFS.TemporaryDirectoryPath}/${video[0].id}.jpg`;

        // Generate thumbnail using react-native-video:
        const videoRef = await Video.getVideoView(uri);
        await videoRef.seek(videoOptions.seekTime || 0); // Optional seek to specific time
        await videoRef.takeSnapshot(thumbnailPath, videoOptions);

        video.thumbnailUrl = thumbnailPath; // Update state with generated thumbnail path
        setIsLoading(false); // Mark thumbnail loading complete
      } catch (error) {
        console.log('3');
        console.error('Error generating thumbnail:', error);
      } finally {
        console.log('4');
        setIsLoading(false); // Ensure loading state updates even on error
      }
      const generateThumbnail = async (videoUri) => {
        try {
          const thumbnail = await createThumbnail({
            url: videoUri,
            timeStamp: 10000,
          });
          return thumbnail.path;
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          return null;
        }
      };
    };

    // const generateThumbnail = async (videoUri) => {
    //   console.log('urtl====', videoUri);
    //   try {
    //     const thumbnail = await createThumbnail({
    //       url: videoUri[0]?.url,
    //       timeStamp: 10000,
    //     });
    //     console.log('thumbnail', thumbnail);
    //     return thumbnail.path;
    //   } catch (error) {
    //     console.error('Error generating thumbnail:', error);
    //     return null;
    //   }
    // };
    useEffect(() => {
      if (!video.thumbnailUrl) {
        generateThumbnail(video); // Generate thumbnail if it's not already set
      }
    }, [video]);
  
    const handlePress = () => {
      setIsVideoPlaying(!isVideoPlaying);
    };
  console.log('video?.thumbnailUrl', video?.thumbnailUrl);
    return (
      <View style={{ margin: 10, borderWidth: 1, borderColor: 'gray' }}>
        {isLoading ? (
          <Text>Loading thumbnail...</Text>
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Image source={{ uri: video?.thumbnailUrl }} style={{ width: 200, height: 100 }} />
          </TouchableOpacity>
        )}
        {isVideoPlaying && (
          <Video
            source={{ uri: video.videoUrl }}
            style={{ width: width / 2, height: 120,  }}
            // controls
            paused={!isVideoPlaying}
          />
        )}
      </View>
    );
  };
  