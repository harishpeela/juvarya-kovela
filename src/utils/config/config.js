import {Dimensions, Platform, StatusBar} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const statusBarHeight  = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

