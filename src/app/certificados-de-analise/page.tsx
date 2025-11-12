'use client'

import Product, { IProduct } from '@/components/product/product'

import styles from './styles.module.css'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { dbPromise } from '@/utils/dbPromise';
import Image from 'next/image';
import searchIcon from '@/assets/search.svg'
import groupsMenu from '@/assets/groupsMenu.svg'
import LateralMenuGroups from '@/components/lateralMenuGroups';
import MobileMenuGroups from '@/components/mobileMenuGroups';

export interface ICategories {
  id: string
  categoryName: string
  categoryLink: string
  products: IProduct[]
}

export interface IGroup {
  id: string
  groupName: string
  groupLink: string
  isTop: boolean
  categories: ICategories[]
}

export default function CertificatesGroupName () {
  const [products, setProducts] = useState<IGroup[] | undefined>()
  const [groups, setGroups] = useState<IGroup[] | undefined>()
  const [productsList, setProductsList] = useState<IProduct[] | undefined>()
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    return {
      groupName: segments[1] || '',
      category: segments[2] || '',
      product: segments[3] || '',
    };
  }, [pathname]);

  useEffect(() => {
    const loadData = async () => {
      const db = await dbPromise();
      if (!db) return;

      const interval = setInterval(async () => {
        const products = await db.get('products', 'products');
        const listGroups = await db.get('listGroups', 'listGroups');
        
        if (products) {
          setProducts(products)
          window.scrollTo({
            top: 0
          })
          clearInterval(interval)
        }

        if(listGroups) {
          setGroups(listGroups)
          setSelectedGroup(searchParams.get('grupo') || listGroups.groupName)
        }
      }, 500)
  
      return () => clearInterval(interval)
    }
    
    loadData()
  }, [])
  
  useEffect(() => {
    const dataGroup = products?.find((group) => group.groupName === selectedGroup)
    const dataCategory = dataGroup?.categories.map((category) => category.products).flat() || []
    
    setProductsList(dataCategory.filter((item) => item.certificateLink))

    const groupParam = searchParams.get('grupo') 

    if(groupParam) {
      setSelectedGroup(groupParam)
    }
  }, [selectedGroup, products, searchParams])

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const regex = new RegExp(search, 'i')

    if(!products) return

    const list: IProduct[] = [] 

    products.forEach((group) => {
      group.categories.forEach((category) => {
        category.products.forEach((product) => {
          if(regex.test(product.name)) {
            list.push(product)
          }
        })
      })
    })

    setProductsList(list)
  }, [products, search])

  return groups && (
    <div
      className={styles.main}
    >
      <MobileMenuGroups
        open={openMenu}
        handleOpenMenuMobile={() => setOpenMenu(!openMenu)}
      />

      <form
        className={styles.searchBar_container}
        onSubmit={handleSearch}
      >
        <input 
          placeholder="Digite aqui qual certificado está procurando..."
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBar_input}
        />

        <button
          className={styles.searchBar_button}
          type='submit'
        >
          <Image
            src={searchIcon}
            alt='teste-alt'
          />
        </button>
      </form>

      <div className={styles.main_container}>
        <div className={styles.groups_container}>
          <div className={styles.groupName_title_container}>
            <div className={styles.groupName_title_content}>
              <Image
                src={groupsMenu}
                alt='teste-alt'
                className={styles.groupName_menu_icon}
                onClick={() => setOpenMenu(true)}
              />

              <p className={styles.groupName_title}>
                Certificados
                <span className={styles.line_mobile} />
              </p>
              <p className={styles.groupName_title_label}>de análise</p>
            </div>
            <span className={styles.line} />
          </div>
          <p className={styles.groupName_label_name}>{selectedGroup}</p>
          <p className={styles.groupName_label}>Filtrar por linha</p>

          <div className={styles.groups_menu}>
            <LateralMenuGroups
              groups={groups}
              selectedGroup={selectedGroup}
            />
          </div>
        </div>

        <div className={styles.product_main}>
          <p className={styles.products_title}>Exibindo resultados</p>

          <div
            className={styles.products_container}
          >
            {productsList?.map((item) => (
              <div
                key={item.id}
                className={styles.product}
              >
                <Product
                  product={item}
                  type='certificate'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className={styles.divisorLine}></span>
    </div>
  )
}