import urllib2
import socket
import time
import requests


s = requests.Session()
# headers = {
#     'Pragma':'no-cache',
#     'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
#     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#     'Accept-Language':'en-US,en;q=0.8'
#     }
    
while True:

    for i in range(1,101):
        data = '{"heartRate":"50","temperature":"30","locationX":"1.2","locationY":"4.2","id":"%d"}' % i
        r = s.put("http://localhost:8080/sensor/api/dog/%d" % i, data=data)
        print r.text

    time.sleep(1)

