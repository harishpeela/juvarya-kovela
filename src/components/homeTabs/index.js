import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {allTexts, colors, fontFamily, fontSize} from '../../common';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';

export const HomeTabs = ({}) => {
  const [id, setId] = useState(1);
  useEffect(() => {
    console.log(id);
  }, [id]);
  let tabList = [
    {
      id: 1,
      text: allTexts.homeTabs.all,
    },
    {
      id: 2,
      text: allTexts.homeTabs.nearby,
    },
    {
      id: 3,
      text: allTexts.homeTabs.popular,
    },
    {
      id: 4,
      text: allTexts.homeTabs.mostViewd,
    },
    {
      id: 5,
      text: allTexts.homeTabs.nearby,
    },
    {
      id: 6,
      text: allTexts.homeTabs.popular,
    },
  ];
  const TabItem = ({index, text}) => (
    <TouchableOpacity
      onPress={() => {
        setId(index);
      }}
      style={id == index ? styles.background : {marginHorizontal: 10}}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tabList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <TabItem index={item.id} text={item.text} />
        )}
      />
    </View>
  );
};
