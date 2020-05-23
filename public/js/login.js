

window.onload = () => {
 const form = document.getElementById('login');
 form.addEventListener('submit', async (e)=> {
     e.preventDefault();
     const email = form.email.value;
     const password = form.password.value;
     console.log(email, password)
    const response = await fetch('/postlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({email, password}),
 })
    response.json().then( data =>{
        console.log(data);
        const {token} = data;
        console.log(token);
        const {usermode} = data;
        console.log(usermode);
        console.log(token);
        localStorage.setItem('key', JSON.stringify(token));
        const getToken =  JSON.parse(localStorage.getItem('key'));
         if(!usermode){
            window.location = `/admin?token=${getToken}`;
         }
         else{
            window.location = `/shop?token=${getToken}`;

         }
            
        
       // window.location = `/admin?token=${getToken}&page=skinCare`;

    })

     //alert('hello');
 })

}