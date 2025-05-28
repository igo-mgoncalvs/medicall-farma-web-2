'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import api from '@/api/axios'
import Image from 'next/image'
import searchIcon from '@/assets/searchIconMobile.svg'
import circleClose from '@/assets/circleClose.svg'
import { IProduct } from '@/components/product/product'
import { usePathname } from 'next/navigation'
import ProductSearchMobile from '@/components/productSearchMobile/product'
import { CircularProgress } from '@mui/material'

export default function SearchResponseMobile () {
  const [search, setSearch] = useState('')
  const [searchResponse, setSearchResponse] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  const pathname = usePathname();
  const route = useRouter()

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
      .finally(() => {
        setLoading(false)
      })
  }, [params])

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    route.replace(`/pesquisa-mobile/${encodeURI(search)}`)

    api.post('/register-search', {
      search
    })
  }, [search, route])

  const handleCloseButton = useCallback(() => {
    setSearch('')
    route.replace('/pesquisa-mobile')
  }, [route])

  return (
    <div
      className={styles.background}
    >
      <div className={styles.searchBar_background}>
        <div
          className={styles.searchBar_container}
        >
          <div
            className={styles.searchBar}
          >
            <form
              className={styles.search}
              onSubmit={handleSearch}
            >
              <button
                type='submit'
              >
                <Image
                  src={searchIcon}
                  alt='teste-alt'
                  className={styles.searchIcon}
                />
              </button>

              <input
                placeholder="Qual produto você está procurando?"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>

            <Image
              src={circleClose}
              alt='teste-alt'
              onClick={handleCloseButton}
            />
          </div>

          <div
            onClick={() => route.push('/')}
          >
            Cancelar
          </div>
        </div>
      </div>

      <div
        className={styles.products_list_container}
      >
        <div className={styles.title_container}>
          <p>Exibindo resultados de:</p>
          <p className={styles.title_container_search}>{decodeURI(params.search)}</p>
        </div>

        {loading ? (
          <div
            className={styles.loading}
          >
            <CircularProgress />
          </div>
        ): (
          <div
            className={styles.products_container}
          >
            {searchResponse.length > 0 ? searchResponse?.map((item) => (
              <ProductSearchMobile
                key={item.id}
                product={item}
              />
            )): (
              <div
                className={styles.notFound_text}
              >
                Nenhum produto encontrado
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  )
}