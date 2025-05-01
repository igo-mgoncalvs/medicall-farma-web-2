/* eslint-disable @next/next/no-img-element */
'use client'

import { dbPromise } from '@/utils/dbPromise'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

export interface IPrivacyPolicy {
  title: string
  text: string
  image: string
}

export default function PolicyPrivacy () {
  const [layout, setLayout] = useState<IPrivacyPolicy>()

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      const layoutData = await db.get('privacyPolicy', 'privacyPolicy');
  
      if(layoutData) {
        setLayout(layoutData)
      }
    };
  
    loadData();
  
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