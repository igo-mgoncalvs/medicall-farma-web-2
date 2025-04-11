'use client'

import logo from '@/assets/logo.svg'
import Image from 'next/image'

import styles from './styles.module.css'
import SearchBar from '../searchBar/searchBar'

import productsJson from '@/mockdata/productsMenus.json'

export default function Header () {
  return (
    <div>
      <div
        className={styles.main_container}
      >
        <div
          className={styles.main}
        >
          <Image
            src={logo}
            alt='teste-alt'
          />

          <SearchBar />

          <div
            className={styles.links}
          >
            <a>
              Institucional
            </a>
            <a>
              Fale conosco
            </a>
          </div>
        </div>
      </div>

      <div
        className={styles.menus_container}
      >
        <div
          className={styles.menus}
        >
          {productsJson.data.map((item) => (
            <p
              key={item.id}
            >
              {item.menu}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}