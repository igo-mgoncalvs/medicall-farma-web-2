'use client'
import styles from './notfound.module.css'
import Lottie from 'lottie-react'
import notFoundAnimation from "@/public/animation/notFoundAnimation.json";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound () {
  const rote = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      rote.back()
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      className={styles.main}
    >
      <Lottie
        animationData={notFoundAnimation}
        className={styles.animation}
      />

      <div
        className={styles.text_container}
      >
        <p className={styles.title}>Ops! Página não encontrada</p>
        <p className={styles.description}>
          Aguarde enquanto o redirecionamos para a página anterior.
        </p>
      </div>
    </div>
  )
}