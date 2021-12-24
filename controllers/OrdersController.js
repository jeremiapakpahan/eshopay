const create = async (req,res) => {
    let tanggal = new Date()
    let hari = tanggal.getDate()
    let StrHari = hari.toString()
    let bulan = tanggal.getMonth() + 1
    let StrBulan = bulan.toString()
    let tahun = tanggal.getFullYear()
    let StrTahun = tahun.toString()


    // const lite = result_lite;
    // const cart = result_cart;

    // try {
    //     const lite = await req.context.models.line_items.findOne({
    //         where:{lite_cart_id: req.params.id}
    //     })
    //     const hasil1 = lite.dataValues;
    //     //next()
    // } catch (error) {
    //     return res.status(404).send("line items not found")
    // }

    // try {
    //     const cart = await req.context.models.carts.findOne({
    //         where:{cart_id:req.params.id}
    //     })
    //     //const cart_result = cart
    //     const hasil2 = cart.dataValues
    //     next()
    // } catch (error) {
    //     return res.status(404).send("cart not found")
    // }

    //const {lite_order_name,lite_qty,lite_price} = lite_result.dataValues;
   // const {cart_user_id} = cart_result.dataValues

   const {totalQty, subtotal} = req.lite
    try {
        const result = await req.context.models.orders.create({
            order_name : "ORD"+StrTahun+StrBulan+StrHari+"#00"+ Math.round(Math.random()*100),
            order_createdon : new Date(),
            order_total_qty : totalQty,
            order_subtotal : subtotal,
            order_discount : req.body.discount,
            order_tax : req.body.tax,
            order_total_due : subtotal + (subtotal - (subtotal * req.body.discount) + req.body.tax),//subtotal +diskon+tax
            order_address : req.body.address,
            order_phone : req.body.phone, //find dari user
            order_city : req.body.city,
            order_status : "OPEN",
            order_user_id : req.body.user_id
        })
         return res.send(result)
        //next()
    } catch (error) {
        return res.status(404).send("no data input")
    }
}


const rekap = async (req, res,next) =>{
    try {
        const result = await req.context.models.line_items.findAll({
            where:{lite_cart_id: req.cart_id}
        })
        const lineItems = result
        const totalQty = lineItems.reduce((sum,el)=> sum + el.lite_qty,0)
        const subtotal = lineItems.reduce((sum,el)=>sum + parseFloat(el.lite_total_price),0)
        req.lite = {totalQty : totalQty, subtotal:subtotal}
        next()
    } catch (error) {
        return res.status(404).send("line items not found")
}
}



const isLiteExist = async (req, res, next) =>{
    try {
        const result = await req.context.models.line_items.findOne({
            where:{lite_cart_id: req.cart_id}
        })
        result_lite = result.dataValues
        next()
    } catch (error) {
        return res.status(404).send("line items not found")
}
}

const isCartExist = async (req, res, next) =>{
    try {
        const result = await req.context.models.carts.findOne({
            where:{cart_user_id: req.body.user_id, cart_status : "OPEN"}
        })
        req.cart_id = result.dataValues.cart_id
        next()
    } catch (error) {
        return res.status(404).send("cart not found")
}
}

const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.orders.findAll();
        return res.send(result);
    }catch (error){
        return res.status(404).send("no data found")
    }
}



const findOne = async (req,res) => {
    try {
        const result = await req.context.models.orders.findOne({
            where:{order_name:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.orders.update({
            cart_status : req.body.cart_status
        },{
            returning : true, where:{order_name:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.orders.destroy({
            where:{order_name : req.params.id}
        })
        return res.send("delete"+result+"rows")
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

export default {
    create,
    findAll,
    findOne,
    update,
    deleteRow,
    rekap,
    isCartExist
}