// Setup stages
const stages = [
  {description: 'Improve visibility between label and values'},
  {description: 'Improve information hierarchy'},
  {description: 'Improve contrast'},
];

// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {

  // Create a new instance of the Mocker class, and pass it the stages.
  const mock = new Adapt.Mocker(document.body, stages);

});
