# Adapt [![Build Status](https://travis-ci.org/eknowles/adapt-mock.svg?branch=master)](https://travis-ci.org/eknowles/adapt-mock) [![Coverage Status](https://coveralls.io/repos/github/eknowles/adapt-mock/badge.svg?branch=master)](https://coveralls.io/github/eknowles/adapt-mock?branch=master)

[![NPM](https://nodei.co/npm/adapt-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/adapt-mock/)

Rapid prototype existing HTML/CSS with the tools you already know. Adapt is a tool to bridge the gap between design and development.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
  - [Available Modules](#available-modules)
  - [Stages](#stages)
  - [Prototyping (styling stages)](#prototyping-styling-stages)
    - [Multiple Mockers](#multiple-mockers)
  - [Run Functions (DOM)](#run-functions-dom)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
npm i adapt-mock
```

```html
<head>
  ...

  <!--Main Adapt Library-->
  <script src="./node_modules/adapt/umd/adapt-mock.min.js"></script>

  <!--Adapt Stages-->
  <link href="example/styles.css" rel="stylesheet">
  <script src="example/scripts.js"></script>
</head>
```

## Usage

Adapt allows you to step through the various stages when prototyping to help sell and ideas, radical changes or introducing new features.
If you can hack CSS in Chrome Developer Tools, you can build a prototype with Adapt. Grab some HTML/CSS and add a class for each design change then use Arrow keys to step through each stage, you can quickly compare each stage in the browser or device in real time.

### Available Modules

Adapt comes in four flavours, can be used directly in the browser via umd or extended for your own projects.

- UMD (`./umd/adapt.js`)
- ES5 (`./lib/index.js`)
- ES6 (./lib-esm/index.js`)
- Flat ES6 (`./lib-esm/index.js`)

### Stages

Adapt requires a list of `Stages`, imagine these as a list of requirements. Each stage can have a description and functions to run when switching to it.

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
