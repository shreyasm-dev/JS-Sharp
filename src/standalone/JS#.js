
function JS_Sharp(code, virtualConsole, otherCounter = false) {

  function deepCloneObject(stdin) {
    return JSON.parse(JSON.stringify(stdin))
  }
  var isAComment = false;
  var processRecorder;
  var variables = {};
  var processes = {};
  var isProcess = false;
  var string2 = code.split('\n')
  for (var stringSplitter = 0; stringSplitter < string2.length; stringSplitter++) {
    var string = string2[stringSplitter].replace(/[ ,]+/g, ",");
    if (otherCounter != false) {
      otherCounter = parseInt(stringSplitter) + 1
    }
    string = string.split(',')
    if (string[0][0] == '/' && string[0][1] == '*') {
      isAComment = true;
    } else if (isAComment) {
      if (string[0][0] == '*' && string[0][1] == '/') {
        isAComment = false
      } else {
        continue;
      }
    } else if (string[0] == 'process') {
      if (isValid(string[1]) && string[2] == '{') {
        isProcess = true;
        eval('processes.' + string[1] + ' = []')
        processRecorder = string[1]
      } else if (!isValid(string[1])) {
        console.error('SyntaxError: Invalid name for process')
        return;
      }
    } else if (isProcess) {
      if (string[0] == '}') {
        isProcess = false;
      } else if (stringSplitter == string2.length - 1) {
        if (string[0] != '}') {
          console.error('SyntaxError: Expected "}" but instead got: ' + string.join(' '))
          return;
        }
      } else {
        processes[processRecorder].push(string)
      }
    } else if (string[0] == 'String') {
      if (string.length == 3 || string.length == 1) {
        console.error('SyntaxError: Incomplete String decalaration statement')
        return;
      } else if (string[2] == '=' && isString(string[3]) && string.length == 4) {
        eval('variables.' + string[1] + ' = ' + string[3])
      } else if (string.length == [2] && !string.includes('=')) {
        eval('variables.' + string[1] + ' = null')
      } else if (string[2] != '=') {
        console.error('SyntaxError: Expected "=" but instead got "' + string[2] + '"')
        return;
      } else if (!isString(string[3]) && string.length == 4) {
        console.error('SyntaxError: Missing quote')
        return;
      } else if (string.length > 4) {
        var tempstring = deepCloneObject(string)
        tempstring.shift()
        tempstring.shift()
        tempstring.shift()
        tempstring = tempstring.join(' ')
        eval('variables.' + string[1] + ' = ' + tempstring)
      } else if (!isValid(string[1])) {
        console.error('SyntaxError: Invalid characters for variable name')
        return;
      }
    } else if (string[0] == 'println') {
      if (string[1] == undefined) {
        console.error('SyntaxError: No statement to print')
        return;
      }
      var tempstring = deepCloneObject(string)
      tempstring.shift()
      tempstring = tempstring.join(' ')
      eval('console.log(' + tempstring + ')')
    } else if (string[0] == 'print') {
      if (string[1] == undefined) {
        console.error('SyntaxError: No statement to print')
        return;
      }
      var tempstring = deepCloneObject(string)
      tempstring.shift()
      tempstring = tempstring.join(' ')
      eval('virtualConsole += ' + tempstring)

    } else if (string[0] == 'num') {
      if (string.length == 3) {
        console.error('SyntaxError: Incomplete int decalaration statement')
        return;
      } else if (string[2] == '=' && !isNaN(string[3]) && string.length == 4) {
        eval('variables.' + string[1] + ' = ' + Number(string[3]))
      } else if (string.length == [2] && !string.includes('=')) {
        eval('variables.' + string[1] + ' = null')
      } else if (string[2] != '=') {
        console.error('SyntaxError: Expected "=" but instead got "' + string[2] + '"')
        return;
      } else if ((string[3].includes('"') || string[3].includes("'")) && string.length == 4) {
        console.error('TypeError: Did not expect quote')
        return;
      } else if (string.length > 4) {
        console.error("SyntaxError: Did not expect extra terms")
      } else if (!isValid(string[1])) {
        console.error('SyntaxError: Invalid aracters for variable name')
        return;
      }
    } else if (string[0] == 'rndfloat') {
      if (string.length > 2) {
        console.error('SyntaxError: Unexpected extra terms')
        return;
      } else if (string.length == 1) {
        console.error("SyntaxError: Expected variable name but never got one")
      } else if (!isValid(string[1])) {
        console.error('SyntaxError: Invalid characters for variable name')
        return;
      } else if (string.length == 2 && isValid(string[1])) {
        eval('variables.' + string[1] + ' = ' + Math.random())
      }
    } else if (string[0] == 'rndint') {
      if (string.length > 2) {
        console.error('SyntaxError: Unexpected extra terms')
        return;
      } else if (string.length == 1) {
        console.error("SyntaxError: Expected variable name but never got one")
      } else if (string.length == 2 && isValid(string[1])) {
        eval('variables.' + string[1] + ' = ' + Math.round(Math.random() * 10))
      }
    } else if (string[0] == 'boolean') {
      if (string.length == 3) {
        console.error('SyntaxError: Incomplete int decalaration statement')
        return;
      } else if (string[2] == '=' && !isNaN(string[3]) && string.length == 4) {
        eval('variables.' + string[1] + ' = ' + Number(string[3]))
      } else if (string.length == [2] && !string.includes('=')) {
        eval('variables.' + string[1] + ' = null')
      } else if (string[2] != '=') {
        console.error('SyntaxError: Expected "=" but instead got "' + string[2] + '"')
        return;
      } else if ((string[3].includes('"') || string[3].includes("'")) && string.length == 4) {
        console.error('TypeError: Did not expect quote')
        return;
      } else if (string.length > 4) {
        var tempstring = deepCloneObject(string)
        tempstring.shift()
        tempstring.shift()
        tempstring.shift()
        for (var tempstringIntCount in tempstring) {
          if (isNaN(tempstring[i])) {
            console.error('TypeError: Did not expect string literal')
            return;
          }
        }
      } else if (!isValid(string[1])) {
        console.error('SyntaxError: Invalid characters for variable name')
        return;
      }
    } else if (string[0][0] == '/' && string[0][1] == '/') {
      continue;
    } else if (string[0].substr(-2) == '()' && isValid(string[0].substring(0, string[0].length - 2))) {
      if (!Object.getOwnPropertyNames(processes).includes(string[0].substring(0, string[0].length - 2))) {
        console.error('ReferenceError: Unknown process "' + string[0].substring(0, string[0].length - 2) + '"')
        return;
      } else {
        processes[string[0].substring(0, string[0].length - 2)].forEach(function (item) {
          item = item.join(' ')
          string2.push(item)
        })

      }
    } else {
      console.error('SyntaxError: Unknown statement: ' + string.join(' '))
      return;
    }
  }
}
