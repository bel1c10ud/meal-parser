const withPWA = require('next-pwa')
const runtimeCaching = require('./public/cache-custom');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  images: {
    domains: [process.env.SCHOOL_ADDRESS]
  }
});