function showHome(req, res) {
  res.render("home", { title: "Home" });
}

module.exports = { showHome };
