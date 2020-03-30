module.exports = (app)=>{
    app.get('/api/test' , x(['1','2']) , y , z);
};

let x = ( array )=>{
    console.log(array);
    return (req , res , next)=>{
        next();
    }
    // check quyền ở bước này
};

let y = (req , res , next)=>{
    // res.json({
    //     message : 'success y'
    // })
    next();
};

let z = (req , res , next)=>{
    res.json({
        message : 'success z'
    })
};
