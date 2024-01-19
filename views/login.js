async function login(e){
    try{
        e.preventDefault();
        const details={
            email:e.target.email.value,
            password:e.target.password.value,
        }
        const resp=await axios.post('http://localhost:9000/login',details)
        alert(resp.data.message);
        location.reload();
    }catch(err){
        console.log(err);
    }
}

function signup_page(){
    window.location.href="./signup.html"
}