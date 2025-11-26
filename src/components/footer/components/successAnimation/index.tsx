import BreakLine from '@/components/breakLine/breakLine'
import styles from './styles.module.css'
import Lottie from 'lottie-react'
import successAnimation from "@/public/animation/success.json";

export default function SuccessAnimation () {
  return (
    <div
      className={styles.success_container}
    >
      <p
        className={styles.success_title}
      >
        {BreakLine('cotação enviada\ncom sucesso!')}
      </p>

      <div
        className={styles.success_animation_container}
      >
        <Lottie
          animationData={successAnimation}
        />
      </div>

      <p
        className={styles.success_description}
      >
        {BreakLine('Em breve nossa equipe comercial\nentrará em contato com você.')}
      </p>
    </div>
  )
}