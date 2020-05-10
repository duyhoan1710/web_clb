module.exports = (app)=>{
    app.get('/api/test' , x , y , z);
};

let x = (req , res , next)=>{
    let x = {};
    console.log(array);
    console.log(x.a);
    return ()=>{
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
