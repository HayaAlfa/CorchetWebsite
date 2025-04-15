
let scaleFactor = 1;
const modalImage = document.querySelector("#thanks-modal img");



document.addEventListener("DOMContentLoaded", function () {
  let themeButton = document.getElementById("theme-button");
  let signNowButton = document.getElementById("sign-now-button");

  const toggleDarkMode = () => {
      document.body.classList.toggle("dark-mode");
  };

  themeButton.addEventListener("click", toggleDarkMode);

  const addSignature = (person) => {
    const newSignature = document.createElement("p");
    newSignature.innerHTML = `🖊️ <b>${person.name}</b> from <b>${person.hometown}</b> supports this.`;

    const signaturesDiv = document.getElementById("signatures");
    signaturesDiv.appendChild(newSignature);

    const total = signaturesDiv.getElementsByTagName("p").length;
    document.getElementById("signature-count").textContent = `Total Signatures: ${total}`;

    toggleModal(person);
};

  const validateForm = (event) => {
      event.preventDefault(); 

      let containsErrors = false;
      let petitionInputs = document.getElementById("sign-petition").elements;
      
      const person = {
        name: petitionInputs["name"].value.trim(),
        hometown: petitionInputs["location"].value.trim(),
        email: petitionInputs["email"].value.trim()
      };
      for (let i = 0; i < petitionInputs.length; i++) {
          if (petitionInputs[i].type !== "submit" && petitionInputs[i].value.trim().length < 2) {
              petitionInputs[i].classList.add("error");
              containsErrors = true;
          } else {
              petitionInputs[i].classList.remove("error");
          }
      }

      if (!containsErrors) {
          addSignature(person);

          for (let i = 0; i < petitionInputs.length; i++) {
              if (petitionInputs[i].type !== "submit") {
                  petitionInputs[i].value = ""; 
              }
          }
      }

      const email = document.getElementById('email');

      if (!person.email.includes('.com')) {
        containsErrors = true;
        petitionInputs["email"].classList.add('error');
    } else {
        petitionInputs["email"].classList.remove('error');
    }
  };

  signNowButton.addEventListener("click", validateForm);
});

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
    let windowHeight = window.innerHeight; 

    for (let i = 0; i < revealableContainers.length; i++) {
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

function reduceMotion() {
    animation.transitionDuration = '0s';
    animation.revealDistance = 0;
    animation.transitionProperty = 'none';

    for (let i =0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transitionDuration = animation.transitionDuration;
        revealableContainers[i].style.transitionProperty = animation.transitionProperty;
        revealableContainers[i].style.transform = 'translateY(0)'; 
        revealableContainers[i].style.opacity = 1; 
    }
}
document.getElementById('motion').addEventListener('click', reduceMotion);

reveal();

window.addEventListener('scroll', reveal);



function toggleModal(person) {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");
    
  
    modalContent.textContent = `Thank you, ${person.name}, for supporting our cause!`;
    modal.style.display = "flex";
  
    const intervalId = setInterval(scaleImage, 500);
  
    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalId);
      modalImage.style.transform = "scale(1)"; 
    }, 4000);

    
  }
  function scaleImage() {
    if (scaleFactor === 1) {
      scaleFactor = 0.8;
    } else {
      scaleFactor = 1;
    }
    modalImage.style.transform = `scale(${scaleFactor})`;
  }
  document.getElementById("close-modal-button").addEventListener("click", () => {
    document.getElementById("thanks-modal").style.display = "none";
  });