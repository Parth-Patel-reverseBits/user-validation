localStorage.setItem("email", "parth.patel.reversebits@gmail.com");
localStorage.setItem("password", "reverseBits");

const userValidation = () => {
  let flag = null;
  let emailAddress = document.getElementById("form3Example3");
  let password = document.getElementById("form3Example4");

  if (
    emailAddress.value == localStorage.getItem("email") &&
    password.value == localStorage.getItem("password")
  ) {
    flag = true;
    if (flag) {
      document.getElementById("success-validation-msg").style.display = "block";
      document.getElementById("invalid-validation-msg").style.display = "none";
      setTimeout(function () {
        window.location.href = "/home.html";
      }, 1000);
    } else {
      document.getElementById("success-validation-msg").style.display = "none";
    }
  } else {
    flag = false;

    if (flag == false) {
      document.getElementById("invalid-validation-msg").style.display = "block";
    } else {
      document.getElementById("invalid-validation-msg").style.display = "none";
    }
  }
};
