import vlc
import sys

link = "https://altacanzona.streamakaci.com/altacanzona.mp3"
player = vlc.MediaPlayer()

while True:
    for line in sys.stdin:
        if 'stop':
            player.stop()
            break
        else:
            player.play(line)
            break

    
    




