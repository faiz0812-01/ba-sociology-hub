function showTab(event, id){

  let card = event.target.closest('.subject-card');

  let tabs = card.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}



const search = document.getElementById('search');

search.addEventListener('keyup', function(){

  let filter = search.value.toLowerCase();

  let cards = document.querySelectorAll('.subject-card');

  cards.forEach(card => {

    let text = card.innerText.toLowerCase();

    if(text.includes(filter)){
      card.style.display = 'block';
    }
    else{
      card.style.display = 'none';
    }

  });

});