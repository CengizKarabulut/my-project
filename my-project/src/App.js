import React, { useState, useEffect } from 'react';
import WasteContainer from './WasteContainer';
import './App.css';
import Introduction from './Introduction'; // Introduction bileşenini ekledik

function App() {
  const [konteynerler, setKonteynerler] = useState([
    { id: 1, seviye: 60, lokasyon: "Osmangazi" },
    { id: 2, seviye: 30, lokasyon: "Nilüfer" },
    { id: 3, seviye: 80, lokasyon: "Yıldırım" }
  ]);

  const [yeniKonteyner, setYeniKonteyner] = useState({ id: '', seviye: 0, lokasyon: '' });
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [girisHata, setGirisHata] = useState(false);

  useEffect(() => {
    const aralik = setInterval(() => {
      setKonteynerler((oncekiKonteynerler) =>
        oncekiKonteynerler.map((konteyner) => ({
          ...konteyner,
          seviye: Math.min(konteyner.seviye + Math.floor(Math.random() * 20), 100)
        }))
      );
    }, 5000);
    return () => clearInterval(aralik);
  }, []);

  const inputDegistir = (e) => {
    const { name, value } = e.target;
    setYeniKonteyner((oncekiDurum) => ({
      ...oncekiDurum,
      [name]: value
    }));
  };

  const konteynerEkle = () => {
    if (girisYapildi) {
      setKonteynerler((oncekiKonteynerler) => [...oncekiKonteynerler, yeniKonteyner]);
      setYeniKonteyner({ id: '', seviye: 0, lokasyon: '' });
    } else {
      alert('Yeni bir konteyner eklemek için giriş yapmalısınız.');
    }
  };

  const konteynerBosalt = (id) => {
    if (girisYapildi) {
      setKonteynerler((oncekiKonteynerler) =>
        oncekiKonteynerler.map((konteyner) =>
          konteyner.id === id ? { ...konteyner, seviye: 0 } : konteyner
        )
      );
      console.log(`${id} numaralı konteyner boşaltıldı.`);
    } else {
      alert('Bir konteyneri boşaltmak için giriş yapmalısınız.');
    }
  };

  const girisYap = () => {         
    if (kullaniciAdi === 'admin' && sifre === '123456') {
      setGirisYapildi(true);
      setGirisHata(false);
    } else {
      setGirisHata(true);
    }
  };  

  return (
    <div className="app">
      <div className="top-image">
        <img src="/bursa.jpg" alt="Bursa" />
      </div>
      <h1>Akıllı Atık Yönetimi: Bursa</h1>
      <Introduction />
      <div className="container-list">
        {konteynerler.map((konteyner) => (
          <WasteContainer
            key={konteyner.id}
            id={konteyner.id}
            level={konteyner.seviye}
            location={konteyner.lokasyon}
            onEmpty={konteynerBosalt}
          />
        ))}
      </div>
      {girisYapildi && (
        <div className="add-container">
          <h2>Yeni Konteyner Ekle</h2>
          <input type="text" name="id" placeholder="ID" value={yeniKonteyner.id} onChange={inputDegistir} />
          <input type="number" name="seviye" placeholder="Doluluk Seviyesi" value={yeniKonteyner.seviye} onChange={inputDegistir} />
          <input type="text" name="lokasyon" placeholder="Lokasyon" value={yeniKonteyner.lokasyon} onChange={inputDegistir} />
          <button onClick={konteynerEkle}>Konteyner Ekle</button>
        </div>
      )}
      {!girisYapildi && (
        <div className="login-form">
          {girisHata && <p style={{ color: 'red' }}>Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.</p>}
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
          />
          <button onClick={girisYap}>Giriş Yap</button>
        </div>
      )}
    </div>
  );
}

export default App;