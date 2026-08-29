// ========================================
// LINK GOOGLE SHEETS
// ========================================

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQDZ6nSbWhMs-bFOE2eBTBV8VFqqCLOTW5ubW4s_-vtlLtqJi03xvOC5L6NJPWgl-SPexawz3YMIDb3/pub?output=csv";
// ========================================
// CEK APAKAH SUDAH LOGIN
// ========================================

const sudahLogin = localStorage.getItem("sudahLogin");

if (sudahLogin === "true") {
    window.location.href = "dashboard.html";
}


// ========================================
// PROSES LOGIN
// ========================================

document
.getElementById("btnMulai")
.addEventListener("click", async function(){

    const nama =
        document.getElementById("nama").value.trim();

    const nis =
        document.getElementById("nis").value.trim();

    const kelas =
        document.getElementById("kelas").value.trim();

    const absen =
        document.getElementById("absen").value.trim();


    // Cek kelengkapan
    if(
        nama === "" ||
        nis === "" ||
        kelas === "" ||
        absen === ""
    ){

        alert("Lengkapi data terlebih dahulu!");
        return;

    }


    // ========================================
    // AMBIL DATA DARI GOOGLE SHEETS
    // ========================================

    try {

        const response =
            await fetch(SHEET_URL);

        const data =
            await response.text();


        // Pisahkan setiap baris
        const baris =
            data.trim().split("\n");


        let siswaDitemukan = false;


        // Mulai dari baris ke-2
        // karena baris pertama adalah header

        for(let i = 1; i < baris.length; i++){

            const kolom =
                baris[i].split(",");


            const namaSheet =
                kolom[0]?.trim();

            const nisSheet =
                kolom[1]?.trim();

            const kelasSheet =
                kolom[2]?.trim();

            const absenSheet =
                kolom[3]?.trim();


            // ========================================
            // CEK KECOCOKAN DATA
            // ========================================

            if(
                nama.toLowerCase() ===
                namaSheet.toLowerCase() &&

                nis === nisSheet &&

                kelas.toLowerCase() ===
                kelasSheet.toLowerCase() &&

                absen === absenSheet
            ){

                siswaDitemukan = true;
                break;

            }

        }


        // ========================================
        // JIKA DATA TIDAK COCOK
        // ========================================

        if(!siswaDitemukan){

            alert(
                "Data siswa tidak ditemukan atau tidak sesuai. Periksa Nama, NIS, Kelas, dan Nomor Absen."
            );

            return;

        }


        // ========================================
        // JIKA DATA COCOK
        // ========================================

        localStorage.setItem("nama", nama);
        localStorage.setItem("nis", nis);
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("absen", absen);

        localStorage.setItem(
            "sudahLogin",
            "true"
        );


        // Masuk dashboard
        window.location.href =
            "dashboard.html";


    }
    catch(error){

        console.error(error);

        alert(
            "Gagal mengambil data siswa dari Google Sheets."
        );

    }

});