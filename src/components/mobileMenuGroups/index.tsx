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
import { useSearchParams } from 'next/navigation'

export default function MobileMenuGroups ({ handleOpenMenuMobile, open }: { handleOpenMenuMobile: () => void, open: boolean }) {
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [parseGroups, setParseGroups] =useState<IGroup[]>([])

  const searchParams = useSearchParams();
  
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
    const groupParam = searchParams.get('grupo') 

    if(groupParam) {
      setSelectedGroup(groupParam)
    } else {
      setSelectedGroup('')
    }
  }, [searchParams])

  return (
    <div
      className={`${styles.main} ${open ? '' : styles.close}`}
    >
      <div
        className={styles.close_container}
      >
        <Image
          src={closeIcon}
          onClick={handleOpenMenuMobile}
          alt='teste-alt'
        />
      </div>

      <div
        className={styles.menu_container}
      >
        <div className={styles.groups_container}>
          <div>
            <div className={styles.groupName_title_content}>
              <p className={styles.groupName_title}>
                Certificados
                <span className={styles.line_mobile} />
              </p>
              <p className={styles.groupName_title_label}>de análise</p>
            </div>
          </div>
          <p className={styles.groupName_label}>Filtrar por linha</p>
        </div>

        <div className={styles.group_list_container}>
          <LateralMenuGroups
            groups={parseGroups}
            isMenu
            selectedGroup={selectedGroup}
            onCloseMenu={handleOpenMenuMobile}
          />
        </div>
      </div>

    </div>
  )
}