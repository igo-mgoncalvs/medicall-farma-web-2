/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import styles from './stryles.module.css'
import { Autoplay } from "swiper/modules"

interface IListImages {
  id: number
  src: string
  alt: string
}

export default function MainClientsSuppliers ({ list, type }: { list: IListImages[], type: "suppliers" | "clients" }) {
  return (
    <div
      className={styles.main}
      style={{
        marginTop: type === 'clients' ? '50px' : '0'
      }}
    >
      <div
        className={styles.top_description}
      >
        <p className={styles.sub_description}>
        {type === 'clients' 
          ? "Clientes que são verdadeiros parceiros na busca pela excelência e qualidade." 
          : "Parceiros comprometidos com a excelência em produtos de qualidade"}
          
        </p>
        <p className={styles.title}>
          {`Principais ${type === 'clients' ? "Clientes" : "Fornecedores"}`}
        </p>
        
        <div className={styles.line}/>
      </div>

      <div
        className={styles.images_container}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
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