const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

// Universal route catcher
router.use((req,res)=> res.send('Wrong Route.'))

module.exports = router;