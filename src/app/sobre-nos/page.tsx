/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
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
import downArrow from '@/assets/downArrow.svg'
import unitsDivisorMobile from '@/assets/unitsDivisorMobile.svg'
import circlePoints from '@/assets/circlePoints.svg'
import mapBackgroundSp from '@/assets/mapBackgroundSp.svg'
import mapBackgroundMg from '@/assets/mapBackgroundMg.svg'
import ValuesCard from "@/components/valuesCard";

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
        window.scrollTo({
          top: 0
        })
        setLayout(layoutData)
        setAddresses(addressesData)
      }
    };
  
    loadData();
  }, [])

  return layout && (
    <div>
      <div>
        <img
          src={size.width > 426 ? layout.aboutUsWellcome.image : layout.aboutUsWellcome.imageMobile}
          alt=""
          className={styles.main_banner}
        />
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
          className={styles.aboutUs_image}
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

        <Image
          src={circlePoints}
          alt="circle points"
          className={styles.circle_points_background}
        />
      </div>
      
      <span className={styles.divisorAboutUs}></span>

      <div
        className={styles.units_container}
      >
        <div
          className={styles.units_infos_container}
        >
          <div>
            <p className={styles.units_mainTitle}>{layout.aboutUsUnits.titleColor}</p>
            <p className={styles.units_title}>{layout.aboutUsUnits.title}</p>
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

        <Image
          alt="background mapa SP"
          src={mapBackgroundSp}
          width={100}
          height={100}
          className={styles.map_background_sp}
        />

        <Image
          alt="background mapa MG"
          src={mapBackgroundMg}
          width={100}
          height={100}
          className={styles.map_background_mg}
        />
      </div>

      <Image
        alt="divisor mobile"
        src={unitsDivisorMobile}
        className={styles.unitsDivisorMobile}
      />

      <div
        className={styles.team_container}
      >
        <img
          src={layout.aboutUsTeam.image}
          alt={'imagem da equipe'}
          className={styles.abooutUsTeam_image}
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
                  style={{
                    height: 'auto'
                  }}
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
        <div className={styles.values_title_container}>
          <p className={styles.values_title_shadow}>Nossos valores</p>
          <p className={styles.values_title}>Nossos valores</p>
        </div>

        <div
          className={styles.values_width}
          id="meu-swiper"
        >
          <Swiper
            effect="coverflow"
            loop
            modules={[
              Autoplay,
              EffectCoverflow,
              Pagination
            ]}
            coverflowEffect={{
              rotate: 0,
              stretch: -45,
              slideShadows: false,
              modifier: 1.5,
            }}
            slidesPerView={3}
            breakpoints={{
              320: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 0,
                  stretch: -20,
                  slideShadows: false,
                  modifier: 1.5,
                }
              },
              1024: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 0,
                  stretch: -20,
                  slideShadows: false,
                  modifier: 2,
                }
              },
              1440: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 0,
                  stretch: -25,
                  slideShadows: false,
                  modifier: 1.5,
                }
              }
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            className={styles.values_swiper}
            style={{
              // margin: '0 20px',
            }}
          >
            {[...layout.values, ...layout.values].map((item, index) => (
              <SwiperSlide
                key={`${item.id}_${index}`}
                >
                {({isVisible}) => (
                  <div
                    key={`${item.id}_${index}`}
                    style={{
                      opacity: !isVisible ? 0 : 1,
                      height: '100%',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <ValuesCard
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                )}
                {/* <div
                  className={styles.values_card}
                >
                  <div
                    className={styles.icon}
                  >
                    <div className={styles.icon_container}>
                      <Image
                        src={item.icon}
                        className={styles.icon_svg}
                        width={100}
                        height={100}
                        alt="values icon"
                      />
                    </div>
                  </div>

                  <div className={styles.values_text_container}>
                    <p className={styles.values_card_title}>{BreakLine(item.title)}</p>
                    <p className={styles.values_card_description}>{BreakLine(item.description)}</p>
                  </div>
                </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={styles.downArrow}
        >
          <div
            className={styles.downArrowIcon}
          >
            <Image
              alt="down arrow"
              src={downArrow}
            />
          </div>
        </div>
      </div>
    </div>
  )
}