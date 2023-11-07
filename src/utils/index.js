const feesTypes = {
    FLAT : 'flat',
    PER_PAGE: 'per-page'
}

const searchFeeByItemType = (itemType, fees)=>{
    return fees.find(fee=>itemType === fee.order_item_type)?.fees
}

module.exports = { feesTypes, searchFeeByItemType };