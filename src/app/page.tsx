/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import prevArrow from '@/assets/prevArrow.svg'
import nextArrow from '@/assets/nextArrow.svg'

import homeJson from '@/mockdata/home.json'

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';

import Product, { IProduct } from "@/components/product/product";
import InfoBanners from "@/components/infosBanners/infosBanners";
import TopProducts from "@/components/topProducts/topProducts";
import MainClientsSuppliers from "@/components/mainClientsSuppliers/mainClientsSuppliers";
import Catalog from "@/components/catalog/catalog";
import { useEffect, useState } from "react";
import { IGroup } from "./[groupName]/[category]/page";
import api from "@/api/axios";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

import homeBackImage1 from '@/assets/homeBackImages/radial.svg'
import homeBackImage2 from '@/assets/homeBackImages/1.png'
import homeBackImage3 from '@/assets/homeBackImages/2.png'
import homeBackImage4 from '@/assets/homeBackImages/3.png'
import homeBackImage5 from '@/assets/homeBackImages/4.png'

export default function Home() {
  const [topProducts, setTopProducts] = useState<IGroup[] | undefined>()
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[] | undefined>()

  const size = useWindowSize()

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
      <div>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: '#my-next-btn',

          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {homeJson.data[`${size.width > 426 ?'banners': 'bannersMobile'}`].map((item) => (
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

        {/* <div>
          <Image
            src={homeBackImage1}
            alt="teste-alt"
            className={styles.homeBackImage1}
          />
          <Image
            src={homeBackImage2}
            alt="teste-alt"
            className={styles.homeBackImage2}
          />
          <Image
            src={homeBackImage3}
            alt="teste-alt"
            className={styles.homeBackImage3}
          />
          <Image
            src={homeBackImage4}
            alt="teste-alt"
            className={styles.homeBackImage4}
          />
          <Image
            src={homeBackImage5}
            alt="teste-alt"
            className={styles.homeBackImage5}
          />
        </div> */}

        <div
          className={styles.buttons_swiper}
        >
          <button id="my-next-btn">
            <Image
              src={prevArrow}
              alt="prev-arrow"
              className={styles.next_image}
              />
          </button>
          <button id="my-next-btn">
            <Image
              src={nextArrow}
              alt="next-arrow"
              className={styles.next_image}
            />
          </button>
        </div>
      </div>

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

      <div
        className={styles.clients_container_mobile}
      >
        <MainClientsSuppliers
          list={homeJson.data.clients}
          type="clients"
          mobile
        />
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

      <div
        className={styles.clients_container}
      >
        <MainClientsSuppliers
          list={homeJson.data.clients}
          type="clients"
          mobile={false}
        />
      </div>

      <img
        src={homeJson.data.banner.src}
        alt={homeJson.data.banner.alt}
        width={10}
        height={10}
        className={styles.banner_desck}
      />

      <MainClientsSuppliers
        list={homeJson.data.clients}
        type='suppliers'
        mobile={false}
      />

      <Catalog />
    </div>
  );
}
