import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://mannsoni.dev'; // Replace with actual production domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
