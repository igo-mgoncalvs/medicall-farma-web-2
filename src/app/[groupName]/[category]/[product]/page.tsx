/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'

import productsJson from '@/mockdata/products.json'
import BreakLine from '@/components/breakLine/breakLine'

import whatsappIcon from '@/assets/whatsapp.svg'

import styles from "./styles.module.css"

export default function ProductPage ({
  params,
}: {
  params: { groupName: string, category: string, product: string }
}) {
  const group = productsJson.groups.find((group) => group.groupLink === params.groupName)
  const category = group?.categories.find((category) => category.categoryLink === params.category)
  const product = category?.products?.find((product) => product.link.includes(params.product))


  return product && (
    <div className={styles.main}>
      <div
        className={styles.container}
      >
        <div className={styles.images_container}>
          <div
            className={styles.products_images}
          >
            {product.images.map((item) => (
              <div
                className={styles.product_image_detail_container}
                key={item.id}
                >
                <img
                  className={styles.product_image_detail}
                  alt={item.alt}
                  src={item.src}
                />
              </div>
            ))}
          </div>

            
          <img
            alt={product.images?.find((image) => image.isMain)?.alt}
            src={product.images?.find((image) => image.isMain)?.src}
            className={styles.main_image_container}
          />
        </div>

        <div
          className={styles.product_infos_container}
        >
          <div
            className={styles.product_infos_texts}
          >
            <div>
              <p className={styles.product_name}>{product.name}</p>
              <p className={styles.product_description}>{BreakLine(product.description)}</p>
            </div>

            {product.sizes.length > 0 && (
              <div className={styles.sizes_container}>
                <p className={styles.sizes_title}>Tamanho</p>

                <div className={styles.sizes}>
                  {product.sizes.map((size) => (
                    <p
                      key={size.id}
                      className={styles.size}
                    >
                      {size.size}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            className={styles.contact_container}
          >
            <img
              alt='teste-alt'
              src='https://i.postimg.cc/L6cfXDpX/Group-481588.png'
              className={styles.contact_img}
            />

            <div
              className={styles.contact}
            >
              <Image
                alt='teste-alt'
                src={whatsappIcon}
                className={styles.whatsapp_icon}
              />

              <p>Solicitar cotação</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}