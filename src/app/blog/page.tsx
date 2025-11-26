'use client'

import MainBlogPost from "@/components/mainBlogPost";

import styles from './styles.module.css'
import BlogCard from "@/components/blogCard";
import Image from "next/image";
import menuIcon from '@/assets/groupsMenu.svg'
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';


export interface IBlogs {
  id: string
  title: string
  content: string
  resume: string
  date: string
  imageId: string
  image: {
    src: string
    alt: string
  }
  hasReference?: boolean
  relatedBlogs: {
    id?: string,
    blogId?: string
    blogRelatedId?: string
    title: string
    related: IBlogs
  }[]
  relatedTo: {
    id: string
    title: string
    blogId: string
    blogRelatedId: string
  }[]
  similarProducts: {
    id?: string
    productLink: string
    title: string
    description: string
  }[]
} 

export interface IMedicallCast {
  id: string
  title: string
  description: string
  link: string
  date: string
}

export default function Blog () {
  const [blogs, setBlogs] = useState<IBlogs[]>([])
  const [blogsEmphasis, setBlogsEmphasis] = useState<IBlogs[]>([])
  const [medicallCast, setMedicallCast] = useState<IMedicallCast[]>([])

  useEffect(() => {
    api.get<IBlogs[]>('/blog-emphasis')
      .then(({ data }) => {
        setBlogsEmphasis(data)
      })

    api.get<IBlogs[]>('/latest-blogs')
      .then(({ data }) => {
        setBlogs(data)
      })

    api.get<IMedicallCast[]>('/medicall-cast')
      .then(({ data }) => {
        setMedicallCast(data)
      })
  }, [])

  return (
    <div
      className={styles.main}
    >
      <p className={styles.title}>
        Blogs em <b>Destaque</b>
      </p>

      <div
        className={styles.emphasis}
      >
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            }
          }}
          modules={[Autoplay, Pagination]}
          pagination={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
        >
          {blogsEmphasis.map((item) => (
            <SwiperSlide
              key={item.id}
              className={styles.emphasis_post_card}
            >
              <MainBlogPost
                id={item.id}
                image={item.image.src}
                resume={item.resume}
                title={item.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div className={styles.medicall_cast_container}>
        <div className={styles.medicall_cast_title_container}>
          <p>Últimos episódios</p>
          <p className={styles.medicall_cast_subtitle}>Medicall Cast</p>
        </div>

        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Pagination]}
          pagination={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {medicallCast.map((item, key) => (
            <SwiperSlide
              key={item.id}
              className={styles.medicall_cast_card}
              data-last={medicallCast.length - 1 === key}
            >
              <BlogCard
                type="medicall-cast"
                id={item.id}
                link={item.link}
                resume={item.description}
                title={item.title}
                date={item.date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.blogs_container}>
        <div className={styles.blog_title_container}>
          <Image
            src={menuIcon}
            alt="menu"
            className={styles.menu_icon}
          />
          <p>Últimos Blogs</p>
        </div>

        <div className={styles.lastest_blogs}>
          {blogs.map((item) => (
            <BlogCard
              key={item.id}
              date={item.date}
              id={item.id}
              resume={item.resume}
              title={item.title}
              image={item.imageId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}