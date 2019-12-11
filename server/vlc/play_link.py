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
            if(player.is_playing()):
                player.pause()
                print("pystop")
                playback = False
        else:
            print("'" + line.rstrip('\n') + "'" )
            player.stop()
            player.release()
            player = vlc.MediaPlayer(line.rstrip('\n'))
            print("pyplay")
            playback = True

    
    




