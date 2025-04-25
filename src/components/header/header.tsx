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

export default function Header () {
  const [openMenu, setOpenMenu] = useState('')
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  const [parseGroups, setParseGroups] = useState<IGroup[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const getGroups = localStorage.getItem('list-groups')
      
      if (getGroups) {
        setParseGroups(JSON.parse(getGroups))
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
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
          <Image
            src={menuMobile}
            alt='teste-alt'
            className={styles.mobile_menu}
            onClick={handleOpenMenuMobile}
          />

          <MobileMenu
            handleOpenMenuMobile={handleOpenMenuMobile}
            open={openMenuMobile}
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
                <a
                  href='politica-de-privacidade'
                >
                  Política da Qualidade
                </a>
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
          {parseGroups.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setOpenMenu(item.id)}
              onMouseLeave={() => setOpenMenu('')}
              className={styles.menu_container}
            >
              <p>
                {item.groupName}
              </p>

              <div
                className={`${styles.menu_categories} ${openMenu === item.id ? styles.openMenu : styles.closeMenu}`}
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