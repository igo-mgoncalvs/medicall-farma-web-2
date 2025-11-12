'use client'

import Product, { IProduct } from '@/components/product/product'

import styles from './styles.module.css'
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dbPromise } from '@/utils/dbPromise';

export interface ICategories {
  id: string
  categoryName: string
  categoryLink: string
  isMenu?: boolean
  products: IProduct[]
}

export interface IGroup {
  id: string
  groupName: string
  groupLink: string
  isTop: boolean
  categories: ICategories[]
}

export default function CertificatesGroupName () {
  const [products, setProducts] = useState<IGroup[] | undefined>()

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
          window.scrollTo({
            top: 0
          })
          clearInterval(interval)
        }
      }, 500)
  
      return () => clearInterval(interval)
    }
    
    loadData()
  }, [])

  
  const dataGroup = products?.find((group) => group.groupLink === params.groupName)
  const dataCategory = dataGroup?.categories.find((category) => category.categoryLink.includes(params.category))

  return (dataGroup && dataCategory) && (
    <div
      className={styles.main}
    >
      <div className={styles.main_container}>
        <div className={styles.groups_container}>
          <div className={styles.groupName_title_container}>
            <p className={styles.groupName_title}>{dataGroup.groupName}</p>
            <span className={styles.line} />
          </div>
          <p className={styles.groupName_label}>Filtrar por categorias</p>

          <div
            className={styles.categories_container}
          >
            {dataGroup.categories.map((item) => (
              <Link
                key={item.id}
                className={`${item.categoryLink.includes(params.category) ? styles.categorySelected : styles.category}`}
                href={item.categoryLink}
              >
                {item.categoryName}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.product_main}>
          <p className={styles.products_title}>Exibindo resultados</p>

          <div
            className={styles.products_container}
          >
            {dataCategory.products.map((item) => (
              <div
                key={item.id}
                className={styles.product}
              >
                <Product
                  product={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className={styles.divisorLine}></span>
    </div>
  )
}