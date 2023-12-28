import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NewBackHeader } from "../new-back-header";
export const TopBarcard = ({navigation, txt, isBell, isCard}) => {
    return(
        <View style={{flex: 1, backgroundColor: '#FFAB0F', borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}>
            <NewBackHeader txt={txt} isBell={isBell} onPress={() => navigation.goBack()} />
        </View>
    );
};