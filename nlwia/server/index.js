import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  await download(request.params.id) //du7oVbcWdJs
  const result =  await transcribe()
  
  response.json({ result })
})

app.post("/summary", async (request, response) => {
  await summarize(request.body.text)
})

app.listen(3333, () => console.log("Server is running on port 3333"))
