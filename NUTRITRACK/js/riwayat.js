// ==========================
// RIWAYAT PEMBELIAN
// ==========================

let daftar = document.getElementById("daftarRiwayat");

let riwayat =
    JSON.parse(localStorage.getItem("riwayat")) || [];


// Jika belum ada pembelian
if (riwayat.length === 0) {

    daftar.innerHTML = `
        <div class="text-center py-4">
            <p class="text-muted mb-0">
                Belum ada pembelian.
            </p>
        </div>
    `;

}


// Jika sudah ada pembelian
else {

    let tampil = "";

    riwayat.forEach(function(item) {

        tampil += `
            <div class="card shadow-sm mb-3">

                <div class="card-body">

                    <h5 class="fw-bold text-success mb-1">
                        ${item.menu}
                    </h5>

                    <p class="text-muted mb-3">
                        ${item.stand} · ${item.tanggal}
                    </p>

                    <div class="row">

                        <div class="col-6 mb-3">
                            <small class="text-muted">
                                Natrium
                            </small>

                            <div class="fw-bold">
                                ${item.natrium} mg
                            </div>
                        </div>


                        <div class="col-6 mb-3">
                            <small class="text-muted">
                                Lemak
                            </small>

                            <div class="fw-bold">
                                ${item.lemak} g
                            </div>
                        </div>


                        <div class="col-6 mb-3">
                            <small class="text-muted">
                                Gula
                            </small>

                            <div class="fw-bold">
                                ${item.gula} g
                            </div>
                        </div>


                        <div class="col-6 mb-3">
                            <small class="text-muted">
                                Kalori
                            </small>

                            <div class="fw-bold">
                                ${item.kalori} kkal
                            </div>
                        </div>


                        <div class="col-6">
                            <small class="text-muted">
                                Serat
                            </small>

                            <div class="fw-bold">
                                ${item.serat} g
                            </div>
                        </div>


                        <div class="col-6">
                            <small class="text-muted">
                                Skor Nutrisi
                            </small>

                            <div class="fw-bold text-success">
                                ${item.skor}/100
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        `;

    });

    daftar.innerHTML = tampil;

}
