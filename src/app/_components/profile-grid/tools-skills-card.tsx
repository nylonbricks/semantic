'use client';

// @ts-expect-error - LogoLoop is JSX
import LogoLoop from '@semantic/components/ui/logo-loop.jsx';

import Card from './card';

export const ToolsSkillsCard = () => {
  return (
    <Card.Root className="bg-[var(--color-background02)] shadow-none border-[var(--color-border)]">
      <Card.Content className="flex items-center justify-center h-full p-0">
        <LogoLoop
          logos={[
            { src: '/icons/skills/figma.svg', alt: 'Figma', width: 28, height: 28 },
            { src: '/icons/skills/sketch.svg', alt: 'Sketch', width: 28, height: 28 },
            {
              node: (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                  className="text-[var(--color-gray-bold)]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M76.9829 16.2189L23.7438 20.1417C19.4488 20.5106 17.9541 23.314 17.9541 26.6691V84.9025C17.9541 87.5199 18.8843 89.7555 21.1296 92.7418L33.6455 108.982C35.6984 111.596 37.5684 112.157 41.4944 111.965L103.32 108.234C108.549 107.862 110.047 105.434 110.047 101.328V35.8171C110.047 33.6937 109.206 33.081 106.73 31.2752C106.589 31.1716 106.448 31.0679 106.307 30.964L89.3128 19.0191C85.2039 16.036 83.5168 15.6575 76.9829 16.2189ZM42.8961 34.7426C37.8474 35.0826 36.7023 35.1595 33.8348 32.8308L26.544 27.0444C25.7998 26.297 26.1751 25.3636 28.0419 25.1808L79.225 21.4472C83.52 21.0719 85.7621 22.5698 87.4428 23.8721L96.2219 30.2199C96.594 30.4059 97.5274 31.5254 96.408 31.5254L43.5473 34.7009L42.8961 34.7426ZM37.007 100.767V45.1479C37.007 42.723 37.7544 41.6035 39.9965 41.4143L100.703 37.8699C102.762 37.6839 103.696 38.9926 103.696 41.4143V96.6582C103.696 99.0895 103.32 101.142 99.9555 101.328L41.8665 104.69C38.4986 104.876 37.007 103.76 37.007 100.767ZM94.3583 48.1309C94.7304 49.8149 94.3583 51.4957 92.6712 51.6849L89.8742 52.243V93.2999C87.4428 94.6086 85.2007 95.3527 83.3339 95.3527C80.3445 95.3527 79.5971 94.4225 77.355 91.6223L59.0494 62.8825V90.6921L64.8423 91.9976C64.8423 91.9976 64.8423 95.3559 60.1657 95.3559L47.2809 96.1033C46.9056 95.3559 47.2809 93.4891 48.5896 93.1171L51.9511 92.1869V55.4121L47.2809 55.0368C46.9088 53.3561 47.839 50.9311 50.4564 50.7451L64.281 49.8149L83.3339 78.93V53.1732L78.4777 52.6151C78.1024 50.5591 79.5971 49.0643 81.4639 48.8815L94.3583 48.1309Z"
                  />
                </svg>
              ),
              alt: 'Notion',
              ariaLabel: 'Notion',
            },
            { src: '/icons/skills/slack.svg', alt: 'Slack', width: 28, height: 28 },
            { src: '/icons/skills/word.svg', alt: 'Word', width: 28, height: 28 },
            { src: '/icons/skills/excel.svg', alt: 'Excel', width: 28, height: 28 },
            { src: '/icons/skills/powerpoint.svg', alt: 'PowerPoint', width: 28, height: 28 },
            { src: '/icons/skills/outlook.svg', alt: 'Outlook', width: 28, height: 28 },
            { src: '/icons/skills/photoshop.svg', alt: 'Photoshop', width: 28, height: 28 },
            { src: '/icons/skills/illustrator.svg', alt: 'Illustrator', width: 28, height: 28 },
            { src: '/icons/skills/premierepro.svg', alt: 'Premiere Pro', width: 28, height: 28 },
            { src: '/icons/skills/aftereffects.svg', alt: 'After Effects', width: 28, height: 28 },
            { src: '/icons/skills/hancom.svg', alt: '한컴오피스 한글', width: 28, height: 28 },
            { src: '/icons/skills/html.svg', alt: 'HTML', width: 28, height: 28 },
            { src: '/icons/skills/css.svg', alt: 'CSS', width: 28, height: 28 },
            { src: '/icons/skills/git.svg', alt: 'Git', width: 28, height: 28 },
            { src: '/icons/skills/Sass.svg', alt: 'Sass', width: 28, height: 28 },
            { src: '/icons/skills/zeplin.svg', alt: 'Zeplin', width: 28, height: 28 },
            {
              node: (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                  className="text-[var(--color-gray-bold)]"
                >
                  <path d="M64 0C115.205 0 128 12.7947 128 64C128 115.205 115.205 128 64 128C12.7947 128 0 115.205 0 64C0 12.7947 12.7947 0 64 0ZM53.4987 99.008C66.96 99.024 78.0533 87.968 78.08 74.5013C78.08 61.056 67.0187 49.9947 53.5733 49.9947C40.128 49.9947 29.0667 61.0613 29.0667 74.5013C29.0667 87.92 40.08 98.9707 53.4987 99.008ZM98 98V30H30V41.984H85.9893V98H98ZM53.4987 62.0107C55.1397 62.0114 56.7645 62.3353 58.2803 62.9639C59.7961 63.5925 61.1732 64.5136 62.3331 65.6744C63.493 66.8353 64.4128 68.2132 65.0402 69.7296C65.6675 71.2459 65.99 72.871 65.9893 74.512C65.9886 76.153 65.6647 77.7778 65.0361 79.2936C64.4075 80.8094 63.4864 82.1866 62.3256 83.3464C61.1647 84.5063 59.7868 85.4262 58.2704 86.0535C56.7541 86.6808 55.129 87.0034 53.488 87.0027C50.1739 87.0013 46.996 85.6834 44.6536 83.3389C42.3111 80.9945 40.9959 77.8155 40.9973 74.5013C40.9987 71.1872 42.3166 68.0093 44.6611 65.6669C47.0056 63.3244 50.1845 62.0093 53.4987 62.0107Z" />
                </svg>
              ),
              alt: 'Abstract',
              ariaLabel: 'Abstract',
            },
          ]}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={false}
          ariaLabel="Tools and Skills"
        />
      </Card.Content>
    </Card.Root>
  );
};
