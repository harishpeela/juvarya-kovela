import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BackHeaderNew } from "../backHeaders";
import { NewBackHeader } from "../new-back-header";
export const TopBarcard = ({navigation}) => {
    return(
        <View style={{flex: 1, backgroundColor: '#FFAB0F', borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}>
            <NewBackHeader txt={'EventDetails'} isBell onPress={() => navigation.goBack()} />
        </View>
    );
};