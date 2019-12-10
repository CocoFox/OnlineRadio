import vlc
import sys

link = "https://altacanzona.streamakaci.com/altacanzona.mp3"
player = vlc.MediaPlayer(link)
# player.stop()
print("vlc started")
playback = False
while True:
    if playback:
        player.play()
    line = sys.stdin.readline()
    if line:
        
        if 'stop' == line.rstrip('\n'):
            player.stop()
            print("pystop")
            line = ''
            playback = False
        else:
            print("'" + line.rstrip('\n') + "'" )
            player = vlc.MediaPlayer(line.rstrip('\n'))
            print("pyplay")
            line = ''
            playback = True

    
    




