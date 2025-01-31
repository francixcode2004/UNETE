const express = require("express")
app=express()
PORT=3000

app.listen(PORT,()=>{
    console.log(`Server esta en http://localhost:${PORT}`)
})