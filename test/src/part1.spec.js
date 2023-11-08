const applyFeesToOrderPart1 = require('../../src/part1');
const orders = require('../mocks/orders_example.json')
const fees = require('../mocks/fees_example.json')

test('test Challenge - part 1', () => {

  const expectedOutput = "\nOrder ID: 1\n\tOrder item 1: $5.00\n\tOrder item 2: $6.00\n\n\tOrder total: $11.00\nOrder ID: 2\n\tOrder item 1: $10.00\n\n\tOrder total: $10.00";

  expect(applyFeesToOrderPart1(orders, fees)).toEqual(expectedOutput);
});