import { TSidebarItem } from 'globals'
import React from 'react'

type TSidebarProps = {
    sidebarItems: TSidebarItem[]
    setSelectedItemId: React.Dispatch<React.SetStateAction<number | null>>
}

const WriteSectionSidebar = ({sidebarItems, setSelectedItemId}: TSidebarProps) => {
  return (
    <div className={'w-1/5 h-[250px] border border-dark_pink rounded-lg'}>
        {sidebarItems?.map(item => (
            <button className={'h-[60px] w-full flex items-center justify-start px-2 underline hover:text-dark_pink'} key={item?.itemId} onClick={() => setSelectedItemId(item?.itemId)}>{item?.item}</button>
        ))}
    </div>
  )
}

export default WriteSectionSidebar