const express = require("express")
const {getNums,getMean, getMedian,getMode, handleNumberErrors} = require("./calculations")


const app = express();
app.use(express.json())


app.get("/mean", function(req, res){
    const numbers = getNums(req);
    handleNumberErrors(numbers)
    return res.send({
        operation: "mean",
        value: getMean(numbers)
    })
})

app.get("/median", function(req,res){
    const numbers = getNums(req);
    handleNumberErrors(numbers)
    return res.send({
        operation: "median",
        value: getMedian(numbers)
    })
})

app.get("/mode", function(req,res){
    const numbers = getNums(req);
    handleNumberErrors(numbers)
    return res.send({
        operation: "mode",
        value: getMode(numbers)
    })
})


app.use(function(err, req, res, next){
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: {message, status}
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
  });