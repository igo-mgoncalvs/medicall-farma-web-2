/* eslint-disable @next/next/no-img-element */
'use client'

import aboutUsJson from '@/mockdata/aboutUs.json'

import styles from './styles.module.css'
import BreakLine from '@/components/breakLine/breakLine'
import useWindowSize from '@/hooks/useWindowSize'

export default function AboutUs () {
  const size = useWindowSize()

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${size.width > 426 ? aboutUsJson.data.wellcome.background : aboutUsJson.data.wellcome.backgroundMobile})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: size.width > 426 ? 'contain' : 'cover'
        }}
        className={styles.wellcome_container}
      >
        <p className={styles.wellcome_title}>{aboutUsJson.data.wellcome.tilte}</p>
        <p className={styles.wellcome_description}>{aboutUsJson.data.wellcome.description}</p>
      </div>

      <div
        className={styles.aboutUs_container}
      >
        <a
          href={aboutUsJson.data.aboutUs.buttonLink}
          className={styles.aboutUs_button_mobile}
        >
          {aboutUsJson.data.aboutUs.button}
        </a>
        
        <img
          src={aboutUsJson.data.aboutUs.image}
          alt={aboutUsJson.data.aboutUs.alt}
        />

        <div
          className={styles.aboutUs_info_container}
        >
          <div>
            <p
              className={styles.aboutUs_title_shadow}
            >
              {aboutUsJson.data.aboutUs.title}
            </p>
            <p
              className={styles.aboutUs_title}
            >
              {aboutUsJson.data.aboutUs.title}
            </p>
          </div>

          <p className={styles.aboutUs_text}>
            {BreakLine(aboutUsJson.data.aboutUs.text)}
          </p>

          <a
            href={aboutUsJson.data.aboutUs.buttonLink}
            className={styles.aboutUs_button}
          >
            {aboutUsJson.data.aboutUs.button}
          </a>
        </div>
      </div>

      <div
        className={styles.units_container}
      >
        <div
          className={styles.units_infos_container}
        >
          <div>
            <p className={styles.units_mainTitle}>{aboutUsJson.data.units.mainTitle}</p>
            <p className={styles.units_title}>{aboutUsJson.data.units.title}</p>
          </div>

          <div className={styles.units_list}>
            {aboutUsJson.data.units.list.map((item) => (
              <div
                key={item.id}
              >
                <p className={styles.units_list_title}>{item.title}</p>
                <p className={styles.units_list_description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <img
          alt={aboutUsJson.data.units.alt}
          src={aboutUsJson.data.units.image}
          className={styles.units_image}
        />
      </div>

      <div
        className={styles.team_container}
      >
        <img
          src={aboutUsJson.data.team.image}
          alt={aboutUsJson.data.team.alt}
        />

        <div
          className={styles.team_infos_container}
        >
          <div>
            <p className={styles.team_title_shadow}>{aboutUsJson.data.team.title}</p>
            <p className={styles.team_title}>{aboutUsJson.data.team.title}</p>
          </div>
          
          <p>{BreakLine(aboutUsJson.data.team.description)}</p>
        </div>
      </div>

      <div
        className={styles.space_container}
      >
        <div
          className={styles.space_infos_container}
        >
          <div>
            <p className={styles.space_title_shadow}>{aboutUsJson.data.space.title}</p>
            <p className={styles.space_title}>{aboutUsJson.data.space.title}</p>
          </div>
          
          <p className={styles.space_description}>{BreakLine(aboutUsJson.data.space.description)}</p>
        </div>

        {aboutUsJson.data.space.list.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
          />
        ))}
      </div>
    </div>
  )
}