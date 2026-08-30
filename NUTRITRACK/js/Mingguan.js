// ==========================
// RIWAYAT MINGGUAN
// ==========================

const nisSiswa = localstorage.getItem("nis")
let riwayat =
    JSON.parse(localStorage.getItem("riwayat")) || [];

let totalNatrium = 0;
let totalSkor = 0;


// Hitung semua pembelian
riwayat.forEach(function(item){

    totalNatrium += Number(item.natrium) || 0;

    totalSkor += Number(item.skor) || 0;

});


// Rata-rata skor
let rataSkor = 0;

if(riwayat.length > 0){

    rataSkor =
        Math.round(totalSkor / riwayat.length);

}


// Tampilkan data
document.getElementById("totalNatrium").innerHTML =
    totalNatrium.toLocaleString("id-ID") + " mg";

document.getElementById("rataSkor").innerHTML =
    rataSkor + "/100";

document.getElementById("jumlahPembelian").innerHTML =
    riwayat.length + " Menu";

    // ==========================
// STATUS KONSUMSI NATRIUM
// ==========================

let cardStatus = document.getElementById("cardStatus");
let judulStatus = document.getElementById("judulStatus");
let isiStatus = document.getElementById("isiStatus");

if(riwayat.length === 0){

    cardStatus.className =
        "card shadow-sm mb-4 bg-light";

    judulStatus.innerHTML =
        "⚪ Belum Ada Pembelian";

    isiStatus.innerHTML =
        "Belum ada pembelian yang tercatat minggu ini.";

}
else if(totalNatrium <= 6000){

    cardStatus.className =
        "card shadow-sm mb-4 bg-success-subtle";

    judulStatus.innerHTML =
        "🟢 Konsumsi Aman";

    isiStatus.innerHTML =
        "Total natrium minggu ini adalah <b>" +
        totalNatrium.toLocaleString("id-ID") +
        " mg</b>. Konsumsi masih berada dalam batas yang ditentukan.";

}
else if(totalNatrium <= 8000){

    cardStatus.className =
        "card shadow-sm mb-4 bg-warning-subtle";

    judulStatus.innerHTML =
        "🟡 Perlu Perhatian";

    isiStatus.innerHTML =
        "Total natrium minggu ini sudah mencapai <b>" +
        totalNatrium.toLocaleString("id-ID") +
        " mg</b>. Sebaiknya mulai memilih menu dengan kandungan natrium lebih rendah.";

}
else{

    cardStatus.className =
        "card shadow-sm mb-4 bg-danger-subtle";

    judulStatus.innerHTML =
        "🔴 Peringatan";

    isiStatus.innerHTML =
        "Total natrium minggu ini mencapai <b>" +
        totalNatrium.toLocaleString("id-ID") +
        " mg</b>. Konsumsi telah mendekati atau melebihi batas mingguan. Pilih makanan dengan kandungan natrium lebih rendah.";

}
