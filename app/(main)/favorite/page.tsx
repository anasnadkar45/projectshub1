import { AddButton } from '@/app/components/Common/AddButton';
import FavoriteProjectCard from '@/app/components/project/FavoriteProjectCard';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import React from 'react';

interface Project {
    id: string;
    name: string;
    creator: string;
    description: string;
    projectLink: string;
    githubLink: string;
    image: string;
    createdAt: Date;
}

interface Favorite {
    Project: Project;
}

async function getFavoriteProjects(userId: string): Promise<Favorite[]> {
    const data = await prisma.favorite.findMany({
        where: {
            userId: userId
        },
        select: {
            Project: {
                select: {
                    id: true,
                    name: true,
                    creator: true,
                    description: true,
                    projectLink: true,
                    githubLink: true,
                    image: true,
                    isFavorited: true,
                    createdAt: true,
                }
            }
        }
    });
    return data as [];
}

export default async function MyProjects() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;

    if (!userId) {
        // Handle the case where userId is not available
        return <div>No user data available.</div>;
    }

    const favoriteProjects = await getFavoriteProjects(userId);

    if (favoriteProjects.length === 0) {
        return (
            <div className='w-full bg-card text-center py-20 mt-5 space-y-2 border rounded-lg'>
                <h1 className='text-3xl font-extrabold'>You have no favorites yet!</h1>
                <p className='text-muted'>Start by adding some favorites to your dashboard!</p>
                <Link href={'/dashboard'}>
                    <AddButton className='mt-4'>Add Favorite</AddButton>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {favoriteProjects.map((favorite) => (
                    <FavoriteProjectCard key={favorite.Project.id} project={favorite.Project as any} />
                ))}
            </div>
        </div>
    );
}
