<h1>JS#</h1>
Here you can find a script where you will find a function. Only use this in a browser, not in NodeJS. You can then link the file and pass in JS# code to the function. You must also pass in an element (and its innerHTML/value to use as the virtual console). The third argument is optional and only if you want line number on errors. If you choose to use it, you must pass in a variable with a value of 1.



```javascript

 var myCounter = 1
 new JS_Sharp(`println "insert code here"`, document.getElementById('myDiv'), myCounter)
```

You can also see what variables and processes are going on.

```javascript

 var myCounter = 1
 var code = new JS_Sharp(`println "insert code here"`, document.getElementById('myDiv'), myCounter)
 console.log(code.processes)
 console.log(code.variables)
```
Because the console relies on innerHTML/value of an element, wait until the page loads to execute it. 
<br><hr><br><br>
Remember that JS# is extremely strict about spaces and newlines.
