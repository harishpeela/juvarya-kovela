


import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../../common'

export const styles = StyleSheet.create({

    footerBackground: {
        borderRadius: 25,
        flex: 1,
    },
    footerContainer: {
        // marginTop: '5%',
    },
    header: {
        marginTop: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth:2,
        paddingHorizontal: '5%',
    },
    secondContainer: {
        marginTop: 200,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: '70%',
        paddingTop: '5%',
        elevation: 5,
        shadowColor: colors.black
    },
    locationIcon: {
        flexDirection: 'row',
        alignContent: 'flex-start'

    },
    festivalText: {
        color: colors.black,
        fontSize: fontSize.h1,
        fontWeight: '700'
    },
    dateText: {
        color: colors.orangeColor,
        fontSize: fontSize.large
    },
    button: {
        width: '85%',
        backgroundColor: colors.orangeColor,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: fontSize.h1
    },
    dateAndLocation: {
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'space-between'
    },
    secondContainer2: {
        marginHorizontal: '3%',
    },
    locText: {
        color: colors.gray,
        fontSize: fontSize.large
    },
    round: {
        backgroundColor: colors.white,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    round2:{
        backgroundColor: colors.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        padding:3
        
    },
    toggleContainer: {
        borderWidth: 1,
        width: '100%',
        flexDirection: 'column',
        marginTop: '5%',
        height: '60%',
    },
    separateContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent:'space-around'
    },
    separateContainerText: {
        textAlign: 'center',
        color: colors.gray2,
        fontSize: fontSize.large,
        fontWeight: '600',
        paddingVertical:2,
    },
    toggleHead: {
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around'

    },
    orangeColor: {
        borderBottomWidth: 1,
        borderColor: colors.orangeColor,
        color:colors.black,
        
    }
})