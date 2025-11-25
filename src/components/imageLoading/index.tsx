import Image from "next/image"
import loadingIcon from '@/assets/loading.svg'
import styles from './styles.module.css'

interface IProps {
  src?: string
  alt?: string
  loading: boolean
}

export default function ImageLoading ({
  src = "",
  alt = "",
  loading
}: IProps) {

  return !loading ? (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={styles.banner}
    />
  ) : (
    <div className={styles.loading_container}>
      <Image
        src={loadingIcon}
        alt='loading'
        width={20}
        height={20}
        className={styles.icon}
      />
    </div>
  )
}