import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/Logo.svg'
import { ModeToggle } from '../Common/ToggleMode'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Menu, MessageSquareText, Send } from 'lucide-react'
import Link from 'next/link'
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { UserNav } from '../Common/UserNav'
import NavLinks from './NavLinks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NavButton } from './NavButton'

export const navLinks = [
  {
    id: 1,
    title: 'Dashboard',
    href: '/dashboard/all'
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

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className='bg-[#1d1d1d] backdrop-filter backdrop-blur-md bg-opacity-40 fixed top-0 right-0 left-0 z-20'>
      <div className='w-full flex justify-between items-center py-3 px-3 md:px-3 max-w-[1380px] mx-auto'>
        <div className='flex gap-10 justify-center items-center'>
          <Link href={'/'} className='flex gap-3 justify-center items-center'>
            <Image src={Logo} alt='ProjectsHub Logo' width={40} height={40} />
            <h1 className='font-extrabold text-2xl'><span className='text-primary'>Projects</span>Hub</h1>
          </Link>
          <div className='md:flex hidden'>
            <NavLinks />
          </div>
        </div>

        <div className='md:flex gap-3 hidden justify-center items-center'>
          {/* <ModeToggle /> */}
          <Button variant={'outline'} size={'sm'} className='flex items-center gap-2'>
            <MessageSquareText />
            <span>Feedback</span>
          </Button>
          {/* <Button variant={'outline'} size={'sm'} className='flex items-center gap-2'>
            <Send />
            <span>Submit</span>
          </Button> */}
          {!user ? (
            <Button size={"sm"} asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
          ) : (
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          )}



        </div>

        <div className='md:hidden flex'>
          <Dialog >
            <DialogTrigger>
              <EllipsisVertical />
            </DialogTrigger>
            <DialogContent className='top-32 rounded-lg'>
              <div className='flex flex-col gap-4'>
                {navLinks.map((navLink) => (
                  <Link href={navLink.href} key={navLink.id} >
                    <NavButton className='text-2xl text-muted'>{navLink.title}</NavButton>
                  </Link>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

  )
}

export default Navbar