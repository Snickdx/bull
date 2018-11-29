function syncSetTimeout(cb, timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cb()||"resolved");//cb() called after timeout
    }, timeout);
  });
}

(async ()=>{
  

    await syncSetTimeout(()=>{ console.log("1s")}, 1000);
   
    await syncSetTimeout(()=>{ console.log("2s")}, 1000)
    
  
})()


