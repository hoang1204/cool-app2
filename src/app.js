import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './views/home/HomeScreen';
import LoginScreen from './views/authen/LoginScreen';
import DetailsItem from './views/home/Detail_Item';
import CartScreen from './views/cart/CartScreen';
import NotificationScreen from './views/notification/NotificationScreen';
import ProfileScreen from './views/profile/ProfileScreen';
import MyTabs from './components/bottomNav';
import {Provider} from 'react-redux';
import {store} from './ReduxStore';
import AddressScreen from './views/profile/menuComponent/AddressScreen';
import UserScreen from './views/profile/menuComponent/UserScreen';
import CheckoutScreen from './views/cart/CheckoutScreen';
import RegisterScreen from './views/authen/RegisterScreen';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="homePage"
            component={MyTabs}
            options={{headerShown: false, title: 'Trang chủ'}}
          />
          <Stack.Screen
            name="detailsItem"
            component={DetailsItem}
            options={{title: 'Chi tiết'}}
          />
          <Stack.Screen
            name="cartScreen"
            component={CartScreen}
            options={{title: 'Giỏ hàng'}}
          />
          <Stack.Screen
            name="notificationScreen"
            component={NotificationScreen}
            options={{title: 'Thông báo'}}
          />
          <Stack.Screen
            name="profileScreen"
            component={ProfileScreen}
            options={{title: 'Thông tin cá nhân'}}
          />
          <Stack.Screen
            name="addressScreen"
            component={AddressScreen}
            options={{title: 'Quản lý địa chỉ'}}
          />
          <Stack.Screen
            name="userScreen"
            component={UserScreen}
            options={{title: 'Tài khoản của tôi'}}
          />
          <Stack.Screen
            name="checkoutScreen"
            component={CheckoutScreen}
            options={{title: 'Chi tiết đơn hàng'}}
          />
          <Stack.Screen
            name="registerScreen"
            component={RegisterScreen}
            options={{title: 'Đăng ký', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
