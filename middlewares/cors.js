module.exports.corsConfig = {
  origin: [
    'https://movie.students.nomoredomains.rocks',
    'http://movie.students.nomoredomains.rocks',
    'https://www.movie.students.nomoredomains.rocks',
    'http://www.movie.students.nomoredomains.rocks',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
