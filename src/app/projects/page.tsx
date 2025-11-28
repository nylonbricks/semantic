import dayjs from 'dayjs';
import { type Metadata } from 'next';

import { allProjects } from '@contentlayer/generated';
import { ProjectSection } from '@semantic/components/project/project-section';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

const ProjectsPage = () => {
  const sortedProjects = allProjects.sort((a, b) => {
    // 1. If both have order, sort by order (ascending)
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }

    // 2. If only one has order, that one comes first
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;

    // 3. If neither has order, sort by createdAt (descending)
    return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
  });

  return (
    <>
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">
        Projects ({allProjects.length})
      </h1>
      <ProjectSection projects={sortedProjects} />
    </>
  );
};

export default ProjectsPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({
    title: 'Projects',
    path: ROUTES.PROJECTS,
  });
};
