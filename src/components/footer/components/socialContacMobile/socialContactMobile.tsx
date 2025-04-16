/* eslint-disable @next/next/no-img-element */
import footerJson from '@/mockdata/footer.json'

import styles from './styles.module.css'
import BreakLine from '@/components/breakLine/breakLine'

export default function SocialContactMobile () {
  return (
    <div
      className={styles.main}
    >
      <p className={styles.social_title}>{BreakLine('Acompanhe nossas\nredes sociais!')}</p>

      <div
        className={styles.social_images}
      >
        {footerJson.data.social.list.map((item) => (
          <div
            key={item.id}
            className={styles.social_image}
          >
            <img
              src={item.img}
              alt={item.alt}
            />
          </div>
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
            {footerJson.data.contact.title}
          </p>
          <p>
            {footerJson.data.contact.number}
          </p>
        </div>

        <div
          className={styles.sac_container}
        >
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
    </div>
  )
}