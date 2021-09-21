
const searchContainer = document.querySelector('.search-container');

// 1. Set up connection to the Api
// 2. find out out where most of the data is comming From
// 3. use fetch 
//4. Grab data for name, 
//4 build the boxes first

//=============================
//Fetch Functions
//==============================
function fetchData(url){
 return fetch(url)
            .then(checkStatus)
            .then(res => res.json())         
            .catch(error => console.log('Looks like there was a problem', error))
}


fetchData('https://randomuser.me/api/?results=12&nat=us')    
    .then(data => generateCard(data.results))
    
    


//=============================
//Helper Functions
//==============================

//checks to see if the api connects
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }    
}



/*Generate Cards*/

function generateCard(users){
    
    const gallery = document.getElementById('gallery');   
    let html = '';
    
    users.forEach(user => {           
            html +=`<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div> `        
    });

    gallery.insertAdjacentHTML('beforeend', html); 
    
     selectCard(users);
     
}


function selectCard(users){
    const gallery = document.querySelector('#gallery');
    const cards = gallery.getElementsByClassName('card');
    console.log(cards);
    gallery.addEventListener('click', (e) => { 

        if(e.target.classList.contains('card')){                    
           const selectedCard = e.target;
           const name = selectedCard.querySelector('h3').innerHTML;          
           generateModal(name, users);         

        }

    });


}

function generateModal(name, users ) {
 
    const selectedUser = users.filter( user =>  `${user.name.first} ${user.name.last}` == name );
    console.log(selectedUser[0]);

    let html = '';
    html += `     
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${selectedUser[0].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${selectedUser[0].name.first} ${selectedUser[0].name.last}</h3>
                <p class="modal-text">${selectedUser[0].email}</p>
                <p class="modal-text cap">${selectedUser[0].location.city}</p>
                <hr>
                <p class="modal-text">${selectedUser[0].phone}</p>
                <p class="modal-text">${selectedUser[0].location.street.number} ${selectedUser[0].location.street.name} ${selectedUser[0].location.city}, ${selectedUser[0].location.state} ${selectedUser[0].location.postcode}</p>
                <p class="modal-text">Birthday: ${selectedUser[0].dob} 10/21/2015</p>
            </div>
        </div>

        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('beforeend', html);
    const close = document.getElementById('modal-close-btn');
 
    console.log(close);

   
    close.addEventListener('click', (e) => {
        const modal = document.querySelector(".modal-container");
        console.log(modal);
        e.preventDefault();       

        //removes the modal from the code in order for it be reinserted again
        modal.remove();
        


    });  

}





function modalWindow() {
    


    
}










