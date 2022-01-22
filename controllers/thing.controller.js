const {Thing} = require('../models');


module.exports.createThing = async (req, res, next) =>{
  try{
    const {body} = req;
    const [newThing]= await Thing.create(body);
    if(newThing){
      res.status(201).send({data:newThing});
    }
    res.status(400).send('Thing was not created')
  }catch(err){
    next(err);
  }
};

module.exports.getAllThings = async (req, res, next)=>{
  try{
    const arrayThings = await Thing.readAll();
    if(arrayThings.length){
      res.status(200).send({data:arrayThings});
    }
    res.status(404).send();
  }catch(err){
    next(err);
  }
};

module.exports.getThing = async (req,res,next)=>{
  try{
    const {params:{id}} = req;
    const thing = await Thing.readByPk(id);
    if(thing){
      res.status(200).send({data:thing});
    }
    res.status(404).send();
  }catch(err){
    next(err);
  }
};

module.exports.updateThing = async (req, res, next) =>{
  try{
    const {body,params:{id}} = req;
    const thing = await Thing.updateByPk(id,body);    
    if(data){
      res.status(201).send({data:thing});
    }
    res.status(404).send();
  }catch(err){
    next(err);
  }
}
module.exports.deleteThing = async (req,res,next) =>{
  try{
    const {params:{id}} = req;
    const thing = await Thing.deleteByPk(id);
    if(thing && thing.length!==0){
      res.status(200).send({data:thing});
    }
    res.status(404).send('Element by id: ' +id+' was not found');
  }catch(error){
    next(error);
  }
}