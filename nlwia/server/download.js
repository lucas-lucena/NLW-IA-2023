import ytdl from "ytdl-core"
import fs from "fs"
import { resolve } from "path"

export const download = (videoId) => new Promise((resolve, reject) => {
  console.log("Dowloading video:", videoId)
  const videoURL = "https://www.youtube.com/shorts/" + videoId

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      console.log(seconds)

      if (seconds > 60) {
        throw new Error("A duração desse video é maior do que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("Download do video foi finalizada.")
      resolve()
    })
    .on("error", (Error) => {
      console.log(
        "Não foi possível fazer o download do video. Detalhes do erro:",
        error
      )
      reject(error)
    }).pipe(fs.createWriteStream('./tmp/audio.mp4'))
})
