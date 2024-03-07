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



    useEffect(() => {
        AboutTemple();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: '15%' }}>
                <TopBarCard2 back={true} txt={'History'} navigation={navigation} marginLeft={'27%'} />
            </View>
            <View>
                {/* <ScrollView showsVerticalScrollIndicator={false} style={{ borderWidth: 0.5, marginHorizontal: '8%', backgroundColor: colors.white, borderRadius: 10, paddingVertical: 10 }}>
                    <Text style={{ color: 'black', margin: '4%' }}>
                        {data?.history ? data?.history : 'History To Be Added'}
                    </Text>
                </ScrollView> */}
                <ScrollView showsVerticalScrollIndicator style={{margin:10,borderWidth:0.2,padding:12,borderRadius:8}}>
                <Text style={{fontSize:15,textAlign:'justify',fontFamily:'Poppins-Medium'}}>{data?.history ? data?.history : 'History To Be Added'}</Text>

               
                </ScrollView>

            </View>
        </View>
    )
}
export default AboutTemple;