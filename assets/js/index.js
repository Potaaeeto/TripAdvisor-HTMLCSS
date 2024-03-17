document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  const form = document.querySelector("#contactForm");
  const submitButton = document.querySelector("#submit-btn");

  console.log("document loaded");

  // Quand le bouton "Connectez-vous" est cliqué
  document.querySelector(".btn-signup").addEventListener("click", () => {
    // Display modal
    modal.classList.remove("hidden");
    // Disable scroll
    body.classList.add("disable");
  });

  // Envoyer le formulaire au back
  // Function to empty the form
  const cleanForm = () => {
    form.reset();
  };

  // Quand le submit bouton du formulaire est envoyé
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      firstname: document.querySelector("#firstname").value,
      lastname: document.querySelector("#lastname").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };

    try {
      const response = await axios.post("http://localhost:3000/form", data);

      if (response.status === 200) {
        alert("Votre formulaire a bien été envoyé");
        cleanForm();
      }
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        alert("Veuillez remplir tous les champs du formulaire");
      } else {
        alert("Une erreur est survenue");
        cleanForm();
      }
    }
  });

  // Quand la croix du bouton du formulaire est appuye
  document.querySelector(".icon-times").addEventListener("click", () => {
    // Hide modal
    modal.classList.add("hidden");
    // Enable scroll
    body.classList.remove("disable");
  });
});
