let nama = localStorage.getItem("nama");

document.getElementById("sapaan").innerHTML =
"Halo, " + nama + " 👋";

document
.getElementById("btnProfil")
.addEventListener("click", function(){

    window.location.href = "profil.html";

});