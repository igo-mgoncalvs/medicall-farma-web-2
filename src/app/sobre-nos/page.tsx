/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css/pagination';
import 'swiper/css';

import styles from './styles.module.css'
import BreakLine from '@/components/breakLine/breakLine'
import useWindowSize from '@/hooks/useWindowSize'
import { useEffect, useState } from 'react'
import { IAddresses } from '@/components/footer/footer'

import 'swiper/css/pagination';
import 'swiper/css';
import Image from "next/image";

import './styles.css';
import { dbPromise } from "@/utils/dbPromise";

interface IAbouUsLayout {
  aboutUsSection: {
    id: string
    image: string
    title: string
    description: string
    buttonText: string
    link: string
  }
  aboutUsSpace: {
    id: string
    title: string
    description: string
  }
  aboutUsWellcome: {
    id: string
    description: string
    title: string
    image: string
    imageMobile: string
  }
  aboutUsTeam: {
    id: string
    description: string
    title: string
    image: string
  }
  aboutUsUnits: {
    id: string
    title: string
    image: string
    titleColor: string
  }
  ourSpaceImages: {
    id: string;
    order: number;
    image: string;
  }[]
  values: {
    id: string
    title: string
    icon: string
    description: string
  }[]
}

export default function AboutUs () {
  const [layout, setLayout] = useState<IAbouUsLayout>()
  const [addresses, setAddresses] = useState<IAddresses[]>()

  const size = useWindowSize()

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      const layoutData = await db.get('aboutUsLayout', 'aboutUsLayout');
      const addressesData = await db.get('addresses', 'addresses');
  
      if(layoutData && addressesData) {
        setLayout(layoutData)
        setAddresses(addressesData)
      }
    };
  
    loadData();
  }, [])

  return layout && (
    <div>
      <div
        style={{
          backgroundImage: `url(${size.width > 426 ? layout.aboutUsWellcome.image : layout.aboutUsWellcome.imageMobile})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: size.width > 426 ? size.width > 1440 ? 'cover' : 'contain' : 'cover'
        }}
        className={styles.wellcome_container}
      >
        <p className={styles.wellcome_title}>{layout.aboutUsWellcome.title}</p>
        <p className={styles.wellcome_description}>{layout.aboutUsWellcome.description}</p>
      </div>

      <div
        className={styles.aboutUs_container}
      >
        <a
          href={layout.aboutUsSection.link}
          className={styles.aboutUs_button_mobile}
        >
          {layout.aboutUsSection.buttonText}
        </a>
        
        <img
          src={layout.aboutUsSection.image}
          alt={'ilustração sobre nós'}
        />

        <div
          className={styles.aboutUs_info_container}
        >
          <div>
            <p
              className={styles.aboutUs_title_shadow}
            >
              {layout.aboutUsSection.title}
            </p>
            <p
              className={styles.aboutUs_title}
              >
              {layout.aboutUsSection.title}
            </p>
          </div>

          <p className={styles.aboutUs_text}>
            {BreakLine(layout.aboutUsSection.description)}
          </p>

          <a
            href={layout.aboutUsSection.link}
            className={styles.aboutUs_button}
          >
            {layout.aboutUsSection.buttonText}
          </a>
        </div>
      </div>

      <div
        className={styles.units_container}
      >
        <div
          className={styles.units_infos_container}
        >
          <div>
            <p className={styles.units_mainTitle}>{layout.aboutUsUnits.title}</p>
            <p className={styles.units_title}>{layout.aboutUsUnits.titleColor}</p>
          </div>

          <div className={styles.units_list}>
            {addresses?.map((item) => (
              <div
                key={item.id}
              >
                <p className={styles.units_list_title}>{item.state}</p>
                <p className={styles.units_list_description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <img
          alt={'mapa dos estados'}
          src={layout.aboutUsUnits.image}
          className={styles.units_image}
        />
      </div>

      <div
        className={styles.team_container}
      >
        <img
          src={layout.aboutUsTeam.image}
          alt={'imagem da equipe'}
        />

        <div
          className={styles.team_infos_container}
        >
          <div>
            <p className={styles.team_title_shadow}>{layout.aboutUsTeam.title}</p>
            <p className={styles.team_title}>{layout.aboutUsTeam.title}</p>
          </div>
          
          <p>{BreakLine(layout.aboutUsTeam.description)}</p>
        </div>
      </div>

      <div
        className={styles.space_container}
      >
        <div
          className={styles.space_infos_container}
        >
          <div>
            <p className={styles.space_title_shadow}>{layout.aboutUsSpace.title}</p>
            <p className={styles.space_title}>{layout.aboutUsSpace.title}</p>
          </div>
          
          <p className={styles.space_description}>{BreakLine(layout.aboutUsSpace.description)}</p>
        </div>

        <div
          className={styles.slide_container}
        >
          <Swiper
            slidesPerView={1}
            modules={[Autoplay, Navigation]}
            style={{
              borderRadius: 18
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            <div
              className={styles.image_slide}
            >
              {layout.ourSpaceImages.map((item) => (
                <SwiperSlide
                  key={item.id}
                  >
                  <img
                    src={item.image}
                    className={styles.image}
                    alt={'imagens do lugar'}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>

      <div
        className={styles.values_container}
      >
        <div
          className={styles.values_width}
          id="meu-swiper"
        >
          <Swiper
            spaceBetween={100}
            modules={[Autoplay, Pagination]}
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
              },
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                slidesOffsetBefore: 24,
                slidesOffsetAfter: 100
              },
              425: {
                slidesPerView: 1.8
              },
              1024: {
                slidesPerView: 3,
              },
              1440: {
                slidesPerView: 3,
              }
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            style={{
              paddingTop: 80,
              marginBottom: 80
            }}
          >
            {layout.values.map((item) => (
              <SwiperSlide
                key={item.id}
              >
                <div
                  className={styles.values_card}
                >
                  <div
                    className={styles.icon}
                  >
                    <Image
                      src={item.icon}
                      className={styles.icon_svg}
                      width={100}
                      height={100}
                      alt="values icon"
                    />
                  </div>

                  <div className={styles.values_text_container}>
                    <p className={styles.values_card_title}>{BreakLine(item.title)}</p>
                    <p className={styles.values_card_description}>{BreakLine(item.description)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}