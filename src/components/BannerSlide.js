import React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

const BannerCarouselComponent = ({dataBanner, renderData}) => {
  var carouselRef;

  return (
    <Carousel
      ref={c => {
        carouselRef = c;
      }}
      data={dataBanner}
      renderItem={renderData}
      sliderWidth={windowWidth - 10}
      itemWidth={350}
      loop={true}
    />
  );
};

const BannerCarousel = React.memo(BannerCarouselComponent);

export default BannerCarousel;
