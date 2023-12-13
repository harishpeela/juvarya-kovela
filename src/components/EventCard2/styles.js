import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../../common'

export const styles = StyleSheet.create({
    container: {
        // borderColor:colors.orangeColor,
        height: 250,
        marginHorizontal: "1%",
        marginVertical: "1%",
        width: '48%',
        borderRadius: 7,
        borderWidth: 2,
        // elevation: 9,
        // backgroundColor: 'white',
        // shadowColor:colors.black,
        elevation: 3,
        shadowColor: colors.black,
        backgroundColor: colors.white,
        
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Image: {
        height: "65%",
        width: "100%",
    },
    dateContainer: {
        backgroundColor: colors.orangeColor,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10
    },
    dateText: {
        alignSelf: 'center'
    },
    festivalText: {
        color: colors.black,
        fontSize: fontSize.small,
        fontWeight: '500'
    },
    locationIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:2,
        alignContent: 'center',
        alignSelf: 'center'
    },
    container2: {
        width: '97%',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical:3
    }
    // dateContainer:{
    //     flexDirection:'row',
    //     // borderWidth:1,
    //     justifyContent:'space-between',
    //     width:"95%"
    // },
    // hrLine:{
    //     borderWidth:0.2,
    //     borderColor:colors.gray
    // },
    // text:{
    //     color:colors.black
    // }

})