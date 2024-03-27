import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { TopBarCard2 } from '../../components/topBar1/topBarCard'
import { statusBarHeight } from '../../utils/config/config'
import { ScrollView } from 'react-native'
import { localHostStore } from '../../utils/api'
import { Store_Comp } from '../../components'
const Store = ({ navigation }) => {
    const [results, setResults] = useState([]);
    const storeResponce = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 3ebc4eb8-e6f2-4ac3-9ca8-d0b2b8d2232f");
        myHeaders.append("Cookie", "JSESSIONID=705C9B845F4BB5BF6707A27A903280A4");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://4.240.68.49:8080/api/v1/product/store/products?storeId=1&pageNo=0&pageSize=100", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    setResults(result?.data?.products)
                }
            })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        storeResponce();
    }, []);
    console.log('results', results);
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ height: 60, marginTop: statusBarHeight }}>
                <TopBarCard2
                    back={true}
                    txt={'Store'}
                    navigation={navigation}
                />
            </View>
            {/* <ScrollView>
                <Fontisto name="shopping-store" size={30} color={"black"} />
            </ScrollView> */}
            <View>
                <Store_Comp data={results} />
            </View>
        </View>
    )
}
export default Store