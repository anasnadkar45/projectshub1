"use client"
import Link from 'next/link'
import React from 'react'
import { NavButton } from './NavButton'
import { usePathname } from 'next/navigation'
const navLinks = [
    {
        id: 1,
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        id: 2,
        title: 'My Projects',
        href: '/myprojects'
    },
    {
        id: 3,
        title: 'Favorite',
        href: '/favorite'
    },
]
const NavLinks = () => {
    const pathname = usePathname();
    return (
        <div className='flex gap-5'>
            {
                navLinks.map((link) => {
                    const isActive = pathname=== link.href
                    return (
                        <Link href={link.href} key={link.id} >
                            <NavButton className={isActive ? "text-primary" : "text-white"}>{link.title}</NavButton>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default NavLinks