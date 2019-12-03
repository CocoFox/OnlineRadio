import vlc
import sys

link = "https://altacanzona.streamakaci.com/altacanzona.mp3"
player = vlc.MediaPlayer('https://altacanzona.streamakaci.com/altacanzona.mp3')
print(player.play())
player.play()

while True:
    if sys.argv[1] != 0:
        if sys.argv[2] != 0:
            player.play()
            print("play")
    else:
        player.stop()
    




