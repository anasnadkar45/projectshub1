"use client"
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
import { ExternalLink, Globe, Heart, Trash } from 'lucide-react'
import { AiFillGithub } from "react-icons/ai";

import Image from 'next/image';
import Link from 'next/link';
import { deleteProject, State } from "@/app/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import UpdateProject from "@/app/(main)/forms/UpdateProject";
import { AddButton } from "../Common/AddButton";
interface iProjectProps {
    project: {
        id: string
        name: string;
        creator: string;
        category: string;
        description: string;
        image: string;
        projectLink: string;
        githubLink: string;
    },
}

const MyProjectCard = ({ project }: iProjectProps) => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(deleteProject, initialState);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <div key={project.id} className='relative border-2 rounded-lg bg-card space-y-3 p-3 hover:cursor-pointer hover:border-primary/60 animate-in duration-300 '>
            <div className="flex gap-4">
                <form action={formAction}>
                    <input type="hidden" name="projectId" value={project.id} />
                    <AddButton type="submit" variant="outline"><Trash className='mr-2' /> Delete Project</AddButton>
                </form>
                <UpdateProject project={project}/>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="block relative h-[230px]">
                        <Image
                            alt="Project image"
                            src={project.image}
                            layout="fill"
                            className="object-cover w-full rounded-lg border"
                        />
                        {/* <p className="absolute z-0 right-2 top-2 border-2 border-primary rounded-lg pb-[2px] px-2 bg-primary/50 animate-pulse">Popular</p> */}
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[400px] rounded-lg sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="block relative h-[250px] sm:h-[300px] md:h-[480px] border rounded-lg">
                            <Image
                                alt="Project image"
                                src={project.image}
                                layout="fill"
                                className="object-cover w-full rounded-lg"
                            />
                            {/* <p className="absolute z-0 right-2 top-2 border-2 border-primary rounded-lg pb-[2px] px-2 bg-primary/50 animate-pulse">Popular</p> */}
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

            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{project.name}</h1>
                <div className='flex items-center gap-2'>
                    <Link href={project.projectLink} target="_blank">
                        <Badge className="flex items-center bg-white gap-2 px-2 py-1 text-[10px]">
                            <Globe size={20} />
                            <p className='mt-[3px]'>Website</p>
                        </Badge>
                    </Link>
                    <Link href={project.projectLink} target="_blank">
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

export default MyProjectCard;
