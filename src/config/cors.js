export const whiteListCors = [
  'http://localhost:1234',
  'https://bookstore-huydnguyen-react.firebaseapp.com',
  'https://bookstore-huydnguyen-react.web.app',
  'http://192.168.100.6:1234',
  'https://mybookstore.ml',
  'https://www.mybookstore.ml'
];

export const corsOptions = {
  origin: whiteListCors,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
