'use client'

import { useEffect, useState } from "react"
import Product, { IProduct } from "../product/product"

import styles from './styles.module.css'
import { ICategories } from "@/app/[groupName]/[category]/page"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

export default function TopProducts ({categories, groupName}: {categories: ICategories[], groupName: string}) {
  const [products, setProducts] = useState<IProduct[]>([])
  
  useEffect(() => {
    const list: IProduct[] = []

    categories.forEach((category) => {
      list.push(...category.products)
    })
    
    setProducts(list)
  }, [categories])

  return (
    <div
      className={styles.main}
    >
      <div>
        <div
          className={styles.title}
        >
          <p className={styles.top}>Top 5</p>
          Produtos destaques
        </div>


        <p
          className={styles.type}
        >
          {groupName}
        </p>

        <div className={styles.line} />
      </div>

      <div
        className={styles.products_container}
      >
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1.7,
              spaceBetween: 10,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            375: {
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
              slidesPerView: 2,
              spaceBetween: 10,
            },
            425: {
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            768: {
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1300: {
              slidesPerView: 5,
              spaceBetween: 10,
              pagination: false,
              autoplay: false,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 10,
              pagination: false,
              autoplay: false,
            }
          }}
          slidesPerView={2}
          modules={[Autoplay, Pagination]}
          pagination={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {products.map((item) => (
            <SwiperSlide
              key={item.id}
            >
              <Product
                product={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}