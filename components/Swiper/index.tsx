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
    <SwiperContainer loop className="w-full">
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img
            src={image}
            alt=""
            className="w-full aspect-square object-contain max-h-[calc(100vw-40px)]"
          />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default Swiper;
