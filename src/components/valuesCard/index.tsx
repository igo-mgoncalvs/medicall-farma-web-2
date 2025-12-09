import styles from './styles.module.css'

interface IProps {
  title: string
  description: string
}

export default function ValuesCard ({
  title,
  description
}: IProps) {
  return (
    <div
      className={styles.container}
    >
      <span className={styles.line}/>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}