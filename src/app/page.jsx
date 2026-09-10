import HomePage from "@/components/HomePage";

export const metadata = {
  title: {
    absolute: "ISO Consultant in Chennai | ISO Certification Training - Hawksberg International",
  },
  description:
    "Hawksberg International ISO consultant Chennai Provides ISO certification support and ISO certification training services to help businesses meet international standards and requirements.",
  keywords: ["ISO Consultant Chennai", "ISO Certification Training", "ISO Certification"],
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <HomePage />
    </>
  );
}
