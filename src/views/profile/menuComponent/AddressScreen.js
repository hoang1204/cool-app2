import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {windowHeight, windowWidth} from '../../../core/utils/sizeConfig';
const AddressScreen = () => {
  return <View></View>;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: windowHeight,
    width: windowWidth,
  },
  scrollView: {
    height: windowHeight + 200,
    width: windowWidth,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#f0eded',
    margin: 20,
  },
  menuItem: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 18,
    marginRight: 5,
  },
  menuText: {
    fontSize: 18,
    margin: 10,
    flex: 1,
  },
  chevronIcon: {
    alignSelf: 'center',
    marginRight: 18,
  },
});
export default AddressScreen;
