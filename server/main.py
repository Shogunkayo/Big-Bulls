from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)


@app.route('/api/dash/<string:key>', methods=['GET'])
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
        return "invalid data"
    return "valid"


@app.route('/api/bitcoin/<string:key>', methods=['GET'])
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
        return "invalid data"
    return "valid"

@app.route('/api/doge/<string:key>', methods=['GET'])
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
        return "invalid data"
    return "valid"


@app.route('/api/btccash/<string:key>', methods=['GET'])
def get_transaction_btccash(key):
    url="https://api.blockchair.com/bitcoin-cash/dashboards/address/"
    url=url+key
    payload={'key':'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res=requests.get(url,params=payload)
    addr_data=res.json()
    data2=addr_data['data']
    data3=data2[key]
    data4=data3['address']
    if data4['transaction_count']==0:
        return "invalid data"
    return "valid"

@app.route('/api/litecoin/<string:key>', methods=['GET'])
def get_transaction_litecoin(key):
    url="https://api.blockchair.com/litecoin/dashboards/address/"
    url=url+key
    payload={'key':'G___mnbXHkLk56C80jkTPzLBqiqgKqGs'}
    res=requests.get(url,params=payload)
    addr_data=res.json()
    data2=addr_data['data']
    data3=data2[key]
    data4=data3['address']
    if data4['transaction_count']==0:
        return "invalid data"
    return "valid"

if __name__ == "__main__":
    app.run(debug=True)
