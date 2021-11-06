
const searchContainer = document.querySelector('.search-container');

// 1. Set up connection to the Api
// 2. find out out where most of the data is comming From
// 3. use fetch 
//4. Grab data for name, 
//4 build the boxes first



 /**
    * Use fetch data to pull json data into app
    * @param (object with arrays) url - contains random user data
    */
//=============================
//Fetch Functions
//==============================
function fetchData(url){
 return fetch(url)
            .then(checkStatus)
            .then(res => res.json())         
            .catch(error => console.log('Looks like there was a problem', error))
}


 /**
    * Invokes fetchData sends the url to the function and if it passes sends data to generateCard
    * @param (string) url - location of where the api is located
    */
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



/**
* generateCard()
* Invokes fetchData sends the url to the function and if it passes sends data to generateCard
* @param (array of objects) users - list of all the users
*/
function generateCard(users){
    console.log(users);
       
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
     searchBox(users);
     
}


function selectCard(users){
   
    const gallery = document.querySelector('#gallery');
    const cards = gallery.getElementsByClassName('card');
    
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
                <p class="modal-text">Birthday: ${fixDate(selectedUser[0].dob.date)}</p>
            </div>
        </div>
        
        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    fixDate(selectedUser[0].dob.date); //formats date to readable format

    gallery.insertAdjacentHTML('afterend', html);
    cardFunctions(users);
   
}

/**
* Changes date listed in array to local time format and sets to a MM-DD-YYYY
* @param (string) fullDate - this date comes from the generateModal()
*/
function fixDate(fullDate){  
   
    const d = new Date(fullDate).toLocaleDateString();
    const seperatedDate = d.split('/');
    //Inserts a O  before a single digit value
    for(let i=0; i < seperatedDate.length; i++){  //will only look at the month and date
        if(seperatedDate[i] < 10) {
            seperatedDate[i] = `0${seperatedDate[i]}`;
        }
    }
    const birthDate = seperatedDate.join('-');    
    return birthDate;
}


function cardFunctions(users) {
    
    const cards = document.querySelectorAll('.card');
    const close = document.getElementById('modal-close-btn');
    const prevButton = document.getElementById("modal-prev");
    const nextButton = document.getElementById("modal-next");
    const modal = document.querySelector(".modal-container");
    // console.log(users);
    // console.log(cards);

    
    /** Close Button */
    close.addEventListener('click', (e) => {
        
        //console.log(modal);
        e.preventDefault();       

        //removes the modal from the code in order for it be reinserted again
        modal.remove();      
    });  

    /** Next Button */
    nextButton.addEventListener('click', (e) => {
        const modalWindow = document.querySelector('.modal');
        const currentName = modalWindow.querySelector('#name').innerHTML;
        //console.log(currentName);
        //find the card in the list

        
        for(let i = 0; i < users.length; i++) {
            //Combined the first and last name in the user list
            const fullNameList = `${users[i].name.first} ${users[i].name.last}`;         
            
            
                 // go down the list till you find the name
            if(fullNameList == currentName){
                    //if you find the next Name in the Card
                    let nextCardIndex = 0;
                    nextCardIndex = i;
                    nextCardIndex++;                        
             
                    if(i == users.length - 1){
                        nextButton.setAttribute('disabled','disabled');                    

                    } else {
                        nextButton.removeAttribute('disabled'); 
                        const nextCard = `${users[nextCardIndex].name.first} ${users[nextCardIndex].name.last}`;
                        console.log(nextCard);
                        modal.remove(); 
                        generateModal(nextCard, users); 

                    }                     
            }     

        }// end of for loop

    }); // end of next Button


    prevButton.addEventListener('click', (e) => {
        const modalWindow = document.querySelector('.modal');                        
        const currentName = modalWindow.querySelector('#name').innerHTML;   

        for(let i = 0; i < users.length; i++){
            const fullNameList = `${users[i].name.first} ${users[i].name.last}`;  
            
                 // go down the list till you find the name

                 if(fullNameList == currentName){
                    //if you find the next Name in the Card
                    let prevCardIndex = 0;
                    prevCardIndex = i;
                    prevCardIndex--;                        
             
                    if(i == 0){
                        prevButton.setAttribute('disabled','disabled');                    

                    } else {
                        prevButton.removeAttribute('disabled'); 
                        const prevCard = `${users[prevCardIndex].name.first} ${users[prevCardIndex].name.last}`;
                        console.log(prevCard);
                        modal.remove(); 
                        generateModal(prevCard, users); 

                    }                     
            }   



        }

    });


}



/* Creates searchbox to put ontop of page*/
function searchBox(employees) {
    const searchContainer = document.querySelector('.search-container');
    //console.log(results);
    
    searchContainer.innerHTML = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;    

    const searchSubmit = document.getElementById('search-submit');
    const searchInput = document.getElementById('search-input');

    const cards = document.getElementsByClassName('card');
    searchSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const searchValue = searchInput.value;
        console.log(searchValue);
        let pattern = new RegExp(searchValue)        
        const cardsFound = employees.filter( employee =>   pattern.test(`${employee.name.first} ${employee.name.last}`) );

       console.log(cardsFound);
       clearGallery();
        generateCard(cardsFound);

    });


} // end of searchBox()





function clearGallery(){
    const gallery = document.querySelector('#gallery');
    // const prevCardDeck = document.querySelectorAll('.card');
    // //console.log(cards);

    // prevCardDeck.forEach( prevCardDeck => prevCardDeck.remove());

    let html ='';
    gallery.innerHTML =  html;


}







