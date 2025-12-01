import Image from 'next/image';

import { createBlur } from '@libs/image';
import { CalendarIcon, LocationIcon, DownloadIcon } from '@semantic/components/icon';
import { METADATA, PROFILE } from '@semantic/constants';

import { ContactButtons } from './_components/contact-buttons';
import Card from '../_components/profile-grid/card';

const AboutPage = async () => {
  const blurDataURL = await createBlur(PROFILE.profileImage);

  return (
    <div className="column pb-[4.0625rem]">
      {/* Header */}
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">About</h1>

      <div className="column gap-[3.75rem]">
        {/* Profile Section */}
        <section>
          <Card.Root
            className="mt-0 h-auto rounded-b-none shadow-[inset_0_0.125rem_0.125rem_rgba(255,255,255,0.3)]"
            style={{ backgroundColor: PROFILE.cardBackgroundColor }}
          >
            <Card.Content className="flex flex-col gap-6 h-auto">
              <div className="flex flex-col tablet:flex-row items-center tablet:items-center justify-between w-full gap-6 tablet:gap-0">
                {/* Left: Image & Name */}
                <div className="flex flex-col items-center tablet:items-start gap-4 h-full justify-between">
                  <div className="flex items-center gap-8">
                    <div
                      className="relative w-[6.25rem] h-[6.25rem] tablet:w-[7.5rem] tablet:h-[7.5rem] shrink-0 select-none rounded overflow-hidden"
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
                    <div className="flex flex-col items-start gap-1">
                      <h2 className="text-2xl font-bold" style={{ color: PROFILE.authorTextColor }}>
                        {METADATA.AUTHOR.NAME}
                      </h2>
                      <p className="text-base" style={{ color: PROFILE.contentTextColor }}>
                        Digital Product Planning
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Contact Info */}
                <div className="flex flex-col items-center tablet:items-end justify-center h-full gap-4">
                  <div className="flex flex-col items-center tablet:items-end gap-2">
                    <p
                      className="flex items-center gap-1.5 text-base"
                      style={{ color: PROFILE.contentTextColor }}
                    >
                      <CalendarIcon size={20} />
                      2001. 01. 12
                    </p>
                    <p
                      className="flex items-center gap-1.5 text-base"
                      style={{ color: PROFILE.contentTextColor }}
                    >
                      <LocationIcon size={20} />
                      경기 용인시 기흥구
                    </p>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card.Root>

          <div className="flex flex-col tablet:flex-row w-full">
            <a
              href="#"
              className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:brightness-95 transition-all border-l border-b border-r border-t-0 border-[rgba(0,0,0,0.03)] rounded-none tablet:rounded-bl-[0.875rem] shadow-[inset_0_-0.125rem_0.125rem_rgba(255,255,255,0.3)]"
              style={{
                backgroundColor: PROFILE.cardBackgroundColor,
                color: PROFILE.contentTextColor,
              }}
            >
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2">
                <DownloadIcon size={20} />
                <span className="font-medium">이력서 다운로드</span>
              </div>
            </a>
            <a
              href="#"
              className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:brightness-95 transition-all border-l border-b border-r border-t-0 tablet:border-l-0 border-[rgba(0,0,0,0.03)] rounded-b-[0.875rem] tablet:rounded-bl-none tablet:rounded-br-[0.875rem] shadow-[inset_0_-0.125rem_0.125rem_rgba(255,255,255,0.3)]"
              style={{
                backgroundColor: PROFILE.cardBackgroundColor,
                color: PROFILE.contentTextColor,
              }}
            >
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2">
                <DownloadIcon size={20} />
                <span className="font-medium">자기소개서 다운로드</span>
              </div>
            </a>
          </div>

          <ContactButtons />
        </section>

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
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  계원예술대학교
                </span>
                <div className="flex items-center gap-2 text-[var(--color-gray-mid)]">
                  <span>디지털미디어디자인과</span>
                  <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                  <span>기획세부전공</span>
                </div>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                2024.03 - 2025.02
              </span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  운중고등학교
                </span>
                <span className="text-[var(--color-gray-mid)]">자연과학계열</span>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                2016.03 - 2019.02
              </span>
            </li>
          </ul>
        </section>

        {/* Tools & Skills */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Tools & Skills</h3>
          <div className="column gap-6">
            {/* Professional Level */}
            <div className="column gap-3">
              <span className="text-sm font-medium text-[var(--color-gray-mid)]">
                능숙하게 활용할 수 있어요
              </span>
              <div className="flex flex-wrap gap-2">
                {/* Figma with SVG icon */}
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/figma.svg"
                    width={20}
                    height={20}
                    alt="Figma"
                    className="flex-shrink-0"
                  />
                  Figma
                </span>
                {/* Sketch with SVG icon */}
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/sketch.svg"
                    width={20}
                    height={20}
                    alt="Sketch"
                    className="flex-shrink-0"
                  />
                  Sketch
                </span>
                {/* Notion */}
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 128 128"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M76.9829 16.2189L23.7438 20.1417C19.4488 20.5106 17.9541 23.314 17.9541 26.6691V84.9025C17.9541 87.5199 18.8843 89.7555 21.1296 92.7418L33.6455 108.982C35.6984 111.596 37.5684 112.157 41.4944 111.965L103.32 108.234C108.549 107.862 110.047 105.434 110.047 101.328V35.8171C110.047 33.6937 109.206 33.081 106.73 31.2752C106.589 31.1716 106.448 31.0679 106.307 30.964L89.3128 19.0191C85.2039 16.036 83.5168 15.6575 76.9829 16.2189ZM42.8961 34.7426C37.8474 35.0826 36.7023 35.1595 33.8348 32.8308L26.544 27.0444C25.7998 26.297 26.1751 25.3636 28.0419 25.1808L79.225 21.4472C83.52 21.0719 85.7621 22.5698 87.4428 23.8721L96.2219 30.2199C96.594 30.4059 97.5274 31.5254 96.408 31.5254L43.5473 34.7009L42.8961 34.7426ZM37.007 100.767V45.1479C37.007 42.723 37.7544 41.6035 39.9965 41.4143L100.703 37.8699C102.762 37.6839 103.696 38.9926 103.696 41.4143V96.6582C103.696 99.0895 103.32 101.142 99.9555 101.328L41.8665 104.69C38.4986 104.876 37.007 103.76 37.007 100.767ZM94.3583 48.1309C94.7304 49.8149 94.3583 51.4957 92.6712 51.6849L89.8742 52.243V93.2999C87.4428 94.6086 85.2007 95.3527 83.3339 95.3527C80.3445 95.3527 79.5971 94.4225 77.355 91.6223L59.0494 62.8825V90.6921L64.8423 91.9976C64.8423 91.9976 64.8423 95.3559 60.1657 95.3559L47.2809 96.1033C46.9056 95.3559 47.2809 93.4891 48.5896 93.1171L51.9511 92.1869V55.4121L47.2809 55.0368C46.9088 53.3561 47.839 50.9311 50.4564 50.7451L64.281 49.8149L83.3339 78.93V53.1732L78.4777 52.6151C78.1024 50.5591 79.5971 49.0643 81.4639 48.8815L94.3583 48.1309Z"
                    />
                  </svg>
                  Notion
                </span>
                {/* LLM 활용 with AI model icons */}
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <span className="flex items-center gap-1">
                    {/* GPT */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M109.128 54.5666C110.018 51.9282 110.472 49.1658 110.472 46.3851C110.472 41.784 109.23 37.2659 106.874 33.2954C102.139 25.1636 93.3561 20.1432 83.8507 20.1432C81.9781 20.1432 80.1107 20.3383 78.2795 20.7253C75.8166 17.9874 72.7935 15.7957 69.4094 14.2947C66.0254 12.7938 62.3573 12.0177 58.647 12.0176H58.4804L58.4179 12.0179C46.9051 12.0179 36.6952 19.3479 33.1561 30.1539C29.4926 30.8943 26.0317 32.3983 23.005 34.5652C19.9783 36.7322 17.4557 39.5121 15.606 42.7189C13.2569 46.7133 12.019 51.2492 12.0176 55.8674C12.0185 62.3578 14.4602 68.617 18.87 73.4329C17.9799 76.0712 17.5259 78.8337 17.5255 81.6143C17.5259 86.2155 18.768 90.7335 21.1242 94.7041C23.9262 99.5176 28.2051 103.329 33.344 105.588C38.4828 107.847 44.2161 108.437 49.717 107.274C52.1802 110.012 55.2036 112.203 58.5879 113.704C61.9722 115.205 65.6405 115.982 69.3509 115.982H69.5176L69.5853 115.982C81.1043 115.982 91.3108 108.651 94.85 97.8354C98.5135 97.0947 101.974 95.5906 105.001 93.4236C108.028 91.2566 110.551 88.4768 112.4 85.2701C114.747 81.2791 115.983 76.747 115.982 72.1331C115.981 65.6428 113.539 59.3838 109.129 54.568L109.128 54.5666ZM69.5242 109.185H69.497C64.8877 109.184 60.4248 107.588 56.8843 104.676C57.0945 104.564 57.3023 104.448 57.5074 104.328L78.487 92.3706C79.0106 92.0766 79.4459 91.651 79.7488 91.1372C80.0517 90.6234 80.2113 90.0396 80.2115 89.4452V60.2418L89.0791 65.2939C89.1256 65.3168 89.1657 65.3506 89.1958 65.3925C89.2259 65.4343 89.2451 65.4829 89.2516 65.5338V89.7018C89.2394 100.447 80.4149 109.163 69.5242 109.185ZM27.0997 91.3068C25.3668 88.3503 24.4538 84.9956 24.4526 81.5802C24.4526 80.4663 24.5512 79.3495 24.7432 78.2519C24.8992 78.3441 25.1714 78.5081 25.3667 78.6188L46.3463 90.5758C46.8693 90.8771 47.4641 91.0358 48.0698 91.0357C48.6755 91.0355 49.2702 90.8766 49.7931 90.5751L75.407 75.9823V86.0867L75.4073 86.1041C75.4073 86.1528 75.3959 86.2008 75.3738 86.2443C75.3518 86.2878 75.3198 86.3257 75.2804 86.3549L54.072 98.4371C51.0711 100.141 47.6696 101.039 44.2072 101.04C40.7411 101.039 37.3361 100.14 34.3335 98.4311C31.3309 96.7227 28.8363 94.2654 27.0997 91.3057V91.3068ZM21.5804 46.1162C23.8846 42.1672 27.5229 39.1435 31.8586 37.5743C31.8586 37.7525 31.8483 38.0683 31.8483 38.2875V62.2018L31.848 62.2214C31.8481 62.8152 32.0074 63.3984 32.3099 63.9118C32.6123 64.4251 33.047 64.8504 33.5699 65.1443L59.1837 79.7349L50.3166 84.787C50.2728 84.8154 50.2226 84.8328 50.1705 84.8374C50.1183 84.8421 50.0657 84.834 50.0175 84.8138L28.8069 72.7215C25.8085 71.0076 23.3192 68.5462 21.5886 65.5841C19.8581 62.6219 18.9469 59.2629 18.9465 55.8438C18.9479 52.4301 19.8564 49.0764 21.5815 46.1173L21.5804 46.1162ZM94.4362 62.8446L68.8223 48.2522L77.6899 43.202C77.7336 43.1735 77.7838 43.1561 77.836 43.1514C77.8882 43.1468 77.9407 43.1549 77.9889 43.1751L99.1992 55.2573C102.2 56.9685 104.692 59.4285 106.425 62.3904C108.157 65.3523 109.07 68.7118 109.071 72.1317C109.071 80.2943 103.908 87.5981 96.1467 90.4172V65.7878C96.1478 65.7788 96.1478 65.7693 96.1478 65.7603C96.1476 65.1687 95.9893 64.5876 95.6888 64.0757C95.3882 63.5637 94.9562 63.1391 94.4362 62.8446ZM103.262 49.7378C103.056 49.6131 102.848 49.4909 102.639 49.3712L81.6594 37.4139C81.1363 37.1131 80.5418 36.9546 79.9364 36.9543C79.3309 36.9546 78.7364 37.1131 78.2133 37.4139L52.5991 52.0066V41.9022L52.5988 41.8848C52.5988 41.7861 52.6462 41.6931 52.726 41.634L73.9344 29.5619C76.9343 27.8555 80.3361 26.9572 83.7989 26.957C94.7036 26.957 103.547 35.6825 103.547 46.4421C103.546 47.5463 103.451 48.6484 103.262 49.7367V49.7378ZM47.778 67.7471L38.9086 62.6951C38.8621 62.6722 38.822 62.6383 38.7919 62.5964C38.7618 62.5546 38.7426 62.5061 38.7361 62.4552V38.2868C38.7409 27.533 47.5841 18.8147 58.4841 18.8147C63.1005 18.8157 67.571 20.4114 71.1196 23.3249C70.9599 23.4109 70.6815 23.5626 70.4964 23.6733L49.5168 35.6303C48.9934 35.9241 48.5581 36.3495 48.2553 36.8631C47.9524 37.3768 47.7928 37.9604 47.7927 38.5546V38.5739L47.778 67.7471ZM52.5951 57.4997L64.003 50.9983L75.411 57.4953V70.4936L64.003 76.991L52.5951 70.4936V57.4997Z" />
                    </svg>
                    {/* Claude */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M32.4286 81.1404L52.8708 69.6696L53.2129 68.6699L52.8708 68.1174H51.8711L48.4509 67.9069L36.7696 67.5912L26.6406 67.1702L16.8273 66.6441L14.3543 66.1179L12.0391 63.066L12.2758 61.5401L14.3543 60.1457L17.3272 60.4088L23.9045 60.8561L33.7704 61.5401L40.9265 61.961L51.5291 63.066H53.2129L53.4496 62.382L52.8708 61.961L52.4236 61.5401L42.2156 54.6208L31.1658 47.3069L25.3778 43.0974L22.247 40.9664L20.6685 38.9669L19.9844 34.5995L22.8258 31.4688L26.6406 31.7318L27.6141 31.9949L31.4815 34.9679L39.7426 41.361L50.5293 49.3064L52.1079 50.6218L52.7393 50.1746L52.8182 49.8588L52.1079 48.6749L46.2409 38.0723L39.9794 27.2856L37.1906 22.8131L36.4539 20.1295C36.1908 19.0245 36.0067 18.1037 36.0067 16.9724L39.2427 12.5788L41.0317 12L45.3464 12.5788L47.1618 14.1573L49.8453 20.2874L54.1863 29.9428L60.9214 43.0711L62.8946 46.9648L63.947 50.5692L64.3416 51.6742H65.0257V51.0428L65.5781 43.6499L66.6042 34.5732L67.604 22.892L67.946 19.6033L69.5771 15.657L72.8132 13.5259L75.3388 14.7361L77.4173 17.7091L77.1279 19.6296L75.8913 27.6539L73.4709 40.2297L71.8923 48.6486H72.8132L73.8655 47.5963L78.1276 41.9398L85.2837 32.9947L88.4408 29.443L92.1241 25.5229L94.4919 23.6549H98.9644L102.253 28.5484L100.78 33.5998L96.1757 39.4404L92.3608 44.3865L86.8885 51.7531L83.4684 57.6463L83.7841 58.1199L84.5996 58.041L96.9649 55.4101L103.647 54.1999L111.619 52.8318L115.223 54.5156L115.618 56.2257L114.197 59.7248L105.673 61.8295L95.6758 63.829L80.7848 67.3544L80.6007 67.486L80.8111 67.7491L87.52 68.3805L90.3877 68.5383H97.4122L110.488 69.5118L113.908 71.7743L115.96 74.5368L115.618 76.6415L110.356 79.3251L103.253 77.6413L86.6781 73.6949L80.9953 72.2742H80.206V72.7478L84.9417 77.3782L93.6237 85.2183L104.489 95.321L105.042 97.8204L103.647 99.7936L102.174 99.5831L92.6239 92.4007L88.9407 89.1647L80.6007 82.1401H80.0482V82.8768L81.9687 85.6919L92.1241 100.951L92.6502 105.634L91.9136 107.16L89.2827 108.081L86.3887 107.555L80.4428 99.2148L74.3128 89.8224L69.3667 81.4035L68.7616 81.7455L65.8412 113.185L64.4732 114.79L61.3161 116L58.6852 114L57.2908 110.764L58.6852 104.371L60.3689 96.0314L61.737 89.4015L62.9735 81.1667L63.7102 78.4306L63.6576 78.2464L63.0525 78.3253L56.8435 86.8495L47.3985 99.6094L39.9267 107.607L38.1377 108.318L35.0332 106.713L35.3226 103.845L37.059 101.293L47.3985 88.1386L53.6338 79.9828L57.6591 75.2735L57.6328 74.5894H57.396L29.9293 92.427L25.0358 93.0584L22.931 91.0853L23.1941 87.8492L24.1939 86.7969L32.455 81.1141L32.4286 81.1404Z" />
                    </svg>
                    {/* Gemini */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M63.892 8C62.08 38.04 38.04 62.08 8 63.892V64.108C38.04 65.92 62.08 89.96 63.892 120H64.108C65.92 89.96 89.96 65.92 120 64.108V63.892C89.96 62.08 65.92 38.04 64.108 8H63.892Z" />
                    </svg>
                  </span>
                  LLM 활용
                </span>
                {/* Slack with Toss verification */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/slack.svg"
                    width={20}
                    height={20}
                    alt="Slack"
                    className="flex-shrink-0"
                  />
                  Slack
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">비바리퍼블리카(토스) 근무</div>
                      <div className="text-gray-300">Facepay Onboarding Assistant</div>
                      <div className="text-gray-400 text-[11px]">2025.07 - 2025.08</div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
                {/* 한글 with certification badge */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/hancom.svg"
                    width={20}
                    height={20}
                    alt="한컴오피스 한글"
                    className="flex-shrink-0"
                  />
                  한컴오피스 한글
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">워드프로세서 자격증 취득</div>
                      <div className="text-gray-300">대한상공회의소</div>
                      <div className="text-gray-400 text-[11px]">2021.12</div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
                {/* Word with MOS certification */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/word.svg"
                    width={20}
                    height={20}
                    alt="Word"
                    className="flex-shrink-0"
                  />
                  Word
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">MOS 2016 Master 자격증 취득</div>
                      <div className="text-gray-300">Microsoft</div>
                      <div className="text-gray-400 text-[11px]">2021.11</div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
                {/* Excel with both certifications */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/excel.svg"
                    width={20}
                    height={20}
                    alt="Excel"
                    className="flex-shrink-0"
                  />
                  Excel
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">ITQ OA Master 자격증 취득</div>
                        <div className="text-gray-300">한국생산성본부</div>
                        <div className="text-gray-400 text-[11px]">2021.12</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">MOS 2016 Master 자격증 취득</div>
                        <div className="text-gray-300">Microsoft</div>
                        <div className="text-gray-400 text-[11px]">2021.11</div>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
                {/* PowerPoint with both certifications */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/powerpoint.svg"
                    width={20}
                    height={20}
                    alt="PowerPoint"
                    className="flex-shrink-0"
                  />
                  PowerPoint
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">ITQ OA Master 자격증 취득</div>
                        <div className="text-gray-300">한국생산성본부</div>
                        <div className="text-gray-400 text-[11px]">2021.12</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">MOS 2016 Master 자격증 취득</div>
                        <div className="text-gray-300">Microsoft</div>
                        <div className="text-gray-400 text-[11px]">2021.11</div>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
                {/* Outlook with MOS certification */}
                <span className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors cursor-help [&:hover_.tooltip]:opacity-100">
                  <Image
                    src="/icons/skills/outlook.svg"
                    width={20}
                    height={20}
                    alt="Outlook"
                    className="flex-shrink-0"
                  />
                  Outlook
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">MOS 2016 Master 자격증 취득</div>
                      <div className="text-gray-300">Microsoft</div>
                      <div className="text-gray-400 text-[11px]">2021.11</div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                  </div>
                </span>
              </div>
            </div>

            {/* Proficient Level */}
            <div className="column gap-3">
              <span className="text-sm font-medium text-[var(--color-gray-mid)]">
                상황에 맞게 활용할 수 있어요
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/skills/html.svg"
                      width={20}
                      height={20}
                      alt="HTML"
                      className="flex-shrink-0"
                    />
                    <Image
                      src="/icons/skills/css.svg"
                      width={20}
                      height={20}
                      alt="CSS"
                      className="flex-shrink-0"
                    />
                  </span>
                  HTML/CSS
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/photoshop.svg"
                    width={20}
                    height={20}
                    alt="Photoshop"
                    className="flex-shrink-0"
                  />
                  Photoshop
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/illustrator.svg"
                    width={20}
                    height={20}
                    alt="Illustrator"
                    className="flex-shrink-0"
                  />
                  Illustrator
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <span className="flex items-center gap-1">
                    {/* GPT */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M109.128 54.5666C110.018 51.9282 110.472 49.1658 110.472 46.3851C110.472 41.784 109.23 37.2659 106.874 33.2954C102.139 25.1636 93.3561 20.1432 83.8507 20.1432C81.9781 20.1432 80.1107 20.3383 78.2795 20.7253C75.8166 17.9874 72.7935 15.7957 69.4094 14.2947C66.0254 12.7938 62.3573 12.0177 58.647 12.0176H58.4804L58.4179 12.0179C46.9051 12.0179 36.6952 19.3479 33.1561 30.1539C29.4926 30.8943 26.0317 32.3983 23.005 34.5652C19.9783 36.7322 17.4557 39.5121 15.606 42.7189C13.2569 46.7133 12.019 51.2492 12.0176 55.8674C12.0185 62.3578 14.4602 68.617 18.87 73.4329C17.9799 76.0712 17.5259 78.8337 17.5255 81.6143C17.5259 86.2155 18.768 90.7335 21.1242 94.7041C23.9262 99.5176 28.2051 103.329 33.344 105.588C38.4828 107.847 44.2161 108.437 49.717 107.274C52.1802 110.012 55.2036 112.203 58.5879 113.704C61.9722 115.205 65.6405 115.982 69.3509 115.982H69.5176L69.5853 115.982C81.1043 115.982 91.3108 108.651 94.85 97.8354C98.5135 97.0947 101.974 95.5906 105.001 93.4236C108.028 91.2566 110.551 88.4768 112.4 85.2701C114.747 81.2791 115.983 76.747 115.982 72.1331C115.981 65.6428 113.539 59.3838 109.129 54.568L109.128 54.5666ZM69.5242 109.185H69.497C64.8877 109.184 60.4248 107.588 56.8843 104.676C57.0945 104.564 57.3023 104.448 57.5074 104.328L78.487 92.3706C79.0106 92.0766 79.4459 91.651 79.7488 91.1372C80.0517 90.6234 80.2113 90.0396 80.2115 89.4452V60.2418L89.0791 65.2939C89.1256 65.3168 89.1657 65.3506 89.1958 65.3925C89.2259 65.4343 89.2451 65.4829 89.2516 65.5338V89.7018C89.2394 100.447 80.4149 109.163 69.5242 109.185ZM27.0997 91.3068C25.3668 88.3503 24.4538 84.9956 24.4526 81.5802C24.4526 80.4663 24.5512 79.3495 24.7432 78.2519C24.8992 78.3441 25.1714 78.5081 25.3667 78.6188L46.3463 90.5758C46.8693 90.8771 47.4641 91.0358 48.0698 91.0357C48.6755 91.0355 49.2702 90.8766 49.7931 90.5751L75.407 75.9823V86.0867L75.4073 86.1041C75.4073 86.1528 75.3959 86.2008 75.3738 86.2443C75.3518 86.2878 75.3198 86.3257 75.2804 86.3549L54.072 98.4371C51.0711 100.141 47.6696 101.039 44.2072 101.04C40.7411 101.039 37.3361 100.14 34.3335 98.4311C31.3309 96.7227 28.8363 94.2654 27.0997 91.3057V91.3068ZM21.5804 46.1162C23.8846 42.1672 27.5229 39.1435 31.8586 37.5743C31.8586 37.7525 31.8483 38.0683 31.8483 38.2875V62.2018L31.848 62.2214C31.8481 62.8152 32.0074 63.3984 32.3099 63.9118C32.6123 64.4251 33.047 64.8504 33.5699 65.1443L59.1837 79.7349L50.3166 84.787C50.2728 84.8154 50.2226 84.8328 50.1705 84.8374C50.1183 84.8421 50.0657 84.834 50.0175 84.8138L28.8069 72.7215C25.8085 71.0076 23.3192 68.5462 21.5886 65.5841C19.8581 62.6219 18.9469 59.2629 18.9465 55.8438C18.9479 52.4301 19.8564 49.0764 21.5815 46.1173L21.5804 46.1162ZM94.4362 62.8446L68.8223 48.2522L77.6899 43.202C77.7336 43.1735 77.7838 43.1561 77.836 43.1514C77.8882 43.1468 77.9407 43.1549 77.9889 43.1751L99.1992 55.2573C102.2 56.9685 104.692 59.4285 106.425 62.3904C108.157 65.3523 109.07 68.7118 109.071 72.1317C109.071 80.2943 103.908 87.5981 96.1467 90.4172V65.7878C96.1478 65.7788 96.1478 65.7693 96.1478 65.7603C96.1476 65.1687 95.9893 64.5876 95.6888 64.0757C95.3882 63.5637 94.9562 63.1391 94.4362 62.8446ZM103.262 49.7378C103.056 49.6131 102.848 49.4909 102.639 49.3712L81.6594 37.4139C81.1363 37.1131 80.5418 36.9546 79.9364 36.9543C79.3309 36.9546 78.7364 37.1131 78.2133 37.4139L52.5991 52.0066V41.9022L52.5988 41.8848C52.5988 41.7861 52.6462 41.6931 52.726 41.634L73.9344 29.5619C76.9343 27.8555 80.3361 26.9572 83.7989 26.957C94.7036 26.957 103.547 35.6825 103.547 46.4421C103.546 47.5463 103.451 48.6484 103.262 49.7367V49.7378ZM47.778 67.7471L38.9086 62.6951C38.8621 62.6722 38.822 62.6383 38.7919 62.5964C38.7618 62.5546 38.7426 62.5061 38.7361 62.4552V38.2868C38.7409 27.533 47.5841 18.8147 58.4841 18.8147C63.1005 18.8157 67.571 20.4114 71.1196 23.3249C70.9599 23.4109 70.6815 23.5626 70.4964 23.6733L49.5168 35.6303C48.9934 35.9241 48.5581 36.3495 48.2553 36.8631C47.9524 37.3768 47.7928 37.9604 47.7927 38.5546V38.5739L47.778 67.7471ZM52.5951 57.4997L64.003 50.9983L75.411 57.4953V70.4936L64.003 76.991L52.5951 70.4936V57.4997Z" />
                    </svg>
                    {/* Claude */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M32.4286 81.1404L52.8708 69.6696L53.2129 68.6699L52.8708 68.1174H51.8711L48.4509 67.9069L36.7696 67.5912L26.6406 67.1702L16.8273 66.6441L14.3543 66.1179L12.0391 63.066L12.2758 61.5401L14.3543 60.1457L17.3272 60.4088L23.9045 60.8561L33.7704 61.5401L40.9265 61.961L51.5291 63.066H53.2129L53.4496 62.382L52.8708 61.961L52.4236 61.5401L42.2156 54.6208L31.1658 47.3069L25.3778 43.0974L22.247 40.9664L20.6685 38.9669L19.9844 34.5995L22.8258 31.4688L26.6406 31.7318L27.6141 31.9949L31.4815 34.9679L39.7426 41.361L50.5293 49.3064L52.1079 50.6218L52.7393 50.1746L52.8182 49.8588L52.1079 48.6749L46.2409 38.0723L39.9794 27.2856L37.1906 22.8131L36.4539 20.1295C36.1908 19.0245 36.0067 18.1037 36.0067 16.9724L39.2427 12.5788L41.0317 12L45.3464 12.5788L47.1618 14.1573L49.8453 20.2874L54.1863 29.9428L60.9214 43.0711L62.8946 46.9648L63.947 50.5692L64.3416 51.6742H65.0257V51.0428L65.5781 43.6499L66.6042 34.5732L67.604 22.892L67.946 19.6033L69.5771 15.657L72.8132 13.5259L75.3388 14.7361L77.4173 17.7091L77.1279 19.6296L75.8913 27.6539L73.4709 40.2297L71.8923 48.6486H72.8132L73.8655 47.5963L78.1276 41.9398L85.2837 32.9947L88.4408 29.443L92.1241 25.5229L94.4919 23.6549H98.9644L102.253 28.5484L100.78 33.5998L96.1757 39.4404L92.3608 44.3865L86.8885 51.7531L83.4684 57.6463L83.7841 58.1199L84.5996 58.041L96.9649 55.4101L103.647 54.1999L111.619 52.8318L115.223 54.5156L115.618 56.2257L114.197 59.7248L105.673 61.8295L95.6758 63.829L80.7848 67.3544L80.6007 67.486L80.8111 67.7491L87.52 68.3805L90.3877 68.5383H97.4122L110.488 69.5118L113.908 71.7743L115.96 74.5368L115.618 76.6415L110.356 79.3251L103.253 77.6413L86.6781 73.6949L80.9953 72.2742H80.206V72.7478L84.9417 77.3782L93.6237 85.2183L104.489 95.321L105.042 97.8204L103.647 99.7936L102.174 99.5831L92.6239 92.4007L88.9407 89.1647L80.6007 82.1401H80.0482V82.8768L81.9687 85.6919L92.1241 100.951L92.6502 105.634L91.9136 107.16L89.2827 108.081L86.3887 107.555L80.4428 99.2148L74.3128 89.8224L69.3667 81.4035L68.7616 81.7455L65.8412 113.185L64.4732 114.79L61.3161 116L58.6852 114L57.2908 110.764L58.6852 104.371L60.3689 96.0314L61.737 89.4015L62.9735 81.1667L63.7102 78.4306L63.6576 78.2464L63.0525 78.3253L56.8435 86.8495L47.3985 99.6094L39.9267 107.607L38.1377 108.318L35.0332 106.713L35.3226 103.845L37.059 101.293L47.3985 88.1386L53.6338 79.9828L57.6591 75.2735L57.6328 74.5894H57.396L29.9293 92.427L25.0358 93.0584L22.931 91.0853L23.1941 87.8492L24.1939 86.7969L32.455 81.1141L32.4286 81.1404Z" />
                    </svg>
                    {/* Gemini */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 128 128"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M63.892 8C62.08 38.04 38.04 62.08 8 63.892V64.108C38.04 65.92 62.08 89.96 63.892 120H64.108C65.92 89.96 89.96 65.92 120 64.108V63.892C89.96 62.08 65.92 38.04 64.108 8H63.892Z" />
                    </svg>
                  </span>
                  AI Code Assistant
                </span>
              </div>
            </div>

            {/* Basic Level */}
            <div className="column gap-3">
              <span className="text-sm font-medium text-[var(--color-gray-mid)]">
                기본적인 개념을 이해하고 있어요
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/git.svg"
                    width={20}
                    height={20}
                    alt="Git"
                    className="flex-shrink-0"
                  />
                  Git
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/Sass.svg"
                    width={20}
                    height={20}
                    alt="Sass"
                    className="flex-shrink-0"
                  />
                  SCSS
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/zeplin.svg"
                    width={20}
                    height={20}
                    alt="Zeplin"
                    className="flex-shrink-0"
                  />
                  Zeplin
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 128 128"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M64 0C115.205 0 128 12.7947 128 64C128 115.205 115.205 128 64 128C12.7947 128 0 115.205 0 64C0 12.7947 12.7947 0 64 0ZM53.4987 99.008C66.96 99.024 78.0533 87.968 78.08 74.5013C78.08 61.056 67.0187 49.9947 53.5733 49.9947C40.128 49.9947 29.0667 61.0613 29.0667 74.5013C29.0667 87.92 40.08 98.9707 53.4987 99.008ZM98 98V30H30V41.984H85.9893V98H98ZM53.4987 62.0107C55.1397 62.0114 56.7645 62.3353 58.2803 62.9639C59.7961 63.5925 61.1732 64.5136 62.3331 65.6744C63.493 66.8353 64.4128 68.2132 65.0402 69.7296C65.6675 71.2459 65.99 72.871 65.9893 74.512C65.9886 76.153 65.6647 77.7778 65.0361 79.2936C64.4075 80.8094 63.4864 82.1866 62.3256 83.3464C61.1647 84.5063 59.7868 85.4262 58.2704 86.0535C56.7541 86.6808 55.129 87.0034 53.488 87.0027C50.1739 87.0013 46.996 85.6834 44.6536 83.3389C42.3111 80.9945 40.9959 77.8155 40.9973 74.5013C40.9987 71.1872 42.3166 68.0093 44.6611 65.6669C47.0056 63.3244 50.1845 62.0093 53.4987 62.0107Z" />
                  </svg>
                  Abstract
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/premierepro.svg"
                    width={20}
                    height={20}
                    alt="Premiere Pro"
                    className="flex-shrink-0"
                  />
                  Premiere Pro
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background02)] text-[var(--color-gray-bold)] text-sm font-medium hover:bg-[var(--color-background03)] transition-colors">
                  <Image
                    src="/icons/skills/aftereffects.svg"
                    width={20}
                    height={20}
                    alt="After Effects"
                    className="flex-shrink-0"
                  />
                  After Effects
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Experience</h3>
          <ul className="column gap-8">
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <a
                  href="https://toss.im/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-bold text-[var(--color-gray-bold)] border-b border-[var(--color-background06)] hover:opacity-70 transition-opacity duration-150"
                >
                  비바리퍼블리카(토스)
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                  2025.07 - 2025.08
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>단기계약직</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>Facepay Onboarding Assistant</span>
              </div>
              <p className="text-[var(--color-gray-mid)] leading-relaxed">
                주요 업무 및 성과에 대한 설명을 이곳에 작성합니다.
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  국가평생교육진흥원
                </span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                  2025.01 - 2025.02
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>국가근로장학생</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>기획경영본부 정보화실 소속</span>
              </div>
              <p className="text-[var(--color-gray-mid)] leading-relaxed">
                주요 업무 및 성과에 대한 설명을 이곳에 작성합니다.
              </p>
            </li>
          </ul>
        </section>

        {/* Military Service */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Military Service</h3>
          <ul className="column gap-8">
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  공군 제20전투비행단 제121전투비행대대
                </span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">
                  2022.01 - 2023.10
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>인사교육견습(70110)</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>병장 만기 전역</span>
              </div>
              <p className="text-[var(--color-gray-mid)] leading-relaxed">
                대대 행정 및 인사 업무 보조
              </p>
            </li>
          </ul>
        </section>

        {/* Awards */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Awards</h3>
          <ul className="column gap-8">
            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <a
                  href="https://rokaf.airforce.mil.kr/hackathon/688/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGaGFja2F0aG9uJTJGNjE3JTJGMzUxNTIlMkZhcnRjbFZpZXcuZG8lM0ZiYnNDbFNlcSUzRCUyNmlzVmlld01pbmUlM0RmYWxzZSUyNnBhZ2UlM0QxJTI2cmdzRW5kZGVTdHIlM0QlMjZiYnNPcGVuV3JkU2VxJTNEJTI2cmdzQmduZGVTdHIlM0QlMjZzcmNoV3JkJTNEJTI2cGFzc3dvcmQlM0QlMjZzcmNoQ29sdW1uJTNEJTI2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-bold text-[var(--color-gray-bold)] border-b border-[var(--color-background06)] hover:opacity-70 transition-opacity duration-150"
                >
                  제4회 공군 창의혁신 아이디어 공모 해커톤 병영복지부문 장려상
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2022.11</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>공군본부 주최/주관</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>공군본부 정책실장상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  군 내 정보 불균형 해소 및 병사 자기개발을 위한 프로덕트 &apos;RUNWAY&apos; 기획
                </p>
                <p>
                  리서치 과정에서 주 수요층인 병사가 20대 남성임을 고려, 해당 계층에 대한 자기개발
                  설문 데이터 활용
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 팀장, 기획, UI/UX, 발표 및 장표 담당
                </p>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  제15회 APPJAM 생활정보부문 장려상
                </span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2018.04</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>SK테크엑스 주최/주관</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>서울디지털재단 이사장상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  교내 석식 문제와 고등학생 월 평균 용돈의 10%에 달하는 높은 식비로 어려움을 겪는
                  학생들을 위해, 학교 인근 식당과 연계한 식권 서비스 기획
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 팀장, 기획, UI/UX, 발표 및 장표 담당
                </p>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  제12회 APPJAM 미래산업부문 우수상
                </span>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2017.04</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>SK테크엑스 주최/주관</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>아산나눔재단 이사장상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  NUGU AI 스피커를 활용, 키오스크에 익숙지 않은 고객과 운영 효율을 높이고 싶은 점원
                  모두를 위한 음성 기반 테이블 오더 &apos;Serve One&apos; 기획
                </p>
                <p>
                  2017년 당시 연동 및 테스트의 편의성과 사용자 입장에서 모두 편리한 결제 시스템을
                  찾던 중 Toss의 송금 API와 연동
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 팀장, 기획, 장표 디자인
                </p>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <a
                  href="https://news.samsung.com/kr/2016-%EC%A3%BC%EB%8B%88%EC%96%B4-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%B0%BD%EC%9E%91%EB%8C%80%ED%9A%8C-%EA%B0%9C%EC%B5%9C"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-bold text-[var(--color-gray-bold)] border-b border-[var(--color-background06)] hover:opacity-70 transition-opacity duration-150"
                >
                  제2회 삼성전자 주니어 소프트웨어 창작대회 일반 소프트웨어 부문 대상
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2016.11</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>삼성전자, 미래창조과학부 공동주최</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>미래창조과학부 장관상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  교내 급식정보와 개인 알레르기 정보를 연계, 학생들의 급식 만족도 평가 및 의견
                  공유를 통한 급식 개선 솔루션
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 팀장, 기획, UI/UX, 발표 및 장표 담당
                </p>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <a
                  href="https://www.donga.com/news/It/article/all/20160724/79378351/1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-bold text-[var(--color-gray-bold)] border-b border-[var(--color-background06)] hover:opacity-70 transition-opacity duration-150"
                >
                  제11회 APPJAM 생활정보부문 장려상
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2016.07</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>SK테크엑스 주최/주관</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>안양시장상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  해커톤 주제 &apos;Minimalism&apos; 에 따라 D-Day 본연의 기능을 추구하는 생산성
                  프로덕트
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 장표 및 리소스 디자인
                </p>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <div className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4 items-start tablet:items-center">
                <a
                  href="https://it.donga.com/23992/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-bold text-[var(--color-gray-bold)] border-b border-[var(--color-background06)] hover:opacity-70 transition-opacity duration-150"
                >
                  제10회 APPJAM 생활정보부문 장려상
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <span className="text-[var(--color-gray-mid)] font-mono text-sm">2016.03</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-gray-accent)] font-medium">
                <span>SK테크엑스 주최/주관</span>
                <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                <span>안양시장상</span>
              </div>
              <div className="column gap-1 text-[var(--color-gray-mid)] leading-relaxed">
                <p>
                  장애인에게 취약한 장소들을 지도상에 핀을 표시하여 정보를 제공, 민원과 연계하여
                  시정될 수 있도록 하는 프로덕트
                </p>
                <p className="text-sm text-[var(--color-gray-mid)] mt-1">
                  Role: 장표 및 리소스 디자인
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Certificate */}
        <section className="column gap-6">
          <h3 className="h3 text-[var(--color-gray-light)]">Certificate</h3>
          <ul className="column gap-6">
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  Japanese Language Proficiency Test N3
                </span>
                <span className="text-[var(--color-gray-mid)]">독립행정법인 일본국제교류기금</span>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">2023.08</span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  워드프로세서
                </span>
                <span className="text-[var(--color-gray-mid)]">대한상공회의소</span>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">2021.12</span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  ITQ OA Master
                </span>
                <div className="flex items-center gap-2 text-[var(--color-gray-mid)]">
                  <span>한국생산성본부</span>
                  <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                  <span>Excel, PowerPoint, 인터넷</span>
                </div>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">2021.12</span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  Microsoft Office Specialist 2016 Master
                </span>
                <div className="flex items-center gap-2 text-[var(--color-gray-mid)]">
                  <span>Microsoft</span>
                  <span className="w-[1px] h-3 bg-[var(--color-border)]" />
                  <span>Word, Excel, PowerPoint, Outlook</span>
                </div>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">2021.11</span>
            </li>
            <li className="flex flex-col tablet:flex-row tablet:justify-between gap-1 tablet:gap-4">
              <div className="column">
                <span className="text-lg font-bold text-[var(--color-gray-bold)]">
                  자동차 운전면허증 (2종보통)
                </span>
                <span className="text-[var(--color-gray-mid)]">
                  서울특별시경찰청 (구. 서울지방경찰청)
                </span>
              </div>
              <span className="text-[var(--color-gray-mid)] font-mono text-sm">2020.01</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
