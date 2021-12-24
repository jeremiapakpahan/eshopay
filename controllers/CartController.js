//import { noExtendLeft } from "sequelize/types/lib/operators"

// const create = async (req,res,next) => {
//     const {files:{file}, fields} = req.fileAttrb    
//     try {
//         const result = await req.context.models.carts.create({
//             cart_createdon : new Date(),
//             cart_status : fields[8].value,
//             cart_user_id : parseInt(fields[9].value)
//         })
//         req.cart = result.dataValues.cart_id
//         // return res.send(result)
//         next()
//     } catch (error) {
//         return res.status(404).send("no data input")
//     }
// }


const create = async (req,res,next) => {
    try {
        const result = await req.context.models.carts.create({
            cart_createdon : new Date(),
            cart_status : req.body.status,
            cart_user_id : req.body.id
        })
        req.cart = result.dataValues.cart_id
        // return res.send(result)
        next()
    } catch (error) {
        return res.status(404).send("no data input")
    }
}


const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.carts.findAll();
        return res.send(result);
    }catch (error){
        return res.status(404).send("no data found")
    }
}



const findOne = async (req,res) => {
    try {
        const result = await req.context.models.carts.findOne({
            where:{cart_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.carts.update({
            cart_status : req.body.cart_status
        },{
            returning : true, where:{cart_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.carts.destroy({
            where:{cart_id : req.params.id}
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
    deleteRow
}