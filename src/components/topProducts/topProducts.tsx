'use client'

import Product, { IProduct } from "../product/product"

import styles from './styles.module.css'

interface ITopProducts {
  type: string,
  products: IProduct[]
}

export default function TopProducts ({ products, type }: ITopProducts) {
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
          {type}
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