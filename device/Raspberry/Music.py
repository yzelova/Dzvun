import pygame

import time

pygame.init()
print("hello")

pygame.mixer.music.load("background.mp3")

pygame.mixer.music.play()

time.sleep(10)
