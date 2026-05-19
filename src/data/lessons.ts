// src/data/lessons.ts
import { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "react-nedir",
    title: "React Nedir?",
    category: "Giriş",
    description: "React, Facebook tarafından geliştirilen bileşen tabanlı bir kütüphanedir. Sanal DOM kullanarak performansı artırır.",
    codeExample: "// Basit bir bileşen örneği\nfunction Message() {\n  return <h1>Hello World</h1>;\n}[cite: 1]"
  },
  {
    id: "props-kullanimi",
    title: "Props Kullanımı",
    category: "Temeller",
    description: "Props (properties), bileşenler arası veri alışverişini sağlar. Veri akışı her zaman yukarıdan aşağıyadır (Parent to Child).[cite: 2, 3]",
    codeExample: "interface Props { name: string; }\n\nfunction Welcome({ name }: Props) {\n  return <h1>Merhaba, {name}</h1>;\n}[cite: 3]"
  },
  {
    id: "usestate-hook",
    title: "useState Hook",
    category: "Hooks",
    description: "useState, fonksiyonel bileşenlerde state (zamanla değişen veri) tanımlamamızı sağlar.[cite: 8, 9]",
    codeExample: "const [count, setCount] = useState<number>(0);\n\n<button onClick={() => setCount(count + 1)}>Artır</button>[cite: 8]"
  }
];