/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import styles from './styles.module.css'
import BreakLine from '@/components/breakLine/breakLine'
import useWindowSize from '@/hooks/useWindowSize'
import { useEffect, useState } from 'react'
import dbPromise from '@/utils/dbPromise'
import { IAddresses } from '@/components/footer/footer'

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';

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
}

export default function AboutUs () {
  const [layout, setLayout] = useState<IAbouUsLayout>()
  const [addresses, setAddresses] = useState<IAddresses[]>()

  const size = useWindowSize()

  useEffect(() => {
    const getData = async () => {
      const db = await dbPromise    

      const layoutData = await db.get('aboutUsLayout', 'aboutUsLayout');
      const addressesData = await db.get('addresses', 'addresses');

      if(layoutData && addressesData) {
        setLayout(layoutData)
        setAddresses(addressesData)
      }
      
    }

    getData()
  }, [])

  return layout && (
    <div>
      <div
        style={{
          backgroundImage: `url(${size.width > 426 ? layout.aboutUsWellcome.image : layout.aboutUsWellcome.imageMobile})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: size.width > 426 ? 'contain' : 'cover'
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
    </div>
  )
}