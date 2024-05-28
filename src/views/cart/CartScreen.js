import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../core/utils/sizeConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {formatCurrency} from '../../core/utils/formatCurrency';
import {
  removeCart,
  incrementAmount,
  decrementAmount,
} from '../../controller/cartSlice';
import userdata from '../../models/userdata';
function CartScreen({navigation}) {
  const dispatch = useDispatch();
  const listCartProduct = useSelector(
    state => state.cartReducer.listCartProduct,
  );
  const isEmptyCart = () => {
    if (listCartProduct.length === 0) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text
            style={{
              position: 'absolute',
              width: windowWidth,
              height: windowHeight,
              top: windowHeight / 2,
              textAlign: 'center',
              fontSize: 19,
              fontWeight: 'bold',
            }}>
            Giỏ hàng của bạn đang trống
          </Text>
          <LottieView
            source={require('../../../assets/emptyCart.json')}
            style={{width: '100%', height: '100%'}}
            autoPlay
            loop
          />
        </View>
      );
    }
  };
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      {isEmptyCart()}
      <ScrollView>
        <FlatList
          data={listCartProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          scrollEnabled={false}
          renderItem={({item}) => (
            <View
              style={{
                width: windowWidth - 30,
                height: 180,
                backgroundColor: 'white',
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: windowWidth / 3,
                      height: 100,
                      marginVertical: 13,
                    }}
                    resizeMode="contain"></Image>

                  <Text
                    style={{paddingHorizontal: 10, width: windowWidth / 2 - 60}}
                    numberOfLines={2}
                    ellipsizeMode="tail" // Các giá trị khác: 'head', 'middle', 'clip'
                  >
                    {item.title}
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth / 2,
                    }}>
                    <Text style={{color: 'grey'}}>Giá bán (1sp):</Text>
                    <Text>{formatCurrency((item.price * 150) / 100)}</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth / 2,
                    }}>
                    <Text style={{color: 'grey'}}>Giảm giá:</Text>
                    <Text>33%</Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth / 2,
                    }}>
                    <Text style={{color: 'grey'}}>Số lượng:</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: (windowWidth * 1) / 10,
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={{justifyContent: 'center'}}
                        onPress={() => {
                          dispatch(incrementAmount(item));
                        }}>
                        <Icon name="add" size={14}></Icon>
                      </TouchableOpacity>
                      <Text>{item.amount}</Text>
                      <TouchableOpacity
                        style={{justifyContent: 'center'}}
                        onPress={() => {
                          dispatch(decrementAmount(item));
                        }}>
                        <Icon name="remove-outline" size={14}></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth / 2,
                    }}>
                    <Text style={{color: 'grey'}}>Tổng giá bán:</Text>
                    <Text>{formatCurrency(item.price * item.amount)}</Text>
                  </View>
                  <TouchableOpacity
                    style={{paddingVertical: 10, alignItems: 'flex-end'}}
                    onPress={() => {
                      dispatch(removeCart(item));
                      //  console.log(listCartProduct);
                    }}>
                    <Icon name="trash" size={16}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Thông báo', 'Xác nhận thanh toán', [
              {
                text: 'Huỷ',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Chấp nhận',
                onPress: () => {
                  navigation.navigate('checkoutScreen', {
                    listCartProduct,
                  });
                },
              },
            ]);
          }}
          style={{
            marginTop: 20,
            width: (windowWidth * 4) / 5,
            height: 40,
            backgroundColor: '#333333',
            padding: 10,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 17}}>
            Thanh toán
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default CartScreen;
