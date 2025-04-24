/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import homeJson from '@/mockdata/home.json'

import 'swiper/css/pagination';
import 'swiper/css';
import Product, { IProduct } from "@/components/product/product";
import InfoBanners from "@/components/infosBanners/infosBanners";
import TopProducts from "@/components/topProducts/topProducts";
import MainClientsSuppliers from "@/components/mainClientsSuppliers/mainClientsSuppliers";
import Catalog from "@/components/catalog/catalog";
import { useEffect, useState } from "react";
import { IGroup } from "./[groupName]/[category]/page";
import api from "@/api/axios";

export default function Home() {
  const [topProducts, setTopProducts] = useState<IGroup[] | undefined>()
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[] | undefined>()

  useEffect(() => {
    const getProductsFunction = async () => {
      const getTopProducts = localStorage.getItem('top-products')
      const getFeaturedProducts = localStorage.getItem('featured-products')

      if(getTopProducts) {
        setTopProducts(JSON.parse(getTopProducts))
      }
      
      if(getFeaturedProducts) {
        setFeaturedProducts(JSON.parse(getFeaturedProducts))
      }
      
      const res = await api.get('/list-all-products')

      localStorage.setItem('products', JSON.stringify(res.data))
    }

    getProductsFunction()
  }, [])


  return (
    <div className={styles.page}>
      <Swiper
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {homeJson.data.banners.map((item) => (
          <SwiperSlide
            key={item.id}
          >
            <img
              src={item.src}
              alt={item.description}
              width={10}
              height={10}
              className={styles.banner}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={styles.product_emphasis_main}
      >
        <div
          className={styles.product_emphasis_text}
        >
          <p
            className={styles.product_emphasis_title}
          >
            {homeJson.data.emphasis_section.title}
          </p>

          <div className={styles.line} />
          <p
            className={styles.product_emphasis_description}
          >
            {homeJson.data.emphasis_section.description}
          </p>
        </div>

        <div
          className={styles.product_emphasis_section}
        >
          <Swiper
            breakpoints={{
              425: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 10,
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
            {featuredProducts?.map(item => (
              <SwiperSlide
                key={item.id}
              >
                <Product
                  key={item.id}
                  product={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className={styles.banners_container}
      >
        <InfoBanners banners={homeJson.data.infosBanners}/>
      </div>

      <div>
        {topProducts?.map((item) => (
          <TopProducts
            key={item.id}
            categories={item.categories.filter((category) => category.products.find((product) => product.isTop))}
            groupName={item.groupName}
          />
        ))}
      </div>

      <MainClientsSuppliers
        list={homeJson.data.clients}
        type="clients"
      />

      <img
        src={homeJson.data.banner.src}
        alt={homeJson.data.banner.alt}
        width={10}
        height={10}
        className={styles.banner}
      />

      <MainClientsSuppliers
        list={homeJson.data.clients}
        type='suppliers'
      />

      <Catalog />
    </div>
  );
}
