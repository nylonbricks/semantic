import Image from 'next/image';

import { createBlur } from '@libs/image';
import { Divider } from '@semantic/components/ui';
import { METADATA, PROFILE } from '@semantic/constants';

const AboutPage = async () => {
  const blurDataURL = await createBlur(PROFILE.profileImage);

  return (
    <div className="column pb-[4.0625rem]">
      {/* Header */}
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">About</h1>

      <div className="column gap-[3.75rem]">
        {/* Profile Section */}
        <section className="flex flex-col tablet:flex-row gap-8 items-center tablet:items-start">
          <div
            className="relative w-[10rem] h-[10rem] shrink-0 select-none rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0px 10px 39px ${PROFILE.profileImageShadowColor}`,
              filter: PROFILE.profileImageFilter,
            }}
          >
            <Image
              className="w-full h-full object-cover"
              src={PROFILE.profileImage}
              alt={`${METADATA.AUTHOR.NAME} profile image`}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(max-width: 768px) 100vw, 300px"
              draggable={false}
              priority
              fill
            />
          </div>
          <div className="column gap-4 text-center tablet:text-left">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-gray-bold)]">
                {METADATA.AUTHOR.NAME}
              </h2>
              <p className="text-[var(--color-gray-mid)] mt-1">Digital Product Planning</p>
            </div>
            <div className="column gap-1 text-[var(--color-gray-mid)]">
              <p>📧 {METADATA.AUTHOR.EMAIL}</p>
              <p>📍 Seoul, South Korea</p>
              <p>
                🔗{' '}
                <a
                  href={METADATA.SITE.URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-gray-bold)] transition-colors"
                >
                  {METADATA.SITE.URL.replace('https://', '')}
                </a>
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* How I Work */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">How I Work</h3>
          <div className="column gap-4 text-[var(--color-gray-bold)] leading-relaxed">
            <p>
              프로젝트를 화면 너머의 현실 세계의 맥락에서 바라보고, 기술과 경험을 연결해 문제를
              해결하고자 합니다.
            </p>
            <p>경계없는 시선과 한계없이 생각하는 Problem Solver 노권후입니다.</p>
          </div>
        </section>

        {/* Education */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Education</h3>
          <ul className="column gap-6">
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="font-bold text-[var(--color-gray-bold)]">대학교 이름</span>
                <span className="text-[var(--color-gray-mid)]">전공 이름</span>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                20XX.03 - 20XX.02
              </span>
            </li>
            {/* Add more items as needed */}
          </ul>
        </section>

        {/* Tools & Skills */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Tools & Skills</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Figma',
              'Sketch',
              'Adobe XD',
              'Photoshop',
              'Illustrator',
              'Jira',
              'Notion',
              'Slack',
              'HTML/CSS',
              'React',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-mid)] text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Experience</h3>
          <ul className="column gap-8">
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">회사 이름</span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                  20XX.XX - Present
                </span>
              </div>
              <span className="text-[var(--color-gray-accent)] font-medium">직무 / 포지션</span>
              <p className="text-[var(--color-gray-mid)] leading-relaxed">
                주요 업무 및 성과에 대한 설명을 이곳에 작성합니다. 어떤 프로젝트를 진행했고, 어떤
                기여를 했는지 구체적으로 기술합니다.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  이전 회사 이름
                </span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                  20XX.XX - 20XX.XX
                </span>
              </div>
              <span className="text-[var(--color-gray-accent)] font-medium">직무 / 포지션</span>
              <p className="text-[var(--color-gray-mid)] leading-relaxed">
                주요 업무 및 성과에 대한 설명을 이곳에 작성합니다.
              </p>
            </li>
          </ul>
        </section>

        {/* Awards */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Awards</h3>
          <ul className="column gap-4">
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <span className="font-bold text-[var(--color-gray-bold)]">수상 내역 이름</span>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">20XX.XX</span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <span className="font-bold text-[var(--color-gray-bold)]">또 다른 수상 내역</span>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">20XX.XX</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
