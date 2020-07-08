import requests, psutil
import sys, os, time, datetime, daemonize

def logger(logTime, logLoad, domain='http://127.0.0.1:8001/api/log/'):
    try:
        requests.post(domain, json={"record":{"name":str(logTime),"load":logLoad}})
        print(str(logTime) + " | " + str(logLoad))
    except Exception as e:
        print(str(logTime) + " | Error: {}".format(e))
    
def main():
    interval = 10

    if len(sys.argv) == 1:
        while True:
            logger(datetime.datetime.now(), psutil.cpu_percent())
            time.sleep(interval)
    elif len(sys.argv) == 3:
        if sys.argv[1] == '-h':
            otherDomian = sys.argv[2]
            while True:
                logger(datetime.datetime.now(), psutil.cpu_percent(), otherDomian)
                time.sleep(interval)
    else:
        print('Error. Unknown args. \nTry: -h http://yourdomain.com/api/log/')
        os.system('PAUSE')

if __name__ == "__main__":
    pidfile = "logger_CPU_load.pid"
    daemon = daemonize.Daemonize(app='logger CPU load', pid=pidfile, action=main)
    daemon.start()
