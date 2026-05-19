import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Stil Importları
import 'bootstrap/dist/css/bootstrap.min.css';

// --- YENİ IMPORT ---
import { ProgressProvider } from './component/ProgressContext'; 

// Bileşen Importları
import AnaSayfa from './component/AnaSayfa';
import DersLayout from './component/DersLayout';

// Modül 1 Sayfaları ve Testi
import ReactNedir from './component/modul1/reactnedir';
import Kurulum from './component/modul1/kurulum';
import JsxBilesenYapisi from './component/modul1/jsx&bilesenyapısı';
import M1Test from './component/modul1/m1test'; // Test eklendi

// Modül 2 Sayfaları ve Testi
import PropsDersi from './component/modul2/props';
import DongulerVeKosullar from './component/modul2/Donguler&kosullar';
import TypeScriptDersi from './component/modul2/typescriptiletipgüvenlik';
import M2Test from './component/modul2/m2test'; // Test eklendi

// Modül 3 Sayfaları ve Testi
import UseStateDersi from './component/modul3/usestate';
import UseEffectDersi from './component/modul3/useefect';
import ReactRouterDersi from './component/modul3/reactrouther';
import AxiosDersi from './component/modul3/Axios';
import M3Test from './component/modul3/m3test'; // Test eklendi

// Modül 4 Sayfaları ve Testi
import UseRefDersi from './component/modul4/useref';
import UseContextDersi from './component/modul4/usecontex';
import HookFormDersi from './component/modul4/hookform';
import YupDersi from './component/modul4/yup';
import ReduxToolkitDersi from './component/modul4/ReduxToolkit';
import M4Test from './component/modul4/m4test'; // Test eklendi

// Modül 5 Sayfaları ve Testi
import UseCallbackDersi from './component/modul5/usecallbak';
import UseMemoDersi from './component/modul5/usememo'; 
import UseLayoutEffectDersi from './component/modul5/uselayoutefect'; 
import UseredcDersi from './component/modul5/usereducer'; 
import ReactQueryDers from './component/modul5/React Query';
import M5Test from './component/modul5/m5test'; // Test eklendi

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ProgressProvider> 
        <Routes>
          <Route path="/" element={<AnaSayfa />} />

          <Route path="/dersler" element={<DersLayout />}>
            <Route index element={<Navigate to="modul1/reactnedir" replace />} />

            {/* Modül 1 */}
            <Route path="modul1/reactnedir" element={<ReactNedir />} />
            <Route path="modul1/kurulum" element={<Kurulum />} />
            <Route path="modul1/jsx" element={<JsxBilesenYapisi />} />
            <Route path="modul1/m1test" element={<M1Test />} />

            {/* Modül 2 */}
            <Route path="modul2/props" element={<PropsDersi />} />
            <Route path="modul2/donguler" element={<DongulerVeKosullar />} />
            <Route path="modul2/typescript" element={<TypeScriptDersi />} />
            <Route path="modul2/m2test" element={<M2Test />} />

            {/* Modül 3 */}
            <Route path="modul3/usestate" element={<UseStateDersi />} />
            <Route path="modul3/useeffect" element={<UseEffectDersi />} />
            <Route path="modul3/router" element={<ReactRouterDersi />} />
            <Route path="modul3/axios" element={<AxiosDersi />} />
            <Route path="modul3/m3test" element={<M3Test />} />

            {/* Modül 4 */}
            <Route path="modul4/useref" element={<UseRefDersi />} />
            <Route path="modul4/usecontext" element={<UseContextDersi />} />
            <Route path="modul4/hookform" element={<HookFormDersi />} />
            <Route path="modul4/yup" element={<YupDersi />} />
            <Route path="modul4/REDUXTOOLKIT" element={<ReduxToolkitDersi />} />
            <Route path="modul4/m4test" element={<M4Test />} />

            {/* Modül 5 */}
            <Route path="modul5/usecallback" element={<UseCallbackDersi />} />
            <Route path="modul5/usememo" element={<UseMemoDersi />} />
            <Route path="modul5/uselayouteffect" element={<UseLayoutEffectDersi />} />
            <Route path="modul5/usereducer" element={<UseredcDersi />} />
              <Route path="modul5/REACTQUERY" element={<ReactQueryDers />} />
            <Route path="modul5/m5test" element={<M5Test />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </BrowserRouter>
  );
};

export default App;