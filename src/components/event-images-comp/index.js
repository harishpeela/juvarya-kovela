import React from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const AddEventImage = ({ data }) => {
    return (
        <FlatList
            data={data}
            horizontal={true}
            keyExtractor={({ item, index }) => index}
            style={styles.flatlist}
            renderItem={({ item, index }) => (
                <>
                    <TouchableOpacity style={styles.container}>
                        <Image source={{ uri: item?.uri ? item?.uri : item?.url }} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel} onPress={() => alert('click')}>
                       <MaterialIcons name="cancel" size={16} color={'black'} />
                    </TouchableOpacity>
                </>
            )}
        />
    );
};
export default AddEventImage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 10
    },
    flatlist: {
        height: 'auto',
        width: 'auto',
        marginTop: '1%',
    },
    cancel: { position: 'absolute', left: '75%', top: 20}
})