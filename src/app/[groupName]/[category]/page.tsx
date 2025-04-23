'use client'

import Product, { IProduct } from '@/components/product/product'

import styles from './styles.module.css'
import api from '@/api/axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface ICategories {
  id: string
  categoryName: string
  categoryLink: string
  products: IProduct[]
}

export interface IGroup {
  id: string
  groupName: string
  groupLink: string
  isTop: boolean
  categories: ICategories[]
}

export default function GroupName ({
  params,
}: {
  params: { groupName: string, category: string }
}) {
  const [products, setProducts] = useState<IGroup[] | undefined>()

  useEffect(() => {
    const getProductsFunction = async () => {
      const getProducts = localStorage.getItem('products')

      if(getProducts) {
        setProducts(JSON.parse(getProducts))
      }
      
      const res = await api.get('/list-all-products')

      localStorage.setItem('products', JSON.stringify(res.data))
    }

    getProductsFunction()
  }, [])

  const dataGroup = products?.find((group) => group.groupLink === params.groupName)
  const dataCategory = dataGroup?.categories.find((category) => category.categoryLink.includes(params.category))

  return (dataGroup && dataCategory) && (
    <div
      className={styles.main}
    >
      <div>
        <p className={styles.groupName_title}>{dataGroup.groupName}</p>
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

      <div>
        <p className={styles.products_title}>Exibindo resultados</p>

        <div
          className={styles.products_container}
        >
          {dataCategory.products.map((item) => (
            <Product
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}