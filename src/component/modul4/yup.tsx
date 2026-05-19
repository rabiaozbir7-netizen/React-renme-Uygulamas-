import React, { useState } from 'react';

const YupDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki Yup şemasında, kullanıcı 'yas' (yaş) alanına klavyeden harflerle 'yirmi' yazarsa hangi hata mesajını ekranda görür?\n\nconst sema = yup.object().shape({\n  yas: yup.number()\n    .typeError('Lütfen rakam kullanın.')\n    .min(18, 'Reşit olmalısınız.')\n    .required('Yaş zorunludur.')\n});",
      options: [
        "'Yaş zorunludur.' mesajını görür.",
        "'Reşit olmalısınız.' mesajını görür.",
        "'Lütfen rakam kullanın.' mesajını görür (Çünkü girilen değer number formatına dönüştürülemez).",
        "Hata vermez, Yup metni otomatik olarak sayıya çevirir."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki kod parçasında 'yup.ref(\"sifre\")' tam olarak ne işe yaramaktadır?\n\nconst sema = yup.object().shape({\n  sifre: yup.string().required(),\n  sifreTekrar: yup.string()\n    .oneOf([yup.ref('sifre')], 'Şifreler eşleşmiyor!')\n});",
      options: [
        "'sifre' adında yeni bir değişken oluşturur.",
        "Formdaki 'sifre' alanının o anki değerini okur ve 'sifreTekrar' alanına girilen değerin bununla BİREBİR AYNI olup olmadığını kontrol eder.",
        "Şifrenin veritabanındaki şifreyle eşleşip eşleşmediğini kontrol eder.",
        "Şifreyi kriptolamak (hash) için referans alır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Bir formda 'Sözleşmeyi okudum ve kabul ediyorum' şeklindeki bir Onay Kutusunun (Checkbox) kesinlikle işaretlenmiş (true) olmasını sağlamak için hangi Yup kuralı yazılmalıdır?",
      options: [
        "yup.string().required('Kabul etmelisiniz')",
        "yup.boolean().isTrue('Kabul etmelisiniz')",
        "yup.boolean().oneOf([true], 'Kabul etmelisiniz')",
        "yup.number().min(1, 'Kabul etmelisiniz')"
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
        <h2 className="text-primary fw-bold">🛡️ Yup ile Şema Validasyonu</h2>
        <p className="lead text-muted">
          Form verilerinizin doğruluğunu test etmek için kırılmaz, okunabilir ve güçlü kurallar bütünü (Schema) oluşturun.
        </p>
      </div>

      {/* 1. Bölüm: Yup Nedir? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Yup Nedir ve Neden Kullanılır?</h4>
          <p>
            Normalde bir formda şifrenin en az 8 karakter olduğunu kontrol etmek için uzun uzun <code>if (sifre.length &lt; 8)</code> gibi kodlar yazarız. Form büyüdükçe bu kontroller içinden çıkılamaz bir hal alır.
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-primary">
            <h6 className="fw-bold text-primary">Nesne Şeması (Object Schema) Yaklaşımı</h6>
            <p className="small mb-0 text-dark">
              Yup, girilen verilerin nasıl olması gerektiğini tanımladığınız bir "Şema" oluşturmanızı sağlar. Bu şemayı bir kez tanımlarsınız ve Yup gerisini (hata mesajları dahil) sizin yerinize halleder.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel Veri Tipleri ve Kurallar */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Temel Veri Tipleri ve Kurallar</h4>
          <p>Yup ile metin (string), sayı (number), tarih (date) ve mantıksal (boolean) veriler için zincirleme kurallar yazabilirsiniz.</p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import * as yup from 'yup';

// 1. Şemayı oluşturuyoruz
const kullaniciSemasi = yup.object().shape({
  // String kuralları
  adSoyad: yup.string()
    .required('Ad Soyad alanı zorunludur!')
    .min(3, 'Adınız en az 3 karakter olmalıdır!'),
    
  email: yup.string()
    .email('Lütfen geçerli bir e-posta adresi girin!')
    .required('E-posta alanı boş bırakılamaz!'),

  // Number (Sayı) kuralları
  yas: yup.number()
    .typeError('Yaş alanı sadece sayı olmalıdır!')
    .min(18, 'Kayıt olmak için 18 yaşından büyük olmalısınız!')
    .max(100, 'Geçerli bir yaş giriniz!'),

  // Boolean (Onay kutusu) kuralları
  sozlesmeOnayi: yup.boolean()
    .oneOf([true], 'Kullanıcı sözleşmesini kabul etmelisiniz!')
    .required()
});`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Gelişmiş Validasyonlar */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Gelişmiş Kurallar: Şifre Doğrulama ve Regex</h4>
          <p>
            Kayıt formlarında en çok karşılaşılan "Şifre" ve "Şifre Tekrarı" (birbirleriyle eşleşme) durumunu ve özel karakter zorunluluğunu (Regex ile) Yup ile çok kolay çözebiliriz.
          </p>
          
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import * as yup from 'yup';

// Şifre için Regex: En az 1 büyük harf, 1 küçük harf ve 1 sayı içermeli
const sifreRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/;

const kayitSemasi = yup.object().shape({
  sifre: yup.string()
    .required('Şifre alanı zorunludur!')
    .matches(sifreRegex, 'Şifreniz en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir!'),
  
  // Şifre Onayı (Referans Alma - yup.ref)
  sifreTekrar: yup.string()
    .required('Şifre tekrarı zorunludur!')
    // oneOf içine yup.ref('sifre') vererek, üstteki şifreyle AYNI olmak zorunda diyoruz!
    .oneOf([yup.ref('sifre')], 'Şifreler birbiriyle eşleşmiyor!') 
});`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="shield">🛡️</span> Modül Ödevi: Modüler Yup Şeması</h4>
        <p className="mb-3">
          Büyük projelerde Yup şemaları (Schema) form bileşeninin içine yazılmaz, ayrı bir dosyada tutulur. Bunu tecrübe edelim!
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Şema Dosyasını Oluşturun</h6>
        <p className="small mb-1"><code>src/</code> klasörü içine <code>musteriSchema.ts</code> adında bir dosya açın ve şemanızı dışa aktarın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import * as yup from 'yup';

export const musteriSemasi = yup.object().shape({
  kullaniciAdi: yup.string()
    .required('Kullanıcı adı boş bırakılamaz.')
    .min(5, 'En az 5 karakter olmalıdır.')
    .max(15, 'En fazla 15 karakter olmalıdır.'),
    
  webSitesi: yup.string()
    .url('Lütfen geçerli bir URL formatı girin (örn: https://ornek.com)')
    .required('Web sitesi alanı zorunludur.'),
    
  kampanyaOnay: yup.boolean()
    .optional() // Zorunlu olmayan checkbox
});`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Form Bileşeninde Kullanın</h6>
        <p className="small mb-1">Şimdi bu şemayı React Hook Form içine <code>yupResolver</code> ile entegre edin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { musteriSemasi } from '../musteriSchema';

const MusteriFormu = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(musteriSemasi) // Şemayı buraya verdik!
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('webSitesi')} placeholder="Web Siteniz" />
        {errors.webSitesi && <p style={{color: 'red'}}>{errors.webSitesi.message as string}</p>}
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default MusteriFormu;`}
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
            <p className="text-muted mb-4 fs-5">Yup kütüphanesi ile karmaşık kuralları zincirleme yazmayı ve formlarla entegre etmeyi başarıyla kavradın.</p>
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

export default YupDers;