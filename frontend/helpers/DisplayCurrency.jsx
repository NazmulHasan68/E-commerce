const displayCurency = (num) =>{
    const formatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : "BDT",
        minimumFractionDigits :2
    })
    return formatter.format(num)
}
export default displayCurency