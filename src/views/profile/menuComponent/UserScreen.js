import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {windowHeight, windowWidth} from '../../../core/utils/sizeConfig';
import {avatar} from '../../../core/assets';
import {logger} from 'react-native-logs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {updateUserInfo} from '../../../controller/userSlice';
const UserScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [userPhone, setUserPhone] = useState(userInfo.phone);
  const [userEmail, setUserEmail] = useState('Chưa đăng ký');
  const [userGoogle, setUserGoogle] = useState('Chưa đăng ký');
  const [userApple, setUserApple] = useState('Chưa đăng ký');
  var log = logger.createLogger();
  const infoUser = (icon, title, info, onChange) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={icon} size={23} style={[styles.icon]} />
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              fontSize: 19,
              alignSelf: 'center',
            }}>
            {title}
          </Text>
        </View>
        <TextInput
          editable={isEditing}
          style={[
            {
              marginHorizontal: 20,
              marginVertical: 5,
              fontSize: 19,
            },
            isEditing ? {borderWidth: 1, borderRadius: 10, padding: 10} : {},
          ]}
          value={info}
          onChangeText={onChange}></TextInput>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 10}}
          onPress={() => {
            setIsEditing(true);
          }}>
          <Icon name="edit" size={23} />
        </TouchableOpacity>
        <Image source={avatar.avatar} style={styles.avatar} />
        <Text style={styles.profileName}>
          {userInfo.name.firstname} {userInfo.name.lastname}
        </Text>
      </View>
      {infoUser('phone-square-alt', 'Số điện thoại', userPhone, setUserPhone)}
      <View style={styles.separator}></View>
      {infoUser('envelope', 'Email', userEmail, setUserEmail)}
      <View style={styles.separator}></View>
      {infoUser('google', 'Google', userGoogle, setUserGoogle)}
      <View style={styles.separator}></View>
      {infoUser('apple', 'Apple', userApple, setUserApple)}
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Thông báo', 'Xác nhận chỉnh sửa', [
            {
              text: 'Huỷ',
              onPress: () => {
                setUserPhone(userInfo.phone), setUserEmail('Chưa đăng ký');
                setUserGoogle('Chưa đăng ký');
                setUserApple('Chưa đăng ký');
              },
              style: 'cancel',
            },
            {
              text: 'Chấp nhận',
              onPress: () => {
                dispatch(updateUserInfo({...userInfo, phone: userPhone}));
              },
            },
          ]);

          setIsEditing(false);
        }}
        style={{
          marginTop: 50,
          width: (windowWidth * 4) / 5,
          height: 40,
          backgroundColor: '#333333',
          padding: 10,
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 17}}>
          Lưu chỉnh sửa
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 30,
    marginVertical: 20,
  },
  profileName: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#f0eded',
    margin: 5,
  },
  menuItem: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 18,
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

export default UserScreen;
