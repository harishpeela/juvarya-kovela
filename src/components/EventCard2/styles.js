import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../../common'
import { Directions } from 'react-native-gesture-handler'

export const styles = StyleSheet.create({
    container: {
        height: 150,
        width:'88%',
        marginHorizontal: "1%",
        marginVertical: "1%",
        // width: '48%',
        // elevation:5,
        shadowColor: colors.black,
        borderColor:colors.black,
        borderWidth:0.4,
        backgroundColor: colors.white,
        // justifyContent: 'space-between',
        borderRadius: 24,
        flexDirection:'row',
        marginLeft:'6%'
    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10'
    },

    Image: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
        marginLeft: '3%',
        marginTop: 15,
        resizeMode: 'contain',
    },
    dateContainer: {
        borderRadius: 2,
        marginBottom:2,
        flexDirection: 'row',
        
    },
    dateText: {
        // alignSelf: 'center',
        fontSize: 12,
        marginBottom:5
    },
    festivalText: {
        color: colors.black,
        fontSize: fontSize.small,
        fontWeight: '50',
        alignSelf: 'center',
        marginTop: '5%',
        backgroundColor:'white',
        marginLeft:15
    },
    locationAddressContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:2,
        width:150,
    },
    locationContainer: {
        backgroundColor:colors.gray3,
        margin: 5,
        padding:3,
        borderRadius:14,
        height:'20%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        justifyContent:'flex-start',
        // flexDirection:'row',
        marginTop: 5,
    },
    text:{
        fontSize:10,
        fontWeight: 'bold'
    },
    locationText: {
        fontSize: 12,
        marginLeft:10
    },
    container2: {
        width: '97%',
        height: '30%',
        flexDirection: 'row'
    },
})

