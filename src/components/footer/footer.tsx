'use client'

import { useEffect, useState } from "react"
import Form from "./components/form/form"
import Infos from "./components/infos/infos"
import MedicallInfos from "./components/medicallInfos/medicallInfos"
import SocialContactMobile from "./components/socialContacMobile/socialContactMobile"

import styles from './styles.module.css'
import api from "@/api/axios"
import { IHomeData } from "@/app/page"
import dbPromise from '@/utils/dbPromise';

export interface IFooter {
  description: string
  phoneNumber: string
  sacEmail: string
  sacPhone: string
}

export interface IFooterSocial {
  footerId: string
  href: string
  icon: string
  id: string
  order: number
}

export interface IFooterLinks {
  href: string
  id: string
  name: string
  order: number
}
export interface IAddresses {
  id: string,
  uf: string
  address: string
  state: string
  description: string
}

export default function Footer () {
  const [footerData, setFooterData] = useState<IFooter>()
  const [footerSocial, setFooterSocial] = useState<IFooterSocial[]>([])
  const [footerLinks, setFooterLinks] = useState<IFooterLinks[]>([])
  const [addresses, setAddresses] = useState<IAddresses[]>([])

  useEffect(() => {
    const saveStorages = async () => {
      const db = await dbPromise;

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
      
      api.get('/list-all-products')
        .then(({data}) => {
          localStorage.setItem('products', JSON.stringify(data))
        })

      api.get<IHomeData>('/get-home')
        .then(async ({data}) => {
          await db.put('home', data, 'home');
        })

      api.get('/get-footer')
        .then(async ({data}) => {
          await db.put('footer', data, 'footer');
        })

      api.get('/get-footer-social')
        .then(async ({data}) => {
          await db.put('footerSocial', data, 'footerSocial');
        })

      api.get('/get-footer-links')
        .then(async ({data}) => {
          await db.put('footerLinks', data, 'footerLinks');
        })

      api.get('/get-addresses')
        .then(async ({data}) => {
          await db.put('addresses', data, 'addresses');
        })

      api.get('/get-about-us-layout')
        .then(async ({data}) => {
          await db.put('aboutUsLayout', data, 'aboutUsLayout');
        })

      api.get('/get-privacy-policy')
        .then(async ({data}) => {
          await db.put('privacyPolicy', data, 'privacyPolicy');
        })
    }

    saveStorages()

    const interval = setInterval(async () => {
      const db = await dbPromise      

      const footer: IFooter = await db.get('footer', 'footer');
      const footerSocial: IFooterSocial[] = await db.get('footerSocial', 'footerSocial');
      const footerLinks: IFooterLinks[] = await db.get('footerLinks', 'footerLinks');
      const addresses: IAddresses[] = await db.get('addresses', 'addresses');

      if (footer && footerSocial && footerLinks && addresses) {
        setFooterData(footer) 
        setFooterSocial(footerSocial.sort((a, b) => a.order < b.order ? -1: 1)) 
        setFooterLinks(footerLinks.sort((a, b) => a.order < b.order ? -1: 1)) 
        setAddresses(addresses) 
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return footerData && (
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
        <MedicallInfos data={footerData} social={footerSocial} links={footerLinks} addresses={addresses}/>
      </div>

      <div
        className={styles.background}
        id="fale-conosco"
      >
        <div
          className={styles.social_contact_container}
        >
          <SocialContactMobile
            data={footerSocial}
          />
        </div>
      </div>
    </div>
  )
}