export const whiteListCors = [
  'http://localhost:1234',
  'https://ttdadn-cse.web.app',
];

export const corsOptions = {
  origin: whiteListCors,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
