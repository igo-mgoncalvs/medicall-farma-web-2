'use client'

import Product from '@/components/product/product'
import productsJson from '@/mockdata/products.json'

import styles from './styles.module.css'

export default function GroupName ({
  params,
}: {
  params: { groupName: string, category: string }
}) {
  const dataGroup = productsJson.groups.find((group) => group.groupLink === params.groupName)
  const dataCategory = dataGroup?.categories.find((category) => category.categoryLink === params.category)

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
            <p
              key={item.id}
              className={`${params.category === item.categoryLink ? styles.categorySelected : styles.category}`}
            >
              {item.categoryName}
            </p>
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