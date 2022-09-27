document.addEventListener('DOMContentLoaded', () => {
  // Make clickable buttons on each of the filter list items in the list of filters.
  // When hovering, add active states.
  // When button is clicked, if there is no filter before the click, then we need a new box that will display abovve the list of jobs, and it will 
  // Create item that shows that is being filter, and then filter the list by that item.
  const filterItems = document.querySelectorAll('.list-filters > li');
  const filteredItemDiv = document.getElementById('div-filtered-items');
  const filteredItemsList = document.querySelector('.list-filtered-items');
  
  for (let i = 0; i < filterItems.length; i++) {
    const filterItem = filterItems[i];
    filterItem.addEventListener('click', (e) => {
      e.preventDefault();

      if (filteredItemDiv.classList.contains('hide')) {
        filteredItemDiv.classList.remove('hide');
      }
      // Need to check if this filtered click has already been added to the filtered list.
      if (filteredItemsList.length > 1) {
        for (let j = 0; j < filteredItemsList.length; j++) {
          const currentFilteredItem = filteredItemsList[j];
  
          if (currentFilteredItem.innerHTML === e.target.innerHTML) {
            // If filtered list contains clicked filter, do nothing and end function.
            return false;
          }
        }
      }

      const newFilteredItem = document.createElement('li');
      newFilteredItem.classList.add(`filter-${e.target.innerHTML.toLowerCase()}`);
      newFilteredItem.innerHTML = e.target.innerHTML;
      filteredItemsList.append(newFilteredItem);
    });
  }
})