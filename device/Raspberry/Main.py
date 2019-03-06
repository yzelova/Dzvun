import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import picamera
import os
import requests
from PIL import Image
import json

url= "http://192.168.0.103:5000/device/getImage"


clickedCounter=0

camera = picamera.PiCamera()
camera.resolution = (640, 480)
camera.rotation=180;

def button_callback(channel):
    counter=0;
    for i in range(0,1000):
        inputValue = GPIO.input(18)
        if(inputValue==False):
            counter+=1
    if (counter==10 or counter == 0 ):
        global clickedCounter
        clickedCounter=clickedCounter+1
        global camera
        filePath = '/home/pi/Desktop/image'+str(clickedCounter)+'.jpg'
        camera.capture(filePath)
        print("Button was pushed!" + str(clickedCounter))
        
        files = {'file' : open(filePath, 'rb')}
        r = requests.post(url, files = files )
        print(r)
        
        print ("finished req")
        #os.system('gpicview '+ '/home/pi/Desktop/image'+str(clickedCounter)+'.jpg')
        
    
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BCM) # Use physical pin numbering
GPIO.setup(18, GPIO.IN,pull_up_down=GPIO.PUD_UP) # Set pin 10 to be an input pin and set initial value to be pulled low (off)

GPIO.add_event_detect(18,GPIO.RISING,callback=button_callback) # Setup event on pin 10 rising edge

message = input("Press enter to quit\n\n") # Run until someone presses enter


GPIO.cleanup() # Clean up
