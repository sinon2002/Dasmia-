/**
 * Image Hosts Configuration (add your image hosts here)
 */

export const imageHosts = [
    {
        protocol: 'https',
        hostname: 'images.unsplash.com',
    },
    {
        protocol: 'https',
        hostname: 'images.pexels.com',
    },
    {
        protocol: 'https',
        hostname: 'images.pixabay.com',
    },
    {
        protocol: 'https',
        hostname: 'img.rocket.new',
    },
    {
        protocol: 'https',
        hostname: 'i.pinimg.com',
    },
    {
        // Django backend (local dev) — direction cover images & gallery
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
    },
    {
        // Django backend (local dev, alt host) — direction cover images & gallery
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
    },
];
