import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {avatar} from '../../core/assets';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {windowHeight, windowWidth} from '../../core/utils/sizeConfig';

import {useSelector} from 'react-redux';
function ProfileScreen({navigation}) {
  const isLoading = useSelector(state => state.userReducer.isLoading);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const menuComponent = (onPress, icon, title, color = 'black') => {
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.menuItem}>
            <Icon name={icon} size={20} style={[styles.icon, {color}]} />
            <Text style={[styles.menuText, {color}]}>{title}</Text>
            <Icon
              name="chevron-right"
              size={20}
              style={[styles.chevronIcon, {color}]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (isLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View style={styles.profileContainer}>
              <Image source={avatar.avatar} style={styles.avatar} />
              <Text style={styles.profileName}>
                {userInfo.name.firstname} {userInfo.name.lastname}
              </Text>
            </View>
            <View style={styles.separator}></View>
            {menuComponent(
              () => {
                navigation.navigate('userScreen', {userInfo});
              },
              'user',
              'Tài khoản của tôi',
            )}
            {menuComponent(() => {}, 'qrcode', 'Mã QR')}
            {menuComponent(
              () => {
                navigation.navigate('addressScreen');
              },
              'location-arrow',
              'Quản lý địa chỉ',
            )}
            <View style={styles.separator}></View>
            {menuComponent(() => {}, 'bell', 'Thông báo ứng dụng')}
            {menuComponent(() => {}, 'shield-alt', 'Chính sách bảo mật')}
            {menuComponent(() => {}, 'phone', 'Hotline hỗ trợ')}
            <View style={styles.separator}></View>
            {menuComponent(() => {}, 'lock', 'Đổi mật khẩu')}
            {menuComponent(() => {}, 'user-times', 'Yêu cầu xoá tài khoản')}
            <View style={styles.separator}></View>
            {menuComponent(
              () => {},
              'sign-out-alt',
              'Đăng xuất tài khoản',
              'red',
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
}

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
    textTransform: 'uppercase',
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

export default ProfileScreen;
