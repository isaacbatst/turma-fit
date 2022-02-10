/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  async redirects(){
    return [
      {
        source: '/',
        destination: '/personal/students',
        permanent: false
      }
    ]
  }
}
