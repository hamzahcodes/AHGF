export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/home',
        '/customers/:path*',
        '/suppliers/:path*',
        '/stocks',
        '/staff',
        '/deliverynote',
        '/invoice',
        '/onboardingform'
    ]
}