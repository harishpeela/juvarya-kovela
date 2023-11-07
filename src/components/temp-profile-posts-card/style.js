import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    postCardContainer:{
        flex: 1,
        height: 140,
        margin: '.5%',
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
    }

})