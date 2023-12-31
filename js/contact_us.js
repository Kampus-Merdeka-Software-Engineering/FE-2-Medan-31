function kirimForm() {
    // Mengambil nilai dari elemen input
    const name = document.querySelector("input[name='name']").value;
    const email = document.querySelector("input[name='email']").value;
    const phone = document.querySelector("input[name='phone']").value;
    const message = document.querySelector("textarea[name='message']").value;
  
    // Membentuk objek data
    const data = {
      username: name,
      email: email,
      phone_number: phone,
      message: message,
    };
  
    // Validasi: Memeriksa apakah semua input telah diisi
    if (name === "" || email === "" || phone === "" || message === "") {
      alert("Mohon lengkapi semua form sebelum mengirim pesan.");
      return; // Menghentikan pengiriman jika ada input yang kosong
    }
  
    // Mengirim data ke API
    fetch("http://localhost:3600/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Tanggapan dari API dapat digunakan di sini
        console.log(responseData);
        alert("Pesan Anda berhasil dikirim!");
        kontakForm.reset();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat mengirim pesan.");
      });
  }

document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  
  // Cek apakah ada token yang tersimpan di local storage
  const token = localStorage.getItem('token');

  // Periksa apakah token ada dan bukan undefined
  if (token && token !== 'undefined') {
    // Jika ada token, ubah teks tombol dan href-nya
    loginButton.textContent = 'PROFILE';
    loginButton.addEventListener('click', function() {
      window.location.href = 'profile.html';
    });
  }
});
  