import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseHero from "@/components/project/CaseHero";
import CaseBrief from "@/components/project/CaseBrief";
import CaseArchitecture from "@/components/project/CaseArchitecture";
import CaseFeatures from "@/components/project/CaseFeatures";
import CaseCapabilities from "@/components/project/CaseCapabilities";
import CaseNextProject from "@/components/project/CaseNextProject";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Dharani V`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  const caseNum = String(index + 1).padStart(2, "0");
  const nextNum = String(((index + 1) % projects.length) + 1).padStart(2, "0");
  const totalCases = String(projects.length).padStart(2, "0");

  return (
    <main>
      <CaseHero
        project={project}
        caseNum={caseNum}
        totalCases={totalCases}
      />
      <CaseBrief project={project} />
      <CaseArchitecture project={project} />
      <CaseFeatures project={project} />
      <CaseCapabilities project={project} />
      <CaseNextProject nextProject={nextProject} nextIndex={nextNum} />
    </main>
  );
}
