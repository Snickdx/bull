function promiseTimeout(cb, timeout) {
  return new Promise((resolve => {
    setTimeout(() => {
      cb();
      resolve('resolved');
    }, timeout);
  });
}


(async ()=>{
    // let a = 0;
    // setTimeout(()=>{ console.log(a)}, 500);
    // a=11;
    // setTimeout(()=>{ console.log(a)}, 500)
    let a = 0;
    await promiseTimeout(()=>{ console.log(a)}, 500);
    a=11;
    await promiseTimeout(()=>{ console.log(a)}, 500)
    
    await messagePromiseMaker(mailOptions1);
    await messagePromiseMaker(mailOptions2);
  
})()



let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});


function messagePromiseMaker(mailOptions){
    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailOptions, (err, info) => {
            if(err)reject("error");
            console.log(info.envelope);
            console.log(info.messageId);
            resolve(info.messageId);
        });
    });
}


let promArr = [];
mailOptions.forEach(ele=>{
    promArr.push(ele);
})

Promise.all(promArr).then(()=>console.log("done"));

