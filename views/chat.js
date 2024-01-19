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
        const resp= await axios.post('http://localhost:9000/add_message',data,{headers:{'Authorization':token}})
    }catch(err){
        console.log(err)
    }
}

function showMessage(item){
    const parentEle=document.getElementById('list');
    const childEle=document.createElement('li');
    childEle.textContent=item.message;
    parentEle.append(childEle)
}