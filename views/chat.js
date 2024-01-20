setInterval(async()=>{



// window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token');
        const response=await axios.get('http://localhost:9000/get_message',{headers:{'Authorization':token}})
        //console.log(response)
        showMessage(response.data.msg);
    }catch(err){
        console.log(err);
    }
// })
},1000)

async function save_message(e){
    try{
        e.preventDefault();
        const data={
            message:e.target.message.value,
        }
        const token=localStorage.getItem('token');
        await axios.post(   'http://localhost:9000/add_message',data,{headers:{'Authorization':token}})
        .then((resp)=>{
            window.location.reload();
            // console.log('reloaded')
        }).catch((err)=>{
            console.log(err)
        })
       
    }catch(err){
        console.log(err)
    }
}

function showMessage(item){
    const parentEle=document.getElementById('list');
    parentEle.innerHTML=''
    for(let i=0;i<item.length;i++){
    const childEle=document.createElement('li');
    childEle.setAttribute('class','list-group-item');
    childEle.textContent=item[i].user.name +' : '+ item[i].message;
    parentEle.append(childEle)
    }
}