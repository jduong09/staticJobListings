export function addFilterLogic() {
  const filterItems = document.querySelectorAll('.list-filters > li');
  console.log(filterItems);
  const filteredItemDiv = document.getElementById('div-filtered-items');
  const filteredItemsList = document.querySelector('.list-filtered-items');
  const listOfJobs = document.querySelector('.list-jobs');
  const listJobs = document.getElementsByClassName('listing-job');
  const clearBtn = document.getElementById('btn-clear');
  let filteredJobs = [];
  let filters = [];

  clearBtn.addEventListener('click', () => {
    filteredItemsList.innerHTML = '';
    filteredItemDiv.classList.add('hide');
    
    for (let i = 0; i < listOfJobs.children.length; i++) {
      listOfJobs.children[i].classList.remove('hide');
    }
    filteredJobs = [];
    filters = [];
  });
  
  for (let i = 0; i < filterItems.length; i++) {
    const filterItem = filterItems[i];
    filterItem.addEventListener('click', (e) => {
      e.preventDefault();
      if (filters.includes(e.target.innerHTML)) {
        console.log(e.target.innerHTML);
        return false;
      }
      filters.push(e.target.innerHTML);

      if (filteredItemDiv.classList.contains('hide')) {
        filteredItemDiv.classList.remove('hide');
      }

      // Need to check if this filtered click has already been added to the filtered list.
      if (filteredItemsList.children.length > 1) {
        for (let j = 0; j < filteredItemsList.children.length; j++) {
          const currentFilteredItem = filteredItemsList.children[j];
          if (currentFilteredItem.textContent === e.target.innerHTML) {
            // If filtered list contains clicked filter, do nothing and end function.
            console.log('Already clicked this filter!');
            return false;
          }
        }
      }

      const newFilteredItem = document.createElement('li');
      newFilteredItem.classList.add(`filter-${e.target.innerHTML.toLowerCase()}`);
      newFilteredItem.innerHTML = e.target.innerHTML;

      const btnDeleteFilter = document.createElement('button');
      btnDeleteFilter.classList.add('btn-delete-filter');
      const imgDelete = document.createElement('img');
      imgDelete.classList.add('img-delete-filter');
      imgDelete.src = './images/icon-remove.svg';
      imgDelete.alt = 'Remove icon for deleting filter';
      btnDeleteFilter.append(imgDelete);
      newFilteredItem.append(btnDeleteFilter);
      filteredItemsList.append(newFilteredItem);

      imgDelete.addEventListener('click', (e) => {
        e.preventDefault();
        filters = filters.filter(item => item !== e.target.parentElement.parentElement.textContent);
        
        for (let k = 0; k < listJobs.length; k++) {
          const listJob = listJobs[k];
          listJob.classList.add('hide');
          const currentListFilters = listJob.children[2].children;
  
          const arrListFilters = [...currentListFilters].map(filterItem => {
            return filterItem.textContent;
          });
          
          let containsFilter = false;
  
          containsFilter = filters.every(filter => {
            return arrListFilters.includes(filter);
          });
  
          if (containsFilter) {
            filteredJobs.push(listJob);
          }
        }
        filteredJobs.forEach(filteredJob => {
          filteredJob.classList.remove('hide');
        });
  
        filteredJobs = [];
        e.target.parentElement.parentElement.remove();

        if (filteredItemsList.children.length === 0) {
          filteredItemDiv.classList.add('hide');
        }
      });

      // Need logic for actual filtering
      for (let k = 0; k < listJobs.length; k++) {
        const listJob = listJobs[k];
        listJob.classList.add('hide');
        const currentListFilters = listJob.children[2].children;

        const arrListFilters = [...currentListFilters].map(filterItem => {
          return filterItem.textContent;
        });
        
        let containsFilter = false;

        containsFilter = filters.every(filter => {
          return arrListFilters.includes(filter);
        });

        if (containsFilter) {
          filteredJobs.push(listJob);
        }
      }
      filteredJobs.forEach(filteredJob => {
        filteredJob.classList.remove('hide');
      });

      filteredJobs = [];
    });
  }
}