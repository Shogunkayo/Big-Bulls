const express = require("express")
const cors = require("cors")
const EthCrypto = require("eth-crypto")
const crypto = require("crypto")
const base58check= require("base58check")


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
    var is_wif = 0;
    if (privateKey[0] == '5' && privateKey.length == 51) {
        is_wif = 1;
        
        
    } else if ((privateKey[0] == 'L' || privateKey[0] == 'K') && privateKey.length == 52) {
        is_wif= 2;
        
    }
    console.log(is_wif);

    if (is_wif == 1 || is_wif == 2) {

    privateKey = base58check.decode(privateKey,'hex');
    privateKey = privateKey['data'];
    } 

    console.log(privateKey)

    const publicKey = EthCrypto.publicKeyByPrivateKey(privateKey.slice(0,-2));
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