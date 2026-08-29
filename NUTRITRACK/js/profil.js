document.getElementById("nama").innerHTML =
localStorage.getItem("nama");

document.getElementById("kelas").innerHTML =
localStorage.getItem("kelas");

document.getElementById("nisn").innerHTML =
localStorage.getItem("nisn");

document.getElementById("absen").innerHTML =
localStorage.getItem("absen");

// ==========================
// GANTI AKUN
// ==========================

document
.getElementById("btnGantiAkun")
.addEventListener("click", function(){

    const yakin = confirm(
        "Apakah kamu yakin ingin mengganti akun?"
    );

    if(!yakin){
        return;
    }

    localStorage.removeItem("sudahLogin");
    localStorage.removeItem("nama");
    localStorage.removeItem("nisn");
    localStorage.removeItem("kelas");
    localStorage.removeItem("absen");

    window.location.href = "index.html";

});

// ==========================
// RIWAYAT PEMBELIAN
// ==========================

let totalNatrium = 0;
let totalSkor = 0;
let riwayat =
JSON.parse(localStorage.getItem("riwayat")) || [];

let tampil = "";

if(riwayat.length == 0){

    tampil = `
    <p class="text-muted">
        Belum ada pembelian.
    </p>
    `;

}
else{

    riwayat.forEach(function(item){

        totalNatrium += Number(item.natrium);
totalSkor += Number(item.skor);

        tampil += `

        <div class="card shadow-sm mb-3">

            <div class="card-body">

                <h5>🍽️ ${item.menu}</h5>

                <p class="mb-1">
                🏪 ${item.stand}
                </p>

                <p class="mb-1">
                🧂 ${item.natrium} mg
                </p>

                <p class="mb-1">
                ❤️ Skor ${item.skor}/100
                </p>

                <small class="text-muted">

                ${item.tanggal}

                </small>

            </div>

        </div>

        `;

    });

}
let rataSkor = 0;

if(riwayat.length > 0){

    rataSkor =
    Math.round(totalSkor / riwayat.length);

}

document.getElementById("totalNatrium").innerHTML =
totalNatrium.toLocaleString("id-ID") +
" mg / 10.000 mg";

document.getElementById("rataSkor").innerHTML =
rataSkor + "/100";

document.getElementById("jumlahPembelian").innerHTML =
riwayat.length + " Menu";

document.getElementById("riwayat").innerHTML =
tampil;

let card = document.getElementById("notifikasi");
let judul = document.getElementById("judulNotifikasi");
let isi = document.getElementById("isiNotifikasi");

if(totalNatrium <= 6000){

    card.style.display = "block";
    card.classList.add("bg-success-subtle");

    judul.innerHTML = "🟢 Status Aman";

    isi.innerHTML =
    "Konsumsi natrium minggu ini masih dalam batas aman. Pertahankan pola makan sehat.";

}

else if(totalNatrium <= 8000){

    card.style.display = "block";
    card.classList.add("bg-warning-subtle");

    judul.innerHTML = "🟡 Perhatian";

    isi.innerHTML =
    "Konsumsi natrium telah mencapai lebih dari 60% batas mingguan. Sebaiknya pilih menu rendah natrium.";

}

else{

    card.style.display = "block";
    card.classList.add("bg-danger-subtle");

    judul.innerHTML = "🔴 Peringatan";

    isi.innerHTML =
    "Konsumsi natrium minggu ini telah melebihi batas yang disarankan. Kurangi makanan tinggi natrium pada pembelian berikutnya.";

}