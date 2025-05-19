/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import logo from '@/assets/logo.svg'
import arrow from '@/assets/arrow.svg'

import styles from './style.module.css'

import BreakLine from "@/components/breakLine/breakLine";
import { IAddresses, IFooter, IFooterLinks, IFooterSocial } from "../../footer";

export default function MedicallInfos ({data, social, links, addresses}: {data: IFooter, social: IFooterSocial[], links: IFooterLinks[], addresses: IAddresses[]}) {
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

        <p>{data.description}</p>

        <div
          className={styles.menus_container}
        >
          {links.map((item) => (
            <a
              key={item.id}
              className={styles.links}
              href={item.href}
            >
              <Image
                src={arrow}
                alt="teste-alt"
                className={styles.arrow}
              />
              <p>{item.name}</p>
            </a>
          ))}
        </div>

        <div
          className={styles.sac_container}
        >
          <p className={styles.sac_title}>
            SAC
          </p>
          <p>
            {data.sacPhone}
          </p>
          <p>
            {data.sacEmail}
          </p>
        </div>
      </div>

      <div
        className={styles.main_right}
      >
        <div
          className={styles.address_container}
        >
          {addresses.map((item) => (
            <div
              key={item.id}
            >
              <p className={styles.address_title}>Nosso endereço {item.uf}</p>
              <p className={styles.address_text}>{BreakLine(item.address)}</p>
            </div>
          ))}
        </div>

        <div
          className={styles.social_container}
        >
          <p>Nos siga nas redes sociais</p>

          <div
            className={styles.social_images}
          >
            {social.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
              >
                <img
                  src={item.icon}
                  alt={'icon'}
                />
              </a>
            ))}
          </div>
        </div>

        <div
          className={styles.contact_container}
        >
          <p
            className={styles.contact_title}
          >
            Fale conosco
          </p>
          <p>
            {data.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  )
}