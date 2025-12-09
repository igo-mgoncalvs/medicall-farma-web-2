'use client'

import Link from 'next/link'
import nextArrow from '@/assets/nextLinkArrow.svg'
import styles from './styles.module.css'
import Image from 'next/image'
import api from '@/api/axios'
import { useEffect, useState } from 'react'
import { IBlogs } from '@/app/blog/page'
import ImageLoading from '../imageLoading'

interface IProps {
  id: string
  image?: string
  title: string
  resume: string
  link?: string
  type?: 'blog' | 'medicall-cast'
  date: string
}

export default function BlogCard ({
  type = 'blog',
  id,
  image = '',
  link = '',
  resume,
  title,
  date
}: IProps) {
  const [getImage, setGetImage] = useState<IBlogs['image']>({
    src: '',
    alt: ''
  })

  useEffect(() => {
    if(image && type === 'blog') {
      api.get<IBlogs['image']>(`/blog-image/${image}`)
        .then(({ data }) => {
          setGetImage(data)
        })
    }
  }, [image, type])

  return (
    <div className={styles.container} data-type={type}>
      {type === 'blog' ? (
        <div className={styles.banner}>
          <ImageLoading
            src={getImage.src}
            alt={getImage.alt}
            loading={!getImage.src}
          />
        </div>
      ): (
        <iframe
          className={styles.iframe}
          src={link}
          title="YouTube video player"
        />
      )}

      <div
        className={styles.content}
      >
        <span data-type={type} className={styles.tag}>{type === 'blog' ? 'Blog' : 'Video'}</span>

        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.resume} data-type={type}>
          {resume}
        </p>

        {type === 'blog' && (
          <div className={styles.footer}>
            <Link
              href={`/blog/${id}`}
              className={styles.button}
            >
              <p>Ler mais</p>

              <Image
                src={nextArrow}
                alt='teste-alt'
                className={styles.icon}
              />
            </Link>

            <div className={styles.date}>{new Date(date).toLocaleDateString()}</div>
          </div>
        )}

      </div>
    </div>
  )
}