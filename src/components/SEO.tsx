import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, imageUrl, url }) => {
  const siteName = "Enora Lifestyle";
  const fullTitle = `${title} - ${siteName}`;
  const defaultImageUrl = "https://www.enoralifestyle.com/logo.png";
  const finalImageUrl = imageUrl || defaultImageUrl;
  const siteUrl = "https://www.enoralifestyle.com/";
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;


  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
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
    </Helmet>
  );
};

export default SEO;