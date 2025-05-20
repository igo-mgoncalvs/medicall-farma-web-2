'use client'
import CircularProgress from '@mui/material/CircularProgress';
import Lottie from "lottie-react";
import successAnimation from "@/public/animation/success.json";

import { Controller, useForm } from 'react-hook-form'
import styles from './styles.module.css'
import { useCallback, useEffect, useState } from 'react';
import checkIcon from '@/assets/check.svg'
import Image from 'next/image';
import api from '@/api/axios';
import BreakLine from '@/components/breakLine/breakLine';

interface IEmailForm {
  name: string
  email: string
  phone: string
  cnpj: string
  description: string
}

export default function Form () {
  const [check, setCheck] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)  
  const [sendForm, setSendForm] = useState<boolean>(false)  

  const { control, handleSubmit, setValue, reset } = useForm<IEmailForm>()

  useEffect(() => {
    if(sendForm) {
      setTimeout(() => {
        setSendForm(false)
      }, 10000)
    }
  }, [sendForm])

  const onSubmit = useCallback(async (data: IEmailForm) => {
    setLoading(true)
    api.post('/send-email', data)
      .then(() => {
        reset()
        setValue('cnpj', '')
        setValue('description', '')
        setValue('email', '')
        setValue('name', '')
        setValue('phone', '')
        setCheck(false)
      })
      .then(() => (
        setSendForm(true)
      ))
      .finally(() => {
        setLoading(false)
      })
  }, [reset, setValue, setCheck])

  return sendForm ? (
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
  ) :(
    <div className={styles.main}>
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
        id='email'
        className={styles.form_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='name'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é obrigatório'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <div className={styles.input_container}>
              <input
                placeholder='Nome'
                value={value}
                className={error?.message ? styles.error_input : styles.input}
                onChange={onChange}
              />
              {error?.message && (
                <p className={styles.error_message}>{error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name='email'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é obrigatório'
            }
          }}
          render={({field: { onChange, value}, fieldState: { error }}) => (
            <div className={styles.input_container}>
              <input
                placeholder='E-mail'
                value={value}
                className={error?.message ? styles.error_input : styles.input}
                onChange={onChange}
              />
              {error?.message && (
                <p className={styles.error_message}>{error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name='phone'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é obrigatório'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <div className={styles.input_container}>
              <input
                value={value}
                placeholder='Celular'
                className={error?.message ? styles.error_input : styles.input}
                onChange={onChange}
              />
              {error?.message && (
                <p className={styles.error_message}>{error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name='cnpj'
          control={control}
          rules={{
            required: {
              value: !check,
              message: 'Esse campo é obrigatório'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <div className={styles.input_container}>
              <input
                value={value}
                placeholder='CNPJ da Empresa'
                className={error?.message ? styles.error_input : styles.input}
                onChange={onChange}
              />
              {error?.message && (
                <p className={styles.error_message}>{error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name='description'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é obrigatório'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <div className={styles.input_container}>
              <input
                value={value}
                placeholder='Qual produto você deseja cotar?'
                className={error?.message ? styles.error_input : styles.input}
                onChange={onChange}
              />
              {error?.message && (
                <p className={styles.error_message}>{error?.message}</p>
              )}
            </div>
          )}
        />

        <div
          className={styles.checkbox_container}
          onClick={() => {
            setCheck(!check)
          }}
        >
          {check ? (
            <div className={styles.checkbox_checked}>
              <Image
                src={checkIcon}
                alt='check'
                width={10}
                height={10}
              />
            </div>
          ): (
            <div className={styles.checkbox} />
          )}
          <p>Não possuo CNPJ</p>
        </div>
      </form>

      <button
        form='email'
        className={styles.button}
        type='submit'
      >
        {loading ? (
          <CircularProgress
            color='inherit'
            size={16}
          />
        ): 'Solicitar Cotação'}
      </button>
    </div>
  )
}