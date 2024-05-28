import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {logo} from '../../../core/assets';
import {windowWidth} from '../../../core/utils/sizeConfig';
import {useDispatch} from 'react-redux';
import {addCart} from '../../../controller/cartSlice';
const ListVertical = ({listProduct, navigation}) => {
  const dispatch = useDispatch();
  return (
    <FlatList
      data={listProduct}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      //horizontal={true}
      scrollEnabled={false}
      renderItem={({item}) => (
        <View style={styles.productContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('detailsItem', {item});
            }}>
            <Image
              source={{uri: item.image}}
              style={styles.productImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={styles.productTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.productRating}>
            <Text style={styles.ratingText}>{item.rating.rate}</Text>
            <Image source={logo.star} style={styles.ratingIcon}></Image>
            <Text style={styles.ratingCount}>({item.rating.count})</Text>
          </View>
          <View style={styles.productPriceContainer}>
            <Text style={styles.productPrice}>{item.price} $</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(addCart({...item, amount: 1}));
                Alert.alert('Thêm giỏ hàng thành công');
                navigation.navigate('cartScreen');
              }}>
              <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};
const ListVertiCalItem = React.memo(ListVertical);
export default ListVertiCalItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 100,
  },
  header: {
    flexDirection: 'row',
  },
  welcomeText: {
    alignSelf: 'center',
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  flexSpacer: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    flex: 100,
  },
  flex20: {
    flex: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    objectFit: 'contain',
  },
  flex60: {
    flex: 60,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  carouselImage: {
    height: 170,
    width: 350,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    width: 160,
    borderRadius: 30,
    height: 35,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  buttonContent: {
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  inactiveButton: {
    backgroundColor: 'white',
  },
  activeButtonText: {
    color: 'white',
  },
  inactiveButtonText: {
    color: 'black',
  },
  productContainer: {
    width: windowWidth / 2 - 20,
    height: 300,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  productImage: {
    width: windowWidth / 2 - 20,
    height: 200,
    marginVertical: 13,
  },
  productTitle: {
    paddingHorizontal: 10,
  },
  productRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    left: 5,
    width: '30%',
    height: '10%',
  },
  ratingText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  ratingIcon: {
    width: 10,
    height: 10,
    justifyContent: 'center',
  },
  ratingCount: {
    color: 'grey',
  },
  productPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    padding: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  bannerImage: {
    width: windowWidth,
    height: 130,
    resizeMode: 'center',
  },
  bannerTitle: {
    position: 'absolute',
    top: 35,
    left: 30,
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    position: 'absolute',
    top: 70,
    left: 30,
    fontSize: 11,
    fontStyle: 'italic',
  },
});
