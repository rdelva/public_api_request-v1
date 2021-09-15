
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


fetchData('https://randomuser.me/api/')
    .then( data => console.log(data))


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

function generateCard(){
    
    const gallery = document.getElementById('gallery');
   
    let html = '';

    for(let i = 0; i < 50; i++){

        html += `
        
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
            </div>
            
        `;


    }// end of for loop

    gallery.insertAdjacentHTML('beforeend', html);

    const cards = document.querySelectorAll('.card');
    //console.log(cards);
    selectCards(cards);
}



function generateModal() {
    let html = '';
    html += `     
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>

        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('beforeend', html);
        const modal = document.querySelector('.modal-container');
   
    modal.style.display = 'none';


}

function selectCards(cards){
    //console.log(cards);
   
    window.addEventListener('click', (e) => {
        //console.log(e.target.classList);
        if(e.target.classList.contains('card') ){
            generateModal();
            const modal = document.querySelector('.modal-container');
            modal.style.display = 'block';
            modalWindow();
        }
 
    });
 

}


function modalWindow() {
    
    const close = document.getElementById('modal-close-btn');
    console.log(close);

    console.log('hi');
    close.addEventListener('click', (e) => {
        //e.preventDefault();
        console.log(e);
        //console.log('hi');
        // if(e.target.tagName == 'BUTTON'){
        //     modal.style.display = 'none';
        //     console.log("hi");

        // }

    });
}






generateCard();
generateModal();
selectCards();



