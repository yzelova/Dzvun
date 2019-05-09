import subprocess


def connect_wifi(string):
    data=string.split('|')
    ssid=data[1]
    passkey=data[2]
    p1 = subprocess.Popen(["wpa_passphrase", ssid, passkey], stdout=subprocess.PIPE)
    p2 = subprocess.Popen(["sudo","tee","-a","/etc/wpa_supplicant/wpa_supplicant.conf",">","/dev/null"], stdin=p1.stdout, stdout=subprocess.PIPE)
    p1.stdout.close()  # Give p1 a SIGPIPE if p2 dies.
    output,err = p2.communicate()
