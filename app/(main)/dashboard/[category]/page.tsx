import React from 'react'
import CreateProject from '../../forms/CreateProject'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/app/lib/db'
import ProjectCard from '@/app/components/project/ProjectCard'
import { ProjectCategoryTypes } from '@prisma/client'
import { categoryItems } from '@/app/lib/CategoryTypes'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectCategoryLinks } from '@/app/components/project/ProjectCategoryLinks'
import { unstable_noStore } from 'next/cache'

async function getProjects(category:string) {
  const whereClause = category === "all" ? {} : { category: category as ProjectCategoryTypes };
  const data = await prisma.project.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      creator: true,
      description: true,
      projectLink: true,
      githubLink: true,
      image: true,
      isFavorited: true,
      createdAt: true
    }
  })
  return data;
}


export default async function Dashboard({
  params,
}: {
  params: { category: string };
}) {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const projectData = await getProjects(params.category);

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div className='flex gap-4'>
          {/* Add Project */}
          <CreateProject />
        </div>
      </div>
      <div className="flex justify-center mt-2 mx-auto">
        <ProjectCategoryLinks />
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

