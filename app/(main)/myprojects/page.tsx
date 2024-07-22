import MyProjectCard from '@/app/components/project/MyProjectCard';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
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

