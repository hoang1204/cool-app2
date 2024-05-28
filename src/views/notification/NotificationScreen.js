import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {windowWidth} from '../../core/utils/sizeConfig';
function NotificationScreen() {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: windowWidth,
            margin: 20,
          }}>
          <View>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#edbe3e',
                borderRadius: 200,
                left: 14,
                marginVertical: 10,
                justifyContent: 'center',
                borderWidth: 2,
              }}>
              <Icon
                name="shipping-fast"
                size={20}
                color={'white'}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 17}}>Đơn hàng</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#26bf00',
                borderRadius: 200,
                justifyContent: 'center',
                marginVertical: 10,
                left: 17,
                borderWidth: 0,
              }}>
              <Icon
                name="money-check-alt"
                size={20}
                color={'white'}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 17}}>Thanh toán</Text>
          </View>
        </View>
      </View>
      <View style={{borderWidth: 1, borderColor: '#f0eded', margin: 10}}></View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#26bf00',
              borderRadius: 200,
              justifyContent: 'center',
              marginVertical: 5,
              left: 17,
              borderWidth: 0,
            }}>
            <Icon
              name="money-check-alt"
              size={20}
              color={'white'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{width: (windowWidth / 10) * 8, marginHorizontal: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 5}}>
              Thanh toán thành công
            </Text>
            <Text style={{color: 'grey'}}>14/01/24, 21:27</Text>
          </View>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            marginVertical: 3,
            width: windowWidth - 30,
            marginHorizontal: 20,
          }}>
          Đơn hàng #69036 đã được thanh toán thành công qua hình thức chuyển
          khoản. Số tiền đã thanh toàn $39.95$
        </Text>
        <View
          style={{borderWidth: 1, borderColor: '#f0eded', margin: 20}}></View>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#26bf00',
              borderRadius: 200,
              justifyContent: 'center',
              marginVertical: 5,
              left: 17,
              borderWidth: 0,
            }}>
            <Icon
              name="money-check-alt"
              size={20}
              color={'white'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{width: (windowWidth / 10) * 8, marginHorizontal: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 5}}>
              Thanh toán thành công
            </Text>
            <Text style={{color: 'grey'}}>14/01/24, 21:27</Text>
          </View>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            marginVertical: 3,
            width: windowWidth - 30,
            marginHorizontal: 20,
          }}>
          Đơn hàng #69036 đã được thanh toán thành công qua hình thức chuyển
          khoản. Số tiền đã thanh toàn $39.95$
        </Text>
        <View
          style={{borderWidth: 1, borderColor: '#f0eded', margin: 20}}></View>
      </View>
    </View>
  );
}
export default NotificationScreen;
