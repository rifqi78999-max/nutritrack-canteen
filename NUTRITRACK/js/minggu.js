// ==========================
// SISTEM MINGGU NUTRITRACK
// ==========================

function getMingguSekarang() {

    const tanggal = new Date();

    // Membuat salinan tanggal
    const hari = new Date(tanggal);

    // JavaScript:
    // Minggu = 0
    // Senin = 1
    // Selasa = 2
    // dst.

    const hariSekarang = hari.getDay();

    // Menentukan tanggal Senin
    const selisih =
        hariSekarang === 0
        ? 6
        : hariSekarang - 1;

    hari.setDate(
        hari.getDate() - selisih
    );

    // Membuat ID minggu berdasarkan tanggal Senin
    const tahun = hari.getFullYear();

    const bulan =
        String(hari.getMonth() + 1)
        .padStart(2, "0");

    const tanggalSenin =
        String(hari.getDate())
        .padStart(2, "0");

    return (
        tahun +
        "-" +
        bulan +
        "-" +
        tanggalSenin
    );
}

// ==========================
// CEK PERGANTIAN MINGGU
// ==========================

const mingguSekarang = getMingguSekarang();

const mingguTersimpan =
    localStorage.getItem("mingguAktif");


if (!mingguTersimpan) {

    localStorage.setItem(
        "mingguAktif",
        mingguSekarang
    );

}

else if (mingguTersimpan !== mingguSekarang) {

    localStorage.setItem(
        "mingguAktif",
        mingguSekarang
    );

}
