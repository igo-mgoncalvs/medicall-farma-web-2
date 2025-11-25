/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import FloatWhatsapp from '../floatWhatsapp'
import styles from './styles.module.css'
import { dbPromise } from '@/utils/dbPromise'
import toTop from '@/assets/toTop.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

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
  const [visible, setVisible] = useState<boolean>(false)

  const pathname = usePathname()

  const isBlogPage = useMemo(() => {
    return pathname.includes('blog')
  }, [pathname])

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

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setVisible(position > 500); // Exibe depois de 500px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {isBlogPage && (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : "translateY(30px)",
            bottom: visible ? 0 :'-100px',
            position: visible ? 'relative' : 'absolute',
            transition: "0.3s ease-in",
          }}
          className={styles.to_top_button}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <Image
            alt='to top icone'
            src={toTop}
          />
          
          Voltar ao topo
        </div>
      )}

    </div>
  )
}