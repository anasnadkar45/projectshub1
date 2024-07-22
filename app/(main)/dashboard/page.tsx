import React, { useState } from 'react'
import CreateProject from '../forms/CreateProject'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddButton } from '@/app/components/Common/AddButton'
import { ExternalLink, Heart, Sparkle } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/app/lib/db'
import Image from 'next/image'
import ProjectCard from '@/app/components/project/ProjectCard'
import CommitGraph from '@/components/animata/graphs/commit-graph'

async function getProjects() {
  const data = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      creator: true,
      description: true,
      projectLink: true,
      githubLink: true,
      image: true,
      isFavorited:true,
      createdAt: true
    }
  })
  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const projectData = await getProjects();

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div className='flex gap-4'>
          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AddButton variant="outline"><Sparkle className='mr-2' /> Recently Added</AddButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Add Project */}
          <CreateProject />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {
          projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        }
      </div>
    </div>
  )
}

