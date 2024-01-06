import { StyleSheet } from 'react-native'
import { colors, fontFamily, fontSize } from '../../common'

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#f1f1f1'
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
        marginTop:5,
        flexDirection: 'column',
        width: '100%',
        paddingTop: '2%',
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
        fontSize: 20,
        fontWeight: '700',
        marginLeft:10
    },
    dateText: {
        color: colors.orangeColor,
        fontSize:11,
        marginLeft:16,
        justifyContent:'flex-start',
        
    },
    buttonContainer: {
        height: '6%',
        alignItems: 'center',
        alignContent: 'center',
                backgroundColor: '#f1f1f1',
borderWidth: 0,
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
        fontWeight: '400',
        fontSize: 20,
        padding:8
    },
    dateAndLocation: {
        flexDirection: 'row',
        width: '50%',
        justifyContent:'flex-start'
       
        
    },
    secondContainer2: {
        marginHorizontal: '3%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
       
    },
    locText: {
        color: colors.gray,
        fontSize: 10
    },
    round: {
        backgroundColor: colors.white,
        borderRadius: 100 / 2,
        height:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5
    },
    round2: {
        backgroundColor: colors.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        margin:20,
        height:30,
        width:30

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
        color:colors.white,
        fontSize: fontSize.large,
        fontWeight: '400',
        paddingVertical: 2,
        fontSize:10,
        backgroundColor:colors.orangeColor,
        borderRadius:24,
        padding:10,
        marginRight:22,
        marginLeft:3,
        height:20
        
    },
    container1:{
marginTop:10
    },
    toggleHead: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginLeft:18,
    
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
        marginBottom: 300,

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
    bg:{
    //    backgroundColor:colors.red4 
    },
    subBtn: {
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: colors.white,
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
    },
HeaderImage:{
    backgroundColor:'#FFAB0F',
    height:'10%',
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24
},
eventText:{
    justifyContent:'center',
    alignItems:'center',
    color:'white',
    fontWeight:'bold',
    fontSize:20
},
notificationIcon:{
    color:colors.orangeColor,
},
eventTextContainer:{
    justifyContent:'center',
    alignItems:'center'
},
pincode:{
    fontSize:10,
    color:colors.orangeColor
    
},
festlocation:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:-10,
    marginTop:8
  
},
festivaldetails:{
marginTop:10,
marginBottom:10,
justifyContent:'flex-start',
// backgroundColor:colors.white,
padding:24,
borderRadius:24,
margin:10



},
Imagecontainer:{
    minHeight:'25%',
    maxHeight:'50%',
    marginTop:15,
    backgroundColor:colors.orangeColor,
    borderRadius:24,
    margin:15
},
festivalContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:-10,
    marginLeft:-15
    
    
    
}
,
locationPincode:{
    flexDirection:'row'
},
infoContainer:{
    marginTop:10,
    
},
HeadingAndIcon:{
    flexDirection:'row',
    justifyContent:'space-between'
},
highLightCard: {
    margin: 10,
    alignItems: 'center', //Centered horizontally
    padding: 10
  },
  contributeCard: {
        marginVertical: 20,
        width: '50%',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
      },
})
