"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { z } from 'zod'
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { ProjectCategoryTypes } from "@prisma/client";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};


// async function getUserRole(userId: string) {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: userId
//         },
//         select: {
//             role: true,
//         }
//     });

//     return user?.role;
// }

const projectSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a minimum character length of 3" }),
    creator: z
        .string()
        .min(3, { message: "The creatot name has to be a minimum character length of 3" }),
    category: z
        .string()
        .min(1, { message: "Category is required" }),
    description: z
        .string()
        .min(10, { message: "The description has to be a minimum character length of 10" }),
    projectLink: z
        .string()
        .min(1, { message: "Project link is required" }),
    githubLink: z
        .string()
        .min(1, { message: "Github link is required" }),
    image: z
        .string()
        .min(1, { message: "Image is required" }),
})

export async function createProject(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    const validateFields = projectSchema.safeParse({
        name: formData.get('name'),
        creator: formData.get('creator'),
        category: formData.get('category'),
        description: formData.get('description'),
        projectLink: formData.get('projectLink'),
        githubLink: formData.get('githubLink'),
        image: JSON.parse(formData.get("image") as string),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };

        console.log(state);
        return state;
    }

    const data = await prisma.project.create({
        data: {
            userId: user.id,
            name: validateFields.data.name,
            creator: validateFields.data.creator,
            category: validateFields.data.category as ProjectCategoryTypes,
            description: validateFields.data.description,
            image: validateFields.data.image,
            githubLink: validateFields.data.githubLink,
            projectLink: validateFields.data.projectLink,
        }
    })
    revalidatePath('/dashboard');
    const state: State = {
        status: "success",
        message: "Your project has been added successfully",
    };
    if (data) {
        return {
            status: "success",
            message: "Your Project has been Added successfully",
        };

    }

    return state;
    // console.log(state);
    // redirect('/dashboard')
}

export async function deleteProject(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "Need to login to delete your project",
        };
    }

    const userId = user.id;
    const projectId = formData.get('projectId') as string;

    try {
        const data = await prisma.project.delete({
            where: {
                id: projectId,
                userId: userId
            }
        })

        revalidatePath('/myprojects');
        const state: State = {
            status: "success",
            message: "Project has been deleted successfully",
        };
        return state;
    } catch (err) {
        console.error("Error while favoriting:", err);
        return {
            status: "error",
            message: "An error occurred while deleting the project. Please try again later.",
        };
    }
}

export async function addToFavorites(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "Need to login to add project to favorites",
        };
    }

    const userId = user.id;
    const projectId = formData.get('projectId') as string;
    // const isFavorited = formData.get('isFavorited') as unknown as boolean;


    try {
        // Check if this project is already favorited by the user
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId: userId,
                projectId: projectId,
            },
        });

        if (existingFavorite) {
            return {
                status: "error",
                message: "Project is already in favorites.",
            };
        }

        // Create a new favorite entry
        await prisma.favorite.create({
            data: {
                userId: userId,
                projectId: projectId,
            },
        });

        // await prisma.project.update({
        //     where: {
        //         userId: userId,
        //         id: projectId
        //     },
        //     data: {
        //         isFavorited: !isFavorited
        //     }
        // })


        revalidatePath('/favorite');
        const state: State = {
            status: "success",
            message: "Project has been favorited successfully",
        };
        return state;
    } catch (err) {
        console.error("Error while favoriting:", err);
        return {
            status: "error",
            message: "An error occurred while favoriting the project. Please try again later.",
        };
    }
}



export async function removeFromFavorites(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    const userId = user.id;
    const projectId = formData.get('projectId') as string;
    // const isFavorited = formData.get('isFavorited') as string;

    try {
        // Check if the favorite exists
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId: userId,
                projectId: projectId,
            },
        });

        if (!existingFavorite) {
            return {
                status: "error",
                message: "Favorite not found.",
            };
        }

        // Delete the favorite entry
        await prisma.favorite.delete({
            where: {
                id: existingFavorite.id,
            },
        });

        // await prisma.project.update({
        //     where: {
        //         userId: userId,
        //         id: projectId
        //     },
        //     data: {
        //         isFavorited: !isFavorited
        //     }
        // })


        revalidatePath('/favorite');
        const state: State = {
            status: "success",
            message: "Project has been removed from favorites successfully",
        };
        return state;
    } catch (err) {
        console.error("Error while removing favorite:", err);
        return {
            status: "error",
            message: "An error occurred while removing the project from favorites. Please try again later.",
        };
    }
}
