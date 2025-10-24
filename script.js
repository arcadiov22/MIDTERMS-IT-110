
/* SCRIPT.JS is the most important part of the project. Contains the functions that
make the API work*/
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const result = document.getElementById("result");
    const convertBtn = document.getElementById("convertBtn");

    // Use your API key from ExchangeRate API(https://app.exchangerate-api.com/dashboard)
    //Your API Key: 268281b25b9e3259adec19da
    const apiKey = "268281b25b9e3259adec19da";

    // Load info thru the link or your API key
    async function loadCurrencies() {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
      const data = await res.json();
      const codes = data.supported_codes;

      // Options for the dropdown of kind of currency
      codes.forEach(([code, name]) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = code;
        option1.text = option2.text = `${code} - ${name}`;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });


      fromCurrency.value = "PHP"; // Default values when you open the site
      toCurrency.value = "USD";   // Default values when you open the site
    }

    // Convert currency function
    async function convertCurrency() {
      const amount = parseFloat(amountInput.value);
      // isNan() function determines whether a value is NaN (Not-a-Number) or not.
      if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
      }
      const from = fromCurrency.value;
      const to = toCurrency.value;

      try {
        // Fetch requested currency from the the API
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
        const data = await res.json();// It changes the response from the API (which comes as text) into usable JavaScript data (an object).

        if (data.result === "success") {
          result.textContent = `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
        } else {
          result.textContent = "Conversion failed";
        }
      } catch (err) {
        result.textContent = "Failed to fetch exchange rate.";
        console.error(err);
      }
    }




    // Only attach events if elements exist
    if (convertBtn) convertBtn.addEventListener("click", convertCurrency);
  



    loadCurrencies();// It calls the function that fetches all available currencies (USD, PHP, EUR, etc.) from the API and fills the dropdowns.


    
    document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle Menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close Menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled'); // use class instead of inline style
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Contact Form Confirmation
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      console.log('Form submitted');
      contactForm.reset(); // Clears form after submission
    });
  }