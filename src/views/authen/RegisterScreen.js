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
  ActivityIndicator,
} from 'react-native';
// component = function
// function MainScreen(props) {
//     return <Text>This is main Screen</Text>
// }
import {logo} from '../../core/assets';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setMessageNull, signUpUser} from '../../controller/authenSlice';
//create a variable which reference to a function
const {width, height} = Dimensions.get('window');
const RegisterScreen = ({navigation}) => {
  const message = useSelector(state => state.authenReducer.message);
  const loading = useSelector(state => state.authenReducer.loading);
  const error = useSelector(state => state.authenReducer.error);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [reUserPass, setReUserPass] = useState('');
  const [isHidePass, setIsHidePass] = useState(true);
  const handleRegister = async () => {
    if (userPass !== reUserPass) {
      Alert.alert('Đăng ký không thành công', 'Mật khẩu không trùng khớp');
    } else {
      try {
        await auth().createUserWithEmailAndPassword(userName, userPass);

        Alert.alert('Đăng ký thành công', 'Bạn sẽ được chuyển sang đăng nhập');
        navigation.pop();
      } catch (error) {
        // Xử lý lỗi Firebase
        var errorMessage;
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email đã được sử dụng';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Email không hợp lệ';
        } else {
          errorMessage = error.message;
        }
        Alert.alert('Đăng ký không thành công', errorMessage);
      }
      //   dispatch(signUpUser({userName: userName, userPass: userPass}));
      //   if (message !== null) {
      //     if (message !== 'Đăng ký thành công') {
      //       Alert.alert('Đăng ký không thành công', message);
      //     } else {
      //       Alert.alert(
      //         'Đăng ký thành công',
      //         'Bạn sẽ được chuyển sang đăng nhập',
      //       );
      //       navigation.pop();
      //     }
      //   }
    }
  };

  return (
    <View
      style={{backgroundColor: 'white', flexDirection: 'column', flex: 100}}>
      <View
        style={{backgroundColor: 'white', flexDirection: 'column', flex: 100}}>
        <View
          style={{flex: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={logo.logo}
            style={{
              marginTop: 40,
              objectFit: 'contain',
              alignItems: 'center',
              width: 350,
              height: 165,
            }}></Image>
        </View>
        <View style={{flex: 35, alignItems: 'center'}}>
          <Text
            style={{
              marginTop: 0,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            ĐĂNG KÝ TÀI KHOẢN
          </Text>

          <TextInput
            style={styles.input1}
            placeholder="Nhập email..."
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
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input2}
              placeholder="Nhập lại mật khẩu ..."
              value={reUserPass}
              onChangeText={setReUserPass}
              secureTextEntry={isHidePass}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            activeOpacity={0.5}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'red'} />
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  alignItems: 'center',
                }}>
                Đăng ký
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{flex: 20, alignItems: 'center'}}
          onPress={() => {
            navigation.pop();
          }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 30,
              color: 'red',
              fontWeight: 'bold',
            }}>
            Quay lại đăng nhập?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
export default RegisterScreen;
