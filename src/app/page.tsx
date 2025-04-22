/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import homeJson from '@/mockdata/home.json'

import 'swiper/css';
import Product from "@/components/product/product";
import InfoBanners from "@/components/infosBanners/infosBanners";
import TopProducts from "@/components/topProducts/topProducts";
import MainClientsSuppliers from "@/components/mainClientsSuppliers/mainClientsSuppliers";
import Catalog from "@/components/catalog/catalog";
import { useEffect, useState } from "react";
import { IGroup } from "./[groupName]/[category]/page";
import api from "@/api/axios";


export default function Home() {
  const [products, setProducts] = useState<IGroup[] | undefined>()

  useEffect(() => {
    const getProductsFunction = async () => {
      const getProducts = localStorage.getItem('products')

      if(getProducts) {
        setProducts(JSON.parse(getProducts))
      }
      
      const res = await api.get('/list-all-products')

      localStorage.setItem('products', JSON.stringify(res.data))
    }

    getProductsFunction()
  }, [])

  const topGroups = products?.filter((group) => group.isTop)


  return (
    <div className={styles.page}>
      <Swiper
        spaceBetween={50}
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
          {homeJson.data.emphasis_section.list.map(item => (
            <Product
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </div>

      <div
        className={styles.banners_container}
      >
        <InfoBanners banners={homeJson.data.infosBanners}/>
      </div>

      <div
        className={styles.top_products_containers}
      >
        {topGroups?.map((item) => (
          <>
            <TopProducts
              key={item.id}
              categories={item.categories.filter((category) => category.products.find((product) => product.isTop))}
              groupName={item.groupName}
            />
          </>
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
