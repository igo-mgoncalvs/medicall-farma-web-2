/* eslint-disable @next/next/no-img-element */
'use client'

import { IHomeData } from '@/app/page'
import styles from './styles.module.css'

export default function Catalog ({ data }: { data: IHomeData | undefined }) {
  return data && (
    <div
      className={styles.main}
    >
      <div
        className={styles.infos}
      >
        <div>
          <div
            className={styles.title}
          >
            {data.homeCatalog.title} <p className={styles.catalog}>{data.homeCatalog.titleColor}</p>
          </div>

          <span className={styles.divisorLine}></span>
        </div>

        <p
          className={styles.decription}
        >
          {data.homeCatalog.description}
        </p>

        <a
          className={styles.button}
          href={data.homeCatalog.catalogLink}
          target='_black'
        >
          {data.homeCatalog.buttonText}
        </a>
      </div>

      <img
        src={data.homeCatalog.image}
        alt="teste-alt"
        className={styles.image}
      />

      <a
        className={styles.buttonMobile}
        href={data.homeCatalog.catalogLink}
        target='_blank'
      >
        {data.homeCatalog.buttonText}
      </a>

    </div>
  )
}