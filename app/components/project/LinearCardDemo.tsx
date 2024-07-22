// ProjectCardDemo.tsx
'use client';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleX, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import ProjectCard from '@/app/components/project/ProjectCard';

interface ProjectProps {
  id: string;
  name: string;
  creator: string;
  image: string;
  projectLink: string;
  githubLink: string;
}

interface ProjectCardDemoProps {
  projects: ProjectProps[];
}

export default function ProjectCardDemo({ projects }: ProjectCardDemoProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

  return (
    <>
      <main className='size-full overflow-y-auto p-6 md:p-12'>
        <ul className='flex size-full flex-wrap items-center justify-center gap-4'>
          {projects.map((project) => (
            <Card
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </ul>
      </main>
      <Modal project={selectedProject} onClick={() => setSelectedProject(null)} />
      <TailwindCDNWorkaround />
    </>
  );
}

function Card(props: { project: ProjectProps; onClick: () => void }) {
  return (
    <motion.li
      key={props.project.id}
      className='flex aspect-[336/360] h-[360px] cursor-pointer flex-col justify-end text-balance rounded-[30px] border bg-[#080A0A] px-7 py-8 text-[21px] text-white hover:brightness-125'
      layoutId={`projectContainer${props.project.id}`}
      onClick={props.onClick}
    >
      <motion.img
        src={props.project.image}
        alt='Project image'
        layoutId={`projectImage${props.project.id}`}
        className='object-cover w-full rounded-lg border'
      />
      <div className='flex items-center justify-between mt-2'>
        <motion.p className='text-balance' layoutId={`projectHeading${props.project.id}`}>
          {props.project.name}
        </motion.p>
        <Button>
          <PlusIcon className='size-4' />
        </Button>
      </div>
      <motion.span layoutId={`projectDescription${props.project.id}`} />
    </motion.li>
  );
}

function Modal(props: { project: ProjectProps | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.project && (
          <motion.div
            className='fixed inset-0 z-10 flex items-center justify-center'
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(32px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!props.project && (
          <motion.div className='fixed inset-0 z-10 flex flex-col justify-end' onClick={props.onClick}>
            <motion.div
              style={{ scrollbarColor: 'revert', scrollbarWidth: 'none' }}
              className='relative mx-auto h-[96vh] max-w-[960px] overflow-y-auto mt-16 mb-5 rounded-[30px] border bg-[#090A0B] p-4'
              layoutId={`projectContainer${props.project.id}`}
            >
              <motion.img
                src={props.project.image}
                alt='Project image'
                className='-mt-8'
                layoutId={`projectImage${props.project.id}`}
              />
              <div className='mx-auto -mt-20 max-w-xl md:-mt-60'>
                <motion.p
                  className='text-balance text-[56px] font-medium leading-[60px] text-white'
                  layoutId={`projectHeading${props.project.id}`}
                >
                  {props.project.name}
                </motion.p>
                <motion.p
                  className='mt-8 text-[15px] font-medium text-[#969799]'
                  layoutId={`projectDescription${props.project.id}`}
                >
                  Creator: {props.project.creator}
                  <br />
                  <a href={props.project.projectLink} target='_blank' rel='noopener noreferrer'>
                    Project Link
                  </a>
                  <br />
                  <a href={props.project.githubLink} target='_blank' rel='noopener noreferrer'>
                    GitHub Link
                  </a>
                </motion.p>
              </div>
              <Button className='absolute right-8 top-8' onClick={props.onClick}>
                <CircleX className='size-5' />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/*
NOTE: Only required to work with Tailwind CDN.
Include all conditionally rendered classes in a hidden div
to ensure Tailwind generates these classes in advance.
*/
function TailwindCDNWorkaround() {
  return (
    <div className='fixed absolute relative inset-0 right-8 top-8 z-10 mx-auto mx-auto -mt-20 -mt-8 mt-8 flex flex hidden size-5 h-[96vh] max-w-[960px] max-w-xl flex-col items-center justify-end justify-center overflow-y-auto text-balance rounded-t-[30px] bg-[#090A0B] p-8 text-[15px] text-[56px] font-medium font-medium leading-[60px] text-[#969799] text-white md:-mt-60' />
  );
}
