import dayjs from 'dayjs';
import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { type Project, allProjects } from '@contentlayer/generated';
import { Divider, MdxComponent } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

import { BackButton } from './_components/back-button';
import { Footer } from './_components/footer';
import { Recommend } from './_components/recommend';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BackButton />

      <article className="mt-4">
        <div className="mb-8">
          <div className="relative mb-6 aspect-[1.8/1] tablet:aspect-[3/1] w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              {...(project.coverImageBlur.blur
                ? { placeholder: 'blur', blurDataURL: project.coverImageBlur.blur }
                : {})}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold">{project.title}</h1>
          <div className="mt-4 flex items-start gap-4">
            <span className="shrink-0 py-1 text-sm font-bold text-[var(--color-gray-title)]">
              수행기간
            </span>
            <div className="py-1 text-sm font-medium text-[var(--color-gray-mid)]">
              {dayjs(project.createdAt).format('YYYY. MM')} -{' '}
              {project.projectDue ? dayjs(project.projectDue).format('YYYY. MM') : 'YYYY. MM'}
            </div>
          </div>
          <div className="mt-4 flex items-start gap-4">
            <span className="shrink-0 py-1 text-sm font-bold text-[var(--color-gray-title)]">
              프로젝트 분류
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-medium text-[var(--color-gray-mid)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {project.capabilities && (
            <div className="mt-4 flex items-start gap-4">
              <span className="shrink-0 py-1 text-sm font-bold text-[var(--color-gray-title)]">
                역량
              </span>
              <div className="flex flex-wrap gap-2">
                {project.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-medium text-[var(--color-gray-mid)]"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.awards && (
            <div className="mt-4 flex items-start gap-4">
              <span className="shrink-0 py-1 text-sm font-bold text-[var(--color-gray-title)]">
                수상내역
              </span>
              <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1">
                <span className="text-base">🏆</span>
                <span className="text-sm font-medium text-[var(--color-gray-mid)]">
                  {project.awards}
                </span>
              </div>
            </div>
          )}
        </div>
        <MdxComponent code={project.body.code} blurDataURLs={project.blurMap} />

        <Divider className="mb-[3.5rem]" />
        <Footer {...project} />
      </article>

      <Divider className="my-[3.5rem]" />
      <Recommend projects={getRecommendedProjects(allProjects, slug)} />
    </>
  );
};

const getRecommendedProjects = (projects: Project[], slug: string): Project[] => {
  // Sort by date if available, otherwise keep order (assuming contentlayer sorts or order doesn't matter as much)
  // Projects might not have createdAt, so let's check. If not, just use array order.
  // Checking Project type definition would be good, but assuming similar structure or just simple slicing.
  // Let's assume standard array for now.

  const idx = projects.findIndex((p) => p.slug === slug);

  if (idx === -1) {
    return projects.slice(0, 4);
  }

  const getProjects = (start: number, end: number) =>
    projects.slice(Math.max(0, start), Math.min(projects.length, end));

  const prev = getProjects(idx - 2, idx);
  const next = getProjects(idx + 1, idx + 3);

  let rec = [...prev, ...next];

  if (rec.length < 4) {
    const need = 4 - rec.length;
    const isFront = idx < projects.length / 2;
    const isIncluded = (p: Project) => rec.some((r) => r.slug === p.slug);

    if (isFront) {
      const more = getProjects(idx + 3, idx + 3 + need * 2)
        .filter((p) => !isIncluded(p))
        .slice(0, need);
      rec = [...rec, ...more];
    } else {
      const end = idx - 2;
      const more = getProjects(end - need * 2, end)
        .filter((p) => !isIncluded(p))
        .slice(0, need);
      rec = [...more, ...rec];
    }
  }

  return rec;
};

export default ProjectPage;

export const generateStaticParams = () => {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
};

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `${ROUTES.PROJECTS}/${project.slug}`,
    image: project.coverImage,
  });
};
