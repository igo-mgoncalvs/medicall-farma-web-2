import Image from "next/image";
import Link from "next/link";
import styles from './styles.module.css'

interface IProps {
  id: string
  src: string
  alt: string
  title: string
  date: string
}

export default function RelatedBlogs ({
  id,
  alt,
  src,
  title,
  date
}: IProps) {
  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className={styles.image}
      />

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>

        <Link
          href={`/blog/${id}`}
          className={styles.button}
        >
          Ler artigo
        </Link>
      </div>
    </div>
  )
}