import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
// component = function
// function MainScreen(props) {
//     return <Text>This is main Screen</Text>
// }
import {logo} from '../../core/assets';

import {useDispatch, useSelector} from 'react-redux';
import {fetchUserAPI, userSlice} from '../../controller/userSlice';
import {storage} from '../../core/utils/storage';
import {loginUser, saveUserInfo} from '../../controller/authenSlice';
import auth from '@react-native-firebase/auth';
import {loadDataLocal} from '../../controller/cartSlice';
//create a variable which reference to a function
const {width, height} = Dimensions.get('window');

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [isHidePass, setIsHidePass] = useState(true);
  const handleLogin = async () => {
    try {
      const userInfo = await auth().signInWithEmailAndPassword(
        userName,
        userPass,
      );

      dispatch(saveUserInfo(userInfo));
      if (storage.getString(userInfo.user.uid) === undefined) {
        console.log('Đã khởi tạo storage');
        storage.set(userInfo.user.uid, 'null');
      } else {
        console.log('storage' + storage.getString(userInfo.user.uid));
        dispatch(loadDataLocal(userInfo.user.uid));
      }
      Alert.alert('Đăng nhập thành công');
      navigation.navigate('homePage');
    } catch (error) {
      // Xử lý lỗi Firebase
      var errorMessage;
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Sai mật khẩu';
      } else {
        errorMessage = error.message;
      }
      Alert.alert('Đăng nhập thất bại', errorMessage);
    }
  };

  return (
    <View
      style={{backgroundColor: 'white', flexDirection: 'column', flex: 100}}>
      <View style={{flex: 35, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={logo.logo}
          style={{
            marginTop: 150,
            objectFit: 'contain',
            alignItems: 'center',
            width: 350,
            height: 165,
          }}></Image>
      </View>
      <View style={{flex: 35, alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          ĐĂNG NHẬP TÀI KHOẢN
        </Text>

        <TextInput
          style={styles.input1}
          placeholder="Nhập tài khoản..."
          value={userName}
          onChangeText={setUserName}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input2}
            placeholder="Nhập mật khẩu ..."
            value={userPass}
            onChangeText={setUserPass}
            secureTextEntry={isHidePass}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogin();
            dispatch(fetchUserAPI());
          }}
          activeOpacity={0.5}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignItems: 'center'}}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 20, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={{fontSize: 18}}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('registerScreen');
            }}>
            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 30,
            color: 'red',
            fontWeight: 'bold',
          }}>
          Quên mật khẩu?
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 30,
    width: (width * 4) / 5,
    height: 40,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  input1: {
    marginTop: 30,
    borderRadius: 5,
    height: 50,
    width: (width * 4) / 5,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input2: {
    marginTop: 20,
    borderRadius: 5,
    height: 50,
    width: (width * 4) / 5,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  output: {
    fontSize: 20,
  },
});
export default LoginScreen;
