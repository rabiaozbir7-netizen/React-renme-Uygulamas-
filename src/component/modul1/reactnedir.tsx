import React from 'react';

const ReactNedir: React.FC = () => {
  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      {/* BAŞLIK */}
      <div className="mb-4">
        <h1 className="text-primary fw-bold">React Nedir?</h1>
        <p className="text-muted">Modern Web Geliştirmenin Temelleri</p>
        <hr />
      </div>

      {/* TEMEL TANIM */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm bg-white p-4">
          <h3 className="h5 fw-bold mb-3 text-secondary">📖 Genel Bakış</h3>
          <p className="lh-lg">
            React, Facebook (Meta) tarafından geliştirilen ve büyük ölçekli web uygulamaları oluşturmak için kullanılan 
            açık kaynaklı bir JavaScript kütüphanesidir. Kullanıcı arayüzlerini (UI) yönetmek için 
            "Bileşen (Component)" yapısını temel alır.
          </p>
        </div>
      </section>

      {/* VIRTUAL DOM MANTIĞI */}
      <section className="mb-5">
        <h3 className="h5 fw-bold mb-3 text-secondary">⚡ Sanal DOM (Virtual DOM)</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 border-start border-4 border-info bg-light h-100">
              <p>
                Geleneksel web sayfalarında bir veri değiştiğinde tüm sayfa veya tüm DOM ağacı yeniden yüklenir. 
                Bu durum performans kaybına yol açar.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 border-start border-4 border-success bg-light h-100">
              <p>
                <strong>React'in Çözümü:</strong> Veri değiştiğinde React önce Sanal DOM üzerinde işlem yapar, 
                eski sürümle karşılaştırır ve sadece değişen küçük parçayı gerçek sayfaya yansıtır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMEL ÖZELLİKLER LİSTESİ */}
      <section className="mb-5">
        <h3 className="h5 fw-bold mb-3 text-secondary">🌟 Neden React Kullanmalıyız?</h3>
        <div className="list-group shadow-sm">
          <div className="list-group-item p-3">
            <strong>Bileşen Tabanlıdır:</strong> Kodunuzu tekrar kullanılabilir parçalara bölebilirsiniz.
          </div>
          <div className="list-group-item p-3">
            <strong>Bildirimseldir (Declarative):</strong> React'e sayfanın nasıl görünmesi gerektiğini söylersiniz, o güncellemeleri yönetir.
          </div>
          <div className="list-group-item p-3">
            <strong>Geniş Ekosistem:</strong> TypeScript desteği, React Router ve zengin kütüphane seçenekleri sunar.
          </div>
        </div>
      </section>

      {/* BİLGİ NOTU */}
      <div className="alert alert-primary d-flex align-items-center" role="alert">
        <div>
          <strong>Not:</strong> React bir "Framework" (Çerçeve) değil, bir "Library" (Kütüphane) olarak kabul edilir.
        </div>
      </div>
    </div>
  );
};

export default ReactNedir;