import { createContext, useState, useEffect, useContext } from "react";
import { Swiper as SwiperClass } from 'swiper/types';

type SwiperContextType = {
  swiper: SwiperClass | null;
  setSwiper: (swiper: SwiperClass | null) => void;
  shouldMoveToNext: boolean;
  setShouldMoveToNext: (should: boolean) => void;
}

const swiperContextDefaultValue: SwiperContextType = { 
  swiper: null,
  setSwiper: () => {},
  shouldMoveToNext: false,
  setShouldMoveToNext: () => {}
}

const SwiperContext = createContext<SwiperContextType>(swiperContextDefaultValue);

export const useSwiperContext = () => useContext(SwiperContext);

export const SwiperContextProvider: React.FC = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [shouldMoveToNext, setShouldMoveToNext] = useState(false);

  const value: SwiperContextType = {
    swiper,
    setSwiper,
    shouldMoveToNext,
    setShouldMoveToNext
  }

  useEffect(() => {
    if(swiper && shouldMoveToNext){
      swiper.slideNext();

      setShouldMoveToNext(false)
    }
  }, [shouldMoveToNext, swiper])

  return <SwiperContext.Provider value={value}>
    {children}
  </SwiperContext.Provider>
}