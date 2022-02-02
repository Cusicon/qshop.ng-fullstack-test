const mongoose = require("mongoose")

module.exports = () => {
  const onlineConnectionUrl = process.env.MONGODB_ONLINE_URI
  const localConnectionUrl = process.env.MONGODB_LOCAL_URI

  mongoose.connect(
    process.env.NODE_ENV === "development" ? localConnectionUrl : onlineConnectionUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  const db = mongoose.connection

  db.once("open", () => console.log(`Connected to MongoDB -> ${process.env.APP_NAME}`))

  db.on("error", (err) => console.log({ ...err }))

  return db
}
