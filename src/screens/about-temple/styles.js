import { StyleSheet } from "react-native";
import { colors } from "../../common";
import { windowWidth } from "../../utils/config/config";
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
    historyConatainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    TempleImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    aboutText: {
        fontSize: 13,
        alignSelf:"center",
        fontFamily: 'Poppins-Medium',
        color: colors.gray,
        flex: 1,
        textAlign: 'left',
    }

    
});