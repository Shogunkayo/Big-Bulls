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


## Functions for detecting right wallet address

def bitcoin(wal_address,type):
  if(type=='wallet'):
    l = len(wal_address)
    check = 0
    if(l>=26 and l<=34):
        check=check+1
    if(wal_address[0] == '1' or wal_address[0]=='3'):
        check=check+1
    if(check==2):
        url = "https://api.blockchair.com/bitcoin/dashboards/address/"
        url = url + wal_address
        payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
        res = requests.get(url, params=payload)
        addr_data = res.json()
        data2 = addr_data['data']
        data3 = data2[wal_address]
        data4 = data3['address']
        if data4['transaction_count'] == 0:
            return "invalid data"
        return "valid"
       
  if(type!='wallet'):
     wal_address = get_wallet_address_btc(wal_address)
     url = "https://api.blockchair.com/bitcoin/dashboards/address/"
     url = url + wal_address
     payload = {'key': 'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
     res = requests.get(url, params=payload)
     addr_data = res.json()
     data2 = addr_data['data']
     data3 = data2[wal_address]
     data4 = data3['address']
     if data4['transaction_count'] == 0:
        return "invalid data"
     return "valid"

def etherium(wal_address):
  l = len(wal_address)
  check = 0
  if(len(wal_address)==42 and '0x' in wal_address):
    return 1
  else:
    return 0

def monero(wal_address):
  l = len(wal_address)
  check = 0
  if(l>=76 and l<=95):
    check=check+1
  if wal_address.startswith('4'):
    check=check+1
  if check==2:
    return 1
  else:
    return 0
  
def dash(wal_address):
  l = len(wal_address)
  if(l==34 and wal_address.startswith('X')):
    return 1
  else:
    return 0
  
def dogecoin(wal_address):
  l = len(wal_address)
  if(l==34 and wal_address.startswith('D')):
    return 1
  else:
    return 0
  
def litecoin(wal_address):
  l = len(wal_address)
  if(l==34 and (wal_address.startswith('L') or wal_address.startswith('M'))):
    return 1
  else:
    return 0

## Functions for getting wallet addresses from different keys

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

def get_wallet_address_ltc(public_key):
    # add the prefix byte 0x30 to indicate Litecoin's main network
    prefix_public_key = b'\x30' + bytes(str(public_key).encode('utf-8'))
    print(b'\x30' + b'032c5e2e5b5a27271154d1f537b3847722b104bc642b304d78e13c9c1eb3f98f7b')

    # perform SHA-256 hash on the public key
    sha256_1 = hashlib.sha256(prefix_public_key).digest()

    # perform RIPEMD-160 hash on the SHA-256 hash
    ripemd160 = hashlib.new('ripemd160')
    ripemd160.update(sha256_1)
    hash160 = ripemd160.digest()

    # add the prefix byte 0x30 to indicate Litecoin's main network
    prefix_hash160 = b'\x30' + hash160

    # perform SHA-256 hash on the prefix hash160
    sha256_2 = hashlib.sha256(prefix_hash160).digest()

    # perform SHA-256 hash on the SHA-256 hash
    sha256_3 = hashlib.sha256(sha256_2).digest()

    # take the first 4 bytes of the final hash as the checksum
    checksum = sha256_3[:4]

    # add the checksum to the prefix hash160 to get the final address
    address_bytes = prefix_hash160 + checksum

    # encode the address bytes in Base58Check encoding to get the address string
    address_string = base58.b58encode(address_bytes)
    return str(address_string.decode())


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

def validate_for_all1(address,type):
   btc = bitcoin(address,type)
   overall_data = {
      'bitcoin':btc
   }
   return overall_data

def validate_for_all2(address,type):
   btc = bitcoin(address['Compressed'],type)
   overall_data = {
      bitcoin:btc
   }
   return overall_data

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == "POST":
        data = request.get_json()
        if data['type']=='wallet':
           overall_data = validate_for_all1(data['key'],data['type'])
        else:
            url = "http://localhost:8081/uncompress/"+data['key']
            res = requests.get(url)
            resObj = json.loads(res.text)
            print(resObj)
            overall_data = validate_for_all2(resObj,data['type'])
        # uncompressed = resObj['Uncompressed']
        # compressed = resObj['Compressed']

        

        # someObj = {'name': get_wallet_address_ltc(compressed)}
        # print(someObj)
        print(overall_data)
    return jsonify(overall_data)


@app.route("/search-img", methods=['GET', 'POST'])
def search_img():
    if request.method == "POST":
        data = request.files.get('image')
        print(data)
    return "Done"


if __name__ == "__main__":
    app.run(debug=True)
