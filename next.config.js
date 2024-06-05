/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/aktuelles',
                permanent: false,
            },
            {
                source: '/internal/mail',
                destination: 'https://rotekurve.awsapps.com/mail',
                permanent: false,
                basePath: false
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rotekurve.s3.eu-north-1.amazonaws.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**'
            }
        ]
    },
};

export default config;
