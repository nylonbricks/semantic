'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Project } from '@contentlayer/generated';

import { ProjectList } from './project-list';

type ProjectSectionProps = {
  projects: Project[];
};

export const ProjectSection = ({ projects }: ProjectSectionProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects = projects.filter((p) => {
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={twMerge(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedTag === tag
                  ? 'bg-[var(--color-tag-selected-bg)] text-[var(--color-tag-selected-text)]'
                  : 'bg-[var(--color-background05)] text-[var(--color-gray-mid)] hover:bg-[var(--color-gray-hover)]',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm text-[var(--color-gray-bold)] placeholder-[var(--color-gray-light)] outline-none focus:border-[var(--color-gray-mid)] sm:w-64"
        />
      </div>

      <ProjectList projects={filteredProjects} />
    </div>
  );
};
