'use client'

import Image from 'next/image'
import styles from './styles.module.css'

import searchIcon from '@/assets/searchIconMobile.svg'
import historyArrow from '@/assets/historyArrow.svg'
import circleClose from '@/assets/circleClose.svg'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import api from '@/api/axios'
import Link from 'next/link'

export default function SearchMobile () {
  const [search, setSearch] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const route = useRouter()

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    route.replace(`/pesquisa-mobile/${encodeURI(search)}`)

    const getSearch = localStorage.getItem('search-mobile')

    if(getSearch && search) {
      localStorage.setItem('search-mobile', JSON.stringify([search, ...JSON.parse(getSearch)]))
    } else if(search) {
      localStorage.setItem('search-mobile', JSON.stringify([search]))
    }

    api.post('/register-search', {
      search
    })
  }, [search, route])

  useEffect(() => {
    const getSearch = localStorage.getItem('search-mobile')

    if(getSearch) {
      setSearchHistory(JSON.parse(getSearch))
    }
  }, [])

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
              />
            </form>

            <Image
              src={circleClose}
              alt='teste-alt'
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
        className={styles.search_history_container}
      >
        <div
          className={styles.search_history_content}
        >
          {searchHistory.map((item, key) => (
            <Link
              key={`${item}-${key}`}
              className={styles.search_history}
              href={`/pesquisa-mobile/${item}`}
            >
              <div
                className={styles.search_itens}
              >
                <Image
                  src={searchIcon}
                  alt='teste-alt'
                  className={styles.searchIcon}
                />

                <p>
                  {item}
                </p>
              </div>

              <Image
                src={historyArrow}
                alt='teste-alt'
                className={styles.searchIcon}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}