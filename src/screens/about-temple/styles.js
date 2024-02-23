import { StyleSheet } from "react-native";
import { colors } from "../../common";
export const styles = StyleSheet.create({
    updateBut: {
        height: 40, 
        width: 100, 
        alignSelf: 'center', 
        alignItems: 'center', 
        marginTop: '25%', 
        backgroundColor: colors.gray, 
        justifyContent: 'center',
        borderRadius: 10
    },
    butText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    updatedBut: {
        height: 40, 
        width: 100, 
        alignSelf: 'center', 
        alignItems: 'center', 
        marginTop: '25%', 
        backgroundColor: colors.orangeColor, 
        justifyContent: 'center',
        borderRadius: 10
    },
});