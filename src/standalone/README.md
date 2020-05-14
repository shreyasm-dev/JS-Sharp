<h1>JS#</h1>
Here you can find a script where you will find a function. You can then link the file and pass in JS# code to the function. You must also pass in an element (and its innerHTML/value to use as the virtual console), and set up a console in an element (example shown below). The third argument is optional and only if you want line number on errors.



```javascript
 JS_Sharp(`println "insert code here"`, document.getElementById('myDiv').innerHTML, myCounter)
 console.log = function(input) {
  console.log(input)
  document.getElementById('myDiv').innerHTML += "<br/>" + input + "<br/>"
 }
 
 console.info = function(input) {
  console.info(input)
  document.getElementById('myDiv').innerHTML += "<br/><span style='color:lime'>" + input + "</span><br/>"
 }
 
 console.error = function(input) {
  console.error(input)
  document.getElementById('myDiv').innerHTML += "<br/><span style='color:red'>Error at line " + myCounter + ": " + input + "</span><br/>"
 }
```
