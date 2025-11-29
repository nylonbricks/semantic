import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Project } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';

type ProjectCardProps = ComponentProps<'li'> & {
  project: Project;
};

export const ProjectCard = ({ project, className, ...props }: ProjectCardProps) => {
  const { title, description, coverImage, coverImageBlur, tags, slug } = project;

  return (
    <li className={twMerge('group flex flex-col gap-4', className)} {...props}>
      <Link
        href={`${ROUTES.PROJECTS}/${slug}`}
        className="block overflow-hidden rounded-[0.875rem] border border-[var(--color-border)]"
      >
        <div className="relative aspect-[1.8/1] w-full overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            {...(coverImageBlur.blur
              ? { placeholder: 'blur', blurDataURL: coverImageBlur.blur }
              : {})}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] px-2 py-1 text-xs font-medium text-[var(--color-gray-mid)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`${ROUTES.PROJECTS}/${slug}`}>
          <h3 className="text-lg font-bold text-[var(--color-gray-title)] transition-colors group-hover:text-[var(--color-primary)]">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-[var(--color-gray-text)]">{description}</p>
        {project.awards && (
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-[var(--color-background05)] px-3 py-1">
            <span className="text-base">🏆</span>
            <span className="text-sm font-medium text-[var(--color-gray-bold)]">
              {project.awards}
            </span>
          </div>
        )}
        <div className="text-sm text-[var(--color-gray-mid)]">
          {dayjs(project.createdAt).format('YYYY. MM')} -{' '}
          {project.projectDue ? dayjs(project.projectDue).format('YYYY. MM') : 'YYYY. MM'}
        </div>
      </div>
    </li>
  );
};
