/* eslint-disable @next/next/no-img-element */
import footerJson from '@/mockdata/footer.json'

import styles from './styles.module.css'
import BreakLine from '@/components/breakLine/breakLine'
import { IFooter, IFooterSocial } from '../../footer'

export default function SocialContactMobile ({dataSocial, data}: {dataSocial: IFooterSocial[], data: IFooter}) {
  return (
    <div
      className={styles.main}
    >
      <p className={styles.social_title}>{BreakLine('Acompanhe nossas\nredes sociais!')}</p>

      <div
        className={styles.social_images}
      >
        {dataSocial.map((item) => (
          <a
            key={item.id}
            className={styles.social_image}
            href={item.href}
            target='_blank'
          >
            <img
              src={item.icon}
              alt='icone'
            />
          </a>
        ))}
      </div>

      <div
       className={styles.contacts}
      >
        <div
          className={styles.contact_container}
        >
          <p
            className={styles.contact_title}
          >
            Fale conosco
          </p>

          <a
            href={`tel:${data.phoneNumber}`}
          >
            <p>
              {data.phoneNumber}
            </p>
          </a>
        </div>

        <div
          className={styles.sac_container}
        >
          <p className={styles.sac_title}>
            SAC
          </p>
          <a
            href={`tel:${data.sacPhone}`}
          >
            <p>
              {data.sacPhone}
            </p>
          </a>
          <a
            href={`mailto:${data.sacEmail}`}
          >
            <p>
              {footerJson.data.sac.email}
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}