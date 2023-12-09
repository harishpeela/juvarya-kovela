import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { colors } from '../../common'
const TextInput2 = ({ title, placeholder, width }) => {
    return (
        <View style={[styles.container, { width: width ? width : '100%' }]}>
            <Text style={styles.inputText}>{title}</Text>
            <TextInput
            placeholderTextColor={colors.gray2}
                style={styles.input}
                // onChangeText={onChangeText}
                // value={`${placeholder}`}
                placeholder={`${placeholder}`}
            />
        </View>
    )
}

export default TextInput2

