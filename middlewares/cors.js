module.exports.corsConfig = {
  origin: [
    // 'https://advent.students.nomoredomains.rocks',
    // 'http://advent.students.nomoredomains.rocks',
    // 'https://www.advent.students.nomoredomains.rocks',
    // 'http://www.advent.students.nomoredomains.rocks',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
