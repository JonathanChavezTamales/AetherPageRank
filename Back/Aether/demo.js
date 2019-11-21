var net = require('net');

var client = net.connect(1030, 'localhost');

client.write('Hedfg');

client.end();
