import { StyleSheet } from 'react-native'
import { colors, fontFamily, fontSize } from '../../common'

export const styles = StyleSheet.create({

    container: {
        height: '100%',
        backgroundColor: colors.white
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
        marginTop: 170,
        flexDirection: 'column',
        width: '100%',
        paddingTop: '5%',
        shadowColor: colors.black,
        height: '50%',
        // borderWidth:5,
        // borderColor:'red',
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
    buttonContainer: {
        height: '6%',
        alignItems: 'center',
        backgroundColor: 'transparent',
        alignContent: 'center'
    },
    button: {
        width: '85%',
        backgroundColor: colors.orangeColor,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
    round2: {
        backgroundColor: colors.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        padding: 3

    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'column',
        marginTop: '5%',
        height: '100%',
    },
    separateContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        marginBottom: 4,

    },
    separateContainerText: {
        textAlign: 'center',
        color: colors.gray2,
        fontSize: fontSize.large,
        fontWeight: '600',
        paddingVertical: 2,
    },
    toggleHead: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    orangeColor: {
        borderBottomWidth: 1,
        borderColor: colors.orangeColor,
        color: colors.black,
    },
    btnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: "2%",
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    desContainer: {
        marginHorizontal: '5%',
    },
    des: {
        color: colors.black,
        fontSize: fontSize.h5,
        fontWeight: '700',
        paddingVertical: 5
    },
    desData: {
        color: colors.black,
        fontStyle: fontFamily.PoetsenOneRegular
    },
    formContainer: {
        // borderWidth:1,

    },
    registrationText: {
        color: colors.black,
        textAlign: 'center',
        fontSize: fontSize.h4,
        fontWeight: '600'
    },
    formik: {
        paddingHorizontal: '10%'
    },
    inputAndBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5
    },
    toggleData: {
        marginBottom: 300,
    },
    subBtn: {
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: colors.orangeColor,
        borderRadius: 5,
        alignSelf: 'flex-end',
        alignContent: 'center',
        paddingVertical:'2%',
        paddingHorizontal:'5%',
        elevation:2
    },
    subBtnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: fontSize.h6,
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    }
})