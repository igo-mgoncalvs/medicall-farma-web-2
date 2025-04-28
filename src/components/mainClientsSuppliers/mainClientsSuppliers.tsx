/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import styles from './stryles.module.css'
import { Autoplay, Pagination } from "swiper/modules"
import 'swiper/css/pagination';
import 'swiper/css';

interface IListImages {
  id: number
  src: string
  alt: string
}

export default function MainClientsSuppliers ({ list, type, mobile, title, description }: {
  list: IListImages[],
  type: "suppliers" | "clients",
  mobile: boolean,
  title: string | undefined,
  description: string | undefined
}) {
  return (
    <div
      className={`${styles.main} ${mobile ? styles.mobile_background: ''}`}
      style={{
        marginTop: type === 'clients' ? '50px' : '0',
      }}
    >
      <div
        className={styles.top_description}
      >
        <p className={styles.sub_description}>
        {description}
          
        </p>
        <p className={styles.title}>
          {title}
        </p>
        
        <div className={styles.line}/>
      </div>

      <div
        className={styles.images_container}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          modules={[Autoplay, Pagination]}
          pagination
          breakpoints={{
            1: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className={styles.swiper}
        >
          {list.map((item) => (
            <SwiperSlide
              key={item.id}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={styles.banner}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}