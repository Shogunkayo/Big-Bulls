const express = require("express")
const cors = require("cors")
const EthCrypto = require("eth-crypto")
const crypto = require("crypto")


const app = express()

app.use(cors())
console.log("Start")
app.get("/publicKey/:publicKey",(req,res)=>{
    var publicKey = req.params.publicKey
    const address = EthCrypto.publicKey.toAddress(publicKey)
    const publicKeyUncompressed = EthCrypto.publicKey.decompress(publicKey);
    const compressed = EthCrypto.publicKey.compress(publicKey);
    var result = {
        'Uncompressed':publicKeyUncompressed,
        'Compressed':compressed
    }
    
    console.log(result)
    res.json(result)
})

app.get("/privateKey/:privateKey",(req,res)=>{
    var privateKey = req.params.privateKey
    const publicKey = EthCrypto.publicKeyByPrivateKey(privateKey);
    const address = EthCrypto.publicKey.toAddress(publicKey);
    const compressed = EthCrypto.publicKey.compress(publicKey);

    var result = {
        'Uncompressed':publicKey,
        'Compressed':compressed
    }
    
    console.log(result)
    res.json(result)
})

app.listen(8081)