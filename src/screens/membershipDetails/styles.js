import { StyleSheet } from "react-native";
import { colors } from "../../common";
export const styles = StyleSheet.create({
    img: {
        height: 200,
        width: '100%',
        backgroundColor: 'red',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    tabs: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
        marginTop: '5%'
    },
    data: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '45%',
    },
    container: {
        marginHorizontal: '5%'
    },
    headerView: {
        position: 'absolute',
        flexDirection: 'row',
        top: '4%',
        alignItems: 'center',
    },
    iconContainer: {
        left: '60%',
        height: 30,
        width: 30,
        backgroundColor: colors.orangeColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2
    },
    round2: {
        left: 340,
        height: 30,
        width: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2
    },
    dataContainer: {
        marginTop: '5%',
    }
});