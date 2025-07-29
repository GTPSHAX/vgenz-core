// importing the necessary modules
const path = require('path');
let cnf = require(path.join(__dirname, '..', '..', 'Config.js'));
const express = require('express');
const router = express.Router();

router.post('/server_data.php', function (req, res) {
    const cnf = getConfig(); // baca ulang setiap request

    let server_ip = cnf.server_ip;
    let server_port = cnf.server_port;
    let ip = req.ip || req.connection.remoteAddress;
    console.log(`[GrowtopiaGame] ${ip} requested server data`);

    if (cnf.beta.allow_ips.includes(ip)) {
        server_ip = cnf.beta.server_ip;
        server_port = cnf.beta.server_port;
    }

    const content = `server|${server_ip}
port|${server_port}
type|1
#maint|lorem ipsum dolor sit amet
loginurl|${cnf.loginurl}
type2|${cnf.type2 ? "1" : "0"}
meta|${cnf.meta}
RTENDMARKERBS1001`;
    res.send(content);
});

function getConfig() {
    const configPath = path.join(__dirname, '..', '..', 'Config.js');
    delete require.cache[require.resolve(configPath)];
    return require(configPath);
}


// exporting the router
module.exports = router;