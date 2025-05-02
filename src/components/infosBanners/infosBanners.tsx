/* eslint-disable @next/next/no-img-element */ 
'use client' 

import styles from './infosBanners.module.css'

interface IInfosBanners {
  id: string
  src: string
  alt: string
  href: string
}

export default function InfoBanners ({ banners }: { banners: IInfosBanners[] }) {
  return banners && (
    <div
      className={styles.container}
    >
      <div
        className={styles.first_banners_container}
      >
        <img
          src={banners[0]?.src}
          alt={banners[0]?.alt}
          className={styles.banners}
        />
        <img
          src={banners[1]?.src}
          alt={banners[1]?.alt}
          className={styles.banners}
        />
      </div>

      <div
        className={styles.second_banners_container}
      >
        <div
          className={styles.second_banners_top}
        >
          <a
            href={banners[2]?.href}
            className={styles.baners_right}
          >
            <img
              src={banners[2]?.src}
              alt={banners[2]?.alt}
            />
          </a>
          <a
            href={banners[3]?.href}
            className={styles.baners_right}
          >
            <img
              src={banners[3]?.src}
              alt={banners[3]?.alt}
            />
          </a>
        </div>
        <div>
          <a
            href={banners[4]?.href}
            className={styles.banner_horizontal}
            >
            <img
              src={banners[4]?.src}
              alt={banners[4]?.alt}
            />
          </a>
        </div>
      </div>
    </div>
  )
}