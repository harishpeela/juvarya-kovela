import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
export default function ProfileMyMemberships({ navigation }) {
    return (
        <View style={{ minHeight: '15%' }}>
            <TopBarCard2
                back={true}
                txt={'user memberships'}
                navigation={navigation}


            />
        </View>
    )
}

const styles = StyleSheet.create({})