var express = require('express');
var router = express.Router();
var Book = require('./Model/books')
//to fetch book
router.get('/book',async(req,res)=>{
    const ibook = await Book.find()
    res.send(ibook)
})

//post

router.post("/book",async(req,res)=>{  
    const ib = new Book({
        name:req.body.name, 
        price:req.body.price
    })

    await ib.save((err,msg)=>{
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

    router.patch('/book/:id',async (req,res)=>{
        const ibook = await Book.findOne({_id:req.params.id})
        ibook.name = req.body.name
        ibook.price = req.body.price
        await ibook.save((err,msg)=>{
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
    
    router.delete("/book/:name",async(req,res)=>{
        await Book.deleteOne({name:req.params.name},(err,msg)=>{
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
