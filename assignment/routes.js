const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Assigment</title></head>');
        res.write('<body><form action="/user" method="POST">User Name: <input type="text" name="user"><button type="submit">Submit</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const username = parseBody.split('=')[1];
            res.write('<html>');
            res.write('<head><title>Assigment</title></head>');
            res.write('<body><ul><li>' + username + '</li></ul><br><button><a href="/createUser">Create User</a></button></body>');
            res.write('</html>');
            res.statusCode = 302;
            return res.end();
        });
    }

    if (url === '/createUser') {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}

module.exports.handler = requestHandler;