'use client'

import api from "@/api/axios";
import Product, { IProduct } from "@/components/product/product";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import styles from './styles.module.css'

export default function SearchDesck () {
  const [searchResponse, setSearchResponse] = useState<IProduct[]>()

  const pathname = usePathname();

  const params = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    return {
      search: segments[1] || '',
    };
  }, [pathname]);

  useEffect(() => {
    api.get(`/search-product/${decodeURI(params.search)}`)
      .then(({data}) => {
        setSearchResponse(data)
      })
  }, [params])

  return (
    <div
      className={styles.main}
    >
      <div className={styles.title_container}>
        <p>Exibindo resultados de:</p>
        <p className={styles.search}>{decodeURI(params.search)}</p>
      </div>

      <div
        className={styles.products_container}
      >
        {searchResponse?.map((item) => (
          <Product
            product={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  )
}