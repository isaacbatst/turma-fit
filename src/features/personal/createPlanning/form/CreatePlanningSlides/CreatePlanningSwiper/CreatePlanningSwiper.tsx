import { Navigation, Pagination } from "swiper";
import {Swiper} from "swiper/react";
import styles from '../styles.module.scss';

const CreatePlanningSwiper: React.FC = ({ children }) => {
  return <Swiper
    spaceBetween={50}
    slidesPerView={1}
    modules={[ Navigation, Pagination ]}
    allowTouchMove={false}
    pagination={{
      clickable: true
    }}
    className={styles.swiper}
  >
    {children}
  </Swiper>
}

export default CreatePlanningSwiper;