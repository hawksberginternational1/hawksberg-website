import "../styles.css";
import logo from "@/assets/shieldlogo.jpg";
import { company } from "@/data/site";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.hawksberginternational.com"),
  title: {
    default: "Hawksberg International | ISO Consulting, Cybersecurity and Training",
    template: "%s | Hawksberg International",
  },
  description:
    "Hawksberg International provides ISO consulting, cybersecurity, risk management, compliance and professional training for organizations and professionals.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hawksberg International | ISO Consulting, Cybersecurity and Training",
    description:
      "Hawksberg International provides ISO consulting, cybersecurity, risk management, compliance and professional training for organizations and professionals.",
    url: "https://www.hawksberginternational.com/",
    siteName: "Hawksberg International",
    locale: "en_IN",
    type: "website",
    images: [{ url: logo.src, alt: "Hawksberg International" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawksberg International | ISO Consulting, Cybersecurity and Training",
    description:
      "Hawksberg International provides ISO consulting, cybersecurity, risk management, compliance and professional training for organizations and professionals.",
    images: [logo.src],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: logo.src,
    shortcut: logo.src,
    apple: logo.src,
  },
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://www.hawksberginternational.com",
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 58, Gandhi Street, Rajaji Nagar, Tiruvottiyur",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600019",
      addressCountry: "IN",
    },
    sameAs: [company.social.instagram, company.social.linkedin],
  };

  // return (
  //   <html lang="en">
  //     <body>
  //       {children}
  //       <script
  //         type="application/ld+json"
  //         dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
  //       />
  //     </body>
  //   </html>
  // );
  return ( 
  <html lang="en">
   <head>
  <meta
    httpEquiv="Content-Type"
    content="text/html; charset=utf-8"
  />
  <meta name="language" content="English" />
</head>

    {/* <body> 
      {children} 
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} 
      /> 
    </body>  */}
    <body>
  {children}

  {/* Google Analytics */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-7TMBC9XZF5"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-7TMBC9XZF5');
    `}
  </Script>

  {/* Organization Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(organization),
    }}
  />
</body>
  </html> 
);
}