const daftarMenu = document.getElementById("daftarMenu");

// Ambil nama stand dari URL
const urlParams = new URLSearchParams(window.location.search);
const namaStand = urlParams.get("stand") || "Kayla Snack";

// Ubah judul stand
document.getElementById("namaStand").innerHTML = "🍽️ " + namaStand;

// Tampilkan semua menu
kantin[namaStand].forEach(menu => {

    daftarMenu.innerHTML += `
        <div class="col-md-4">

            <div class="card shadow p-3">

                <h5>${menu.nama}</h5>

                <p>Rp ${menu.harga.toLocaleString("id-ID")}</p>

                <button
                    class="btn btn-success w-100"
                    onclick="pilihMenu('${namaStand}', '${menu.nama}')">

                    Pilih Menu

                </button>

            </div>

        </div>
    `;

});

function pilihMenu(namaStand, namaMenu){

    localStorage.setItem("stand", namaStand);
    localStorage.setItem("menu", namaMenu);

    window.location.href = "hasil.html";

}