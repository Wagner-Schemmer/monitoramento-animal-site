module.exports = (req, res) => {
  res.status(200).json({ ok: true, service: "databov", time: new Date().toISOString() });
};
