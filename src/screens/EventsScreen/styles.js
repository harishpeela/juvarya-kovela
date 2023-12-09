import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../common';
export const styles = StyleSheet.create({
    CardContainer: {},
    followersContainer: {
        borderWidth: 1,
    },
    Header: {
        marginHorizontal: '5%',
        marginVertical: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bodyContainer: {
        marginHorizontal: '4%',
        display: 'flex',
        flexDirection: 'column',
        // borderWidth:5,
        // marginBottom:200,
    },
    searchAndFilter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
        marginTop: '5%',
        paddingHorizontal: '1%',
        justifyContent: 'space-between',
        height: "7%",
        width: "100%",
        padding: "1%",
        alignContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        width: '82%',
        height: '100%',
    },
    followersContainer: {
        height: '85%',
    },
    sortContainer: {
        display: 'flex',
        width: '15%',
        height: '100%',
        // borderWidth:2,
    },
    list: {
        // borderWidth:1,
        marginBottom: 300,
    },
    noDataContainer: {
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: fontSize.xlarge,
        color: colors.black,
    },
    flatListStyle:{
        justifyContent:'space-between',
        alignItems:'center'
    }


});
