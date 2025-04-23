'use client'

import { useEffect } from "react"
import Form from "./components/form/form"
import Infos from "./components/infos/infos"
import MedicallInfos from "./components/medicallInfos/medicallInfos"
import SocialContactMobile from "./components/socialContacMobile/socialContactMobile"

import styles from './styles.module.css'
import api from "@/api/axios"

export default function Footer () {

  useEffect(() => {
    const saveStorages = async () => {
      api.get('/list-groups')
        .then(({data}) => {
          localStorage.setItem('list-groups', JSON.stringify(data))
        })

      api.get('/get-top-products')
        .then(({data}) => {
          localStorage.setItem('top-products', JSON.stringify(data))
        })

      api.get('/get-featured-products')
        .then(({data}) => {
          localStorage.setItem('featured-products', JSON.stringify(data))
        })
    }

    saveStorages()
  }, [])

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
        id="fale-conosco"
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