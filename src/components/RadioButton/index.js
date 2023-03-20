/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';

export const RadioButton = props => {
  return (
    <View
      style={[
        {
          height: 14,
          width: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#53C20B',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#53C20B',
          }}
        />
      ) : null}
    </View>
  );
};