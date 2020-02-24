
  const form = document.querySelector('form');
  const search = document.querySelector('input');
  const message1 = document.querySelector('#message_1');
  const message2 = document.querySelector('#message_2');

  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    message1.textContent = 'loading....';
    message2.textContent = '';
    const address = search.value;
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
    
    if(data.error)
    {
      message1.textContent = data.error;
      message2.textContent='';
      return;
    }
    message1.textContent = data.place_name;
    message2.textContent = data.data;
    
  }
  );
})
    
  })


