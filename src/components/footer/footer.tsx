'use client'

import Form from "./components/form/form"
import Infos from "./components/infos/infos"
import MedicallInfos from "./components/medicallInfos/medicallInfos"
import SocialContactMobile from "./components/socialContacMobile/socialContactMobile"

import styles from './styles.module.css'

export default function Footer () {
  return (
    <div
      className={styles.footer}
    >
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

      <div
        className={styles.background}
      >
        <div
          className={styles.social_contact_container}
        >
          <SocialContactMobile />
        </div>
      </div>
    </div>
  )
}