'use client'

import logo from '@/assets/logo.svg'
import menuMobile from '@/assets/menuMobile.svg'
import searchMobile from '@/assets/searchMobile.svg'

import Image from 'next/image'

import styles from './styles.module.css'
import SearchBar from '../searchBar/searchBar'

import { IGroup } from '@/app/[groupName]/[category]/page'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import MobileMenu from '../mobileMenu'
import { dbPromise } from '@/utils/dbPromise'

export default function Header () {
  const [openMenu, setOpenMenu] = useState('')
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  const [parseGroups, setParseGroups] = useState<IGroup[]>([])

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      const interval = setInterval(async () => {
        const getListGroups = await db.get('listGroups', 'listGroups');   

        if (getListGroups) {
          setParseGroups(getListGroups)
          clearInterval(interval)
        }
      }, 500)

      return () => clearInterval(interval)
    }

    loadData()
  }, [])

  const handleOpenMenuMobile = useCallback(() => {
    setOpenMenuMobile(!openMenuMobile)
  }, [openMenuMobile])

  return (
    <div>
      <div
        className={styles.main_container}
      >
        <div
          className={styles.main}
        >

          <div className={styles.menu_container}>
            <Image
              src={menuMobile}
              alt='teste-alt'
              className={styles.mobile_menu}
              onClick={handleOpenMenuMobile}
            />

            <Link
              href='/'
            >
              <Image
                src={logo}
                alt='teste-alt'
                className={styles.logo}
              />
            </Link>
          </div>

          <MobileMenu
            handleOpenMenuMobile={handleOpenMenuMobile}
            open={openMenuMobile}
          />

          <Link
            href='/pesquisa-mobile'
          >
            <Image
              src={searchMobile}
              alt='teste-alt'
              className={styles.search_mobile}
            />
          </Link>


          <SearchBar />

          <div
            className={styles.links}
          >
            <div
              onMouseEnter={() => setOpenMenu('openInst')}
              onMouseLeave={() => setOpenMenu('')}
            >
              Institucional

              <div
                className={`${styles.dropMenu} ${openMenu === 'openInst' ? styles.openMenu : styles.closeMenu}`}
              >
                <Link
                  href='/sobre-nos'
                >
                  Quem somos 
                </Link>
                <Link
                  href='/politica-de-privacidade'
                >
                  Política da Qualidade
                </Link>
              </div>
            </div>
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
          {parseGroups.map((item, key) => (
            <div
              key={item.id}
              onMouseEnter={() => setOpenMenu(item.id)}
              onMouseLeave={() => setOpenMenu('')}
              className={styles.menu_container}
            >
              <p
                className={styles.group_name}
              >
                {item.groupName}
              </p>

              <div
                className={`${styles.menu_categories} ${openMenu === item.id ? styles.openMenu : styles.closeMenu} ${key === parseGroups.length - 1 ? styles.last_menu : ''}`}
              >
                {item.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.categoryLink}
                  >
                    {category.categoryName}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}