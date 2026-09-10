export const metadata = {
	title: {
		absolute: "ISO Certification Consultant, Cyber Security Certification, Corporate Training - Hawksberg International",
	},
	description:
		"Looking ISO certification and cybersecurity support? Hawksberg ISO Consultants offers cybersecurity and corporate training to improve workplace skills.",
	keywords: ["ISO Cyber Security", "ISO Certification Training", "ISO Certification"],
	robots: { index: true, follow: true },
	alternates: { canonical: "/about" },
};
export default function Layout({ children }) {
	return (
		<>
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="English" />
			{children}
		</>
	);
}
