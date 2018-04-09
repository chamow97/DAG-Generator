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
    var visitedMap = new Map();
    var assignmentMap = new Map();
    postfixStack.push(expression[0]);
    while(postfixStack.length > 0 && expressionPtr < expression.length){
        ++expressionPtr;
        let currentTop = postfixStack[postfixStack.length - 1];
        if(currentTop == "+" ||
            currentTop == "_" ||
            currentTop == "*" ||
            currentTop == "=" ||
            currentTop == "/"){
            let operator = '';
            postfixStack.pop();
            operator = postfixStack.pop();
            operator += currentTop;
            operator += postfixStack.pop();
            alert(operator);
            if(visitedMap.get(operator) == "true"){
                postfixStack.push(assignmentMap.get(operator));
                postfixStack.push(expression[expressionPtr]);
                continue;
            }
            else{
                let newAssignment = "T" + variableAssignmentPtr;
                ++variableAssignmentPtr;
                assignmentMap.set(operator, newAssignment);
                visitedMap.set(operator, "true");
                console.log(newAssignment + "=" + operator);
                postfixStack.push(newAssignment);
            }
        }
        postfixStack.push(expression[expressionPtr]);
    }
    // return "a";
}


