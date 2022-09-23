function addNewJobListing(jsonObj) {
  const listJobs = document.querySelector('list-jobs');
  for (let i = 0; i < jsonObj.length; i++) {
    const jobListing = jsonObj[i];
    const listingJobItem = document.createElement('li');
    listingJobItem.classList.add('listing-job');

    const logoImg = document.createElement('img');
    logoImg.classList.add('img-logo');
    logoImg.src = jobListing.logo;

    const listingHeaderDiv = document.createElement('div');
    listingHeaderDiv.classList.add('listing-header');

    const listingCompanyHeader = document.createElement('h2');
    listingCompanyHeader.classList.add('listing-company');
    listingCompanyHeader.innerHTML = jobListing.company;

    const listFeaturesList = document.createElement('ul');
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
    const postedAtItem = document.createElement('li');
    postedAtItem.innerHTML = jobListing.postedAt;
    const contractItem = document.createElement('li');
    contractItem.innerHTML = jobListing.contract;
    const locationItem = document.createElement('li');
    locationItem.innerHTML = jobListing.location;

    listDateRequirements.append(postedAtItem, contractItem, locationItem);

    const listFilters = document.createElement('ul');
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

    listingJobItem.append(logoImg, listingHeaderDiv, listingJobTitle, listDateRequirements, listFilters);
    listJobs.append(listingJobItem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const jsonObj = JSON.parse(this.responseText);
      
      addNewJobListing(jsonObj);
    }
  }

  http.open('GET', './data.json', true);
  http.send();
});