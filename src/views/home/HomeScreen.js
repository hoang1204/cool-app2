import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {avatar, logo, search} from '../../core/assets';

import {dataBanner} from '../../models/data';
import {windowWidth} from '../../core/utils/sizeConfig';
import {storage} from '../../core/utils/storage';
import {
  fetchDataAPI,
  fetchDataAPI1_1,
  fetchDataAPI2,
} from '../../controller/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, loadDataLocal} from '../../controller/cartSlice';
import BannerCarousel from '../../components/BannerSlide';
import ItemShimmer from './component/shimmerItem';
import ListVertiCalItem from './component/List_Vertical';
import ListHorizontalItem from './component/List_Horizontal';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading1, isLoading2} = useSelector(state => state.homeFetchData);
  const listProduct = useSelector(state => state.homeFetchData.listProduct);
  const listProduct2 = useSelector(state => state.homeFetchData.listProduct2);
  const listCartProduct = useSelector(
    state => state.cartReducer.listCartProduct,
  );
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const isLoading = useSelector(state => state.homeFetchData.isLoading);

  useEffect(() => {
    dispatch(fetchDataAPI());
    dispatch(fetchDataAPI2());
    dispatch(loadDataLocal());
    console.log('re-render');
  }, [dispatch]);

  const renderData = ({item, index}) => {
    return (
      <View>
        <Image source={item.source} style={styles.carouselImage}></Image>
      </View>
    );
  };

  const [activeButton, setActiveButton] = useState('button1');
  const handleActiveButton = button => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <View style={styles.flexSpacer}></View>
            <Image source={avatar.avatar} style={styles.avatar}></Image>
          </View>
          <View style={styles.logoContainer}>
            <View style={styles.flex20}></View>
            <Image source={logo.logo} style={styles.logo}></Image>
            <View style={styles.flex60}></View>
          </View>
          <BannerCarousel dataBanner={dataBanner} renderData={renderData} />

          <View style={[styles.button, styles.activeButton]}>
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => handleActiveButton('button1')}>
              <Text style={[styles.buttonText, styles.activeButtonText]}>
                Đồ điện tử
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {isLoading2 ? (
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.productContainer]}>
                  <ActivityIndicator
                    style={{marginTop: 100}}
                    size="large"
                    color="#0000ff"
                  />
                </View>
                <View style={[styles.productContainer]}>
                  <ActivityIndicator
                    style={{marginTop: 100}}
                    size="large"
                    color="#0000ff"
                  />
                </View>
              </View>
            ) : (
              <ListHorizontalItem
                listProduct2={listProduct2}
                navigation={navigation}></ListHorizontalItem>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.button,
                activeButton === 'button1'
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => {
                  dispatch(fetchDataAPI());
                  handleActiveButton('button1');
                }}>
                <Text
                  style={[
                    styles.buttonText,
                    activeButton === 'button1'
                      ? styles.activeButtonText
                      : styles.inactiveButtonText,
                  ]}>
                  Sản phẩm mới
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.button,
                activeButton === 'button2'
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => {
                  dispatch(fetchDataAPI1_1());
                  handleActiveButton('button2');
                }}>
                <Text
                  style={[
                    styles.buttonText,
                    activeButton === 'button2'
                      ? styles.activeButtonText
                      : styles.inactiveButtonText,
                  ]}>
                  Hàng HOT giá xịn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {isLoading1 ? (
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.productContainer]}>
                  <ActivityIndicator
                    style={{marginTop: 100}}
                    size="large"
                    color="#0000ff"
                  />
                </View>
                <View style={[styles.productContainer]}>
                  <ActivityIndicator
                    style={{marginTop: 100}}
                    size="large"
                    color="#0000ff"
                  />
                </View>
              </View>
            ) : (
              <ListVertiCalItem
                listProduct={listProduct}
                navigation={navigation}></ListVertiCalItem>
            )}
          </View>

          <View>
            <Image source={logo.banner} style={styles.bannerImage}></Image>
            <Text style={styles.bannerTitle}>POLO THỂ THAO</Text>
            <Text style={styles.bannerSubtitle}>
              Công nghệ Ex-Dry thấm hút tối ưu
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

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

export default HomeScreen;
