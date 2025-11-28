import React from 'react';

import { Project } from '@contentlayer/generated';
import { ProjectList } from '@semantic/components/project/project-list';

type RecommendProps = {
  projects: Project[];
};

export const Recommend = ({ projects }: RecommendProps) => {
  return (
    <section aria-labelledby="recommendation-heading">
      <h3
        id="recommendation-heading"
        className="text-[var(--color-gray-accent)] font-mono text-lg font-medium"
      >
        🦾 프로젝트 살펴보기
      </h3>
      <ProjectList className="mt-[2.25rem] mb-[3.5rem]" projects={projects} />
    </section>
  );
};
