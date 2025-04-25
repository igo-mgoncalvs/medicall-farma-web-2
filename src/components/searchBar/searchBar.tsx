'use client'

import searchIcon from '@/assets/search.svg'
import Image from 'next/image'

import styles from './styles.module.css'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/api/axios'

export default function SearchBar () {
  const [search, setSearch] = useState('')

  const route = useRouter()

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    route.push(`/pesquisa/${encodeURI(search)}`)

    api.post('/register-search', {
      search
    })
  }, [search, route])

  return (
    <form
      className={styles.searchBar_container}
      onSubmit={handleSearch}
    >
      <input 
        placeholder="Qual produto você está procurando?"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className={styles.button}
        type='submit'
      >
        <Image
          src={searchIcon}
          alt='teste-alt'
        />
      </button>
    </form>
  )
}