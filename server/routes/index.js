const path = require('path')
const router = require('express').Router()

router.get('/*', (req, res, next) => {
  const routePath = path.join(__dirname + '..', '..', 'dist/' + 'index.html')
  res.sendFile('index.html', { root: 'dist' })
  // res.sendFile(routePath);
})

module.exports = router
