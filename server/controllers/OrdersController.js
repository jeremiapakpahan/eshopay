import { sequelize } from "../models/init-models";
import line_items from "../models/line_items";


// const create = async (req,res) => {
//     let tanggal = new Date()
//     let hari = tanggal.getDate()
//     let StrHari = hari.toString()
//     let bulan = tanggal.getMonth() + 1
//     let StrBulan = bulan.toString()
//     let tahun = tanggal.getFullYear()
//     let StrTahun = tahun.toString()

//    const {totalQty, subtotal} = req.lite
//     try {
//         const result = await req.context.models.orders.create({
//             order_name : "ORD"+StrTahun+StrBulan+StrHari+"#00"+ Math.round(Math.random()*100),
//             order_createdon : new Date(),
//             order_total_qty : totalQty,
//             order_subtotal : subtotal,
//             order_discount : req.body.discount,
//             order_tax : req.body.tax,
//             order_total_due : subtotal + (subtotal - (subtotal * req.body.discount) + req.body.tax),//subtotal +diskon+tax
//             order_address : req.body.address,
//             order_phone : req.body.phone, //find dari user
//             order_city : req.body.city,
//             order_status : "OPEN",
//             order_user_id : req.body.user_id
//         })
//          return res.send(result)
//         //next()
//     } catch (error) {
//         return res.status(404).send("no data input")
//     }
// }


const newOrder = async (req, res, next) => {
    const { summary } = req.summaryCart;
    const { order_discount, order_tax, order_city, order_address, order_status, order_user_id, phone } = req.body;

    try {
        const result = await req.context.models.orders.create({
            order_name: req.orderName,
            order_createdon: new Date(),
            order_total_qty: summary.totQty,
            order_subtotal: summary.subTot,
            order_discount: order_discount,
            order_tax: order_tax,
            order_city: order_city,
            order_address: order_address,
            order_status: order_status,
            order_total_due: summary.subTotal,
            order_phone: phone,
            order_user_id: parseInt(order_user_id)
        })
        //res.send(result)
        next()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// const updateStock = async (req,res)=> {
//     const data = req.line_items
//     const qty = req.qty
//     const prod_id = req.prod_id


//     data.array.forEach(element => {

//     });
//     try {
//         const result = await req.context.models.products.update({
//             prod_stock: (prod_stock - qty),
//         },{
//             returning: true, where:{prod_id : prod_id}
//         })
//     } catch (error) {

//     }
// }

const updateStock = async (req, res, next) => {
    const data = req.lineItems
    try {
        for (let index = 0; index < data.length; index++) {
            const result = await sequelize.query(`update products set prod_stock = (prod_stock - ${data[index].lite_qty}) where prod_id = ${data[index].lite_prod_id}`,
                {
                    type: sequelize.QueryTypes.UPDATE
                })
        }
        next()
    } catch (error) {
        return res.status(404).send("not found")
    }



}


const updateStatus = async (req, res) => {
    const data = req.lineItems

    try {

        const result = await sequelize.query(`update carts set cart_status = 'CLOSED' where cart_id = ${req.body.cart_id}`,
            {
                type: sequelize.QueryTypes.UPDATE
            })


        return res.send("data updated")

    } catch (error) {
        return res.status(404).send("not found")
    }
}

const getLineItems = async (req, res, next) => {
    try {
        const result = await req.context.models.line_items.findOne({
            where: { lite_cart_id: req.body.cart_id }
        })
        req.qty = result.dataValues.lite_qty
        req.prod_id = result.dataValues.prod_id
        next()
    } catch (error) {
        return res.status(404).send("not found")
    }
}


// const rekap = async (req, res,next) =>{
//     try {
//         const result = await req.context.models.line_items.findAll({
//             where:{lite_cart_id: req.cart_id}
//         })
//         const lineItems = result
//         const totalQty = lineItems.reduce((sum,el)=> sum + el.lite_qty,0)
//         const subtotal = lineItems.reduce((sum,el)=>sum + parseFloat(el.lite_total_price),0)
//         req.lite = {totalQty : totalQty, subtotal:subtotal}
//         next()
//     } catch (error) {
//         return res.status(404).send("line items not found")
// }
// }



const isLiteExist = async (req, res, next) => {
    try {
        const result = await req.context.models.line_items.findOne({
            where: { lite_cart_id: req.cart_id }
        })
        result_lite = result.dataValues
        next()
    } catch (error) {
        return res.status(404).send("line items not found")
    }
}

const isCartExist = async (req, res, next) => {
    try {
        const result = await req.context.models.carts.findOne({
            where: { cart_user_id: req.body.user_id, cart_status: "OPEN" }
        })
        req.cart_id = result.dataValues.cart_id
        next()
    } catch (error) {
        return res.status(404).send("cart not found")
    }
}






const update = async (req, res) => {
    try {
        const result = await req.context.models.orders.update({
            cart_status: req.body.cart_status
        }, {
            returning: true, where: { order_name: req.params.id }
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}



const getOrderNumber = async (req, res, next) => {
    try {
        const result = await sequelize.query("select 'ORD-'||to_char(now(),'DDMMYYY')||lpad(nextval('order_name_seq')||'',4,'0') as ordername",
            {
                type: sequelize.QueryTypes.SELECT
            })
        req.orderName = result[0].ordername;
        next();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export default {
    update,
    isCartExist,
    getOrderNumber,
    newOrder,
    getLineItems,
    updateStock,
    updateStatus
}