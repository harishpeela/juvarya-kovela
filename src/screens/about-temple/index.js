import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { EventInput4, Loader } from '../../components';
import {
    getAboutTemple,
    getEditAboutTemple,
    saveAboutTemple,
} from '../../utils/api';
import { colors } from '../../common';
import { ScrollView } from 'react-native-gesture-handler';
import { statusBarHeight, windowHeight } from '../../utils/config/config';
const AboutTemple = ({ navigation, route }) => {
    const { jtProfile, name } = route?.params || {};
    const [data, setData] = useState();
    const [description, setDescription] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [loader, setLoader] = useState(false);

    const AboutTemple = async () => {
        setLoader(true);
        let result = await getAboutTemple(jtProfile);
        console.log('res of about temple', result?.data);
        if (result?.status === 200) {
            setData(result?.data);
            setLoader(false);
            setDescription(result?.data?.history);
        } else {
            setData('');
            setLoader(false);
        }
    };

    useEffect(() => {
        AboutTemple();
    }, []);
    console.log(data?.data?.length)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 60, marginTop: statusBarHeight }}>
                <TopBarCard2
                    back={true}
                    txt={'History'}
                    navigation={navigation}
                    marginLeft={'27%'}
                />
            </View>
            <View >
                {/* <ScrollView showsVerticalScrollIndicator={false} style={{ borderWidth: 0.5, marginHorizontal: '8%', backgroundColor: colors.white, borderRadius: 10, paddingVertical: 10 }}>
                    <Text style={{ color: 'black', margin: '4%' }}>
                        {data?.history ? data?.history : 'History To Be Added'}
                    </Text>
                </ScrollView> */}
                {loader ? (
                    <>
                        <View style={{ marginTop: '-34%' }}>
                            <Loader size={'large'} color={colors.orangeColor} />
                        </View>
                    </>
                ) : (
                    <>
                        {data?.data.length !== 0 ? (<><ScrollView
                            showsVerticalScrollIndicator
                            style={{ margin: 3, padding: 10 }}>
                            <FlatList
                                data={data?.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View
                                        style={styles.historyConatainer}>
                                        <Image
                                            source={{ uri: item?.jtProfileDTO?.logo }}
                                            style={styles.TempleImage}
                                        />
                                        <Text
                                            style={styles.aboutText}>
                                            {item?.history}
                                        </Text>

                                    </View>
                                )}
                            />
                        </ScrollView></>) : (<>
                            <View style={{ height: windowHeight * 0.78, justifyContent: "center" }}>
                                <Text style={{ fontSize: 18, textAlign: 'justify', fontFamily: 'Poppins-Medium', color: colors.orangeColor, alignSelf: "center", textDecorationLine: "underline" }}>
                                    History To Be Added
                                </Text>
                            </View>
                        </>)}
                    </>
                )}
            </View>
        </View>
    );
};
export default AboutTemple;
