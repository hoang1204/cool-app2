import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../../core/utils/sizeConfig';
import {logo} from '../../core/assets';
import {formatCurrency} from '../../core/utils/formatCurrency';
import {useDispatch} from 'react-redux';
import {addCart} from '../../controller/cartSlice';
function DetailsItem({route, navigation}) {
  const dispatch = useDispatch();
  const {item} = route.params;
  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      <ScrollView>
        <Image
          source={{uri: item.image}}
          style={{
            width: windowWidth,
            height: 300,
            borderBottomWidth: 1,
            padding: 10,
            marginTop: 30,
          }}
          resizeMode="contain"></Image>
        <Text
          style={{padding: 10, fontSize: 26, fontWeight: 'bold'}}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 22, fontWeight: 'bold'}}>
            {formatCurrency(item.price)} $
          </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 22,
              color: 'grey',
              textDecorationLine: 'line-through',
            }}>
            {formatCurrency((item.price * 150) / 100)} $
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{padding: 10, fontSize: 20}}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.rating.rate}
          </Text>
          <Image
            source={logo.star}
            style={{
              width: 20,
              height: 20,
              alignSelf: 'center',
            }}></Image>
          <Text
            style={{padding: 10, fontSize: 20}}
            numberOfLines={2}
            ellipsizeMode="tail">
            ( {item.rating.count} ) Lượt đánh giá
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            flex: 100,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', flex: 60}}>
            <View
              style={{
                backgroundColor: 'red',
                height: 30,
                width: 30,
                margin: 5,
              }}></View>
            <View
              style={{
                backgroundColor: 'blue',
                height: 30,
                width: 30,
                margin: 5,
              }}></View>
            <View
              style={{
                backgroundColor: 'grey',
                height: 30,
                width: 30,
                margin: 5,
              }}></View>
          </View>
          <View style={{flexDirection: 'row', flex: 30}}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: 18,
                height: 30,
                width: 30,
                margin: 5,
              }}>
              S
            </Text>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: 18,
                height: 30,
                width: 30,
                margin: 5,
              }}>
              M
            </Text>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: 18,
                height: 30,
                width: 30,
                margin: 5,
              }}>
              L
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'grey',
            width: windowWidth / 2,
            height: 45,
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',

            borderColor: 'black',
            borderWidth: 2,
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(addCart({...item, amount: 1}));
              Alert.alert('Thêm giỏ hàng thành công');
              navigation.navigate('cartScreen');
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Thêm vào giỏ
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{padding: 10, fontSize: 20}}
          numberOfLines={2}
          ellipsizeMode="tail">
          Chi tiết sản phẩm:
        </Text>
        <Text style={{padding: 10, fontSize: 20}} ellipsizeMode="tail">
          {item.description}
        </Text>
        <View>
          <Image
            source={logo.banner}
            style={{
              width: windowWidth,
              height: 130,
              resizeMode: 'center',
            }}></Image>
          <Text
            style={{
              position: 'absolute',
              top: 35,
              left: 30,
              fontSize: 23,
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
            POLO THỂ THAO
          </Text>
          <Text
            style={{
              position: 'absolute',
              top: 70,
              left: 30,
              fontSize: 11,

              fontStyle: 'italic',
            }}>
            Công nghệ Ex-Dry thấm hút tối ưu
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
export default DetailsItem;
