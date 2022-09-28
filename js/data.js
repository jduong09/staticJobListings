function addNewJobListing(jsonObj, listJobs) {
  for (let i = 0; i < jsonObj.length; i++) {
    const jobListing = jsonObj[i];
    const listingJobItem = document.createElement('li');
    listingJobItem.classList.add('listing-job');

    const logoImg = document.createElement('img');
    logoImg.classList.add('img-logo');
    logoImg.src = jobListing.logo;

    const listInformationDiv = document.createElement('div');
    listInformationDiv.classList.add('listing-information');

    const listingHeaderDiv = document.createElement('div');
    listingHeaderDiv.classList.add('listing-header');

    const listingCompanyHeader = document.createElement('h2');
    listingCompanyHeader.classList.add('listing-company');
    listingCompanyHeader.innerHTML = jobListing.company;

    const listFeaturesList = document.createElement('ul');
    listFeaturesList.classList.add('list-features');
    if (jobListing.new) {
      const listFeatureNew = document.createElement('li');
      listFeatureNew.classList.add('feature-new');
      listFeatureNew.innerHTML = 'New!';
      listFeaturesList.append(listFeatureNew);
    }

    if (jobListing.featured) {
      const listFeatureFeatured = document.createElement('li');
      listFeatureFeatured.classList.add('feature-featured');
      listFeatureFeatured.innerHTML = 'Featured';
      listFeaturesList.append(listFeatureFeatured);
    }

    listingHeaderDiv.append(listingCompanyHeader, listFeaturesList);


    const listingJobTitle = document.createElement('h3');
    listingJobTitle.classList.add('listing-job-title');
    listingJobTitle.innerHTML = jobListing.position;

    const listDateRequirements = document.createElement('ul');
    listDateRequirements.classList.add('list-date-and-requirements');
    const postedAtItem = document.createElement('li');
    postedAtItem.innerHTML = jobListing.postedAt;
    const contractItem = document.createElement('li');
    contractItem.innerHTML = jobListing.contract;
    const locationItem = document.createElement('li');
    locationItem.innerHTML = jobListing.location;

    listDateRequirements.append(postedAtItem, contractItem, locationItem);
    listInformationDiv.append(listingHeaderDiv, listingJobTitle, listDateRequirements);

    const listFilters = document.createElement('ul');
    listFilters.classList.add('list-filters');
    const roleItem = document.createElement('li');
    roleItem.classList.add('filter-role');
    roleItem.innerHTML = jobListing.role;
    const levelItem = document.createElement('li');
    levelItem.classList.add('filter-level');
    levelItem.innerHTML = jobListing.level;

    listFilters.append(roleItem, levelItem);

    jobListing.languages.forEach(language => {
      const languageItem = document.createElement('li');
      languageItem.classList.add('filter-language');
      languageItem.innerHTML = language;
      listFilters.append(languageItem);
    });

    jobListing.tools.forEach(tool => {
      const toolItem = document.createElement('li');
      toolItem.classList.add('filter-tool');
      toolItem.innerHTML = tool;
      listFilters.append(toolItem);
    });

    listingJobItem.append(logoImg, listInformationDiv, listFilters);
    listJobs.append(listingJobItem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mainListOfJobs = document.querySelector('.list-jobs');
  const http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const jsonObj = JSON.parse(this.responseText);
      
      addNewJobListing(jsonObj, mainListOfJobs);
      console.log('hey');
    }
  }

  http.open('GET', './data.json', true);
  http.send();

  console.log('hi');
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
});