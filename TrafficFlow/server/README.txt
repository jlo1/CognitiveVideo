To run server code:
  Install node
  Make sure the OpenCV code executable is in folder server/bin/ and
    named as "web"
  Run command: node server.js
  Open browser in http://localhost:8080
  If not working as expected, check browser console for problems

To get graph of traffic statistics from log.txt:
  Run command: grep -v "-" log.txt > simple_log.txt
    This gets rid of the hyphens in log.txt
  Run matlab script: parse_log.m
    This will display the graph of number of cars on road vs. time


