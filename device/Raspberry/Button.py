import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import picamera
import Music
import os
import requests
from PIL import Image
import json
import time

url= 'http://82.137.124.87:5000/uploadImage'


clickedCounter=0

camera = picamera.PiCamera()
camera.resolution = (640, 480)
camera.rotation=180;

flag=0


def button_callback(channel):

        global clickedCounter
        clickedCounter=clickedCounter+1
        print("Button was pushed!" + str(clickedCounter))
        if clickedCounter%2==0:
            
            counter=0;
            if ( flag == 0):
                Music.playRing()
                time.sleep(2)
                counter+=1
                global camera
                filePath = '/home/pi/Desktop/image'+str(clickedCounter)+'.jpg'
                camera.capture(filePath)
            
                files = {'myImage' : open(filePath, 'rb')}
                r = requests.post(url, files = files )
                print(r)
                Music.playBackground()
                print ("finished req")
                global flag
                flag=1
                #os.system('gpicview '+ '/home/pi/Desktop/image'+str(clickedCounter)+'.jpg')
            else :
                global flag
                if flag==1:
                    Music.stop()
                    flag=0
        #time.sleep(5)
                
        
    
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BCM) # Use physical pin numbering
#GPIO.setup(15, GPIO.IN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
GPIO.setup(15, GPIO.IN,pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
GPIO.add_event_detect(15,GPIO.RISING,callback=button_callback) # Setup event on pin 10 rising edge
GPIO.setup(27,GPIO.OUT)
GPIO.output(27,GPIO.HIGH)

for x in range (0,10):
    try:
        Music.playReady()
        break
    except :
            print('Error')
    time.sleep(10)
#message = input("Press enter to quit\n\n") # Run until someone presses enter


GPIO.cleanup() # Clean up
