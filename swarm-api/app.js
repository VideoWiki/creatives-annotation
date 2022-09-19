import express from "express"
import { routes } from "./routes/index.js"
import helmet from "helmet";
import compression from "compression";

const app = express()
app.use(express.json())
app.use(helmet())
app.use(compression())

app.get('/', (req, res) => res.send('App is working'))
app.use('/api', routes)

app.listen(process.env.PORT, () => console.log('Example app listening on port ' + process.env.PORT))

export { app }
