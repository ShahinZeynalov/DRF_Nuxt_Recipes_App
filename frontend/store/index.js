export const state = ()=>({
    quotes:[{
        id:'1',body:'Quote of the day.',author:'John Snow'
    }]
})

export const getter ={
    quotes:state=>state.quotes
}
