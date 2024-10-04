import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
`;