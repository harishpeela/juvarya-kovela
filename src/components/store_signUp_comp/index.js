import React from "react";
import { View, TouchableOpacity } from "react-native";
import  {EventInput}  from "../eventCreateInput";
export const Store_SignUp = ({}) => {
    return(
        <View>
            <EventInput lable={'User Name'} placeholder={'user name'} />
            <EventInput lable={'Password'} placeholder={'Password'} />
        </View>
    )
}