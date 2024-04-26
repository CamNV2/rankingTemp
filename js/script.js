debugger
let fullname = document.getElementById("fullname")
let first = document.getElementById("first")
let last = document.getElementById("last")
let mail = document.getElementById("email")
let photo = document.getElementById("photo")
let id_num = document.getElementById("id_num")
let sign = document.getElementById("sign")
let out = document.getElementById("out")
let info = document.getElementById("info")
let signInBtn = document.getElementById("sign-in-btn")



// Show All Data in Web from localStorage
function show_L_data() {
  let infosLparse = JSON.parse(localStorage.getItem("infos"))
  if (localStorage.getItem("infos") && infosLparse != null) {

    $("#sign-in-btn").addClass("d-none")
    $("#logo_img").removeClass("d-none")
    $("#logo_img img").attr('src', infosLparse.photo_linkL);
    $("#out").removeClass("d-none")
    $("#nav_list .nav_link:nth-child(1)").addClass("active");
    if (infosLparse.mailL == 'nhatluong0102@gmail.com') {
      $("#admin-upload").show();
    } else {
      $("#admin-upload").hide();
    }

  } else {
    $("#logo_img").addClass("d-none")
    $("#sign-in-btn").removeClass("d-none")
    $("#out").addClass("d-none")
  }

}

window.addEventListener("load", show_L_data())



// Sign in // Sign in // Sign in // Sign in
function handleCredentialResponse(response) {
  debugger
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  let infos = {
    fullnameL: responsePayload.name,
    photo_linkL: responsePayload.picture,
    firstL: responsePayload.given_name,
    lastL: responsePayload.family_name,
    mailL: responsePayload.email,
    id_numL: responsePayload.sub
  }

  let infosL = JSON.stringify(infos)

  localStorage.setItem("infos", infosL)

  show_L_data()
}


// decodeJwtResponse()
function decodeJwtResponse(data) {
  let tokens = data.split(".");
  return JSON.parse(atob(tokens[1]))
}

// Sign Out
out.addEventListener("click", () => {
  localStorage.clear()
  $("#logo_img").addClass("d-none")
  $("#sign-in-btn").removeClass("d-none")
  $("#out").addClass("d-none")
  $("#out").removeClass("active")
  $("#nav_list .nav_link:nth-child(1)").addClass("active");
})

//UI
document.addEventListener("DOMContentLoaded", function (event) {

  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        //bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
  showNavbar('img_logo', 'nav-bar', 'body-pd', 'header')

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  $(document).ready(function () {
    $("#sign-in-btn").click(function () {
      $("#sign div div div").click();
    });

    $("#admin-upload").hide();


  });
  // Your code to run since DOM is loaded and ready
});