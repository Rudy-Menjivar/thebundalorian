const creatorDetails = {
  accountHandle: '@thebundalorian',
  creatorName: ' - the bundalorian',
  tagline: 'this is the (binky) way..',
  profilePic: './assets/profile-pic.jpg',
}

const socialLinks = [
  {
    url: 'tiktok.com/@thebundalorian',
    iconName: 'tiktok',
    active: true,
  },
  {
    url: 'http://www.youtube.com/@bundalorian',
    iconName: 'youtube',
    active: true,
  },
  {
    url: '',
    iconName: 'twitter',
    active: false,
  },
  {
    url: '',
    iconName: 'facebook',
    active: false,
  },
  {
    url: 'https://www.instagram.com/thebundalorian/',
    iconName: 'instagram',
    active: true,
  },
];

const whereNextLinks = [
  {
    url: '',
    text: 'See my zoomies',
    active: true,
  },
  {
    url: '',
    text: 'Watch me binky',
    active: true,
  },
  {
    url: '',
    text: 'Nom Nom is the way',
    active: true,
  },
]

function createAccountDetails() {
  const accountHandleElement = document.getElementById('accountHandle');
  const nameElement = document.getElementById('creatorName');
  const taglineElement = document.getElementById('tagline');
  accountHandleElement.innerHTML = creatorDetails.accountHandle;
  nameElement.innerHTML = creatorDetails.creatorName;
  taglineElement.innerHTML = creatorDetails.tagline;
  const profilePicWrapperElement = document.getElementById('profilePicContainer');
  const imageElement = document.createElement('img');
  imageElement.setAttribute('src',creatorDetails.profilePic);
  imageElement.classList.add('profileImage');
  profilePicWrapperElement.appendChild(imageElement);
}

function createSocialLinks() {
  const socialLinksElement = document.getElementById("socialRow");
  for (let link of socialLinks) {
    if (link.active){
      const i = document.createElement('i');
      i.classList.add('fa-brands');
      i.classList.add(`fa-${link.iconName}`);
      const a = document.createElement('a');
      a.setAttribute("href", link.url);
      a.appendChild(i);
      socialLinksElement.appendChild(a);
    }
  }
}

function createWhiteButtons() {
  const whereNextElement = document.getElementById('whereNext');
  for (let link of whereNextLinks) {
    if (link.active){
      const a = document.createElement('a');
      a.setAttribute("href", link.url);
      a.classList.add("whiteButton");
      a.innerHTML = link.text;
      whereNextElement.appendChild(a);
    }
  }
}

createAccountDetails();
createSocialLinks();
createWhiteButtons();
