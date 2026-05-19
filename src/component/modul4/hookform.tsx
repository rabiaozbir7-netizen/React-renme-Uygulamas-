import React, { useState } from 'react';

const HookFormDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki hatalı kodda input alanı forma kaydedilmeyecektir. Neden?\n\nconst { register } = useForm();\n\n{/* Hatalı Kullanım: */}\n<input register('kullaniciAdi') />",
      options: [
        "Çünkü 'register' bir fonksiyondur, string almaz.",
        "Çünkü input'un type'ı belirtilmemiştir.",
        "Çünkü register fonksiyonunun döndürdüğü özellikleri (onChange, onBlur, name, ref) input'a aktarmak için spread operatörü (...) kullanılmalıdır: {...register('kullaniciAdi')}",
        "Çünkü form etiketi eksiktir."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "React Hook Form'da <form onSubmit={handleSubmit(kaydet)}> yapısındaki 'handleSubmit' ne işe yarar?",
      options: [
        "Sadece formu sunucuya gönderir.",
        "Sayfanın yenilenmesini (e.preventDefault) engeller, Yup kurallarını test eder ve EĞER formda hata yoksa verileri 'kaydet' fonksiyonuna iletir.",
        "Sadece formdaki inputların içini temizler (reset atar).",
        "Formun sadece enter tuşuyla çalışmasını sağlar."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Aşağıdaki Yup şeması (schema) hangi kuralları uygulamaktadır?\n\nconst sema = yup.object().shape({\n  sifre: yup.string()\n    .required('Zorunlu')\n    .min(6, 'Çok kısa')\n});",
      options: [
        "Şifrenin en fazla 6 karakter olmasını ve zorunlu olmamasını sağlar.",
        "Şifrenin sadece sayılardan oluşmasını sağlar.",
        "Şifre alanının boş bırakılamayacağını (Zorunlu) ve girilen metnin en az 6 karakter uzunluğunda olması gerektiğini belirtir.",
        "Şifrenin içinde 'Zorunlu' kelimesinin geçmesini kontrol eder."
      ],
      correct: 2
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentStep - 1].correct) {
      setStatus('success');
      setScore(prev => prev + 10); 
      
      setTimeout(() => {
        if (currentStep < questions.length) {
          setCurrentStep(currentStep + 1);
          setStatus('idle');
        } else {
          setIsFinished(true);
        }
      }, 1000); 
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 800); 
    }
  };

  const resetTest = () => {
    setCurrentStep(1);
    setStatus('idle');
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      {/* Başlık Bölümü */}
      <div className="mb-4">
        <h2 className="text-primary fw-bold">📋 React Hook Form & Yup</h2>
        <p className="lead text-muted">
          Performanslı, hatasız (validation) ve yönetimi kolay formlar oluşturmanın modern standart yolu.
        </p>
      </div>

      {/* 1. Bölüm: Neden Kullanmalıyız? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden React Hook Form?</h4>
          <p>
            Geleneksel React formlarında her bir input için bir <code>useState</code> tanımlarız ve <code>onChange</code> ile bu state'i güncelleriz. Eğer formda 10 tane input varsa, klavyeye her basışınızda tüm bileşen 10 kere yeniden çizilir (Re-render).
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-success">
            <h6 className="fw-bold text-success">Performansın Sırrı</h6>
            <p className="small mb-0 text-dark">
              React Hook Form, <strong>Uncontrolled Components (Kontrolsüz Bileşenler)</strong> mantığıyla çalışır. Siz yazarken gereksiz re-render'ları engeller, veriyi sadece formu gönderdiğinizde (veya validasyon anında) toplayarak devasa bir performans artışı sağlar.
            </p>
          </div>
          
          <div className="mt-3 p-3 bg-dark rounded border-start border-4 border-info">
            <h6 className="fw-bold text-info mb-2">Kurulum</h6>
            <code className="text-warning">npm install react-hook-form yup @hookform/resolvers</code>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel Kullanım */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. useForm Hook'u ve Temel Kullanım</h4>
          <p>
            RHF'nin merkezinde <code>useForm</code> kancası bulunur. Inputları forma bağlamak için <code>register</code>, formu göndermek için <code>handleSubmit</code> fonksiyonlarını kullanırız.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';
import { useForm } from 'react-hook-form';

const BasitForm = () => {
  // useForm'dan gerekli fonksiyonları alıyoruz
  const { register, handleSubmit } = useForm();

  // Form gönderildiğinde çalışacak fonksiyon
  const onSubmit = (data: any) => {
    console.log("Gönderilen Veriler:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register ile input'u forma bağlıyoruz (name alanı şarttır) */}
      <input {...register("kullaniciAdi")} placeholder="Kullanıcı Adı" />
      <input {...register("email")} type="email" placeholder="E-posta" />
      
      <button type="submit">Gönder</button>
    </form>
  );
};`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Yup ile Validasyon */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Yup ile Şema Validasyonu (Hata Kontrolü)</h4>
          <p>
            Formdaki alanların zorunlu olup olmadığını, e-posta formatını veya şifre uzunluğunu kontrol etmek için <strong>Yup</strong> kütüphanesi ile bir "Şema (Schema)" oluştururuz.
          </p>
          
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 1. Validasyon Şemasını Oluşturuyoruz
const formSemasi = yup.object().shape({
  adSoyad: yup.string().required('Ad Soyad alanı zorunludur!'),
  email: yup.string().email('Geçerli bir e-posta girin!').required('E-posta zorunludur!'),
  sifre: yup.string().min(6, 'Şifre en az 6 karakter olmalı!').required('Şifre zorunludur!')
});

const KayitFormu = () => {
  // 2. Şemayı RHF'ye yupResolver ile bağlıyoruz
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSemasi)
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="E-posta" />
      {/* 3. Hata varsa ekrana yazdırıyoruz */}
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
      
      <button type="submit">Kayıt Ol</button>
    </form>
  );
};`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="rocket">🚀</span> Modül Ödevi: Güvenli İletişim Formu</h4>
        <p className="mb-3">
          React Hook Form ve Yup kütüphanelerini kullanarak hatalara izin vermeyen güvenli bir iletişim formu oluşturacağız. Terminalinizden kütüphaneleri kurduğunuzdan (<code>npm install react-hook-form yup @hookform/resolvers</code>) emin olun.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: İletişim Formu Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>IletisimFormu.tsx</code> açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup Şeması: Kurallarımız
const iletisimSemasi = yup.object().shape({
  ad: yup.string().required('Adınızı girmelisiniz.'),
  mesaj: yup.string().required('Mesaj alanı zorunludur.').min(10, 'Mesaj çok kısa (En az 10 karakter).')
});

const IletisimFormu: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(iletisimSemasi)
  });

  const mesajiGonder = (data: any) => {
    alert("Mesaj başarıyla gönderildi: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(mesajiGonder)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      
      <input {...register('ad')} placeholder="Adınız" />
      {errors.ad && <span style={{ color: 'red', fontSize: '12px' }}>{errors.ad.message as string}</span>}

      <textarea {...register('mesaj')} placeholder="Mesajınız" rows={4} />
      {errors.mesaj && <span style={{ color: 'red', fontSize: '12px' }}>{errors.mesaj.message as string}</span>}

      <button type="submit" className="btn btn-primary">Gönder</button>
    </form>
  );
};

export default IletisimFormu;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çalıştırın</h6>
        <p className="small mb-1"><code>src/App.tsx</code> içinde bileşeni ekrana basın, inputları boş bırakarak "Gönder" butonuna basın ve hataların nasıl anında yakalandığını izleyin!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import IletisimFormu from './components/IletisimFormu';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Bize Ulaşın</h2>
      <IletisimFormu />
    </div>
  );
}

export default App;`}
        </pre>
      </div>

      {/* DİNAMİK BİLGİ TESTİ BÖLÜMÜ */}
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
        <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold">🎯 Kod Okuryazarlığı Testi</h4>
          {!isFinished && <span className="badge bg-secondary fs-6">Soru {currentStep} / {questions.length}</span>}
        </div>
        
        {isFinished ? (
          <div className="card-body text-center py-5 bg-light">
            <div className="display-4 mb-3">🏅</div>
            <h3 className="fw-bold text-success mb-3">Tebrikler, Dersi Tamamladın!</h3>
            <p className="text-muted mb-4 fs-5">React Hook Form ile performanslı form yönetimini ve Yup ile kuralları bağlamayı başarıyla kavradın.</p>
            <button onClick={resetTest} className="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
              Testi Tekrar Çöz
            </button>
          </div>
        ) : (
          <div className="card-body bg-light p-4">
            <pre className="mb-4 fw-light bg-dark text-white p-3 rounded-3" style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', fontFamily: 'monospace' }}>
              {questions[currentStep - 1].question}
            </pre>
            
            <div className="list-group gap-2">
              {questions[currentStep - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={status === 'success'}
                  onClick={() => status === 'idle' && handleAnswer(idx)}
                  className={`list-group-item list-group-item-action p-3 rounded-3 border transition-all text-start
                    ${status === 'error' ? 'shake border-danger text-danger bg-danger bg-opacity-10' : 'border-secondary border-opacity-25'} 
                    ${status === 'success' && idx === questions[currentStep - 1].correct ? 'bg-success text-white border-success shadow' : ''}
                    ${status === 'idle' ? 'hover-bg-white' : ''}
                  `}
                  style={{ fontSize: '1rem', fontWeight: '500' }}
                >
                  <div className="d-flex align-items-center">
                    <span className="bg-secondary bg-opacity-25 text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{ minWidth: '30px', height: '30px', fontSize: '0.9rem' }}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    {opt}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 text-center" style={{ minHeight: '30px' }}>
              {status === 'success' && <span className="text-success fw-bold fs-5">✨ Harika, Doğru Bildin!</span>}
              {status === 'error' && <span className="text-danger fw-bold fs-5">❌ Yanlış Cevap, bir daha düşün.</span>}
            </div>
          </div>
        )}
      </div>

      {/* Animasyonlar İçin Stil Bloğu */}
      <style dangerouslySetInnerHTML={{ __html: `
        .shake { animation: shake 0.4s ease-in-out; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .transition-all { transition: all 0.2s ease-in-out; }
        .hover-bg-white:hover { background-color: white !important; transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      ` }} />
    </div>
  );
};

export default HookFormDers;