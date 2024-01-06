/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import { allTexts, colors } from '../../common';
export const TopBarcard = ({
    txtColor,
    onPress,
    txt,
    isPlus,
    onPlusPress,
    isBell,
    arrow,
    cancel,
    children,
    menu,
    navigation,
    back,
    navBack,
    navMenu,
    roleId,
    roleType,
    navCreate,
    height,
}) => {
    return (
        <View style={styles.container}>
            <View style={{...styles.header, height: height ? height : 120}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: isBell || roleType || roleId ? 'space-between' : 'space-evenly',
                        marginTop: '20%',
                        marginHorizontal: 20,
                    }}>
                    {arrow && (
                        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
                            <Image source={require('../../../assets/images/backarrow.png')}
                                style={{ height: 10, width: 6 }} />
                        </TouchableOpacity>
                    )}
                    {back && (

                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                            <Image source={require('../../../assets/images/backarrow.png')}
                                style={{ height: 10, width: 6 }} />
                        </TouchableOpacity>

                    )}

                    {menu && (
                        <TouchableOpacity onPress={() => navMenu.navigate(allTexts.tabNames.profile)}>
                            <Entypo name='menu' size={20} color={'white'} />
                        </TouchableOpacity>
                    )}
                    {cancel && (
                        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
                            <MaterialIcons name='cancel' size={20} color={colors.orangeColor} />
                        </TouchableOpacity>
                    )}
                    {txt && (
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginHorizontal: '20%',
                                color: 'white',
                                alignSelf: 'center'
                            }}>
                            {txt}
                        </Text>
                    )}
                </View>

                {isPlus && (
                    <TouchableOpacity style={{}} onPress={onPlusPress}>
                        <AntDesign
                            name="plus"
                            size={24}
                            color='black'
                        />
                    </TouchableOpacity>
                )}
                {isBell && (
                    <TouchableOpacity style={{ marginRight: '4%' }} onPress={() => navigation.navigate(allTexts.screenNames.notification)}>
                        <Image source={require('../../../assets/images/bell.png')} style={{ height: 25, width: 25, marginRight: '2%' }} />
                    </TouchableOpacity>
                )}
                {roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN' && (
                    <TouchableOpacity
                        style={{}}
                        onPress={navCreate}>
                        <Text style={styles.joinText}>Create</Text>
                    </TouchableOpacity>
                )}
            </View>
            {children}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFAB0F',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 10,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        height: 30,
        width: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    joinText: {
        color: colors.white,
        fontWeight: '900',
        fontSize: 20,
    },
})
