import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'

interface IProps {
  id: string
  image: string
  title: string
  resume: string
}

export default function MainBlogPost ({
  id,
  image,
  resume,
  title
}: IProps) {
  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt='text-alt'
        width={100}
        height={100}
        className={styles.banner}
      />

      <div
        className={styles.content}
      >
        <div>
          <h3 className={styles.title}>
            {title}
          </h3>

          <p className={styles.resume}>
            {resume}
          </p>
        </div>

        <Link
          href={`/blog/${id}`}
          className={styles.button}
        >
          Ler mais
        </Link>
      </div>
    </div>
  )
}