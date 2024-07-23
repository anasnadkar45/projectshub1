import Image from "next/image";
import Navbar from "./components/LandingPage/Navbar";
import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { amaranth } from "./layout";
import ProjectCard from "./components/project/ProjectCard";
import prisma from "./lib/db";

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
      isFavorited: true,
      createdAt: true
    }
  })
  return data;
}

export default async function Home() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const projectData = await getProjects();
  return (
    <main className="min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center">
      <Navbar />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-[1380px] w-full mx-auto mb-10 z-10 px-3 md:px-0 space-y-5">
        <div className="mt-[150px] max-w-[800px] mx-auto space-y-7 text-center">
          <h1 className={cn(amaranth.className, "text-5xl md:text-7xl font-extrabold ")}>Showcase and Collaborate <span className="text-primary">on Innovative Projects.</span></h1>
          <p className="text-muted md:text-lg">Spotlight your latest innovations and collaborate with a vibrant community. Project Hub helps your side projects gain the attention and support they need to thrive.</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {
            projectData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          }
        </div>
      </div>
    </main>

  );
}
