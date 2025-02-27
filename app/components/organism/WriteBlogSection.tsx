import { TSidebarItem } from 'globals'
import React, { useState } from 'react'
import WriteSectionSidebar from '../molecules/WriteSectionSidebar'
import WriteSectionViewArea from '../molecules/WriteSectionViewArea'

const WriteBlogSection = () => {
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

    const sidebarItems: TSidebarItem[] = [
        {
            itemId: 1,
            item: "Your blogs"
        },
        {
            itemId: 2,
            item: "Your Ideas"
        },
        {
            itemId: 3,
            item: "Drafts"
        },
        {
            itemId: 4,
            item: "Write"
        },
    ]

  return (
    <section className={'w-full h-full flex'}>
        <WriteSectionSidebar sidebarItems = {sidebarItems} setSelectedItemId={setSelectedItemId}/>
        <WriteSectionViewArea selectedItemId={selectedItemId}/>
    </section>
  )
}

export default WriteBlogSection