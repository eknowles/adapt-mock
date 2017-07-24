// Setup stages
const stages = [
  {description: 'Improve visibility between label and values'},
  {description: 'Improve information hierarchy', run: ['changeMetricValues']},
  {description: 'Improve contrast'},
];


// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
  // Create a new instance of the Mocker class, and pass it the stages.
  const mock = new Adapt.Mocker(document.body, stages);
});


// Run Functions
function changeMetricValues(revert) {
  const selector = '#box > div > div.card__body.row > div > div:nth-child(1) > div:nth-child(1) > div.metric__value';
  const header = document.querySelector(selector);
  header.innerText = revert ? '1,420' : '9,001';
}
