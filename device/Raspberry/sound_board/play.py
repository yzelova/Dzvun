#Using the pygame library to handle the speaker
import pygame
import time
import sys

pygame.init()

pygame.mixer.music.load("./sound_board/current_music/ring.mp3")

pygame.mixer.music.play()

pygame.mixer.music.stop()

def ring():
    pygame.mixer.music.load("./sound_board/current_music/ring.mp3")
    pygame.mixer.music.play()

def background():
    pygame.mixer.music.load("./sound_board/current_music/background.mp3")
    pygame.mixer.music.play()
    
def ready():
    pygame.mixer.music.load("./sound_board/current_music/ready.mp3")
    pygame.mixer.music.play()
    
def stop():
    pygame.mixer.music.stop()
