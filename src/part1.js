const { feesTypes, searchFeeByItemType } = require('./utils');

const applyFee = (fee, pages)=>{
    switch (fee?.type) {
          case feesTypes.PER_PAGE:
            if(pages > 1){
                const amount = (pages - 1 ) * Number(fee.amount)
                return amount
            }
            return 0;
          case feesTypes.FLAT:
            return Number(fee.amount);
          default:
            console.error(`Error: TODO`);
            break;
        }
}

// apply fee to order item
const applyFeesToOrderItemArray = (item, fees)=>{
    var { type: itemType, pages } = item
    const allFeesRules = searchFeeByItemType(itemType, fees);
    let amount = 0;
    for(let x=0; x < allFeesRules.length; x++){
        amount += applyFee(allFeesRules[x], pages)
    }
    return amount
}

const applyFeesToOrder = (orders, fees)=>{
    let textOutput = ''
    orders.forEach((mainOrder, mainIndex)=>{
        textOutput += `\nOrder ID: ${mainIndex+1}`
        const { order_items: orderItems } = mainOrder
        let totalAmount = 0
        orderItems.forEach( (item, itemIndex) => {
            const amount = applyFeesToOrderItemArray(item, fees)
            textOutput += `\n\tOrder item ${itemIndex+1}: $${amount.toFixed(2)}`
            totalAmount += amount
        } )
        textOutput += `\n\n\tOrder total: $${totalAmount.toFixed(2)}`
    })
    console.log(textOutput)
    return textOutput
}

module.exports = applyFeesToOrder