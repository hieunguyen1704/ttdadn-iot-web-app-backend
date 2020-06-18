export const interactDB = (req, res) => {
  global.saveDB = !global.saveDB;
  res.json({ message: 'saveDB has been toggled to ' + global.saveDB });
};
