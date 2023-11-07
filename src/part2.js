const { feesTypes, searchFeeByItemType } = require('./utils');

const applyFee = (fee, pages) => {
    switch (fee?.type) {
        case feesTypes.PER_PAGE: {
            let amount = 0
            if (pages > 1) {
                amount = (pages - 1) * Number(fee.amount)
            }
            return {
                amount,
                feeType: feesTypes.PER_PAGE
            };
        }
        case feesTypes.FLAT:
            return {
                amount: Number(fee.amount),
                feeType: feesTypes.FLAT
            }
        default:
            console.error(`Error[applyFee]: TOD`);
            break;
    }
}

// apply fee to order item
const applyFeesToOrderItemArray = (id, item, fees) => {
    var { type: itemType, pages } = item
    let totalOther = 0
    let totalFlat = 0
    const allFeesRules = searchFeeByItemType(itemType, fees);
    for (let x = 0; x < allFeesRules.length; x++) {
        const amountObj = applyFee(allFeesRules[x], pages)
        switch (amountObj?.feeType) {
            case feesTypes.PER_PAGE:
                totalOther += amountObj.amount
                break;
            case feesTypes.FLAT:
                totalFlat += amountObj.amount
                break;
            default:
                console.error(`Error[applyFeesToOrder]: TODO`);
                break;
        }
    }
    return {
        totalOther,
        totalFlat
    }
}

const applyFeesToOrder = (orders, fees) => {
    let totalFlat = 0
    let totalOther = 0
    let textOutput = '';
    orders.forEach((mainOrder, mainIndex) => {
        textOutput += `\nOrder ID: ${mainIndex + 1}`
        const { order_items: orderItems } = mainOrder
        let flatAmount = 0
        let otherAmount = 0
        orderItems.forEach((item, itemIndex) => {
            const amountDetails = applyFeesToOrderItemArray(itemIndex + 1, item, fees)
            flatAmount += amountDetails.totalFlat
            otherAmount += amountDetails.totalOther
        })
        textOutput += `\n\tFund - Printing Found: $${flatAmount.toFixed(2)}`
        totalFlat += flatAmount
        if (otherAmount > 0) {
            textOutput += `\n\tFund - Other: $${otherAmount.toFixed(2)}`
            totalOther += otherAmount
        }

    })
    textOutput += `\n\nTotal distributions:`
    textOutput += `\n\tFund - Printing Found: $${totalFlat.toFixed(2)}`
    if (totalOther > 0) {
        textOutput += `\n\tFund - Other: $${totalOther.toFixed(2)}`
    }
    console.log(textOutput)
    return textOutput
}

module.exports = applyFeesToOrder