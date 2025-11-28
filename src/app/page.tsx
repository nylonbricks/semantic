import dayjs from 'dayjs';
import Link from 'next/link';

import { allPosts, allProjects, type Post, type Project } from '@contentlayer/generated';
import { PlusIcon } from '@semantic/components/icon';
import { ProjectList } from '@semantic/components/project/project-list';
import { PostGrid } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';

import { ProfileGrid } from './_components/profile-grid';

const getSortedPosts = (posts: Post[]) => {
  return posts
    .sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1))
    .slice(0, 2);
};

const getFeaturedProjects = (projects: Project[]) => {
  return projects
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
    })
    .slice(0, 2);
};

const HomePage = () => {
  const posts: Post[] = getSortedPosts(allPosts);
  const featuredProjects: Project[] = getFeaturedProjects(allProjects);

  return (
    <>
      <ProfileGrid />

      <section className="column pt-[4.375rem] gap-[1.875rem]" aria-labelledby="projects-heading">
        <div className="row-between">
          <h3 id="projects-heading" className="h3 text-[var(--color-gray-light)]">
            Projects
          </h3>
          <Link
            href={ROUTES.PROJECTS}
            className="center h4 h-8 px-3 text-[var(--color-gray-light)] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)] gap-[0.375rem]"
            aria-label="Expand to see more projects"
          >
            Expand
            <PlusIcon />
          </Link>
        </div>
        <ProjectList projects={featuredProjects} className="desktop:grid-cols-2" />
      </section>

      <section
        className="column pt-[4.375rem] pb-[4.0625rem] gap-[1.875rem]"
        aria-labelledby="updates-heading"
      >
        <div className="row-between">
          <h3 id="updates-heading" className="h3 text-[var(--color-gray-light)]">
            Update
          </h3>
          <Link
            href={ROUTES.POSTS}
            className="center h4 h-8 px-3 text-[var(--color-gray-light)] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)] gap-[0.375rem]"
            aria-label="Expand to see more posts"
          >
            Expand
            <PlusIcon />
          </Link>
        </div>
        <PostGrid posts={posts} />
      </section>
    </>
  );
};

export default HomePage;
