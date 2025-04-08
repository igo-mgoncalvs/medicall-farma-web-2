/* eslint-disable @next/next/no-img-element */
'use client'

import styles from './styles.module.css'

export default function Catalog () {
  return (
    <div
      className={styles.main}
    >
      <div
        className={styles.infos}
      >
        <div
          className={styles.title}
        >
          Baixe nosso <p className={styles.catalog}>catálogo</p>
        </div>

        <p
          className={styles.decription}
        >
          Catálogo completo e diversificado: encontre aqui os produtos ideais para o seu Hospital ou Clínica, com a qualidade que você merece.
        </p>

        <a className={styles.button}>Baixar</a>
      </div>

      <img
        src="https://i.postimg.cc/PNsyxxvn/Group-481592.png"
        alt="teste-alt"
        className={styles.image}
      />

    </div>
  )
}