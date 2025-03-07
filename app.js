const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let myTodos;

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((todos) => {
        processTodos(todos);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

function processTodos(todos) {
    myTodos = todos;
    getUserInput();
}

function getUserInput() {
    rl.question(`
    Enter a function to call:
    - forEach
    - mapping
    - filtering
    - reducing
    - some
    - every
    - pushItem
    - popItem
    - unshiftItem
    - shiftItem
    - spliceItems
    - sliceItems
    - findIndexOf
    - findLastIndexOf
    - findItem
    - findItemIndex
    - itemIncludes
    - sort
    - reverse
    `, (userInput) => {
        if (userInput) {
            callFunction(userInput.trim().toLowerCase());
        } else {
            console.log("No input provided.");
        }
    });
}

function callFunction(functionName) {
    switch (functionName) {
        case 'foreach':
            forEach(myTodos);
            break;
        case 'mapping':
            mapping(myTodos);
            break;
        case 'filtering':
            filtering(myTodos);
            break;
        case 'reducing':
            reducing(myTodos);
            break;
        case 'some':
            some(myTodos);
            break;
        case 'every':
            every(myTodos);
            break;
        case 'pushitem':
            pushItem({ userId: 3, id: 8, title: "New Task", completed: true });
            break;
        case 'popitem':
            popItem();
            break;
        case 'unshiftitem':
            unshiftItem({ userId: 4, id: 9, title: "First Task", completed: false });
            break;
        case 'shiftitem':
            shiftItem();
            break;
        case 'spliceitems':
            spliceItems(1, 1, { userId: 5, id: 10, title: "Inserted Task", completed: true });
            break;
        case 'sliceitems':
            sliceItems(0, 2);
            break;
        case 'findindexof':
            rl.question("Enter title to find index of: ", (title) => {
                findIndexOf(myTodos, title);
                rl.close();
            });
            return;
        case 'findlastindexof':
            rl.question("Enter title to find last index of: ", (title) => {
                findLastIndexOf(myTodos, title);
                rl.close();
            });
            return;
        case 'finditem':
            rl.question("Enter title to find item: ", (title) => {
                findItem(myTodos, title);
                rl.close();
            });
            return;
        case 'finditemindex':
            rl.question("Enter title to find item index: ", (title) => {
                findItemIndex(myTodos, title);
                rl.close();
            });
            return;
        case 'itemincludes':
            rl.question("Enter title to check if included: ", (title) => {
                itemIncludes(myTodos, title);
                rl.close();
            });
            return;
        case 'sort':
            sortTodos(myTodos);
            rl.close();
            break;
        case 'reverse':
            reverseTodos(myTodos);
            rl.close();
            break;
        default:
            console.log("Invalid function name.");
            rl.close();
    }
}

// METHODS:

function forEach(todos) {
    todos.forEach(item => console.log(item));
}

function mapping(todos) {
    const IdsOnly = todos.map((todo) => todo.id);
    console.log(IdsOnly);
}

function filtering(todos) {
    const filterIds = todos.filter((todo) => {
        if (todo.userId === 1) {
            console.log(todo.userId);
            return true;
        } else {
            return false;
        }
    });
    return filterIds;
}

function reducing(todos) {
    const totalSum = todos.reduce((accumulator, todo) => {
        return accumulator + todo.id;
    }, 0);
    console.log(totalSum);
}

function some(todos) {
    const hasSomeTasksDone = todos.some((todo) => {
        return todo.completed;
    });

    console.log(hasSomeTasksDone);
    return hasSomeTasksDone;
}

function every(todos) {
    const hasAllTasksDone = todos.every((todo) => {
        return todo.completed;
    });

    console.log(hasAllTasksDone);
    return hasAllTasksDone;
}

function pushItem(todo) {
    myTodos.push(todo);
    console.log("After push:", myTodos);
}

function popItem() {
    const poppedItem = myTodos.pop();
    console.log("Popped item (userId):", poppedItem ? poppedItem.userId : null);
    console.log("After pop:", myTodos);
}

function unshiftItem(todo) {
    myTodos.unshift(todo);
    console.log("After unshift:", myTodos);
    return myTodos;
}

function shiftItem() {
    const shiftedItem = myTodos.shift();
    console.log("Shifted item (id):", shiftedItem ? shiftedItem.id : null);
    console.log("After shift:", myTodos);
    return shiftedItem;
}

function spliceItems(startIndex, deleteCount, ...todos) {
    const removedItems = myTodos.splice(startIndex, deleteCount, ...todos);
    if (removedItems.length > 0) {
        console.log("Removed items (titles):", removedItems.map(item => item.title));
    } 
    console.log("After splice:", myTodos);
    return removedItems;
}

function sliceItems(startIndex, endIndex) {
    const slicedItems = myTodos.slice(startIndex, endIndex);
    if (slicedItems.length > 0) {
        console.log("Sliced items (completed):", slicedItems.map(item => item.completed));
    }
    console.log("After slice:", myTodos);
    return slicedItems;
}

function findIndexOf(todos, title) {
    const index = todos.findIndex(todo => todo.title === title);
    console.log(`indexOf "${title}": ${index}`);
    return index;
}

function findLastIndexOf(todos, title) {
    const reversedTodos = [...todos].reverse();
    const indexFromEnd = reversedTodos.findIndex(todo => todo.title === title);
    const index = indexFromEnd === -1 ? -1 : todos.length - 1 - indexFromEnd;
    console.log(`lastIndexOf "${title}": ${index}`);
    return index;
}

function findItem(todos, title) {
    const item = todos.find(todo => todo.title === title);
    console.log(`find "${title}":`, item);
    return item;
}

function findItemIndex(todos, title) {
    const index = todos.findIndex(todo => todo.title === title);
    console.log(`findIndex "${title}": ${index}`);
    return index;
}

function itemIncludes(todos, title) {
    const includes = todos.some(todo => todo.title === title);
    console.log(`includes "${title}": ${includes}`);
    return includes;
}

function sortTodos(todos) {
    todos.sort((a, b) => a.title.localeCompare(b.title));
    console.log("Sorted todos:", todos);
}

function reverseTodos(todos) {
    todos.reverse();
    console.log("Reversed todos:", todos);
}