'use client'

import closeIcon from '@/assets/close.svg'
import accordionIcon from '@/assets/accordion.svg'
import accordionUpIcon from '@/assets/accordionUp.svg'
import accordionIconBlack from '@/assets/accordionBlack.svg'
import accordionUpIconBlack from '@/assets/accordionUpBlack.svg'

import styles from './styles.module.css'
import Image from 'next/image'
import { IGroup } from '@/app/[groupName]/[category]/page'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { dbPromise } from '@/utils/dbPromise'
import LateralMenuGroups from '../lateralMenuGroups'

export default function MobileMenu ({ handleOpenMenuMobile, open }: { handleOpenMenuMobile: () => void, open: boolean }) {
  const [openMenu, setOpenMenu] = useState<string>('')
  const [openSecondMenu, setOpenSecondMenu] = useState<string>('')
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [parseGroups, setParseGroups] =useState<IGroup[]>([])

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

  useEffect(() => {
    const groupParam = new URLSearchParams(window.location.search).get('grupo')

    if(groupParam) {
      setSelectedGroup(groupParam)
    } else {
      setSelectedGroup('')
    }
  }, [])

  return (
    <div
      className={`${styles.main} ${open ? '' : styles.close}`}
    >
      <div
        className={styles.close_container}
      >
        <Image
          src={closeIcon}
          onClick={() => handleOpenMenuMobile()}
          alt='teste-alt'
        />
      </div>

      <div
        className={styles.menu_container}
      >
        {[ 
          {
            id: "1",
            groupName: "Institucional",
            categories: [
              {
                id: "1",
                categoryName: "Quem somos",
                categoryLink: "/sobre-nos",
              },
              {
                id: "2",
                categoryName: "Política da Qualidade",
                categoryLink: "/politica-de-privacidade",
              },
              {
                id: "3",
                categoryName: "Certificados De Análise",
                isMenu: true,
                categoryLink: ""
              },
              {
                  id: "3",
                  categoryName: "Blog",
                  categoryLink: "/blog",
              },
            ]
          },
          ...parseGroups
        ].map((item) => (
          <div
            key={item.id}
            className={`${openMenu === item.id ? styles.open_menu_item: ''} ${styles.menu_item}`}
          >
            <div
              className={styles.title_container}
              onClick={() => {
                if(item.id !== openMenu) {
                  setOpenMenu(item.id)
                } else {
                  setOpenMenu('')
                  setOpenSecondMenu('')
                }
              }}
            >
              {item.groupName}
              
              {openMenu === item.id ? (
                <Image
                  src={accordionUpIcon}
                  alt='teste-alt'
                />
              ): (
                <Image
                  src={accordionIcon}
                  alt='teste-alt'
                />
              )}
            </div>

            <div
              className={`${styles.open_itens} ${openMenu !== item.id ? styles.open_itens_container: ''}`}
            >
              {item.categories.map((category) => category.isMenu ? (
                <div key={category.id}>
                  <div
                    className={styles.open_itens_title}
                    data-status={openSecondMenu === category.id}
                    onClick={() => {
                      if(category.id !== openSecondMenu) {
                        setOpenSecondMenu(category.id)
                      } else {
                        setOpenSecondMenu('')
                      }
                    }}
                  >
                    {category.categoryName}

                    {openSecondMenu === category.id ? (
                      <Image
                        src={accordionUpIconBlack}
                        alt='teste-alt'
                      />
                      ): (
                      <Image
                        src={accordionIconBlack}
                        alt='teste-alt'
                      />
                    )}
                  </div>

                  {openSecondMenu === category.id && (
                    <LateralMenuGroups
                      groups={parseGroups}
                      isMenu
                      selectedGroup={selectedGroup}
                      onCloseMenu={handleOpenMenuMobile}
                    />
                  )}

                </div>
              ): (
                <Link
                  key={category.id}
                  className={styles.open_itens_title}
                  href={category.categoryLink}
                  onClick={handleOpenMenuMobile}
                >
                  {category.categoryName}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}