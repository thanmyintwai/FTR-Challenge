import time
import json
import sys, select

from repeat_timer import RepeatTimer
from style import Style

questionInterval = 5
displayInterval = 0

addedValue = []

tracker = {
    'start': None,
    'end': None
}
timer = None
threads = {
    'display' : None,
    'question': None
}

definedStyle = Style()


def isInTheFirstThousandFibonacci(n):
        n1 = 0
        n2 = 1 
        nextTerm = 0

        series = []
        x = range(1, 1001)

        for i in x:
        #for(i = 1; i <= 1000; i++) {
            series.append(n1)
            #series.push(n1)
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        #}
        return n in series
        
      
   

def countOccurrence(a):
  k = {}
  for j in a:
    if j in k:
      #tmp = int(k[j])
      k[j] = str(int(k[j])+1)
      #k[j] +=1

    else:
      k[j] =str(1)

  finaly = {}

  for i in sorted(k.keys()):
      finaly[i] = k[i]


  #print(json.dumps(finaly[1:-1]))
  #print('>> ' + json.dumps(finaly)[1:-1])
  # print(style.result('>> ' + json.dumps(finaly)[1:-1]))
  #styledOutput('>> ' + json.dumps(finaly)[1:-1], 'result')
  print(definedStyle.result('>> ' + json.dumps(finaly)[1:-1]))

def displayAddedValue():
    tracker['end'] = time.perf_counter()

    if(len(addedValue) > 0):
        countOccurrence(addedValue)

    tracker['start'] = time.perf_counter()


def askInterval():
    answered = input('\033[1;32;40m>> Please input the amount of time in seconds between emitting numbers and their frequency\n')

    if (answered.isnumeric()):
        return int(answered)
    else:
        if (answered == 'quit'):
            input("\033[1;32;40m>> Thanks for playing, press any key to exit")
            sys.exit('\033[1;36;40mBye')
        else:
            raise Exception(">> Wrong answer... Try again. Only type decimal or \"quit\" to exit the program")
            #print(">> Wrong answer... Try again. Only type decimal or \"quit\" to exit the program")

def askNumber():
    answered = None
    #global status
    global addedValue


    if(len(addedValue) == 0):
        #print('>> Please enter the first number within {0} seconds'.format(questionInterval))
        #styledOutput('>> Please enter the first number within {0} seconds'.format(questionInterval), 'instruction')
        print(definedStyle.instruction('>> Please enter the first number within {0} seconds'.format(questionInterval)))
        #answered = input(">> Please enter the first number\n")
        i, o, e = select.select([sys.stdin], [], [], questionInterval - 0.2)
        if(i):
            answered = sys.stdin.readline().strip()
        else:
            #print(">> Input timeout")
            #styledOutput(">> Input timeout", 'warning')
            print(definedStyle.warning(">> Input timeout"))

    else:
        #answered = input(">> Please enter the next number\n")
        #print('>> Please enter the next number within {0} seconds'.format(questionInterval))
        #styledOutput('>> Please enter the next number within {0} seconds'.format(questionInterval), 'instruction')
        print(definedStyle.instruction('>> Please enter the next number within {0} seconds'.format(questionInterval)))
        i, o, e = select.select([sys.stdin], [], [], questionInterval - 0.2)
        if (i):
            answered = sys.stdin.readline().strip()
        else:
            #print(">> Input timeout. Wait for the next round")
            #styledOutput(">> Input timeout. Wait for the next round", 'warning')
            print(definedStyle.warning(">> Input timeout. Wait for the next round"))
            return
    if(answered):
        if(answered.isnumeric()):
            addedValue.append(int(answered))
            #styledOutput('Number {0} is added'.format(answered), 'result')
            print(definedStyle.info('Number {0} is added'.format(answered)))
            #if(len(addedValue) > 2):
                #if(addedValue[-1] == addedValue[-2] + addedValue[-3]):
            if(isInTheFirstThousandFibonacci(addedValue[-1])):
                #print(">> FIB \n")
                #styledOutput('>> FIB \n', 'result')
                print(definedStyle.info('>> FIB \n'))
        elif(answered in ['halt', 'resume', 'quit']):
            #status = answered
            if(answered == 'halt'):
                #print('>> timer halted')
                #styledOutput('>> timer halted', 'result')main
                print(definedStyle.info('>> timer halted'))
                threads['display'].cancel()

            if(answered == 'resume'):
                #print(">> timer resumed")
                #styledOutput('>> timer resumed', 'result')
                print(definedStyle.info('>> timer resumed'))

                displayTimer = RepeatTimer(displayInterval, displayAddedValue)
                threads['display'] = displayTimer
                displayTimer.start()
            if(answered == 'quit'):
                countOccurrence(addedValue)
                threads['display'].cancel()
                threads['question'].cancel()
                input(">> Thanks for playing, press any key to exit")
        else:
            #raise Exception("Please enter the correct format \n")
            #print(">> Please only add the either numbers or any from \"halt, resume, quit\"")
            #styledOutput(">> Please only add the either numbers or any from \"halt, resume, quit\"", 'instruction')
            print(definedStyle.instruction(">> Please only add the either numbers or any from \"halt, resume, quit\""))
        return

while True:
    try:
       #global timer
       displayInterval = askInterval()
       #styledOutput('Input {0} is registered'.format(displayInterval), 'result')
       print(definedStyle.info('Input {0} is registered'.format(displayInterval)))
       #print('timer has started')
       break
    except Exception as e:
        #print(e)
        #styledOutput(e, 'warning')
        print(definedStyle.warning(message=e))




displayTimer = RepeatTimer(displayInterval, displayAddedValue)
threads['display'] = displayTimer
displayTimer.start()
tracker['start'] = time.perf_counter()


questionTimer = RepeatTimer(questionInterval, askNumber)
threads['question'] = questionTimer
questionTimer.start()




#References
#https://realpython.com/python-timer/
#https://www.geeksforgeeks.org/timer-objects-python/
#https://www.pythonpool.com/python-timer/
#https://medium.com/greedygame-engineering/an-elegant-way-to-run-periodic-tasks-in-python-61b7c477b679
#https://www.section.io/engineering-education/how-to-perform-threading-timer-in-python/
#https://topic.alibabacloud.com/a/python-thread-pause-resume-exit-detail-and-example-_python_1_29_20095165.html
#https://www.bogotobogo.com/python/Multithread/python_multithreading_subclassing_Timer_Object.php
#https://geekflare.com/calculate-time-difference-in-python/#:~:text=To%20calculate%20the%20total%20time,birthday%20is%2019017960.127416%20seconds%20away.
#https://gist.github.com/atupal/5865237
#https://thewebdev.info/2021/10/17/how-to-add-keyboard-input-with-timeout-with-python/
#https://ozzmaker.com/add-colour-to-text-in-python/