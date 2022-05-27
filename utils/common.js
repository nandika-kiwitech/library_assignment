module.exports = {

Error_Response: (res)=>{ res.status(400).send({
    message: error.message || "something went wrong"
})}


}