var router = require('express').Router();
var client = require('prom-client');

router.use('/api', require('./api'));
router.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

module.exports = router;