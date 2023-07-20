const myform = document.getElementById("myform");
function isOperator(char) {
      return ['^', '*', '/', '+', '-'].includes(char);
}

function priority(currchar) {
      switch (currchar) {
            case '+' || '-':
                  return 1;
            case '*' || '/':
                  return 2;
            case '^':
                  return 3;
      }
}

function infToPost(infix) {
      let postFix = '';
      let mystack = [];

      for (let i = 0; i < infix.length; i++) {
            const currchar = infix[i];
            if (/[a-zA-Z0-9]/.test(currchar)) {
                  postFix += currchar;
            }
            else if (isOperator(currchar)) {
                  while (mystack.length > 0 && isOperator(mystack[mystack.length - 1]) && priority(currchar) <= priority(mystack[mystack.length - 1])) {
                        postFix += mystack.pop();
                  }
                  mystack.push(currchar);
            }

            else if (currchar === '(') {
                  mystack.push(currchar);
            }

            else if (currchar === ')') {
                  while (mystack.length > 0 && mystack[mystack.length - 1] !== '(') {
                        postFix += mystack.pop();
                  }
                  mystack.pop();
            }
            
      }
      while (mystack.length > 0) {
            postFix += mystack.pop();
      }
      return postFix;
}

function infToPre(infix) {
      let output = document.getElementById('main-output');
      let preFix = '';
      let mystack = [];
      let newinfix = '';
      for (let i = infix.length - 1; i >= 0; i--) {
            if (infix[i] === ')') {
                  newinfix += '(';
                  continue;
            }
            else if (infix[i] === '(') {
                  newinfix += ')';
                  continue;
            }
            newinfix += infix[i];
      }

      let revPost = infToPost(newinfix);
      for(let i=revPost.length - 1;i>=0;i--){
            preFix+=revPost[i];
      }
      return preFix;

}


myform.addEventListener("submit", function (event) {
      event.preventDefault();
      let converType = document.getElementsByName("convertype");
      let typeofconversion = '';
      for (let i = 0; i < converType.length; i++) {
            if (converType[i].checked) {
                  typeofconversion = converType[i].value;
            }
      }
      let infix = document.getElementById('main-input').value;
      let finalOP = document.getElementById('mainoutput');


      if (typeofconversion == 'inftopost') {
            let str = infToPost(infix);
            finalOP.value = str;

      } else {
            let str = infToPre(infix);
            finalOP.value = str;
      }
});

