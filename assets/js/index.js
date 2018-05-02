function givePrecedence(operator){
    switch(operator){
        case '_':
            return 4;

        case '*':
        case '/':
            return 3;

        case '+':
        case '-':
            return 2;

        case '(':
            return 1;

        default:
            return 0;
    }
}

function infixToPostfix(expression){
    var postfixString = "";
    var infixStack = [];
    for(var i = 0; i < expression.length; i++){
        var currentChar = expression.charAt(i);
        if(currentChar == '=' || currentChar == '(' || currentChar == '_' || currentChar == '+' || currentChar == '-' || currentChar == '*' || currentChar == '/' || currentChar == '^' || currentChar == ')'){
            if(currentChar == ')'){
                while(infixStack.length > 0){
                    var current = infixStack[infixStack.length - 1];
                    if(current == '('){
                        infixStack.pop();
                        break;
                    }
                    postfixString += infixStack.pop();
                }
            }
            else if(currentChar != '('){
                while(infixStack.length > 0 && givePrecedence(infixStack[infixStack.length - 1]) >= givePrecedence(currentChar)){
                    postfixString += infixStack.pop();
                }
                infixStack.push(currentChar);
            }
            else{
                infixStack.push(currentChar);
            }
        }
        else{
            postfixString += currentChar;
        }
    }
    while(infixStack.length > 0){
        postfixString += infixStack.pop();
    }
    return postfixString;
}

function generateThreeAddress(expression){
    let postfixStack = [];
    let expressionPtr = 0;
    let variableAssignmentPtr = parseInt(0);
    let firstVariable;
    let secondVariable;
    var counter = 0;
    var leftOffset = 150;
    var topOffset = 500;
    var visitedMap = new Map();
    var assignmentMap = new Map();
    postfixStack.push(expression[0]);
    var canvas = new fabric.Canvas('graph');
    while(postfixStack.length > 0 && expressionPtr < expression.length){
        ++expressionPtr;
        let currentTop = postfixStack[postfixStack.length - 1];
        if(currentTop == "+" ||
            currentTop == "-" ||
            currentTop == "*" ||
            currentTop == "=" ||
            currentTop == "/"){
            let operator = '';
            postfixStack.pop();
            firstVariable = postfixStack.pop();
            operator += firstVariable;
            operator += currentTop;
            secondVariable = postfixStack.pop();
            operator += secondVariable;
            alert(operator);
            if(visitedMap.get(operator) == "true"){
                postfixStack.push(assignmentMap.get(operator));
                postfixStack.push(expression[expressionPtr]);
                continue;
            }
            else{
                let newAssignment = "T" + variableAssignmentPtr;
                fabric.Object.prototype.transparentCorners = false;
                var circle1 = new fabric.Circle({
                    radius: 60,
                    fill: '#62f442',
                    scaleY: 0.5,
                    scaleX: 0.5,
                    strokeWidth: 2,
                    stroke: "#880E4F",
                    borderColor: "#000",
                    originX: 'center',
                    originY: 'center'
                });
                circle1.selectable = false;
                var text1 = new fabric.Text(currentTop + " (" + newAssignment + ")", {
                    fontSize: 15,
                    fill: "#000",
                    originX: 'center',
                    originY: 'center'
                });

                var group1 = new fabric.Group([ circle1, text1 ], {
                    left: leftOffset,
                    top: topOffset,
                    angle: 0
                });
                var circle2 = new fabric.Circle({
                    radius: 60,
                    fill: '#62f442',
                    scaleY: 0.5,
                    scaleX: 0.5,
                    borderColor: "#000",
                    originX: 'center',
                    originY: 'center'
                });

                var text2 = new fabric.Text(firstVariable, {
                    fontSize: 15,
                    fill: "#000",
                    originX: 'center',
                    originY: 'center'
                });

                var group2 = new fabric.Group([ circle2, text2 ], {
                    left: leftOffset - 50,
                    top: topOffset + 100,
                    angle: 0
                });
                var circle3 = new fabric.Circle({
                    radius: 60,
                    fill: '#62f442',
                    scaleY: 0.5,
                    scaleX: 0.5,
                    borderColor: "#000",
                    originX: 'center',
                    originY: 'center'
                });

                var text3 = new fabric.Text(secondVariable, {
                    fontSize: 15,
                    fill: "#000",
                    originX: 'center',
                    originY: 'center'
                });

                var group3 = new fabric.Group([ circle3, text3 ], {
                    left: leftOffset + 50,
                    top: topOffset + 100,
                    angle: 0
                });
                leftOffset += 300;
                ++counter;
                if(counter == 3){
                    leftOffset = 150;
                    topOffset -= 200;
                }
                canvas.add(group1);
                canvas.add(group2);
                canvas.add(group3);
                // canvas.add(circle);
                ++variableAssignmentPtr;
                assignmentMap.set(operator, newAssignment);
                visitedMap.set(operator, "true");
                console.log(newAssignment + "=" + operator);
                postfixStack.push(newAssignment);
            }
        }
        postfixStack.push(expression[expressionPtr]);
    }

}

function changeActive(clickId)
{
    let navs = document.querySelectorAll(".nav-item");
    for(var iterator = 0; iterator < navs.length; iterator++){
        if(navs[iterator].classList.contains("active")){
            navs[iterator].classList.remove("active");
        }
    }
    let clickEvent = document.getElementById(clickId);
    clickEvent.classList.add("active");
}

function generateGraph(){
    let searchTermEvent = document.querySelector("#inlineFormInput");
    let searchTerm = searchTermEvent.value;
    if(searchTerm.replace(/\s/g, '') == ""){
      return;
    }
    let postFix = infixToPostfix(searchTerm);
    alert(postFix);
    generateThreeAddress(postFix);
}
