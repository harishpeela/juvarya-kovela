import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { TopBarCard2 } from "../../components/topBar1/topBarCard";
import { EventInput4 } from "../../components";
import { getAboutTemple, getEditAboutTemple, saveAboutTemple } from "../../utils/api";
import { colors } from "../../common";
import { ScrollView } from "react-native-gesture-handler";
const AboutTemple = ({ navigation, route }) => {
    const { jtProfile, name } = route?.params || {};
    const [data, setData] = useState();
    const [description, setDescription] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [loader, setLoader] = useState(false);

    const AboutTemple = async () => {
        let result = await getAboutTemple(jtProfile);
        console.log('res of about temple', result?.data);
        if (result?.status === 200) {
            setData(result?.data);
            setDescription(result?.data?.history);
        } else {
            setData('');
        }
    }
    // const EditHistory = async () => {
    //     if(data?.id){
    //         let payload = {
    //             id:data?.id,
    //             profileId:jtProfile,
    //             history:description
    //         }
    //         console.log('paylod', payload);
    //         let result = await getEditAboutTemple(payload);
    //         console.log('res of efit his', result?.data);
    //         if(result?.status === 200){
    //             alert('history edited')
    //         }
    //     } else if(!data?.id){
    //         let payload = {
    //             profileId:jtProfile,
    //             history:description
    //         }
    //         console.log('paylod', payload);
    //         let result = await saveAboutTemple(payload);
    //         console.log('res of save his', result?.data);
    //         if(result?.status === 200){
    //             alert('history saved')
    //         }
    //     }
       
    // }
    useEffect(() => {
        AboutTemple();
    }, []);
    return (
        <View style={{ flex: 1 ,backgroundColor:'white'}}>
            <View style={{ height: '15%' }}>
                <TopBarCard2 back={true} txt={'About Temple'} navigation={navigation} marginLeft={'15%'}/>
            </View>
            <View>
                <EventInput4
                    lable={'Temple Name'}
                    placeholder={name}
                    height={50}
                    value={name}
                    placeholderTextColor={'black'}
                />
                <Text style={{fontWeight: 'bold', color: colors.black, marginLeft: '8%', margin: 10, fontSize: 16 }}>History</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{borderWidth: 0.5, marginHorizontal: '8%', height: '40%', backgroundColor: colors.white, borderRadius: 10, paddingVertical: 10}}>
                    <Text style={{color: 'black', margin: '4%'}}>
                        {data?.history ? data?.history : 'History To Be Added'}
                    </Text>
                </ScrollView>
                {/* <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    {isVisible ? (
                        <EventInput4
                            lable={'Description'}
                            placeholder={data?.history ? data?.history : 'History to be added'}
                            height={200}
                            value1={description}
                            multiline={true}
                            edit={true}
                            // onChangeText={e => setDescription(e)}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            <EventInput4
                                lable={'Description'}
                                placeholder={data?.history ? data?.history : 'History to be added'}
                                height={200}
                                value1={description}
                                multiline={true}
                                edit={true}
                                onChangeText={e => setDescription(e)}
                            />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.updatedBut} onPress={() => EditHistory()}>
                    <Text style={styles.butText}> Update</Text>
                </TouchableOpacity> */}

            </View>
        </View>
    )
}
export default AboutTemple;