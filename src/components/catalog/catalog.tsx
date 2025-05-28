/* eslint-disable @next/next/no-img-element */
 
'use client'

import { IHomeData } from '@/app/page'
import styles from './styles.module.css'
import useWindowSize from '@/hooks/useWindowSize'

export default function Catalog ({ data }: { data: IHomeData | undefined }) {
  const size = useWindowSize()

  return data && (
    <a
      href={data.homeCatalog.catalogLink}
      target='_blank'
    >
      <img
        src={ size.width >= 768 ? data.homeCatalog.image : data.homeCatalog.imageMobile}
        alt=""
        className={styles.image_banner}
      />
    </a>
  )
}