import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello World');
});

export const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
