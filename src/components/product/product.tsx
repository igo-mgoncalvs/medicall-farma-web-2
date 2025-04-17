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
  images: {
    id: number
    src: string
    alt: string
    isMain: boolean
  }[],
  sizes: {
    id: number
    size: string
  }[]
}

export default function Product ({
  product
}: { product: IProduct }) {
  const findProduct = product.images?.find((p) => p.isMain)

  return findProduct && (
    <div
      className={styles.container}
    >
      <img
        src={findProduct.src}
        alt={findProduct.alt}
        className={styles.image}
      />

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
  )
}