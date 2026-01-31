import { ROUTES } from "@semantic/constants/menu";
import { generatePageMetadata } from "@semantic/utils/metadata-util";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const AboutPage = async () => {
  try {
    const { default: AboutContent } = await import("./_content/about.mdx");
    return <AboutContent />;
  } catch {
    notFound();
  }
};

export default AboutPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({ title: "About", path: ROUTES.ABOUT });
};
