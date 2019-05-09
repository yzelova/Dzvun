import requests
import json
import time
from bluetooth_con import bluetooth_mac

blueMac=bluetooth_mac.get_bluetooth_mac()

url= 'https://dzvunserver.cfapps.eu10.hana.ondemand.com/live-image/get-state'
photoUrl = 'https://dzvunserver.cfapps.eu10.hana.ondemand.com/live-image/post-image'

def ping_server( camera):
    data={'device':blueMac}
    counter=0
    while True:
        print("pinging server")
        r=requests.post(url,data=data)
        print(r.content)
        testStr= "b\'true\'"
        if str(r.content) == testStr:
            print("sent photo")
            filePath = '/home/pi/Desktop/liveImage'+str(counter)+'.jpg'
            camera.capture(filePath)
            files = {'myImage' : open(filePath, 'rb')}
            postPhoto = requests.post(photoUrl, files = files, data = data)
            counter=counter+1
            print(postPhoto)
        time.sleep(1)
