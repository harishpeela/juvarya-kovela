import React, {useState, useEffect} from "react";
import { View, Text, Image } from "react-native";
import { TopBarCard2 } from "../../components/topBar1/topBarCard";
import { GetArtistDetails } from "../../utils/api";
const ArtistDetails = ({navigation, route}) => {
    const {id} = route.params || {};
    const [deatils, setDetails] = useState('');
    console.log('id', id);
    const artistDetails = async () => {
        let responce = await GetArtistDetails(id);
        console.log('responce of artist', responce?.data);
        if(responce?.status === 200){
            setDetails(responce?.data);
        }
    }
    useEffect(() => {
        artistDetails();
    }, []);
    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{height: '10%', marginTop: '3%'}}>
                <TopBarCard2 txt={'Artist Details'} back={true} navigation={navigation} />
            </View>
            <View style={{height: '40%', width: '100%', alignItems: 'center'}}>
                <Image source={{uri: deatils?.picture}} style={{height: '100%', width: '95%', borderRadius: 10}} />
            </View>
        </View>
    )
};
export default ArtistDetails;