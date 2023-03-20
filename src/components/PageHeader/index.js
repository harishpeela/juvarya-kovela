/* eslint-disable react/react-in-jsx-scope */
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './style';
import Entypo from 'react-native-vector-icons/Entypo';

export const PageHeader = ({pageTitle, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Entypo name="chevron-left" color={'#FFA001'} size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{pageTitle}</Text>
    </View>
  );
};
