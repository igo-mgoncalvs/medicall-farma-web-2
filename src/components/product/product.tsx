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
  certificateLink: string
  sizes: {
    id: string
    src: string
    alt: string
    isMain: boolean
    size: string
  }[]
}

export default function Product ({
  product,
  type = 'default'
}: { product: IProduct, type?: 'default' | 'certificate' }) {
  const findProduct = product.sizes?.find((p) => p.isMain)

  return findProduct && (
    <div
      className={styles.container}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/product-image/${findProduct.id}`}
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
        {(type === 'default' ? product.link : product.certificateLink) && (
          <a
            id={`product-${product.id}`}
            data-type={type}
            className={styles.product_button}
            target={type === 'default' ? '_self' : '_blank'}
            href={type === 'default' ? encodeURI(product.link): product.certificateLink}
          >
            {type === 'default' ? 'Saber mais' : 'Baixar certificado'}
          </a>
        )}
      </div>
    </div>
  )
}