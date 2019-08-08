const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  switch (url) {
    case '/':
      if (method === 'GET') {
        const html = getRootHtml();
        res.setHeader('Content-Type', 'text/html');

        res.write(html);
        return res.end();
      }
      break;
    case '/users':
      if (method === 'GET') {
        const users = getHtmlUsers();
        console.log(users);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment Module 3 - Users</title></head>');
        res.write(`<body>`);
        res.write('<ul>');
        res.write(users);
        res.write('</ul>');
        res.write(`</body>`);
        res.write('</html>');

        return res.end();
      }
      break;
    case '/create-user':
      console.log(url);
      console.log(method);
      if (method === 'POST') {
        const body = [];
        req.on('data', chunk => {
          console.log(chunk);
          body.push(chunk);
        });
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const username = parsedBody.split('=')[1];
          console.log(username);
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      }
      break;
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Default Page</title></head>');
  res.write('<body>Default page data</body>');
  res.write('</html>');
});

const getRootHtml = () => {
  const greetingHtml = greeting();
  const name = 'Max';

  const html =
    '<html>' +
    '<head><title>Assignment Module 3</title></head>' +
    '<body>' +
    `<div>${greetingHtml} ${name}</div><br/>` +
    '<form action="/create-user" method="POST">' +
    '<input type="text" name="username">' +
    '<button type="submit">Send</button>' +
    '</form>' +
    '</body>' +
    '</html>';

  return html;
};

const greeting = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return 'Good morning';

  if (hour >= 12 && hour < 19) return 'Good afternoon';

  if (hour >= 19) return 'Good evening';
};

const getHtmlUsers = () => {
  const userArray = [
    'gcp_user',
    'aws_user',
    'azure_user',
    'ibm_user',
    'digital_ocean_user',
    'oracle_user',
    'dell_user',
    'hpe_user'
  ];

  userArray.sort();
  const userHtml = userArray.map(user => {
    return `<li>${user}</li>`;
  });

  return userHtml.join('');
};

server.listen(3000);