import time
import requests
import random

s = requests.Session()

xMin = -114.052700
xMax = -114.051200
yMin   = 51.037200
yMax   = 51.037700

temperatureMin = 38.3
temperatureMax = 39.2

heartRateMin = 60
heartRateMax = 140

url = 'http://localhost:8080/sensor/api/dog'
#url = 'http://sensor.saddlewoof.psidox.com/api/dog'

def entropy(value, min, max, step):

    resolution = 1 / step

    if value == None:
        value = random.randrange(min * resolution, max * resolution, step * resolution) / resolution
    else:
        value += (step * random.choice([-1,1]))

    if (value < min):
        value = min + step

    if (value > max):
        value = max - step

    return value

dogs = {}
while True:
    for i in range(1,101):

        dog = dogs.get(i)

        if not dog:
            dogs[i] = dog = {'x': None, 'y': None, 'temperature': None, 'heartRate': None}

        dog['x'] = entropy(dog['x'], xMin, xMax, 0.000001)
        dog['y'] = entropy(dog['y'], yMin, yMax, 0.000001)
        dog['temperature'] = entropy(dog['temperature'], temperatureMin, temperatureMax, 0.1)
        dog['heartRate'] = entropy(dog['heartRate'], heartRateMin, heartRateMax, 1)

        data = '{"heartRate":"%d","temperature":"%f","locationX":"%f","locationY":"%f","id":"%d"}' % (dog['heartRate'], dog['temperature'], dog['x'], dog['y'], i)

        try:
            r = s.put("%s/%d" % (url, i), data=data)
            print r.text
        except:
            pass # Server might not be up

    time.sleep(3)

