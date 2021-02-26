import 'module-alias/register'
import app from './config/app'
require('dotenv').config()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
