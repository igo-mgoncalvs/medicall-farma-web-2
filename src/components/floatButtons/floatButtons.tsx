/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import FloatWhatsapp from '../floatWhatsapp'
import styles from './styles.module.css'
import { dbPromise } from '@/utils/dbPromise'

export interface IFloatButtons {
  id: string
  image: string
  link: string
  text: string
}

export interface IWhatsapp {
  id: string
  phoneNumber: string
  link: string
}

export default function FloatButtons () {
  const [floatButtons, setFloatButtons] = useState<IFloatButtons[]>([])
  const [whatsapp, setWhatsapp] = useState<IWhatsapp>()

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      const getFloatButtons = await db.get('floatButtons', 'floatButtons');
      const getContactPhone = await db.get('contactPhone', 'contactPhone');
  
      if(getFloatButtons && getContactPhone) {
        setFloatButtons(getFloatButtons)
        setWhatsapp(getContactPhone)
      }
    };
  
    loadData();
  }, [])

  return floatButtons.length > 0 && (
    <div className={styles.main}>
      {floatButtons.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className={styles.contactToast}
          target='_blank'
        >
          <div
            className={styles.text}
          >
            <span className={styles.triangule}></span>
            <p>{item.text}</p>
          </div>
    
          <div
            className={styles.image_container}
          >
            <img
              src={item.image}
              alt="imagem do atentente"
              className={styles.image}
            />
            <span className={styles.status}></span>
          </div>
        </a>
      ))}

      {whatsapp && (
        <div
          className={styles.floatWhatsapp}
        >
          <FloatWhatsapp contact={whatsapp.link} />
        </div>
      )}
    </div>
  )
}