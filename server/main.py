from Cryptodome.Hash import keccak, RIPEMD160
import ecdsa
import base58
import hashlib
from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_wallet_address_eth(pubaddr):
    kins = keccak.new(digest_bits=256)
    a = bytearray.fromhex(pubaddr)
    kins.update(a)
    a = kins.hexdigest()[-40:]
    a = '0x'+a
    return a


def get_wallet_address_btc(publickey_c):
    bts = bytearray.fromhex(publickey_c)
    shahashed = hashlib.sha256(bts).hexdigest()
    rmd = bytearray.fromhex(shahashed)
    rins = RIPEMD160.new()
    rins.update(rmd)
    ripehashed = rins.hexdigest()
    ripehashed = "00"+ripehashed
    base58.b58
    bt = base58.b58encode_check(bytearray.fromhex(ripehashed))
    return bt.decode()


def get_wallet_address_doge(public_key_hex):
    public_key_bytes = bytes.fromhex(public_key_hex)

    # create an ecdsa VerifyingKey object from the public key bytes
    vk = ecdsa.VerifyingKey.from_string(
        public_key_bytes, curve=ecdsa.SECP256k1)
    print(vk)
    # get the compressed public key bytes
    compressed_public_key = vk.to_string("compressed")

    # compute the hash160 of the compressed public key
    ripemd160 = hashlib.new('ripemd160')
    ripemd160.update(hashlib.sha256(compressed_public_key).digest())
    hash160 = ripemd160.digest()

    # prepend the Dogecoin address version byte (30 in decimal)
    version_byte = bytes.fromhex("1e")
    hash160_with_version = version_byte + hash160

    # compute the checksum (first 4 bytes of the double sha256 of the version byte + hash160)
    checksum = hashlib.sha256(hashlib.sha256(
        hash160_with_version).digest()).digest()[:4]

    # concatenate the version byte + hash160 + checksum
    address_bytes = hash160_with_version + checksum

    # base58 encode the address bytes to get the final Dogecoin address
    address = base58.b58encode(address_bytes)
    return str(address.decode())


def get_transactions_dash(key):

    url = "https://api.blockchair.com/dash/dashboards/address/"
    url = url + key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1


def get_transactions_btc(key):

    url = "https://api.blockchair.com/bitcoin/dashboards/address/"
    url = url + key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1

def get_transactions_doge(key):

    url = "https://api.blockchair.com/dogecoin/dashboards/address/"
    url = url + key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1


def get_transaction_btccash(key):
    url = "https://api.blockchair.com/bitcoin-cash/dashboards/address/"
    url = url+key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1


def get_transaction_litecoin(key):
    url = "https://api.blockchair.com/litecoin/dashboards/address/"
    url = url+key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1



def get_transaction_ethereum(key):
    url = "https://api.blockchair.com/ethereum/dashboards/address/"
    url = url+key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1



def get_transaction_tether(key):
    url = "https://api.blockchair.com/ethereum/erc-20/0xdac17f958d2ee523a2206206994597c13d831ec7/dashboards/address/"
    url = url+key
    payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res = requests.get(url, params=payload)
    addr_data = res.json()
    data2 = addr_data['data']
    data3 = data2[key]
    data4 = data3['address']
    if data4['transaction_count'] == 0:
        return 0
    return 1


@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == "POST":
        data = request.get_json()
        url = "http://localhost:8081/uncompress/"+data['key']
        res = requests.get(url)
        resObj = json.loads(res.text)
        print(resObj)
        uncompressed = resObj['Uncompressed']
        compressed = resObj['Compressed']
        someObj = {'name': get_wallet_address_doge(uncompressed)}
        print(someObj)
    return jsonify(someObj)


@app.route("/search-img", methods=['GET', 'POST'])
def search_img():
    if request.method == "POST":
        data = request.files.get('image')
        print(data)
    return "Done"


if __name__ == "__main__":
    app.run(debug=True)
