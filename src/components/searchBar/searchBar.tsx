'use client'

import searchIcon from '@/assets/search.svg'
import Image from 'next/image'

import styles from './styles.module.css'

export default function SearchBar () {
  return (
    <div
      className={styles.searchBar_container}
    >
      <input 
        placeholder="Qual produto você está procurando?"
      />

      <div
        className={styles.button}
      >
        <Image
          src={searchIcon}
          alt='teste-alt'
        />
      </div>
    </div>
  )
}