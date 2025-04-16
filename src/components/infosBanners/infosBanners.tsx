/* eslint-disable @next/next/no-img-element */ 
'use client' 

import styles from './infosBanners.module.css'

interface IInfosBanners {
  src: string
  alt: string
}

export default function InfoBanners ({ banners }: { banners: IInfosBanners[] }) {
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.first_banners_container}
      >
        <img
          src={banners[0].src}
          alt={banners[0].alt}
          className={styles.banners}
        />
        <img
          src={banners[1].src}
          alt={banners[1].alt}
          className={styles.banners}
        />
      </div>

      <div
        className={styles.second_banners_container}
      >
        <div
          className={styles.second_banners_top}
        >
          <img
            src={banners[2].src}
            alt={banners[2].alt}
          />
          <img
            src={banners[3].src}
            alt={banners[3].alt}
          />
        </div>
        <div>
          <img
            src={banners[4].src}
            alt={banners[4].alt}
          />
        </div>
      </div>
    </div>
  )
}