'use client'

import api from "@/api/axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IBlogs } from "../page";
import RelatedBlogs from "@/components/relatedBlogs/page";
import styles from './styles.module.css'

export default function BlogDetails () {
  const [blog, setBlog] = useState<IBlogs>()

  const pathname = usePathname();

  const params = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    return {
      id: segments[1] || '',
    };
  }, [pathname]);

  useEffect(() => {
    if(params.id) {
      api.get<IBlogs>(`/blogs/${params.id}`)
        .then(({ data }) => {
          setBlog(data)
        })
    }
  }, [params])

  return blog && (
    <div className={styles.main}>
      <div className={styles.post_container}>
        <Image
          src={blog?.image.src}
          alt={blog?.image.alt}
          width={100}
          height={100}
          className={styles.post_image}
        />

        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className={styles.html_content}
        />
      </div>

      <div className={styles.left_container}>
        {!!blog.relatedBlogs.length && (
          <div className={styles.related_blogs_container}>
            <h3 className={styles.related_blogs_title}>Blogs Relacionados:</h3>

            {blog.relatedBlogs.map((item) => (
              <RelatedBlogs 
                key={item.related.id}
                alt={item.related.image.alt}
                src={item.related.image.src}
                date={item.related.date}
                id={item.related.id}
                title={item.related.title}
              />
            ))}
          </div>
        )}

        {!!blog.similarProducts.length && (
          <div className={styles.similar_products_container}>
            <h3 className={styles.similar_products_title}>Produtos Semelhantes</h3>

            <div className={styles.similar_products_content}>
              <iframe
                src={blog.similarProducts[0].productLink }
                title="YouTube video player"
                className={styles.iframe}
              />

              <p className={styles.product_title}>{blog.similarProducts[0].title}</p>
              <p className={styles.product_resume}>{blog.similarProducts[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}