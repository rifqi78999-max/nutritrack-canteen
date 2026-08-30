const stand = localStorage.getItem("stand");
const menu = localStorage.getItem("menu");
let natrium = 0;
let lemak = 0;
let gula = 0;
let kalori = 0;
let serat = 0;
let totalSkor = 0;

let skorNatrium = 0;
let skorLemak = 0;
let skorGula = 0;
let skorKalori = 0;
let skorSerat = 0;

document.getElementById("stand").innerHTML =
"🏪 " + stand;

document.getElementById("menu").innerHTML =
"🍽️ " + menu;

// ==========================
// MEMBACA DATA GOOGLE SHEETS
// ==========================

fetch(SHEET_URL)
.then(response => response.text())
.then(data => {

    const baris = data.split("\n");

    baris.forEach(item => {

        const kolom = item.split(",");

        // 0 = Stan
        // 1 = Menu
        // 2 = Natrium
        // 3 = Lemak
        // 4 = Gula
        // 5 = Kalori
        // 6 = Serat

        if (
            kolom.length >= 7 &&
            kolom[0].trim().toLowerCase() ===
            stand.trim().toLowerCase() &&

            kolom[1].trim().toLowerCase() ===
            menu.trim().toLowerCase()
        ) {

            document.getElementById("natrium").innerHTML =
                "Natrium : " + kolom[2].trim() + " mg";

            document.getElementById("lemak").innerHTML =
                "Lemak : " + kolom[3].trim() + " g";

            document.getElementById("gula").innerHTML =
                "Gula : " + kolom[4].trim() + " g";

            document.getElementById("kalori").innerHTML =
                "Kalori : " + kolom[5].trim() + " kkal";

            document.getElementById("serat").innerHTML =
                "Serat : " + kolom[6].trim() + " g";


            natrium = parseFloat(
                kolom[2].trim().replace(",", ".")
            );

            lemak = parseFloat(
                kolom[3].trim().replace(",", ".")
            );

            gula = parseFloat(
                kolom[4].trim().replace(",", ".")
            );

            kalori = parseFloat(
                kolom[5].trim().replace(",", ".")
            );

            serat = parseFloat(
                kolom[6].trim().replace(",", ".")
            );


            skorNatrium =
                hitungSkor(natrium, 2000);

            skorLemak =
                hitungSkor(lemak, 20);

            skorGula =
                hitungSkor(gula, 50);

            skorKalori =
                hitungSkor(kalori, 2150);

            skorSerat =
                hitungSkorSerat(serat);


            totalSkor = Math.round(
                (
                    skorNatrium +
                    skorLemak +
                    skorGula +
                    skorKalori +
                    skorSerat
                ) / 5
            );


            document.getElementById("totalSkor").innerHTML =
                totalSkor + "/100";


            let zona = "";
            let rekomendasi = "";

            if (totalSkor >= 80) {

                zona = "🟢 Zona Hijau";

                rekomendasi =
                    "Pilihan menu cukup baik. Tetap jaga pola makan seimbang dan minum air putih yang cukup.";

            }
            else if (totalSkor >= 60) {

                zona = "🟡 Zona Kuning";

                rekomendasi =
                    "Menu masih cukup baik, namun sebaiknya batasi konsumsi makanan tinggi natrium atau lemak pada waktu makan berikutnya.";

            }
            else {

                zona = "🔴 Zona Merah";

                rekomendasi =
                    "Menu memiliki kandungan yang cukup tinggi. Sebaiknya imbangi dengan buah, sayur, dan air putih.";

            }

            document.getElementById("zona").innerHTML =
                zona;

            document.getElementById("rekomendasi").innerHTML =
                rekomendasi;
        }

    });

});

 function hitungSkor(nilai, batas){

    let persen = (nilai / batas) * 100;

    if(persen <= 20) return 100;
    if(persen <= 40) return 80;
    if(persen <= 60) return 60;
    if(persen <= 80) return 40;

    return 20;

}

function hitungSkorSerat(nilai){

    let persen = (nilai / 30) * 100;

    if(persen >= 20) return 100;
    if(persen >= 15) return 80;
    if(persen >= 10) return 60;
    if(persen >= 5) return 40;

    return 20;

}

document
.getElementById("btnCatat")
.addEventListener("click", function(){

   const nisnSiswa = localStorage.getItem("nis");

let riwayat =
JSON.parse(localStorage.getItem("riwayat_" + nisnSiswa)) || [];

    let pembelian = {

        tanggal: new Date().toLocaleDateString("id-ID"),

        stand: stand,
        menu: menu,

        natrium: natrium,
        lemak: lemak,
        gula: gula,
        kalori: kalori,
        serat: serat,

        skor: totalSkor

    };

    riwayat.push(pembelian);

 localStorage.setItem(
    "riwayat_" + nisnSiswa,
    JSON.stringify(riwayat)
);
    // Hitung total natrium minggu ini
    let totalNatriumMinggu = 0;

    riwayat.forEach(function(item){
        totalNatriumMinggu += Number(item.natrium);
    });

    // Ambil elemen notifikasi
    let card = document.getElementById("cardNotifikasi");
    let judul = document.getElementById("judulNotif");
    let isi = document.getElementById("isiNotif");

    card.style.display = "block";

    if(totalNatriumMinggu <= 6000){

        card.className =
        "card mt-4 border-0 shadow bg-success-subtle";

        judul.innerHTML = "🟢 Pembelian Berhasil";

        isi.innerHTML =
        "Total natrium minggu ini <b>" +
        totalNatriumMinggu.toLocaleString("id-ID") +
        " mg</b> dari batas <b>10.000 mg</b>.<br><br>" +
        "Silakan lanjutkan pola makan sehat.";

    }
    else if(totalNatriumMinggu <= 8000){

        card.className =
        "card mt-4 border-0 shadow bg-warning-subtle";

        judul.innerHTML = "🟡 Perhatian";

        isi.innerHTML =
        "Total natrium minggu ini <b>" +
        totalNatriumMinggu.toLocaleString("id-ID") +
        " mg</b>.<br><br>" +
        "Sebaiknya pilih menu dengan kandungan natrium lebih rendah.";

    }
    else{

        card.className =
        "card mt-4 border-0 shadow bg-danger-subtle";

        judul.innerHTML = "🔴 Peringatan";

        isi.innerHTML =
        "Total natrium minggu ini telah mencapai <b>" +
        totalNatriumMinggu.toLocaleString("id-ID") +
        " mg</b> dan telah melebihi batas mingguan <b>10.000 mg</b>.<br><br>" +
        "Kurangi konsumsi makanan tinggi natrium.";

    }

});
