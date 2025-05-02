/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'

import BreakLine from '@/components/breakLine/breakLine'

import whatsappIcon from '@/assets/whatsapp.svg'

import styles from "./styles.module.css"
import { IGroup } from '../page'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { dbPromise } from '@/utils/dbPromise'

export default function ProductPage () {
  const [products, setProducts] = useState<IGroup[] | undefined>()
  const [selectSize, setSelectSize] = useState<string>('')

  const pathname = usePathname();

  const params = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    return {
      groupName: segments[0] || '',
      category: segments[1] || '',
      product: segments[2] || '',
    };
  }, [pathname]);

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;

      const interval = setInterval(async () => {
        const products = await db.get('products', 'products');
        
        if (products) {
          setProducts(products)
          clearInterval(interval)
        }
      }, 500)
  
      return () => clearInterval(interval)
    }
    
    loadData()
  }, [])

  const group = products?.find((group) => group.groupLink === params.groupName)
  const category = group?.categories.find((category) => category.categoryLink.includes(params.category))
  const product = category?.products?.find((product) => product.link.includes(params.product))

  useEffect(() => {
    const findMain = product?.sizes.find((item) => item.isMain)?.id

    if(findMain) {
      setSelectSize(findMain)
    }
  }, [product])

  return product && (
    <div className={styles.main}>
      <div
        className={styles.container}
      >
        <div className={styles.images_container}>
          <div
            className={styles.products_images}
          >
            {product.sizes.find((item) => !!item.size) && product.sizes.map((item) => (
              <div
                className={`${styles.product_image_detail_container} ${selectSize === item.id ? styles.selected_image : ''}`}
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
            alt={product.sizes?.find((image) => selectSize === image.id)?.alt}
            src={product.sizes?.find((image) => selectSize === image.id)?.src}
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

            {product.sizes.find((item) => !!item.size) && (
              <div className={styles.sizes_container}>
                <p className={styles.sizes_title}>Tamanho</p>

                <div className={styles.sizes}>
                  {product.sizes.map((size) => (
                    <p
                      key={size.id}
                      className={`${styles.size} ${selectSize === size.id ? styles.selected_size: ''}`}
                      onClick={() => setSelectSize(size.id)}
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
            href={product.contactLink}
            target='_blank'
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