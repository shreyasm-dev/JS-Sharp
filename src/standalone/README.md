<h1>JS#</h1>
Here you can find a script where you will find a function. Only use this in a browser, not in NodeJS. You can then link the file and pass in JS# code to the function. You must also pass in an element (and its innerHTML/value to use as the virtual console). The third argument is optional and only if you want line number on errors. You must pass in a variable with a value of 1.



```javascript

 var myCounter = 1
 
 JS_Sharp(`println "insert code here"`, document.getElementById('myDiv').innerHTML, myCounter)
```
