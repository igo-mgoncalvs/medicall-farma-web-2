/* eslint-disable @next/next/no-img-element */
'use client';

import styles from "./product.module.css"

export interface IProduct {
  id: number
  img: string,
  name: string,
  type: string,
  description: string,
  link: string
}

export default function Product ({
  product
}: { product: IProduct }) {
  return (
    <div
      className={styles.container}
    >
      <img
        src={product.img}
        alt="teste-image"
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
          {product.type}
        </p>
      </div>

      <div
        className={styles.product_infos_container}
      >
        <p
          className={styles.product_description}
        >
          {product.description}
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