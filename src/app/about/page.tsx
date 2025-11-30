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
