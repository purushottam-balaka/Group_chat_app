
window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token');
        const response=await axios.get('http://localhost:9000/get_message',{headers:{'Authorization':token}})
        //console.log(response)
        for(let i=0;i<response.data.msg.length;i++){
            showMessage(response.data.msg[i]);
        }
    }catch(err){
        console.log(err);
    }
})

async function save_message(e){
    try{
        e.preventDefault();
        const data={
            message:e.target.message.value,
        }
        const token=localStorage.getItem('token');
        await axios.post('http://localhost:9000/add_message',data,{headers:{'Authorization':token}})
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
    const childEle=document.createElement('li');
    childEle.setAttribute('class','list-group-item')
    childEle.textContent=item.user.name +' : '+ item.message;
    parentEle.append(childEle)
}