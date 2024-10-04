"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";

import Link from "next/link";
import { useEffect, useState } from "react";



const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const minLoadingTime = 3000; // Set the minimum time for the loader (3 seconds)
    const startTime = Date.now(); // Record the start time
  
    const fetchProjects = async () => {
      try {
        // Fetching only the projects data from your API
        const projectsRes = await fetch("/api/projects").then(res => res.json());
  
        // Simulate loader finishing after the remaining time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(minLoadingTime - elapsedTime, 0);
  
        setTimeout(() => {
          // Set projects data after the minimum loading time has elapsed
          setProjects(projectsRes.projects || []);
  
         
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching projects data:", error);
       
      }
    };
  
    fetchProjects();
  }, []);
  

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {projects.slice(0, 4).map((project: any, id) => (
  <BlurFade
    key={project.title}
    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
  >
    <ProjectCard
      href={project.href}
      key={project.title}
      title={project.title}
      description={project.description}
      dates={project.dates}
      tags={project.technologies}
      image={project.image}
      gifUrl={project.gifUrl} // Pass gifUrl to ProjectCard
      links={project.links}
      youtubeLink={project.youtubeLink} // Pass YouTube link
      githubLink={project.githubLink}
    />
  </BlurFade>
))}

          </div>
        </div>
      </section>
    </section>
  );
}
