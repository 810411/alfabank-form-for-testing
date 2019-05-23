const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const {body} = req;
    let error = '';
    body && Object.keys(body).forEach(key => {
      if (body[key].length > 256) {
        error += `${key}: Max length of data field 256 characters. `
      }
      if (body[key].length > 128) {
        body[key] = body[key].substr(0, 128)
      }
    });

    if (!/^[а-яА-Я]+-?[а-яА-Я]+$/.test(body.name)) {
      error += `patronymic: Wrong field data: "${body.name}"`
    }

    if (!/^[а-яА-Я]+-?[а-яА-Я]+$/.test(body.surname)) {
      error += `patronymic: Wrong field data: "${body.surname}"`
    }

    if (!/^[а-яА-Я]+$/.test(body.patronymic)) {
      error += `patronymic: Wrong field data: "${body.patronymic}"`
    }

    if (!/^\d\d\.\d\d.\d\d\d\d$/.test(body.birthday)) {
      error += `birthday: Wrong field data: "${body.birthday}"`
    }

    if (!/^[\w]{4} № \d{8}$/.test(body.passport)) {
      error += `passport: Wrong field data: "${body.passport}"`
    }

    if (error) {
      res.status(422).jsonp({
        error: error
      })
    } else {
      next()
    }

  } else {
    next()
  }
});

server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running at localhost:8000')
});
