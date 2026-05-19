import React, { useState } from 'react';

const ReactQueryDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular (TanStack Query v5 Uyumlu)
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodda yer alan 'queryKey' dizisinin temel görevi nedir?\n\nconst { data } = useQuery({\n  queryKey: ['kullanici', id],\n  queryFn: () => fetchUser(id)\n});",
      options: [
        "Sadece kodun okunabilirliğini artırmak için yazılan bir etikettir.",
        "Gelen verinin bellekte (cache) benzersiz bir kimlikle saklanmasını sağlar. 'id' değiştiğinde React Query bunu farklı bir veri olarak algılayıp yeni istek atar.",
        "API adresinin sonuna otomatik olarak '/kullanici/id' ekler.",
        "Sadece POST isteklerinde kullanılır."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Diyelim ki useMutation ile sunucuya yeni bir 'Todo' ekledik. Ekleme başarılı olduktan sonra ekrandaki listenin anında güncellenmesi (eski cache'in silinip verinin tekrar çekilmesi) için hangi kod çalıştırılmalıdır?",
      options: [
        "window.location.reload();",
        "setTodos([...todos, yeniTodo]);",
        "queryClient.invalidateQueries({ queryKey: ['todos'] });",
        "queryClient.clearCache();"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Aşağıdaki kodda 'staleTime: 5000' kullanılmıştır. Kullanıcı sayfayı açtıktan 2 saniye sonra başka bir sekmeye gidip tekrar bu sekmeye dönerse (Window Focus) ne olur?\n\nuseQuery({\n  queryKey: ['gonderiler'],\n  queryFn: fetchPosts,\n  staleTime: 5000\n});",
      options: [
        "Sayfa çöker.",
        "React Query arka planda API'ye tekrar istek atar (Çünkü sekme değişti).",
        "Veri henüz 5 saniyeyi doldurmadığı (hala 'fresh/taze' olduğu) için arka planda yeni bir istek ATILMAZ.",
        "Veriler ekrandan tamamen silinir."
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
        <h2 className="text-primary fw-bold">📡 React Query (TanStack Query)</h2>
        <p className="lead text-muted">
          Modern React uygulamalarında veri çekme, önbelleğe alma (caching) ve senkronizasyon işlemlerini profesyonelce yönetin.
        </p>
      </div>

      {/* 1. Bölüm: Nedir? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. React Query Nedir?</h4>
          <p>
            React Query, sunucu durumunu (server state) yönetmek için kullanılan bir kütüphanedir. 
            <code>useEffect</code> ve <code>useState</code> ile manuel olarak yaptığımız "loading", "error" ve "data" yönetimini tamamen otomatikleştirir.
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-info">
            <h6 className="fw-bold text-info">Neden Kullanmalıyız?</h6>
            <ul className="small mb-0 text-dark">
              <li>Veriyi otomatik olarak bellekte tutar (Caching). Aynı sayfaya döndüğünüzde "Yükleniyor..." ekranı görmezsiniz, veri anında gelir.</li>
              <li>Aynı anda atılan birbirinin kopyası istekleri teke indirir (Deduping).</li>
              <li>Siz başka bir sekmeye geçip geri döndüğünüzde (Window Focus) arka planda veriyi günceller.</li>
              <li>Loading ve Error durumlarını tek satırda sunar.</li>
            </ul>
          </div>
          <div className="mt-3 p-3 bg-dark rounded border-start border-4 border-primary">
            <h6 className="fw-bold text-primary mb-2">Kurulum</h6>
            <code className="text-warning">npm install @tanstack/react-query</code>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Kurulum */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Ana Kurulum (Provider)</h4>
          <p>
            Tıpkı Redux veya Context API'de olduğu gibi, React Query'nin çalışması için uygulamanızı en dıştan (App.tsx veya main.tsx) <code>QueryClientProvider</code> ile sarmalamanız gerekir.
          </p>
          <pre className="bg-dark text-white p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Yeni bir Query İstemcisi oluşturuyoruz
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Bilesenleriniz />
    </QueryClientProvider>
  );
}`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: useQuery Kullanımı */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Veri Çekme (useQuery) v5 Syntax</h4>
          <p>Modern TanStack Query v5'te <code>useQuery</code> her zaman içine bir obje (object) alır.</p>
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const res = await axios.get('/api/users');
  return res.data;
};

const KullaniciListesi = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'], // Cache (Bellek) için benzersiz kimlik
    queryFn: fetchUsers  // Çalıştırılacak Promise fonksiyonu
  });

  if (isLoading) return <p>Yükleniyor...</p>;
  if (isError) return <p>Hata: {error.message}</p>;

  return <ul>{data.map((user: any) => <li key={user.id}>{user.name}</li>)}</ul>;
};`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="memo">📝</span> Modül Ödevi: Otomatik Önbellekleyen Liste</h4>
        <p className="mb-3">
          React Query'nin Loading ve Cache (Önbellek) gücünü görmek için sahte bir API'den liste çekeceğiz.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Görev Listesi Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>TodoListesi.tsx</code> açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Saf Fetch fonksiyonumuz
const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!response.ok) throw new Error('Ağ hatası!');
  return response.json();
};

const TodoListesi: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['yapilacaklar'], 
    queryFn: fetchTodos
  });

  if (isLoading) return <h3 style={{ color: 'blue' }}>Veriler Yükleniyor... ⏳</h3>;
  if (isError) return <h3 style={{ color: 'red' }}>Bir hata oluştu! ❌</h3>;

  return (
    <ul>
      {data.map((todo: any) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoListesi;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Provider'ı Ekleyin ve App.tsx'te Çağırın</h6>
        <p className="small mb-1"><code>src/App.tsx</code> içinde Client kurun. Sayfayı yenilediğinizde "Yükleniyor..." yazısını göreceksiniz. Ancak başka bir sekmeye gidip geri döndüğünüzde veriler cache'den geldiği için anında görünecek!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoListesi from './components/TodoListesi';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px' }}>
        <h2>Görevlerim (React Query)</h2>
        <TodoListesi />
      </div>
    </QueryClientProvider>
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
            <p className="text-muted mb-4 fs-5">React Query'nin en önemli kavramları olan queryKey, invalidateQueries ve staleTime konularını harika kavradın.</p>
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

export default ReactQueryDers;