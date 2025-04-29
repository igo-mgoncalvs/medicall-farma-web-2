/* eslint-disable @next/next/no-img-element */
'use client'

import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import dbPromise from '@/utils/dbPromise'

export interface IPrivacyPolicy {
  title: string
  text: string
  image: string
}

export default function PolicyPrivacy () {
  const [layout, setLayout] = useState<IPrivacyPolicy>()

  useEffect(() => {
    const getData = async () => {
      const db = await dbPromise  

      const layoutData = await db.get('privacyPolicy', 'privacyPolicy');

      if(layoutData) {
        setLayout(layoutData)
      }
    }

    getData()
  }, [])

  return layout && (
    <div
      className={styles.main}
    >
      <div>
        <p className={styles.title}>{layout.title}</p>
        <div dangerouslySetInnerHTML={{ __html: layout.text.replace(/\n/g, '<br />')}} className={styles.text} />
      </div>

      <img
        src={layout.image}
        alt={'ilustração politica de qualidade'}
      />
    </div>
  )
}