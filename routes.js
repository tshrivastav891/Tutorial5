var express = require('express');
var router = express.Router();
var Movie = require('./Model/moviedata')
//to fetch movies
router.get('/movies',async(req,res)=>{
    const imovie = await Movie.find()
    res.send(imovie)
})

//post

router.post("/movies",async(req,res)=>{  
    const im = new Movie({
        name:req.body.name, 
        rating:req.body.rating
    })

    await im.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "message":msg
            })
        }
    })

    //update 

    router.patch('/movies/:id',async (req,res)=>{
        const imovie = await Movie.findOne({_id:req.params.id})
        imovie.name = req.body.name
        imovie.price = req.body.price
        await imovie.save((err,msg)=>{
            if(err){
                res.status(500).json({
                    error:err
                })
            }
            else{
                res.status(200).json({
                    msg:msg
                })
            }
        })
    
    })
    
    //delete api
    
    router.delete("/movies/:name",async(req,res)=>{
        await Movie.deleteOne({name:req.params.name},(err,msg)=>{
            if(err){
                res.status(500).json({
                    error:err
                })
            }
            else{
                res.status(200).json({
                    msg:msg
                })
            }
    
        })
    })
})
module.exports = router