import { z } from 'zod'
export const projectSchema = z.object({
    name: z.string(),
    creator: z.string(),
    projectLink: z.string(),
    githubLink: z.string(),
    image: z.string(),
})

