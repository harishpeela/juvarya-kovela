import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  profileView: {
    width: 80,
    height: 80,
    borderColor: '#FFA001',
    borderWidth: 1,
    borderRadius: 40,
  },
  postsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  postText: {
    fontSize: 14,
    color: '#585858',
    lineHeight: 18,
  },
  followersView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  voidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: '#585858',
    borderWidth: 1,
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
    },
  },
  followLoader: {
    width: 105,
    padding: 10,
    height: 38,
    backgroundColor: '#FFA001',
    borderRadius: 10,
    marginRight: 4,
  },
});
