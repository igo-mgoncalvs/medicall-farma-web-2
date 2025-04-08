import styles from './styles.module.css'

export default function Form () {
  return (
    <div>
      <div
        className={styles.title_container}
      >
        <p
          className={styles.title1}
        >
          Faça já sua cotação
        </p>
        <p
          className={styles.title2}
        >
          Faça já sua cotação
        </p>
      </div>

      <form
        className={styles.form_container}
      >
        <input
          placeholder='Nome'
        />
        <input
          placeholder='E-mail'
        />
        <input
          placeholder='Celular'
        />
        <input
          placeholder='CNPJ da Empresa'
        />
        <input
          placeholder='Qual produto você deseja cotar?'
        />

        <div
          className={styles.checkbox_container}
        >
          <div className={styles.checkbox} />
          <p>Não possuo CNPJ</p>
        </div>
      </form>

      <button
        className={styles.button}
      >
        Solicitar Cotação
      </button>
    </div>
  )
}