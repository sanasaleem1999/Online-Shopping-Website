 const searchForm = document.getElementById('search-bar-form');

 searchForm.addEventListener('submit',(event)=>{
     event.preventDefault();
      const searchbar = searchForm.firstElementChild.value;
      console.log(searchbar);
      fetch('/shop/search')

 })