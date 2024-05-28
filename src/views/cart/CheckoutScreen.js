import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {windowWidth} from '../../core/utils/sizeConfig';
import {formatCurrency} from '../../core/utils/formatCurrency';
import {useDispatch, useSelector} from 'react-redux';
import {removeAllCart} from '../../controller/cartSlice';
const CheckoutScreen = ({route, navigation}) => {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const {listCartProduct} = route.params;
  const dispatch = useDispatch();
  const totalAmount = () => {
    var total = 0;
    listCartProduct.map(element => {
      total += element.price * element.amount;
    });
    return total;
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View>
          <View
            style={{
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              width: windowWidth - 30,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Địa chỉ của Coolmate
            </Text>
            <Text numberOfLines={1}>
              Vinhomes Grand Park, TP. Thái Nguyên, Tỉnh Thái Nguyên
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#f0eded',
                margin: 10,
              }}></View>
          </View>
          <View
            style={{
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              width: windowWidth - 30,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                Tên khách: {userInfo.name.firstname} {userInfo.name.lastname}
              </Text>
              <Text
                style={{fontSize: 16, alignSelf: 'center', marginBottom: 10}}>
                (Khách đặt)
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#f0eded',
                margin: 10,
              }}></View>
            <View>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                Địa chỉ
              </Text>

              <Text style={{marginBottom: 10}}>
                City: {userInfo.address.city}
              </Text>
              <Text style={{marginBottom: 10}}>
                Street: {userInfo.address.street}
              </Text>
              <Text style={{marginBottom: 10}}>
                Number: {userInfo.address.number}
              </Text>
              <Text style={{marginBottom: 10}}>
                Zipcode: {userInfo.address.zipcode}
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#f0eded',
                  margin: 10,
                }}></View>
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Danh sách sản phẩm
            </Text>
            <View>
              <FlatList
                data={listCartProduct}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: windowWidth / 3,
                        height: 100,
                        marginVertical: 13,
                        marginHorizontal: 10,
                      }}
                      resizeMode="contain"></Image>
                    <View style={{alignSelf: 'center'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          alignSelf: 'center',
                          width: windowWidth / 2 - 30,
                          marginBottom: 8,
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          alignSelf: 'center',
                          width: windowWidth / 2 - 30,
                        }}>
                        {formatCurrency(item.price)}
                      </Text>
                    </View>

                    <Text
                      style={{
                        alignSelf: 'center',
                        width: windowWidth / 2 - 30,
                      }}>
                      x {item.amount}
                    </Text>
                  </View>
                )}></FlatList>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#f0eded',
                margin: 10,
              }}></View>
            <View>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                Thanh toán
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text numberOfLines={1} style={{}}>
                  Tổng tiền:
                </Text>
                <Text> {formatCurrency(totalAmount())}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text numberOfLines={1} style={{}}>
                  Hình thức thanh toán:
                </Text>
                <Text>Tiền mặt</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text numberOfLines={1} style={{}}>
                  Thành tiền:
                </Text>
                <Text>{formatCurrency(totalAmount())}</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#f0eded',
                margin: 10,
              }}></View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Thông báo', 'Xác nhận đặt hàng', [
                  {
                    text: 'Huỷ',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Chấp nhận',
                    onPress: () => {
                      dispatch(removeAllCart());
                      Alert.alert('Đặt hàng thành công');
                      navigation.navigate('homePage');
                    },
                  },
                ]);
              }}
              style={{
                marginVertical: 10,
                marginBottom: 20,
                width: (windowWidth * 4) / 5,
                height: 40,
                backgroundColor: '#333333',
                padding: 10,
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text style={{color: 'white', alignSelf: 'center', fontSize: 17}}>
                Đặt hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CheckoutScreen;
