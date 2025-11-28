'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Project } from '@contentlayer/generated';
import { ChevronDownIcon } from '@semantic/components/icon';

import { ProjectList } from './project-list';

type ProjectSectionProps = {
  projects: Project[];
};

type SortOption = 'recommended' | 'newest' | 'alphabetical';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: '추천순', value: 'recommended' },
  { label: '최신순', value: 'newest' },
  { label: '가나다순', value: 'alphabetical' },
];

export const ProjectSection = ({ projects }: ProjectSectionProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects = projects
    .filter((p) => {
      const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'recommended') {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
      }
      if (sortOption === 'newest') {
        return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
      }
      if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-2 pl-4 pr-10 text-sm text-[var(--color-gray-bold)] outline-none focus:border-[var(--color-gray-mid)]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-mid)]">
                <ChevronDownIcon size={16} />
              </div>
            </div>

            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm text-[var(--color-gray-bold)] placeholder-[var(--color-gray-light)] outline-none focus:border-[var(--color-gray-mid)] sm:w-64"
            />
          </div>
        </div>
      </div>

      <ProjectList projects={filteredProjects} />
    </div>
  );
};
