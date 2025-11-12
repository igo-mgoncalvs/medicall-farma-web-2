import styles from './styles.module.css'
import { IGroup } from '@/app/certificados-de-analise/page';
import Link from 'next/link';

interface IProps {
  groups: IGroup[],
  selectedGroup: string
  isMenu?: boolean
  onCloseMenu?: () => void
}

export default function LateralMenuGroups ({
  selectedGroup,
  groups,
  isMenu = false,
  onCloseMenu = () => null
}: IProps) {

  return (
    <div
      className={styles.categories_container}
    >
      {groups.map((item) => (
        <Link
          key={item.id}
          className={`${selectedGroup === item.groupName ? styles.categorySelected : styles.category}`}
          href={isMenu ? `/certificados-de-analise?grupo=${item.groupName}` : `?grupo=${item.groupName}`}
          onClick={onCloseMenu}
        >
          {item.groupName}
        </Link>
      ))}
    </div>
  )
}