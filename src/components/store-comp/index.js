import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { colors } from "../../common";
export const Store_Comp = ({ data }) => {
    console.log('000000000000000000', data);
    return (
        <FlatList
            data={data}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
                <View style={{ borderWidth: 1, padding: 20, marginHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                    <View>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item?.defaultSku?.name}</Text>
                        <Text style={{ color: 'black' }}>{item?.defaultSku?.description}</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'black' }}>price :
                            <Text style={{ color: colors.gray, textDecorationLine: 'line-through' }}> ₹ {item?.price?.retailPrice}</Text>
                            <Text style={{ color: colors.green, fontSize: 14, fontWeight: 'bold' }}>  ₹{item?.price?.salePrice} </Text>
                        </Text>
                    </View>
                </View>
            )}

        />
    );
};