import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { StyledSwiperSlide, StyledImage } from './styles';
import styled from 'styled-components';


const StyledSwiperContainer = styled.div`
  .swiper-button-next,
  .swiper-button-prev {
    color: #fff; /* Cambia el color a blanco */
  }
`;

interface MyCarouselProps {
    images: string[];
}


export default function Carousel({ images }: MyCarouselProps) {
    return (
        <StyledSwiperContainer>
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            pagination-type="progressbar"
        >
            {images.map((image) => (
                <StyledSwiperSlide key={image}>
                    <StyledImage src={image} />
                </StyledSwiperSlide>
            ))}
        </Swiper>
        </StyledSwiperContainer>
    );
}
