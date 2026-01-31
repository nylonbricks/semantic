"use client";

import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { GiscusCodeBlock } from "./giscus-codeblock";
import { StepController } from "./step-controller";
import { useCategories } from "./useCategories";

const REPO_STATUS = {
  NORMAL: {
    MESSAGE: "Please enter a public repository.",
    COLOR: "text-[var(--color-gray-mid)]",
  },
  LOADING: {
    MESSAGE: "Verifying repository...",
    COLOR: "text-[var(--color-gray-mid)]",
  },
  SUCCESS: {
    MESSAGE: "✅ Repository verified successfully.",
    COLOR: "text-green-600",
  },
  FAIL: {
    MESSAGE: "❌ Failed to verify. Please check the repository name again.",
    COLOR: "text-red-600",
  },
} as const;

export const GiscusTester = () => {
  const [step, setStep] = useState(0);
  const [repository, setRepository] = useState("");
  const [category, setCategory] = useState("");
  const { data, status } = useCategories(repository);
  const { MESSAGE, COLOR } = REPO_STATUS[status];

  const handlePrev = useCallback(() => setStep((s) => s - 1), []);
  const handleNext = useCallback(() => setStep((s) => s + 1), []);

  return (
    <div className="mt-6 flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-toggle)]">
      {step === 0 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] font-semibold text-[var(--color-gray-accent)] text-base">
              ① Enter your repository
            </p>
            <input
              className="w-full rounded-md border border-[var(--color-background08)] bg-[var(--color-background)] px-[0.75rem] py-[0.5rem] font-mono text-sm focus:border-[var(--color-gray-light)] focus:outline-none"
              onChange={(e) => setRepository(e.target.value)}
              placeholder="owner/repo"
              type="text"
              value={repository}
            />
            <p className={`mt-[0.5rem] font-medium text-xs ${COLOR}`}>
              {MESSAGE}
            </p>
          </div>
          <StepController
            canNext={status === "SUCCESS"}
            maxStep={3}
            onNext={handleNext}
            onPrev={handlePrev}
            step={step}
          />
        </>
      )}

      {step === 1 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] font-semibold text-[var(--color-gray-accent)] text-base">
              ② Choose a discussion category
            </p>
            <select
              className="w-full rounded-md border border-[var(--color-background08)] bg-[var(--color-background)] px-[0.75rem] py-[0.5rem] font-mono text-sm invalid:text-[var(--color-gray-light)] focus:border-[var(--color-gray-light)] focus:outline-none"
              onChange={(e) => setCategory(e.target.value)}
              required
              value={category}
            >
              <option disabled value="">
                Select a category
              </option>
              {data?.categories.map((_category) => (
                <option key={_category.id} value={_category.id}>
                  {_category.emoji} {_category.name}
                </option>
              ))}
            </select>

            <p
              className={twMerge(
                "mt-[0.5rem] font-medium text-xs",
                category ? "text-green-600" : "text-[var(--color-gray-bold)]"
              )}
            >
              {category
                ? "✅ This category looks good to go!"
                : "Please select a category to continue."}
            </p>
          </div>
          <StepController
            canNext={!!category}
            maxStep={3}
            onNext={handleNext}
            onPrev={handlePrev}
            step={step}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div className="p-[1.25rem]">
            <p className="mb-[1rem] font-semibold text-[var(--color-gray-accent)] text-base">
              ③ Paste the embed code
            </p>
            <p className="mb-[0.5rem] font-medium text-[var(--color-gray-accent)] text-sm">
              Copy the following snippet and paste it into your{" "}
              <code>/src/constants/giscus.ts</code> file.
            </p>
            <GiscusCodeBlock
              category={
                data?.categories.find((c) => c.id === category)?.name || ""
              }
              categoryId={category}
              repository={repository}
              repositoryId={data?.repositoryId || ""}
            />
          </div>
          <StepController
            canNext={!!category}
            maxStep={3}
            onNext={handleNext}
            onPrev={handlePrev}
            step={step}
          />
        </>
      )}
    </div>
  );
};
