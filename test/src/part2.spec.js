const applyFeesToOrderPart2 = require('../../src/part2');
const orders = require('../mocks/orders_example.json')
const fees = require('../mocks/fees_example.json')


describe('test Challenge - part 2', () => {
    test('test Challenge - part 2', () => {
        const expectedOutput = "\nOrder ID: 1\n\tFund - Printing Found: $10.00\n\tFund - Other: $1.00\nOrder ID: 2\n\tFund - Printing Found: $10.00\n\nTotal distributions:\n\tFund - Printing Found: $20.00\n\tFund - Other: $1.00";
        expect(applyFeesToOrderPart2(orders, fees)).toEqual(expectedOutput);
    });
});
