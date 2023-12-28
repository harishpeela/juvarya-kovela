import React, {useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TopBarcard } from "../topBar1/topBarCard";
import { colors } from "../../common";
import { getAuthTokenDetails } from "../../utils/preferences/localStorage";
const EventDetailsNew = ({navigation}) => {
    return(
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <View style={{height: '10%'}}>
            <TopBarcard txt={'Event Details'} isBell navigation={navigation} />
            </View>
        </View>
    );
};
export default EventDetailsNew;