exports.get_agregar = (req, res, next) => {
  response.render("agregar_planta");
}

exports.post_agregar = (req, res, next) => {
  console.log(req.body.planta);
  plantas.push(req.body.planta);
  fs.appendFileSync("plantas.txt", req.body.planta + "\n");
  const plantas_r = fs.readFileSync("plantas.txt")
  console.log(plantas_r);
  let html = html_header;
  html += "<div class='section'>";
  for (let p of plantas) {
    html += `
    <div class="card">  <div class="card-content">
          <div class="media-content">
            <p class="title is-4">${p}</p>
          </div>
        </div>
        </div>`;
  }
  html += "</div>";
  html += html_footer;
  res.send(html);
  console.log(plantas);
}