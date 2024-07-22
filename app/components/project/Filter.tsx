"use client"
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddButton } from '@/app/components/Common/AddButton'
import { Sparkle } from 'lucide-react'
type Checked = DropdownMenuCheckboxItemProps["checked"]

const Filter = () => {
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)
    return (
        <div><DropdownMenu>
            <DropdownMenuTrigger>
                <AddButton variant="outline"><Sparkle className='mr-2' /> Recently Added</AddButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-card mt-2">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                >
                    Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Panel
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu></div>
    )
}

export default Filter