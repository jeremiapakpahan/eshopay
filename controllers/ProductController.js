//import { noExtendLeft } from "sequelize/types/lib/operators"

const create = async (req,res) => {
    try {
        const result = await req.context.models.products.create({
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
        const result = await req.context.models.products.findOne({
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
    const {files:{file}, fields} = req.fileAttrb
    try {
        const result = await req.context.models.products.create({
            prod_name : fields[0].value,
            prod_price : parseInt(fields[1].value),
            prod_desc : fields[2].value,
            prod_url_image : file.newFilename,
            prod_rating : parseInt(fields[3].value),
            prod_view_count : parseInt(fields[4].value),
            prod_user_id : parseInt(fields[5].value),
            prod_cate_id : parseInt(fields[6].value)
        })
        req.prod_id = result.dataValues.prod_id;
        next();
        //return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    } 
}


const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.products.findAll()
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
        const result = await req.context.models.products.update({
            prod_name : fields[0].value,
            prod_price : parseInt(fields[1].value),
            prod_desc : fields[2].value,
            prod_url_image : file.newFilename,
            prod_rating : parseInt(fields[3].value),
            prod_view_count : parseInt(fields[4].value),
            prod_user_id : parseInt(fields[5].value),
            prod_cate_id : parseInt(fields[6].value)
        },{
            //returning : true, where:{prod_user_id:req.params.id1, prod_cate_id:req.params.id2, prod_id:req.params.id3}
            //returning : true, where:{$and: [{prod_user_id:parseInt(fields[5].value)}, {prod_cate_id:parseInt(fields[6].value}, {prod_id:req.params.id}]}
            returning : true, where:{prod_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.products.destroy({
            where:{prod_id : req.params.id}
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
    update,
    deleteRow,
    getProd
}