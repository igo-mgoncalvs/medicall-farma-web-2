'use client'

import { useEffect, useState } from "react"
import Form from "./components/form/form"
import Infos from "./components/infos/infos"
import MedicallInfos from "./components/medicallInfos/medicallInfos"
import SocialContactMobile from "./components/socialContacMobile/socialContactMobile"

import styles from './styles.module.css'
import api from "@/api/axios"
import { IHomeData } from "@/app/page"
import { dbPromise } from "@/utils/dbPromise"
import { usePathname } from "next/navigation"

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

  const route = usePathname()

  useEffect(() => {
    const loadHome = async ()  => {
      const db = await dbPromise();
      if (!db) return;

      api.get<IHomeData>('/get-home')
        .then(({data}) => {
          db.put('home', data, 'home')
        })
    }

    loadHome()

    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;
  
      Promise.all([
        api.get('/list-groups'),
        api.get('/get-top-products'),
        api.get('/get-featured-products'),
        api.get('/list-all-products'),
        api.get('/get-footer'),
        api.get('/get-footer-social'),
        api.get('/get-footer-links'),
        api.get('/get-addresses'),
        api.get('/get-about-us-layout'),
        api.get('/get-privacy-policy'),
        api.get('/get-clients'),
        api.get('/get-suppliers'),
        api.get('/get-float-buttons'),
        api.get('/get-contact-phone'),
        api.get('/get-contact-email'),
        api.get('/catalog'),
      ])
        .then(async ([
          listGroups,
          topProducts,
          featuredProducts,
          products,
          footer,
          footerSocial,
          footerLinks,
          addresses,
          aboutUsLayout,
          privacyPolicy,
          clients,
          suppliers,
          floatButtons,
          contactPhone,
          contactEmail,
          catalogLink
        ]) => {
          Promise.all([
            db.put('listGroups', listGroups.data, 'listGroups'),
            db.put('topProducts', topProducts.data, 'topProducts'),
            db.put('featuredProducts', featuredProducts.data, 'featuredProducts'),
            db.put('products', products.data, 'products'),
            db.put('footer', footer.data, 'footer'),
            db.put('footerSocial', footerSocial.data, 'footerSocial'),
            db.put('footerLinks', footerLinks.data, 'footerLinks'),
            db.put('addresses', addresses.data, 'addresses'),
            db.put('aboutUsLayout', aboutUsLayout.data, 'aboutUsLayout'),
            db.put('privacyPolicy', privacyPolicy.data, 'privacyPolicy'),
            db.put('clients', clients.data, 'clients'),
            db.put('suppliers', suppliers.data, 'suppliers'),
            db.put('floatButtons', floatButtons.data, 'floatButtons'),
            db.put('contactPhone', contactPhone.data, 'contactPhone'),
            db.put('contactEmail', contactEmail.data, 'contactEmail'),
            db.put('catalogLink', catalogLink.data, 'catalogLink'),
          ])
        })

        const interval = setInterval(async () => {
          if (!db) return;
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
    };
  
    loadData();
  }, [])

  return footerData && (
    <div
      className={styles.footer}
    >
      {(route.includes('blog') || route.includes('certificados')) && (
        <span className={styles.divisor_line} /> 
      )}

      <div
        className={styles.form}
      >
        <Infos />
        <Form />
      </div>

      <div
        className={styles.medicallInfos}
      >
        <div className={styles.background_infos}>
          <MedicallInfos data={footerData} social={footerSocial} links={footerLinks} addresses={addresses}/>
        </div>
      </div>

      <div
        className={styles.background}
        id="fale-conosco"
      >
        <div
          className={styles.social_contact_container}
        >
          <SocialContactMobile
            dataSocial={footerSocial}
            data={footerData}
          />
        </div>
      </div>
    </div>
  )
}