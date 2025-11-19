/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import prevArrow from '@/assets/prevArrow.svg'
import nextArrow from '@/assets/nextArrow.svg'

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';

import Product, { IProduct } from "@/components/product/product";
import InfoBanners from "@/components/infosBanners/infosBanners";
import TopProducts from "@/components/topProducts/topProducts";
import MainClientsSuppliers, { IListImages } from "@/components/mainClientsSuppliers/mainClientsSuppliers";
import Catalog from "@/components/catalog/catalog";
import { useEffect, useState } from "react";
import { IGroup } from "./[groupName]/[category]/page";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { dbPromise } from "@/utils/dbPromise";

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
    image: string
    imageMobile: string
  }
  homeGridBanners: IHomeGridBanners[]
}

export interface IClients {
  id: string
  image: string
  name: string
}

export default function Home() {
  const [topProducts, setTopProducts] = useState<IGroup[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[] | undefined>()
  const [homeData, setHomeData] = useState<IHomeData | undefined>()
  const [banners, setBanners] = useState<IHomeBanners[]>([])
  const [clients, setClients] = useState<IListImages[]>([])
  const [suppliers, setSuppliers] = useState<IListImages[]>([])
  const [autoplay, setAutoplay] = useState<boolean>(true)

  const size = useWindowSize()

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      const interval = setInterval(async () => {
        const topProducts = await db.get('topProducts', 'topProducts');
        const featuredProducts = await db.get('featuredProducts', 'featuredProducts');
        const homeData: IHomeData = await db.get('home', 'home');
        const getClients= await db.get('clients', 'clients');
        const getSuppliers = await db.get('suppliers', 'suppliers');
  
        if (topProducts && featuredProducts && homeData && getSuppliers && getClients) {
          setFeaturedProducts(featuredProducts)
          setTopProducts(topProducts)
          setHomeData(homeData)
          setBanners(homeData.banners.sort((a, b) => a.order > b.order ? 1 :-1))
          setClients(getClients)
          setSuppliers(getSuppliers)

          window.scrollTo({
            top: 0
          })
          clearInterval(interval)
        }
      }, 500)
  
      return () => clearInterval(interval)
    };
  
    loadData();
  }, [])

  return (
    <div className={styles.page}>
      <div>
        <div
          className={styles.main_banners}
        >
          <div
            className={styles.buttons_swiper}
          >
            <button id="my-prev-btn">
              <Image
                src={prevArrow}
                alt="prev-arrow"
                className={styles.next_image}
                onClick={() => setAutoplay(false)}
                />
            </button>
            <button id="my-next-btn">
              <Image
                src={nextArrow}
                alt="next-arrow"
                className={styles.next_image}
                onClick={() => setAutoplay(false)}
              />
            </button>
          </div>

          {banners.length > 0 && (
            <Swiper
              slidesPerView={1}
              modules={[Autoplay, Navigation]}
              navigation={{
                nextEl: '#my-next-btn',
                prevEl: '#my-prev-btn',
              }}
              autoplay={autoplay && {
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop
            >
              {banners?.map((item) => (
                <SwiperSlide
                  key={item.id}
                >
                  <a
                    href={item.href}
                    target={item.href.includes('https://medicall-web-2.firebaseapp.com') ? '' : '_blank'}
                  >
                    <img
                      src={size.width >= 768 ?
                        `${process.env.NEXT_PUBLIC_API_URL}/home-banner-image/${item.id}`
                        : `${process.env.NEXT_PUBLIC_API_URL}/home-banner-mobile-image/${item.id}`}
                      alt={item.alt}
                      width={10}
                      height={10}
                      className={styles.banner}
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

        </div>
      </div>

      <div
        className={styles.product_emphasis_main}
      >
        <div
          className={styles.product_emphasis_text}
        >
          <div
            className={styles.product_emphasis_title}
          >
            {homeData?.homeFeaturedProducts?.title}
            <span className={styles.line} />
          </div>

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
              320: {
                slidesPerView: 1.7,
                spaceBetween: 10,
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
              },
              375: {
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
                slidesPerView: 2.1,
                spaceBetween: 10,
              },
              425: {
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
                slidesPerView: 2.3,
                spaceBetween: 10,
              },
              768: {
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
                slidesPerView: 4.5,
                spaceBetween: 10,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 10,
                pagination: false
              }
            }}
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
                className={styles.product_emphasis_section_swiper_slide}
              >
                <Product
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
          list={clients}
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
          list={clients}
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
          src={`${process.env.NEXT_PUBLIC_API_URL}/home-banner-image/${homeData?.banners[0]?.id}`}
          alt={homeData?.banners[0]?.alt}
          width={10}
          height={10}
          className={styles.banner_desck}
        />
      </a>

      <span className={styles.line_suppliers}></span>

      <MainClientsSuppliers
        list={suppliers}
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
