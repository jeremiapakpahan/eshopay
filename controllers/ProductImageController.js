//import { noExtendLeft } from "sequelize/types/lib/operators"

const create = async (req,res) => {
    try {
        const result = await req.context.models.product_images.create({
            prod_name : req.body.prod_name,
            prod_price : req.body.prod_price,
            prod_desc : req.body.prod_desc,
            prod_url_image : req.body.prod_url_image,
            prod_rating : req.body.prod_rating,
            prod_view_count : req.body.prod_view_count,
            prod_user_id : req.params.id1,
            prod_cate_id : req.params.id2
        })
        //req.prod = result.dataValues.prod_id
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}


const getProd = async(req,res,next) =>{
    try {
        const result = await req.context.models.product_images.findOne({
            where:{prod_name : req.body.prod_name}
        })
        req.prod = result.dataValues
        console.log(req.prod);
        next()
        //res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}



const create1 = async (req,res) => {
    const prod_id = req.prod
    const {files:{file}, fields} = req.fileAttrb
    try {
        const result = await req.context.models.product_images.create({
            prim_filename : fields[7].value,
            prim_filesize : parseInt(fields[8].value),
            prim_filetype : fields[9].value,
            prim_url : file.newFilename,
            prim_primary : fields[10].value,
            prim_prod_id : prod_id
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    } 
}


const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.product_images.findAll()
        return res.send(result);
    }catch (error){
        return res.status(404).send("no data found")
    }
}



const findOne = async (req,res) => {
    try {
        const result = await req.context.models.product_images.findOne({
            where:{prim_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}

// const update = async (req,res)=>{
//     try {
//         const result = await req.context.models.product_images.update({
//             prod_name : req.body.prod_name,
//             prod_price : req.body.prod_price,
//             prod_desc : req.body.prod_desc,
//             prod_url_image : req.body.prod_url_image,
//             prod_rating : req.body.prod_rating,
//             prod_view_count : req.body.prod_view_count
//         },{
//             //returning : true, where:{prod_user_id:req.params.id1, prod_cate_id:req.params.id2, prod_id:req.params.id3}
//             returning : true, where:{$and: [{prod_user_id:req.params.id1}, {prod_cate_id:req.params.id2}, {prod_id:req.params.id3}]}
//         })
//         return res.send(result)
//     } catch (error) {
//         return res.status(404).send("no data update")
//     }
// }

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.product_images.destroy({
            where:{prim_id : req.params.id}
        })
        return res.send("delete"+result+"rows")
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

export default {
    create,
    create1,
    findAll,
    findOne,
    deleteRow,
    getProd
}