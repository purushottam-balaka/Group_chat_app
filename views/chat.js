

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token')
        const grp=await axios.get('http://localhost:9000/groups',{headers:{'Authorization':token}})
        //console.log('group',grp)
        showGroups(grp.data.groups);


        // const token=localStorage.getItem('token');
        // let lastId=localStorage.getItem('lastId');
        // // console.log(lastId)
        // const allMsgs=[]
        //  const response=await axios.get('http://localhost:9000/get_message',lastId,{headers:{'Authorization':token}})
        //     response.data.msg.forEach(ele => {
        //         allMsgs.push(ele)
        //         lastId=ele.id;
        //     });
        //     const allMsgsStrigified=JSON.stringify(allMsgs)
        //     localStorage.setItem('message',allMsgsStrigified)
        //     localStorage.setItem('lastId',lastId);
        //     showMessage();
    }catch(err){
        console.log(err);
    }
})

// setInterval(async() => {
//     const token=localStorage.getItem('token');
//     const response=await axios.get('http://localhost:9000/get_message',{headers:{'Authorization':token}})
//     //console.log(response)
//     showMessage(response.data.msg);
// }, 1000);

async function save_message(e){
    try{
        e.preventDefault();
        const id=localStorage.getItem('id')
        const data={
            message:e.target.message.value,
            gId:id,
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

function showMessage(){
    const parentEle=document.getElementById('list');
    parentEle.innerHTML=''
    const i=localStorage.getItem('message')
    const item=JSON.parse(i)
    console.log(item)
    for(let i=0;i<item.length;i++){
    const childEle=document.createElement('li');
    childEle.setAttribute('class','list-group-item');
    childEle.textContent=item[i].name +' : '+ item[i].message;
    parentEle.append(childEle)
    }
}

function create_a_group(){
    window.location.href='./group_name.html'
}

function showGroups(ele){
    const parentEle=document.getElementById('group-list')
    ele.forEach(element => {
        // console.log('element',element)
        const childEle=document.createElement('li');
        childEle.textContent=element.group_name;
        childEle.id=element.id;
        
        parentEle.appendChild(childEle);
        childEle.onclick=async()=>{
            localStorage.setItem('id',childEle.id)
            const parentEle=document.getElementById('grp-msg-list');
            parentEle.innerHTML=''
            const grpId={
                gId:childEle.id,
            }
           
            const grpMsgs=await axios.post('http://localhost:9000/group_msgs',grpId);
                grpMsgs.data.grpMsgs.forEach(ele =>{
                    const childEle=document.createElement('li');
                    childEle.textContent=ele.name +' : ' +ele.message;
                    // console.log('childId',parentEle)
                    parentEle.appendChild(childEle);
                })
        }
    });   
}