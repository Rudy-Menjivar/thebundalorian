const Stripe = window.Stripe;

export function stripeModal() {
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
          })
          .catch(err => {
            productsList.classList.remove("hidden");
            stripeSpinner.classList.add("hidden");
          });
      });
    });
  }