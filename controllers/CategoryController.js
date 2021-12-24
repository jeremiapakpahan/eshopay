const create = async (req,res) => {
    try {
        const result = await req.context.models.category.create({
            cate_name : req.body.cate_name
        })
        req.reg = result.dataValues.cate_id
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data input")
    }
}


const findAll = async (req, res) =>{
    try{
        const result = await req.context.models.category.findAll();
        return res.send(result);
    }catch (error){
        return res.status(404).send("no data found")
    }
}



const findOne = async (req,res) => {
    try {
        const result = await req.context.models.category.findOne({
            where:{cate_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(400).send("no data found")
    }
}

const update = async (req,res)=>{
    try {
        const result = await req.context.models.category.update({
            cate_name : req.body.cate_name
        },{
            returning : true, where:{cate_id:req.params.id}
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data update")
    }
}

const deleteRow = async(req,res) =>{
    try {
        const result = await req.context.models.category.destroy({
            where:{cate_id : req.params.id}
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