// const create = async(req,res)=>{
//     const prod = req.prod
//     const cart = req.cart
//     const {files:{file}, fields} = req.fileAttrb
//     try {
//         const result = await req.context.models.line_items.create({
//             lite_prod_id : prod,
//             lite_cart_id : cart,
//             lite_qty : parseInt(fields[10].value),
//             lite_price : parseInt(fields[11].value),
//             lite_total_price : parseInt(fields[10].value) * parseInt(fields[11].value),
//             lite_status : fields[12].value,
//             lite_order_name : fields[13].value
//         })
//         res.send(result)
//     } catch (error) {
//         return res.status(404).send("no line_items data input")
//     }
// }


const create = async(req,res)=>{
    const prod = req.prod
    const cart = req.cart
    const price = req.body.lite_qty * prod.prod_price
    try {
        const result = await req.context.models.line_items.create({
            lite_prod_id : prod.prod_id,
            lite_cart_id : cart,
            lite_qty : req.body.lite_qty,
            lite_price : parseInt(prod.prod_price),
            lite_total_price : price,
            lite_status : req.body.lite_status,
            //lite_order_name : req.body.lite_order_name
        })
        res.send(result)
    } catch (error) {
        return res.status(404).send("no line_items data input")
    }
}

const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.line_items.findAll()
        return res.send(result);
    }catch (error){
        return res.status(404).send("no data found")
    }
}

const findOne = async (req,res) => {
    try {
        const result = await req.context.models.products.findOne({
            where:{prod_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}

const update = async (req,res)=>{
    
    try {
        const result = await req.context.models.line_items.update({
            // lite_qty : req.body.lite_qty,
            // lite_price : prod.prod_price,
            // lite_total_price : price,
            lite_status : req.body.lite_status
        },{
            returning : true, where:{lite_prod_id:req.body.lite_prod_id, lite_cart_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.products.destroy({
            where:{lite_prod_id : req.body.id, lite_cart_id: req.params.id }
        })
        return res.send("delete"+result+"rows")
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

export default {
    create,
    update,
    findAll,
    findOne,
    deleteRow
}