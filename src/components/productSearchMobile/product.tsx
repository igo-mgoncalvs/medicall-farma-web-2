/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./product.module.css"

export interface IProduct {
  id: number
  name: string
  description: string
  link: string
  shortDescription: string
  contactLink: string
  groupName: string
  isTop: boolean
  sizes: {
    id: string
    src: string
    alt: string
    isMain: boolean
    size: string
  }[]
}

export default function ProductSearchMobile ({
  product
}: { product: IProduct }) {
  const findProduct = product.sizes?.find((p) => p.isMain)

  return findProduct && (
    <div
      className={styles.container}
    >
      <img
        src={findProduct.src}
        alt={findProduct.alt}
        className={styles.image}
      />

      <div
        className={styles.general_infos_container}
      >
        <div>
          <p
            className={styles.product_name}
          >
            {product.name}
          </p>
          <p
            className={styles.product_type}
          >
            {product.groupName}
          </p>
        </div>

        <div
          className={styles.product_infos_container}
        >
          <p
            className={styles.product_description}
          >
            {product.shortDescription}
          </p>
          <a
            className={styles.product_button}
            href={product.link}
          >
            Saber mais
          </a>
        </div>
      </div>     
    </div>
  )
}