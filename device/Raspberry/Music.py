import pygame

import time

pygame.init()

pygame.mixer.music.load("ring.mp3")

pygame.mixer.music.play()

#time.sleep(10)

pygame.mixer.music.stop()

def playRing():
    pygame.mixer.music.load("ring.mp3")
    pygame.mixer.music.play()

def playBackground():
    pygame.mixer.music.load("background.mp3")
    pygame.mixer.music.play()
    
def playReady():
    pygame.mixer.music.load("ready.mp3")
    pygame.mixer.music.play()
    
def stop():
    pygame.mixer.music.stop()