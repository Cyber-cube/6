import fs from "fs"

fs.readFile("src/data.json", "utf-8", (err, data) => {
  if (err) throw err
  const object = JSON.parse(data)
  object.year += 1
  const json = JSON.stringify(object, null, 2)

  fs.writeFile("src/data.json", json, (err) => {
    if (err) throw err
    console.log("File edited")
  })
  console.log(object)
})
