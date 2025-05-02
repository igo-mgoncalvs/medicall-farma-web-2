import Image from 'next/image'
import whatsapp from '@/assets/whatsappFloat.svg'

import styles from './styles.module.css'

export default function FloatWhatsapp ({ contact } : { contact: string }) {

  return (
    <a
      className={styles.container}
      href={contact}
      target='_blank'
    >
      <Image
        priority
        width={50}
        height={50}
        src={whatsapp}
        className={styles.logo}
        alt="Imagem do whatsapp"
      />
    </a>
  )
} 