/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import logo from '@/assets/logo.svg'
import arrow from '@/assets/arrow.svg'

import styles from './style.module.css'

import footerJson from '@/mockdata/footer.json'

export default function MedicallInfos () {
  return (
    <div
      className={styles.main}
    >
      <div
        className={styles.infos}
      >
        <Image
          src={logo}
          alt="teste-alt"
        />

        <p>{footerJson.data.description}</p>

        <div
          className={styles.menus_container}
        >
          {footerJson.data.menus.map((item) => (
            <a
              key={item.id}
              className={styles.links}
            >
              <Image
                src={arrow}
                alt="teste-alt"
              />
              <p>{item.label}</p>
            </a>
          ))}
        </div>

        <div>
          <p className={styles.sac_title}>
            {footerJson.data.sac.title}
          </p>
          <p>
            {footerJson.data.sac.number}
          </p>
          <p>
            {footerJson.data.sac.email}
          </p>
        </div>
      </div>

      <div
        className={styles.main_right}
      >
        <div
          className={styles.address_container}
        >
          {footerJson.data.address.map((item) => (
            <div
              key={item.id}
            >
              <p className={styles.address_title}>{item.title}</p>
              <p>{item.address}</p>
            </div>
          ))}
        </div>

        <div
          className={styles.social_container}
        >
          <p>{footerJson.data.social.title}</p>

          <div
            className={styles.social_images}
          >
            {footerJson.data.social.list.map((item) => (
              <img
                key={item.id}
                src={item.img}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div>
          <p
            className={styles.contact_title}
          >
            {footerJson.data.contact.title}
          </p>
          <p>
            {footerJson.data.contact.number}
          </p>
        </div>
      </div>
    </div>
  )
}