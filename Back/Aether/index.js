const express = require('express');
const app = express();
const net = require('net');
const cors = require('cors');

const PORT = 4000;

app.use(cors());

app.get('/search', (req, res) => {
  const client = net.connect(1120, 'localhost', err => {});
  let term = req.query.query;
  console.log(`Nuevo query | SEARCH | ${new Date()}`);
  client.write(`GET::term::${term}`, err => {
    client.end(() => {
      const server = net.createServer(c => {
        c.on('data', data => {
          stream = data.toString('utf-8');
          stream = stream.substring(1, stream.length - 1);
          results = [];
          stream = stream.split(',');
          for (i in stream) {
            if (stream[i] != '') {
              results.push(stream[i].trim());
            }
          }

          server.close(() => {
            res.json({
              results
            });
          });
        });
      });
      server.listen(1121, () => {
        console.log(`Nuevo response ${new Date()}`);
      });
    });
  });
});

app.get('/results', (req, res) => {
  const client = net.connect(1120, 'localhost', err => {});
  let term = req.query.query;
  console.log(`Nuevo query | RESULTS | ${new Date()}`);
  client.write(`GET::results::${term}`, err => {
    client.end(() => {
      const server = net.createServer(c => {
        c.on('data', data => {
          stream = data.toString('utf-8');

          results = [];
          stream = stream.split('-#-#');
          console.log(stream);
          for (i in stream) {
            console.log(i);
            if (stream[i] != '') {
              brokenStream = stream[i].split('\n');
              console.log(brokenStream);
              result = {
                title: brokenStream[0],
                href: brokenStream[1],
                url: brokenStream[2],
                metaDescription: brokenStream[3],
                rank: brokenStream[4]
              };
              console.log(result);
              results.push(result);
            }
          }

          server.close(() => {
            res.json({
              results
            });
          });
        });
      });
      server.listen(1121, () => {
        console.log(`Nuevo response ${new Date()}`);
      });
    });
  });
});

app.listen(PORT, () => console.log(`Tunel corriendo en puerto ${PORT}`));
