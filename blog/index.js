const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const chalk = require('chalk')
//-------------------------
//  Starting service
//-------------------------

app.listen(config.PORT, () => {
  logger.info(chalk.green(`Server running on port ${config.PORT}`))
})






