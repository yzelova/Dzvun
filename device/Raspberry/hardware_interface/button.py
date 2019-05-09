import picamera
import os
import requests
import json
import time
from bluetooth_con import bluetooth_mac

blueMac=bluetooth_mac.get_bluetooth_mac()
url= 'https://dzvunserver.cfapps.eu10.hana.ondemand.com/uploadImage'

clickedCounter=0
flag=0

def button_callback(play,camera):
        time.sleep(0.3)
        global clickedCounter
        clickedCounter=clickedCounter+1
        print("Button was pushed!" + str(clickedCounter))
        if clickedCounter%2==0:
            counter=0;
            if ( flag == 0):
                counter+=1
                camera
                filePath = '/home/pi/Desktop/image'+str(clickedCounter)+'.jpg'
                camera.capture(filePath)
                play.ring()
                time.sleep(2)
                files = {'myImage' : open(filePath, 'rb')}
                data={'deviceId':blueMac
                        }
                r = requests.post(url, files = files, data = data)
                print(r)
                play.background()
                print ("finished req")
                global flag
                flag=1
        else :
                global flag
                if flag==1:
                    play.stop()
                    flag=0
        #time.sleep(5)
                
        
    
