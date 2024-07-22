import { AddButton } from '@/app/components/Common/AddButton';
import MyProjectCard from '@/app/components/project/MyProjectCard';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import React from 'react'
async function getProjects(userId: string) {
    const data = await prisma.project.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            name: true,
            creator: true,
            description: true,
            projectLink: true,
            githubLink: true,
            image: true,
            createdAt: true,
        }
    })
    return data;
}
export default async function MyProjects() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const projectData = await getProjects(userId);
    console.log(projectData);

    if (!userId) {
        // Handle the case where userId is not available
        return <div>No user data available.</div>;
    }
    if (projectData.length === 0) {
        return (
            <div className='w-full bg-card text-center py-20 mt-5 space-y-2 border rounded-lg'>
                <h1 className='text-3xl font-extrabold'>You have no Project created yet!</h1>
                <p className='text-muted'>Start by adding some projects to your dashboard!</p>
                <Link href={'/dashboard/all'}>
                    <AddButton className='mt-4'>Dashboard</AddButton>
                </Link>
            </div>
        )
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {
                    projectData.map((project) => (
                        <MyProjectCard key={project.id} project={project} />
                    ))
                }
            </div>
        </div>
    )
}

