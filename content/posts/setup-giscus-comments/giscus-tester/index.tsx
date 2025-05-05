'use client';

import clsx from 'clsx';
import { useState, useCallback } from 'react';

import { GiscusCodeBlock } from './giscus-codeblock';
import { StepController } from './step-controller';
import { useCategories } from './useCategories';

const REPO_STATUS = {
  NORMAL: { MESSAGE: 'Please enter a public repository.', COLOR: 'text-[var(--color-gray-mid)]' },
  LOADING: { MESSAGE: 'Verifying repository...', COLOR: 'text-[var(--color-gray-mid)]' },
  SUCCESS: { MESSAGE: '✅ Repository verified successfully.', COLOR: 'text-green-600' },
  FAIL: {
    MESSAGE: '❌ Failed to verify. Please check the repository name again.',
    COLOR: 'text-red-600',
  },
} as const;

export const GiscusTester = () => {
  const [step, setStep] = useState(0);
  const [repository, setRepository] = useState('');
  const [category, setCategory] = useState('');
  const { data, status } = useCategories(repository);
  const { MESSAGE, COLOR } = REPO_STATUS[status];

  const handlePrev = useCallback(() => setStep((s) => s - 1), []);
  const handleNext = useCallback(() => setStep((s) => s + 1), []);

  return (
    <div className="flex flex-col bg-[var(--color-toggle)] rounded-lg border border-[var(--color-border)] overflow-hidden">
      {step === 0 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] text-base text-[var(--color-gray-accent)] font-semibold">
              ① Enter your repository
            </p>
            <input
              type="text"
              placeholder="owner/repo"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              className="w-full px-[0.75rem] py-[0.5rem] rounded-md text-sm font-mono border border-[var(--color-background08)] bg-[var(--color-background)] focus:outline-none focus:border-[var(--color-gray-light)]"
            />
            <p className={`mt-[0.5rem] text-xs font-medium ${COLOR}`}>{MESSAGE}</p>
          </div>
          <StepController
            maxStep={3}
            step={step}
            onPrev={handlePrev}
            onNext={handleNext}
            canNext={status === 'SUCCESS'}
          />
        </>
      )}

      {step === 1 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] text-base text-[var(--color-gray-accent)] font-semibold">
              ② Choose a discussion category
            </p>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-[0.75rem] py-[0.5rem] rounded-md text-sm font-mono border border-[var(--color-background08)] bg-[var(--color-background)] focus:outline-none focus:border-[var(--color-gray-light)] invalid:text-[var(--color-gray-light)]"
            >
              <option value="" disabled>
                Select a category
              </option>
              {data?.categories.map((_category) => (
                <option key={_category.id} value={_category.id}>
                  {_category.emoji} {_category.name}
                </option>
              ))}
            </select>

            <p
              className={clsx(
                'mt-[0.5rem] text-xs font-medium',
                category ? 'text-green-600' : 'text-[var(--color-gray-bold)]',
              )}
            >
              {category
                ? '✅ This category looks good to go!'
                : 'Please select a category to continue.'}
            </p>
          </div>
          <StepController
            maxStep={3}
            step={step}
            onPrev={handlePrev}
            onNext={handleNext}
            canNext={!!category}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] text-base text-[var(--color-gray-accent)] font-semibold">
              ③ Paste the embed code
            </p>
            <p className="text-[var(--color-gray-accent)] text-sm font-medium mb-[0.5rem]">
              Copy the following snippet and paste it into your{' '}
              <code>/src/constants/giscus.ts</code> file.
            </p>
            <GiscusCodeBlock
              repository={repository}
              repositoryId={data?.repositoryId || ''}
              category={data?.categories.find((c) => c.id === category)?.name || ''}
              categoryId={category}
            />
          </div>
          <StepController
            maxStep={3}
            step={step}
            onPrev={handlePrev}
            onNext={handleNext}
            canNext={!!category}
          />
        </>
      )}
    </div>
  );
};
