# Using Javascript Objects as Alternative to Switch Statements

Author: [Hayden Linder](https://github.com/haydenlinder)

5/15/2021

<br/>

<hr/>

<br/>

## In Javascript, There's Always More Than One Way

Consider that we are writing a program and that at some point we need to execute some code depending on the value of a variable that can take on a set of values.

For example, let's say we have

```js
let fruit = `banana`;
```

Where fruit can take on any of the following values:

```js
const acceptableFruit = [`banana`, `apple`, `pear`, `papaya`, `avocado`];
```

Now let's say that we'd like to print out a message depending on the fruit. 

There are many ways to do this, but our goal today is to find the most succinct way.

## Using **if** and **else**

We could do this with **if** and **else**:

```js
let message;

if (fruit === `banana`) {
    message = `Bananas are great on their own or in banana bread`;
} else if (fruit === 'apple') {
    message = `Apples make my mouth hurt, so I don't like them that much.`;
} else if (fruit === `pear`) {
    message = `Pears are like curvy, less acidic apples.`;
} else if (fruit === `papaya`) {
    message = `Papaya contains an enzyme called Papain, which is sometimes used as a mean tenderizer.`;
} else if (fruit === `avocado`) {
    message = `Avocados contain lots of healthy fats.`;
} else {
    message = `I don't know much about this fruit. Try Googling it!`;
}

console.log(message);
```
But that's pretty verbose, so how about a **switch** statement?

## Using **switch**

```js
let message;

switch {
    case 'banana':
        message = `Bananas are great on their own or in banana bread`;
        break;
    case 'apple':
        message = `Apples make my mouth hurt, so I don't like them that much.`;
        break;
    case `pear`:
        message = `Pears are like curvy, less acidic apples.`;
        break;
    case `papaya`:
        message = `Papaya contains an enzyme called Papain, which is sometimes used as a mean tenderizer.`;
        break;
    case `avocado`:
        message = `Avocados contain lots of healthy fats.`;
        break;
    default:
        message = `I don't know much about this fruit. Try Googling it!`;
}

console.log(message);
```

That's also very verbose though. What if there was a shorter way? 🤔

## Using Objects

Let's just build an object that maps fruit keys to message values:

```js
let message;

const messageForFruit = {
    banana: `Bananas are great on their own or in banana bread`,
    apple: `Apples make my mouth hurt, so I don't like them that much.`,
    pear: `Pears are like curvy, less acidic apples.`,
    papaya: `Papaya contains an enzyme called Papain, which is sometimes used as a mean tenderizer.`,
    avocado: `Avocados contain lots of healthy fats.`
};

message = messageForFruit[fruit] || `I don't know much about this fruit. Try Googling it!`;

console.log(message);
```

Wohoo! We saved lots of lines of code! 
