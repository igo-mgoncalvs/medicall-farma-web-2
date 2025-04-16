import map from '@/assets/map.svg'
import Image from 'next/image'

import styles from './styles.module.css'

export default function Infos () {
  return (
    <div className={styles.infos_container}>
      <p className={styles.title}>
        Clientes em todo Brasil
      </p>
      <p className={styles.description}>
        Atendemos todas as cidades do Brasil.
      </p>

      <Image
        src={map}
        alt='teste-alt'
        className={styles.image}
      />
    </div>
  )
}