import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library

def setup_button(play,camera,button):
    GPIO.setwarnings(False) # Ignore warning for now
    GPIO.setmode(GPIO.BCM) # Use physical pin numbering
    #GPIO.setup(15, GPIO.IN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
    GPIO.setup(15, GPIO.IN,pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
    callback=lambda *a: button.button_callback(play,camera)
    GPIO.add_event_detect(15,GPIO.RISING,callback=callback) # Setup event on pin 10 rising edge
    GPIO.setup(27,GPIO.OUT)
    GPIO.output(27,GPIO.HIGH)

    for x in range (0,10):
        try:
            play.ready()
            break
        except :
                print('Error')
        time.sleep(10)
    #
