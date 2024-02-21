import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { TopBarCard2 } from "../../components/topBar1/topBarCard";
import { EventInput4 } from "../../components";
import { getAboutTemple } from "../../utils/api";
const AboutTemple = ({ navigation, route }) => {
    const { jtProfile, name } = route?.params || {};
    const [data, setData] = useState();
    const [description, setDescription] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const AboutTemple = async () => {
        let result = await getAboutTemple(jtProfile);
        // console.log('res of about temple', result?.data);
        if (result?.status === 200) {
            setData(result?.data);
        } else {
            setData('');
            setDescription(result?.history);
        }
    }
    useEffect(() => {
        AboutTemple();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '15%' }}>
                <TopBarCard2 back={true} txt={'About Temple'} navigation={navigation} />
            </View>
            <View>
                <EventInput4
                    lable={'Temple Name'}
                    placeholder={name}
                    height={50}
                    value={name}
                    placeholderTextColor={'black'}
                />
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    {isVisible ? (
                        <EventInput4
                            lable={'Description'}
                            placeholder={data?.history}
                            height={200}
                            value1={data?.history}
                            multiline={true}
                              edit={true}
                            onChangeText={e => setDescription(e)}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            <EventInput4
                            lable={'Description'}
                            placeholder={data?.history}
                            height={200}
                            value1={data?.history}
                            multiline={true}
                            //   edit={true}
                            onChangeText={e => setDescription(e)}
                        />
                            </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AboutTemple;