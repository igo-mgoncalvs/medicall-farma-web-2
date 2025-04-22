'use client'

import { useEffect, useState } from "react"
import Product, { IProduct } from "../product/product"

import styles from './styles.module.css'
import { ICategories } from "@/app/[groupName]/[category]/page"

export default function TopProducts ({categories, groupName}: {categories: ICategories[], groupName: string}) {
  const [products, setProducts] = useState<IProduct[]>([])
  
  useEffect(() => {
    const list: IProduct[] = []

    categories.forEach((category) => {
      list.push(...category.products)
    })
    
    setProducts(list)
  }, [categories])

  return (
    <div
      className={styles.main}
    >
      <div>
        <div
          className={styles.title}
        >
          <p className={styles.top}>Top 5</p>
          Produtos destaques
        </div>


        <p
          className={styles.type}
        >
          {groupName}
        </p>

        <div className={styles.line} />
      </div>

      <div
        className={styles.products_container}
      >
        {products.map((item) => (
          <Product
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  )
}