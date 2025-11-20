import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  imageUrl, 
  url 
}) => {
  
  const siteName = "Enora Lifestyle Spa & Wellness Center";
  const siteUrl = "https://www.enoralifestyle.com/";

  const fullTitle = `${title} - ${siteName}`;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImageUrl = "https://www.enoralifestyle.com/logo.png";
  const finalImageUrl = imageUrl || defaultImageUrl;

  const defaultKeywords =
    "Enora Lifestyle, lifestyle, elegance, style, premium packages, beauty services, wellness, fashion, services, Nigeria, quality, fast, spa in ibadan, best spa in ibadan, closest spa in ibadan, spa in ibadan, best spa ibadan, massage in ibadan, wellness spa ibadan, enora lifestyle spa, body massage ibadan, skincare ibadan";

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${keywords}, ${defaultKeywords}`} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />

      {/* Schema.org JSON-LD for AI search engines */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "name": siteName,
          "image": finalImageUrl,
          "url": finalUrl,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "21 Oyegbami Street, Felele Road",
            "addressLocality": "Ibadan",
            "addressRegion": "Oyo State",
            "addressCountry": "Nigeria"
          },
          "sameAs": [
            "https://www.instagram.com/enoralifestyle",
            "https://www.facebook.com/enoralifestyle"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
