"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { AiFillGithub } from "react-icons/ai";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { addToFavorites, State } from "@/app/actions"
import { useFormState } from "react-dom"
import { toast } from "sonner"

interface iProjectProps {
    project: {
        id: string
        name: string;
        creator: string;
        description: string;
        image: string;
        projectLink: string;
        githubLink: string;
        isFavorited: boolean;
    },
}

const ProjectCard = ({ project }: iProjectProps) => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(addToFavorites, initialState);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div key={project.id} className='relative border-2 rounded-lg bg-card space-y-2 p-3 hover:cursor-pointer hover:border-primary/60 animate-in duration-300 '>
            <form action={formAction}>
                <input type="hidden" name="projectId" value={project.id} />
                {/* <input type="hidden" name="isFavorited" value={project.isFavorited as any} /> */}
                {!project.isFavorited ? (
                    <button type="submit" className='absolute top-7 right-5 z-10'>
                        <IoBookmarkOutline size={25} />
                    </button>
                ) : (
                    <button type="submit" className='absolute top-7 right-5 z-10'>
                        <IoBookmark size={25} />
                    </button>
                )}
            </form>

            <Dialog>
                <DialogTrigger asChild>
                    <div className="block relative h-[230px]">
                        <Image
                            alt="Project image"
                            src={project.image}
                            layout="fill"
                            className="object-cover w-full rounded-lg border"
                        />
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[400px] rounded-lg sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="block relative h-[230px] border rounded-lg">
                            <Image
                                alt="Project image"
                                src={project.image}
                                layout="fill"
                                className="object-cover w-full rounded-lg"
                            />
                        </div>
                        <p className="text-muted">
                            {project.description}
                        </p>
                    </div>
                    <DialogFooter>
                        <div className='flex items-center gap-2'>
                            <Link href={project.projectLink} target="_blank">
                                <Badge className="flex items-center bg-white gap-2 px-2 py-1 text-[10px]">
                                    <Globe size={20} />
                                    <p className='mt-[3px]'>Website</p>
                                </Badge>
                            </Link>
                            <Link href={project.githubLink} target="_blank">
                                <Badge className="flex items-center bg-white gap-2 px-2 py-1 text-[10px]">
                                    <AiFillGithub size={20} />
                                    <p className='mt-[3px]'>Source</p>
                                </Badge>
                            </Link>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className='flex flex-wrap gap-2 justify-between items-center'>
                <h1 className='text-2xl font-bold'>{project.name}</h1>
                <div className='flex items-center gap-2'>
                    <Link href={project.projectLink} target="_blank">
                        <Badge className="flex items-center bg-white gap-2 px-2 py-1 text-[10px]">
                            <Globe size={20} />
                            <p className='mt-[3px]'>Website</p>
                        </Badge>
                    </Link>
                    <Link href={project.githubLink} target="_blank">
                        <Badge className="flex items-center bg-white gap-2 px-2 py-1 text-[10px]">
                            <AiFillGithub size={20} />
                            <p className='mt-[3px]'>Source</p>
                        </Badge>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;
