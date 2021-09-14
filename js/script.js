const url = 'https://randomuser.me/api/';
const searchContainer = document.querySelector('.search-container');

// 1. Set up connection to the Api
// 2. find out out where most of the data is comming From
// 3. use fetch 
//4. Grab data for name, 
//4 build the boxes first

//=============================
//Fetch Functions
//==============================


//=============================
//Helper Functions
//==============================

/*Generate Cards*/

function generateCard (){
    const gallery = document.getElementById('gallery');
    let html = '';

    for(let i = 0; i < 50; i++){

        html += `
        <a href="">
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
         </a>   
        `;


    }// end of for loop

    gallery.insertAdjacentHTML('beforeend', html);
}


generateCard();