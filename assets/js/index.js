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

function generateDAG(expression){
    var evalutationStack = [];
}

