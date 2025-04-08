'use client'

import Form from "./components/form/form"
import Infos from "./components/infos/infos"
import MedicallInfos from "./components/medicallInfos/medicallInfos"

import styles from './styles.module.css'

export default function Footer () {
  return (
    <div >
      <div
        className={styles.form}
      >
        <Infos />
        <Form />
      </div>

      <div
        className={styles.medicallInfos}
      >
        <MedicallInfos />
      </div>
    </div>
  )
}