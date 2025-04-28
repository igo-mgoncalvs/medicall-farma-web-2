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
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import dbPromise from "@/utils/dbPromise";

interface IHomeBanners {
  id: string
  src: string
  srcMobile: string
  alt: string
  order: number
  href: string
  external: boolean
}

interface IHomeGridBanners {
  id: string
  src: string
  alt: string
  href: string
  fixed: boolean
}

export interface IHomeData {
  banners: IHomeBanners[]
  homeFeaturedProducts: {
    id: string
    title: string
    description: string
  }
  homeClients: {
    id: string
    title: string
    description: string
  }
  homeSuppliers: {
    id: string
    title: string
    description: string
  }
  homeCatalog: {
    id: string
    title: string
    titleColor: string
    description: string
    buttonText: string
    catalogLink: string
  }
  homeGridBanners: IHomeGridBanners[]
}

export default function Home() {
  const [topProducts, setTopProducts] = useState<IGroup[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[] | undefined>()
  const [homeData, setHomeData] = useState<IHomeData | undefined>()
  const [banners, setBanners] = useState<IHomeBanners[]>([])

  const size = useWindowSize()

  useEffect(() => {
    const interval = setInterval(async () => {
      const db = await dbPromise      

      const getTopProducts = localStorage.getItem('top-products')
      const getFeaturedProducts = localStorage.getItem('featured-products')
      const homeData: IHomeData = await db.get('home', 'home');


      if (getTopProducts && getFeaturedProducts && homeData) {
        setFeaturedProducts(JSON.parse(getFeaturedProducts))
        setTopProducts(JSON.parse(getTopProducts))
        setHomeData(homeData)
        setBanners(homeData.banners.sort((a, b) => a.order > b.order ? 1 :-1))
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const getFeaturedProducts = localStorage.getItem('featured-products')
    const getTopProducts = localStorage.getItem('top-products')

    if(!featuredProducts && getFeaturedProducts && getFeaturedProducts !== JSON.stringify(getFeaturedProducts)){
      setFeaturedProducts(JSON.parse(getFeaturedProducts))
    }

    if(!topProducts && getTopProducts && getTopProducts !== JSON.stringify(topProducts)){
      setTopProducts(JSON.parse(getTopProducts))
    }

  }, [featuredProducts, topProducts, homeData])

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
          {banners?.map((item) => (
            <SwiperSlide
              key={item.id}
            >
              <a
                href={item.href}
                target="_blank"
              >
                <img
                  src={size.width > 426 ? item.src: item.srcMobile}
                  alt={item.alt}
                  width={10}
                  height={10}
                  className={styles.banner}
                />
              </a>
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
            {homeData?.homeFeaturedProducts?.title}
          </p>

          <div className={styles.line} />
          <p
            className={styles.product_emphasis_description}
          >
            {homeData?.homeFeaturedProducts?.description}
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
        <InfoBanners banners={homeData?.homeGridBanners || []}/>
      </div>

      <div
        className={styles.clients_container_mobile}
      >
        <MainClientsSuppliers
          list={homeJson.data.clients}
          title={homeData?.homeClients?.title}
          description={homeData?.homeClients?.description}
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
          title={homeData?.homeClients?.title}
          description={homeData?.homeClients?.description}
          type="clients"
          mobile={false}
        />
      </div>

      <a
        href={homeData?.banners[0]?.href}
      >
        <img
          src={homeData?.banners[0]?.src}
          alt={homeData?.banners[0]?.alt}
          width={10}
          height={10}
          className={styles.banner_desck}
        />
      </a>

      <MainClientsSuppliers
        list={homeJson.data.clients}
        type='suppliers'
        title={homeData?.homeSuppliers?.title}
        description={homeData?.homeSuppliers?.description}
        mobile={false}
      />

      <Catalog
        data={homeData}
      />
    </div>
  );
}
