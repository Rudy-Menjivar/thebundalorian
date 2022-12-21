const Stripe = window.Stripe;

import {
    createAccountDetails, 
    createSocialLinks, 
    createNextButtons
} from './createProfile.js'

createAccountDetails();
createSocialLinks();
createNextButtons();

const subscribeButton = document.getElementById('subscribeButton');
const subscriberForm = document.getElementById('subscriberForm');
const signupSuccess = document.getElementById("signupSuccess");
const signupError = document.getElementById("signupError");
const mailchimpError = document.getElementById("mailchimpError");

subscriberForm.addEventListener("submit", (event) => {
  subscribeButton.innerHTML = "Subscribing...";
  subscribeButton.disabled = true;
  signupSuccess.classList.add("hidden");
  signupError.classList.add("hidden");

  const email = event.target.elements.email.value;
  const firstName = event.target.elements.first_name.value;

  fetch("/api/mailchimp", {
    method: "POST",
    body: JSON.stringify({ firstName, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message === "success") {
        signupSuccess.classList.remove("hidden");
        event.target.elements.email.value = "";
        event.target.elements.first_name.value = "";
      } else {
        signupError.classList.remove("hidden");
        mailchimpError.innerHTML = data.message;
      }
    })
    .finally(() => {
      subscribeButton.innerHTML = "Subscribe";
      subscribeButton.disabled = false;
    });

  event.preventDefault();
});

const productButtons = document.getElementsByClassName('product');
const stripeSpinner = document.getElementById("stripeSpinner");
const productsList = document.getElementById("products");
const buyMeATreat = document.getElementById("buyMeATreat");
const modal = document.getElementById("modal");

buyMeATreat.addEventListener('click', () => {
  modal.classList.toggle('hidden');
});

modal.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    modal.classList.toggle("hidden");
  }
});

[...productButtons].forEach((productButton) => {
  productButton.addEventListener('click', (event) => {
    stripeSpinner.classList.remove("hidden");
    productsList.classList.add("hidden");
    const productCode = event.currentTarget.getAttribute('data-productCode')
    fetch("/api/payment", {
    method: "POST",
    body: JSON.stringify({ productCode }),
  })
    .then((res) => res.json())
    .then((data) => {
      const stripe = Stripe(
        "pk_test_51KFtk5DmqbAbXMI10rZLuMJdOJF18JO0XRwMCanwvRpObrnRLijLiOEYayuWmouodXRRch1yFoxmc19MDnq3M2nb00WS329ipD"
      );
      stripe.redirectToCheckout(data);
    }).catch(err => {
      productsList.classList.remove("hidden");
      stripeSpinner.classList.add("hidden");
    })
  });
});
