// Import Swiper React components
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FC } from "react";

type Props = {
  images: string[];
};
const Swiper: FC<Props> = ({ images }) => {
  return (
    <SwiperContainer loop>
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img src={image} alt="" className="aspect-square object-contain" />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default Swiper;
