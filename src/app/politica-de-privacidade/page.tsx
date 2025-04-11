/* eslint-disable @next/next/no-img-element */
 
import policyJson from '@/mockdata/policy.json'

import styles from './styles.module.css'

export default function PolicyPrivacy () {
  const textoComBr = policyJson.text.replace(/\n/g, '<br />');
  return (
    <div
      className={styles.main}
    >
      <div>
        <p className={styles.title}>{policyJson.title}</p>
        <div dangerouslySetInnerHTML={{ __html: textoComBr }} className={styles.text} />
      </div>

      <img
        src={policyJson.image}
        alt={policyJson.alt}
      />
    </div>
  )
}