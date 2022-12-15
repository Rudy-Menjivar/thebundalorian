
const socialLinks = [
  {
    url: '',
    iconName: 'tiktok',
    active: true,
  },
  {
    url: '',
    iconName: 'youtube',
    active: true,
  },
  {
    url: '',
    iconName: 'twitter',
    active: true,
  },
  {
    url: '',
    iconName: 'facebook',
    active: false,
  },
  {
    url: '',
    iconName: 'instagram',
    active: true,
  },
];



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

createSocialLinks();
