# Adapt

[![Build Status](https://travis-ci.org/eknowles/adapt-mock.svg?branch=master)](https://travis-ci.org/eknowles/adapt-mock)
[![Coverage Status](https://coveralls.io/repos/github/eknowles/adapt-mock/badge.svg?branch=master)](https://coveralls.io/github/eknowles/adapt-mock?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/eknowles/adapt-mock.svg?style=plastic)](https://github.com/eknowles/adapt-mock/issues)
[![npm](https://img.shields.io/npm/dt/adapt-mock.svg?style=plastic)](https://www.npmjs.com/package/adapt-mock)
[![npm](https://img.shields.io/npm/v/adapt-mock.svg?style=plastic)](https://www.npmjs.com/package/adapt-mock)

---

Rapid prototype existing HTML/CSS with the tools you already know. Adapt is a tool to bridge the gap between design and dev, if you can hack css in chrome dev tools you can build a prototype with Adapt.

Adapt allows you to step through the various stages when prototyping to help sell and ideas, radical changes or introducing new features.

## Tutorial

You need some HTML/CSS to start with. You can build it yourself or export from a live browser.

### Concept

List out what you want to achieve with the prototype. Think of these as requirements.

* Improve visibility between label and values
* Improve information hierarchy
* Improve contrast

### Setup Adapt

You will need two files to work with, a JavaScript file that contains your Stages, and a CSS file which has your classes.

Put these into an Array of 'Stages'.

```javascript
// Setup stages
const stages = [
  {description: 'Improve visibility between label and values'},
  {description: 'Improve information hierarchy'},
  {description: 'Improve contrast'},
];
```

Load Adapt, with `new Adapt.Mocker()`, it takes two arguments, the first is an HTML element and the second are your Stages we created above.

```javascript
// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {

  // Create a new instance of the Mocker class, and pass it the stages.
  const mock = new Adapt.Mocker(document.body, stages);

});
```

Finally in your HTML insert these files into the HEAD element.

```html
<head>
  ...

  <!--Main AdaptJS File-->
  <script src="adapt-mock.min.js"></script>

  <!--Mock Files-->
  <link href="example/styles.css" rel="stylesheet">
  <script src="example/scripts.js"></script>
</head>
```

### Prototyping (styling stages)

Adapt uses standard CSS classes when handling style changes between stages.
When you go to the next stage Adapt adds a new class to the element, when you go back, it removes it.

#### Multiple Mockers

To manage multiple Mockers on a document (because why not?) you can set the mockers base class name by using the `className` property.

```javascript
const m = new Adapt.Mocker(myElement, myStages);
m.className = 'myClassName';
```

Using the example above we expect that for the second stage it will set the element class attribute to `myClassName1 myClassName2`.

### Run Functions (DOM)

When changing Stage you may want to make a radical change that can't be achieved with CSS, to do this we use *Run functions*.
Adapt allows you to write your own functions that modify the DOM which get called when changing Stages.

To add a functions to a Stage insert the name of the function in the run array.

```javascript
const stages = [
  ...
  {description: 'Update Text Labels', run: ['updateLabels']},
];
```

Declare the function somewhere inside the
```javascript
function updateLabels(revert, state) {
  // Use whatever JavaScript you like here (e.g. JQuery)
}
```

Each function receives two arguments.

Param | Type | Description
--- | --- | ---
revert | Boolean | True if function should reverse (Stage is moving back)
state | Object | An object stored inside the Mocker
