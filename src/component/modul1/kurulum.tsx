import React from 'react';

const Kurulum: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <h1 className="text-primary fw-bold">Kurulum (Vite)</h1>
        <hr />
      </div>

      <section className="mb-5">
        <h3 className="h5 fw-bold mb-3 text-secondary">🚀 Adım Adım Kurulum</h3>
        <div className="card shadow-sm border-0 bg-light p-4">
          <p>Modern bir React projesi oluşturmak için en hızlı araç olan <strong>Vite</strong>'ı kullanıyoruz[cite: 1, 5].</p>
          
          <div className="mt-3">
            <h6 className="fw-bold">1. Proje Oluşturma Komutu:</h6>
            <div className="bg-dark text-warning p-3 rounded">
              <code>npm create vite@latest . -- --template react-ts</code>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="fw-bold">2. Bağımlılıkları Yükleme:</h6>
            <div className="bg-dark text-warning p-3 rounded">
              <code>npm install</code>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="fw-bold">3. Projeyi Çalıştırma:</h6>
            <div className="bg-dark text-warning p-3 rounded">
              <code>npm run dev</code>
            </div>
          </div>
        </div>
      </section>

      <section className="alert alert-warning border-start border-4">
        <h5 className="fw-bold">⚠️ Ön Koşullar</h5>
        <p className="mb-0">React geliştirmeye başlamadan önce bilgisayarınızda <strong>Node.js (Sürüm 16+)</strong> kurulu olmalıdır[cite: 1, 5].</p>
      </section>
    </div>
  );
};

export default Kurulum;