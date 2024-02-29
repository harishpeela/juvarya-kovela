import { StyleSheet } from "react-native";
import { colors } from "../../common";
export const style = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
    },
    button: {
        height: '5%',
        backgroundColor: colors.orangeColor,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '25%',
        borderRadius: 20,
    },
    butText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
    }
})