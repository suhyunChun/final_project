function groupByKey(data, date) {
    for(let i = 0; i < data.length;i++){
        if(data[i].date === date){
            return data[i].response
        }
    }
    return ''
}
module.exports= groupByKey

