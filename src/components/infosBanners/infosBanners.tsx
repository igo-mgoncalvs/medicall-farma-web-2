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
          src={banners.find((item) => item.id === 'feb30e4d-d624-4011-a45b-758cbac021a8')?.src}
          alt={banners.find((item) => item.id === 'feb30e4d-d624-4011-a45b-758cbac021a8')?.alt}
          className={styles.banners}
          />
        <img
          src={banners.find((item) => item.id === '3d3166ba-9fee-4559-8f27-3d48bf1e1330')?.src}
          alt={banners.find((item) => item.id === '3d3166ba-9fee-4559-8f27-3d48bf1e1330')?.alt}
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
            href={banners.find((item) => item.id === 'b87d22d9-12d5-4b9b-b30c-99c8fa760ef7')?.href}
            className={styles.baners_right}
          >
            <img
              src={banners.find((item) => item.id === 'b87d22d9-12d5-4b9b-b30c-99c8fa760ef7')?.src}
              alt={banners.find((item) => item.id === 'b87d22d9-12d5-4b9b-b30c-99c8fa760ef7')?.alt}
            />
          </a>
          <a
            href={banners.find((item) => item.id === '3255fa8e-181f-4c22-b22e-79813c46b539')?.href}
            className={styles.baners_right}
          >
            <img
              src={banners.find((item) => item.id === '3255fa8e-181f-4c22-b22e-79813c46b539')?.src}
              alt={banners.find((item) => item.id === '3255fa8e-181f-4c22-b22e-79813c46b539')?.alt}
            />
          </a>
        </div>
        <div>
          <a
            href={banners.find((item) => item.id === '52971faf-6de4-4292-a40b-dc741fa5a236')?.href}
            className={styles.banner_horizontal}
            >
            <img
              src={banners.find((item) => item.id === '52971faf-6de4-4292-a40b-dc741fa5a236')?.src}
              alt={banners.find((item) => item.id === '52971faf-6de4-4292-a40b-dc741fa5a236')?.alt}
            />
          </a>
        </div>
      </div>
    </div>
  )
}