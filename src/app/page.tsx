"use client";

import React, { useState, useEffect } from 'react';
import {
  Menu, X, ChevronRight, CheckCircle2,
  Cpu, Code, Globe, Zap, Settings, Shield, Award,
  ShoppingBag, Briefcase, Download, ArrowLeft, Play, Info,
  Activity, Lock, Target, Server, Crosshair
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  videoBg?: string;
  gallery?: string[];
  url: string;
  description: string;
  price: string;
  specs: Record<string, string>;
  features?: string[];
  badge?: string;
  color: string;
}

const HERO_VIDEOS = ['/videos/xarm.mp4', '/videos/lite6.mp4', '/videos/850.mp4'];

const TIMELINE_DATA = [
  { year: '2013', title: "UFACTORY'nin Kuruluşu", desc: "Shenzhen'de kurulan UFACTORY, endüstriyel robotik kolların karmaşık ve pahalı yapısına karşı 'Masaüstü Robotik' vizyonuyla yola çıktı." },
  { year: '2014', title: "uArm Kickstarter Rekoru", desc: "İlk ürün olan uArm masaüstü robotik kol, dünya çapında büyük ses getirerek kitle fonlama rekorları kırdı ve açık kaynak robotik çağını başlattı." },
  { year: '2018', title: "Endüstriyel xArm Serisi", desc: "Ulaşılabilir endüstriyel standart olan xArm 5, 6 ve 7 serileri piyasaya sürüldü. Karbon fiber yapı ve dahili harmonik redüktörlerle segmentinde devrim yarattı." },
  { year: '2021', title: "Masaüstü Gücü Lite 6", desc: "Özellikle dar alanlar, montaj hatları ve araştırma laboratuvarları için tasarlanan hafif, kompakt ve güçlü cobot Lite 6 tanıtıldı." },
  { year: '2023', title: "Robotsepeti & UFACTORY Güç Birliği", desc: "Robotsepeti, Türkiye Tek Yetkili Distribütörü oldu. Türk KOBİ'leri ve Ar-Ge merkezleri için yerel stok, teknik eğitim ve mühendislik desteği hayata geçirildi." },
  { year: '2024', title: "Otomasyonda Liderlik", desc: "Gelişmiş G2 serisi uç işleyiciler (BIO Gripper, Vacuum) ve ağır sanayi için UFactory 850 serisi ile Türk sanayisinin dijital dönüşümüne öncülük edildi." },
];

const TimelineItem = ({ data, index }: { data: typeof TIMELINE_DATA[0], index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div ref={domRef} className="mb-12 md:mb-24 flex md:justify-between items-start md:items-center w-full flex-col md:flex-row relative">
      {/* Mobile Timeline Line */}
      <div className="absolute left-[19px] top-0 bottom-[-48px] w-[2px] bg-gradient-to-b from-orange-500/50 to-transparent md:hidden"></div>
      
      {/* Empty space for alternating layout on desktop */}
      <div className={`hidden md:block w-5/12 ${isEven ? 'md:order-3' : 'md:order-1'}`}></div>
      
      {/* Center Node */}
      <div className={`z-20 flex items-center justify-center order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 rounded-full border-4 border-slate-950 bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-700 mb-4 md:mb-0 shrink-0 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className={`w-3 h-3 md:w-6 md:h-6 rounded-full bg-white transition-transform duration-1000 delay-300 ${isVisible ? 'scale-100' : 'scale-0'}`}></div>
      </div>
      
      {/* Content Box */}
      <div className={`order-2 ${isEven ? 'md:order-1 text-right' : 'md:order-3 text-left'} w-full md:w-5/12 ml-12 md:ml-0 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-y-12 ' + (isEven ? 'md:-translate-x-16' : 'md:translate-x-16')}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-t-3xl opacity-50"></div>
        <h3 className="font-black text-orange-500 text-3xl md:text-5xl mb-2 tracking-tight">{data.year}</h3>
        <h4 className="font-bold text-white text-xl md:text-2xl mb-3">{data.title}</h4>
        <p className="text-sm md:text-base leading-relaxed text-slate-400">{data.desc}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'xarm' | 'lite' | 'accessories' | 'education'>('xarm');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [heroVideoSrc, setHeroVideoSrc] = useState('/videos/xarm.mp4');
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    setHeroVideoSrc(HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)]);
  }, []);

  const handleVideoEnded = () => {
    const currentIndex = HERO_VIDEOS.indexOf(heroVideoSrc);
    const nextIndex = (currentIndex + 1) % HERO_VIDEOS.length;
    setHeroVideoSrc(HERO_VIDEOS[nextIndex]);
    setVideoProgress(0);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setZoomOrigin('center center');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProductSelect = (product: Product) => {
    setIsAnimating(true);
    setGalleryIndex(0);
    setShowVideo(!!product.videoBg);
    setTimeout(() => {
      setSelectedProduct(product);
      window.scrollTo({ top: document.getElementById('katalog')?.offsetTop || 0, behavior: 'smooth' });
      setIsAnimating(false);
    }, 400);
  };

  const handleBackToGrid = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setIsAnimating(false);
    }, 400);
  };

  // Kapsamlı Ürün Veritabanı (Detaylı Rapor Verilerinden)
  const products: Record<'xarm' | 'lite' | 'accessories' | 'education', Product[]> = {
    xarm: [
      {
        id: 'xarm7',
        name: 'uFactory xArm 7',
        tagline: '7 Eksenli Kinematik Artıklık',
        image: '/images/xarm.png',
        videoBg: '/videos/xarm.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+xarm+7',
        description: 'Endüstriyel robot kolu uygulamalarında esnek hareket imkanı sağlayan 7 eksenli kinematik yapı. Dar alanlarda engellerden kaçınma yeteneği ve uzay sınıfı karbon fiber gövdesiyle 13.7 kg ağırlığında yüksek performanslı cobot.',
        price: '644.399 TL - 662.428 TL + KDV',
        specs: { 
          'Taşıma Kapasitesi': '3.5 kg', 
          'Erişim (Reach)': '700 mm', 
          'Tekrarlanabilirlik': '±0.1 mm', 
          'DoF': '7 Eksen',
          'Maks. Hız': '1 m/s',
          'Gövde Ağırlığı': '13.7 kg'
        },
        features: ['Kinematik Yedeklilik', 'Dar Alan & Engelden Kaçınma', '1,3,5,6,7. Eksenlerde ±360° Dönüş', 'ISO Class 5 Temiz Oda Onayı'],
        badge: 'Araştırma & VR',
        color: 'from-purple-600 to-pink-600'
      },
      {
        id: 'xarm6',
        name: 'uFactory xArm 6',
        tagline: 'Endüstriyel Üretim Standartı',
        image: '/images/xarm.png',
        videoBg: '/videos/xarm.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+xarm+6',
        description: 'Endüstriyel üretim hatları, pick and place, montaj ve CNC tezgah yükleme işlemleri için tasarlanmış 5 kg payload kapasiteli 6 eksenli cobot. Ağır kütleli ürünlerin kavranmasında stabil ve güvenilirdir.',
        price: '581.820 TL - 584.103 TL + KDV',
        specs: { 
          'Taşıma Kapasitesi': '5.0 kg', 
          'Erişim (Reach)': '700 mm', 
          'Tekrarlanabilirlik': '±0.1 mm', 
          'DoF': '6 Eksen',
          'Maks. Hız': '1 m/s',
          'Gövde Ağırlığı': '12.2 kg'
        },
        features: ['3B Uzayda Tam Yönlendirme', 'Ağır Yük Taşıma Dengesi', '126mm Kompakt Ayak İzi', 'AC / DC Kontrol Kutusu'],
        badge: 'En Popüler',
        color: 'from-blue-600 to-cyan-600'
      },
      {
        id: 'uf850',
        name: 'uFactory 850',
        tagline: 'Yüksek Hassasiyet, Maksimum Erişim',
        image: '/images/ufactory_850.jpg',
        videoBg: '/videos/850.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+850',
        description: 'Daha uzun erişim mesafesine (850 mm) ihtiyaç duyan otomasyon projeleri için tasarlanmıştır. 17-bit yüksek çözünürlüklü enkoder sayesinde ±0.02 mm tekrar konumlandırma hassasiyeti sunar.',
        price: '$8.999 - $10.500 (Global Band)',
        specs: { 
          'Taşıma Kapasitesi': '5.0 kg', 
          'Erişim (Reach)': '850 mm', 
          'Tekrarlanabilirlik': '±0.02 mm', 
          'DoF': '6 Eksen',
          'Güç Tüketimi': '240W (Maks 1000W)',
          'Gövde Ağırlığı': '20.0 kg'
        },
        features: ['±0.02 mm Tekrarlanabilirlik', 'Dahili 100M Ethernet Kablosu', '17-bit Yüksek Çözünürlüklü Enkoder', 'PCB Lehimleme ve Lazer Kaynak'],
        badge: 'Yüksek Hassasiyet',
        color: 'from-orange-600 to-red-600'
      },
      {
        id: 'xarm5',
        name: 'uFactory xArm 5 Lite',
        tagline: 'Ekonomik SCARA Alternatifi',
        image: '/images/xarm.png',
        videoBg: '/videos/xarm.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+xarm+5',
        description: 'Yatay düzlemdeki pick and place ve otomasyon görevleri için tasarlanmış 5 eksenli robot kolu. SCARA robot alternatiflerine göre uygun maliyetli bir çözümdür.',
        price: '372.898 TL - 374.194 TL + KDV',
        specs: { 
          'Taşıma Kapasitesi': '3.0 kg', 
          'Erişim (Reach)': '700 mm', 
          'Tekrarlanabilirlik': '±0.1 mm', 
          'DoF': '5 Eksen',
          'Min. Enerji': '8.4 Watt',
          'Gövde Ağırlığı': '11.2 kg'
        },
        features: ['Hızlı Amortisman (ROI)', 'Düzlemsel Yüksek Hız (Pitch 0°)', 'SCARA Doğrudan Alternatif', 'Kahve Kiosk Otomasyonu Uyumlu'],
        badge: 'Giriş Seviyesi',
        color: 'from-emerald-600 to-teal-600'
      }
    ],
    lite: [
      {
        id: 'lite6',
        name: 'uFactory Lite 6',
        tagline: 'Kompakt Masaüstü Cobot',
        image: '/images/lite6.png',
        videoBg: '/videos/lite6.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+lite+6',
        description: 'Alan kısıtlamasının olduğu laboratuvar prosesleri ve hafif endüstriyel görevler için 600g taşıma kapasitesi. Dahili kontrol kutusu ve 130x140 mm minimal oturma alanıyla tak-çalıştır kullanım.',
        price: 'Projeye Özel Teklif Alın',
        specs: { 
          'Taşıma Kapasitesi': '600 g', 
          'Erişim (Reach)': '440 mm', 
          'Tekrarlanabilirlik': '±0.5 mm', 
          'DoF': '6 Eksen',
          'Kontrol Kutusu': 'Gövdeye Dahil',
          'Gövde Ağırlığı': '7.2 kg'
        },
        features: ['Dahili Kontrol Kutusu (Build-in)', '130x140mm Kompakt Oturma Alanı', 'Tam ROS/ROS2 Uyumluluğu', 'Harmonik Redüktör & BLDC'],
        badge: 'AR-GE & Eğitim',
        color: 'from-slate-700 to-slate-900'
      }
    ],
    accessories: [
      {
        id: 'gripper-xarm',
        name: 'uFactory xArm Gripper G2',
        tagline: '2 Parmaklı Elektrikli Paralel Tutucu',
        image: '/images/products/gripper_g2_1.jpg',
        gallery: ['/images/products/gripper_g2_1.jpg', '/images/products/gripper_g2_2.jpg'],
        url: 'https://www.robotsepeti.com/ufactory-xarm-gripper-g2-elektrikli-paralel-robot-tutucu',
        description: 'Gelişmiş endüstriyel otomasyon süreçleri için tasarlanan xArm Gripper G2, 5 kg payload desteği ve 50N maksimum kavrama gücü ile zorlu tutma/bırakma (pick & place) operasyonlarında üstün stabilite sunar. Dahili 12-bit mutlak enkoder (absolute encoder) sistemi sayesinde sadece ağır cisimleri değil, son derece kırılgan ve hassas malzemeleri de milimetrik bir kuvvet kontrolüyle güvenle taşır. Harici kablolamaya son veren temiz entegrasyonu ve kolayca değiştirilebilen parmak uçlarıyla esnek üretim hatlarının vazgeçilmezidir.',
        price: '128.778 TL + KDV',
        specs: { 'Strok Mesafesi': '84 ± 1 mm', 'Kavrama Kuvveti': '10 - 50 N', 'Kapanma Hızı': '15 - 225 mm/s' },
        features: ['12-Bit Hassas Mutlak Enkoder', 'Programlanabilir Hız, Kuvvet ve Konum', 'Kablosuz (Pogopin) Ara Yüz Entegrasyonu', '2 Milyon+ Operasyon Ömrü'],
        color: 'from-gray-600 to-gray-800'
      },
      {
        id: 'bio',
        name: 'uFactory xArm BIO Gripper G2',
        tagline: 'Elektrikli Paralel Sıvı Taşıma Tutucusu',
        image: '/images/products/bio_gripper_1.jpg',
        gallery: ['/images/products/bio_gripper_1.jpg', '/images/products/bio_gripper_2.jpg'],
        url: 'https://www.robotsepeti.com/ufactory-xarm-bio-gripper-g2-elektrikli-paralel-robot-tutucu',
        description: 'Hassas sıvı transferi ve gelişmiş laboratuvar otomasyonu süreçleri için özel olarak mühendisliği yapılmış BIO Gripper G2, esnek işbirlikçi yapısıyla ön plana çıkar. Değiştirilebilir parmak uçları sayesinde farklı deney tüplerine kolayca uyum sağlarken, akıllı programlama mimarisi (hız, pozisyon ve kuvvet kontrolü) ile projelerinize anında entegre olur. Güvenilir endüstriyel sıvı taşıma operasyonlarında maksimum güvenlik sunan birinci sınıf bir end-efektördür.',
        price: '115.164 TL + KDV',
        specs: { 'Strok (Açıklık)': '71 - 150 mm', 'Kavrama Gücü': '20N', 'Haberleşme': 'RS-485 (Modbus-RTU)' },
        features: ['Düşme (Drop) & Kavrama Algılama', 'Hız (0-4000) ve Kuvvet Kontrolü', 'Değiştirilebilir Uç Tasarımı', '24 VDC (1.5A Tepe) Anma Gerilimi'],
        color: 'from-gray-600 to-gray-800'
      },
      {
        id: 'vacuum',
        name: 'xArm Vacuum Gripper',
        tagline: 'Entegre Pompasıyla Pürüzsüz Tutuş',
        image: '/images/products/vacuum_gripper_1.jpg',
        gallery: ['/images/products/vacuum_gripper_1.jpg', '/images/products/vacuum_gripper_2.jpg', '/images/products/vacuum_gripper_3.jpg'],
        url: 'https://www.robotsepeti.com/arama?q=xarm+vacuum',
        description: 'Elektrikli vakum jeneratörü ile harici kompresör ihtiyacını bitirir. -55kPa vakum seviyesi. Düz yüzeyli metaller veya karton kutular için 5kg tam kapasite uyumu.',
        price: '37.253 TL + KDV',
        specs: { 'Vakum Seviyesi': '-55kPa (%78)', 'Hava Akışı': '4 L/dakika', 'Kapasite': '5 kg' },
        color: 'from-gray-600 to-gray-800'
      },
      {
        id: 'gripper-lite',
        name: 'Gripper Lite & Vacuum Lite',
        tagline: 'Lite 6 Özel Uç Efektörleri',
        image: '/images/products/lite_grippers_1.jpg',
        gallery: ['/images/products/lite_grippers_1.jpg', '/images/products/lite_grippers_2.jpg'],
        url: 'https://www.robotsepeti.com/arama?q=ufactory+lite+gripper',
        description: 'Masaüstü Lite 6 serisi için 350g ağırlığında elektrikli tutucu (5N kuvvet, 16mm strok) ve 250g ağırlığında vakum (-40kPa) tutucu versiyonları.',
        price: '23.456 TL - 29.895 TL + KDV',
        specs: { 'Kuvvet / Basınç': '5N / -40kPa', 'Ağırlık': '250g - 350g', 'Geri Bildirim': 'Pick-Up Detection' },
        color: 'from-gray-600 to-gray-800'
      },
      {
        id: 'ft-sensor',
        name: '6 Eksenli Kuvvet/Tork Sensörü',
        tagline: 'Robota Dokunma Duyusu Kazandırın',
        image: '/images/products/linear_motor_1.jpg',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+force+torque+sensor',
        description: 'x/y/z eksenlerindeki kuvvetleri ve tork momentlerini 100mN (10 gram) laboratuvar hassasiyetiyle ölçer. Hassas polisaj ve mil-delik montajı için force/impedance kontrolü.',
        price: '198.135 TL + KDV',
        specs: { 'Kuvvet Aralığı': '150N - 200N', 'Tork Aralığı': '4Nm', 'Çözünürlük': '100mN / 5mNm' },
        color: 'from-slate-700 to-slate-900'
      },
      {
        id: 'linear-motor',
        name: 'Direct Drive Lineer Motor',
        tagline: 'Otonomiyi Raylara Taşıyın',
        image: '/images/products/linear_motor_2.jpg',
        gallery: ['/images/products/linear_motor_1.jpg', '/images/products/linear_motor_2.jpg', '/images/products/linear_motor_3.jpg', '/images/products/linear_motor_4.jpg'],
        url: 'https://www.robotsepeti.com/arama?q=ufactory+linear+motor',
        description: 'Sürtünmesiz doğrudan tahrik ile robotu çoklu CNC tezgahlarına taşıyan ray sistemi. Saniyede 1 metre hız, 200 kg taşıma kapasitesi ve devasa 160N tepe kuvveti.',
        price: '299.366 TL - 307.091 TL + KDV',
        specs: { 'Menzil (Strok)': '700/1000/1500 mm', 'Hız': '1 m/s', 'Yük (Payload)': '200 kg' },
        color: 'from-slate-700 to-slate-900'
      }
    ],
    education: [
      {
        id: 'conveyor-kit',
        name: 'uArm Robotik Eğitim Kiti',
        tagline: 'Konveyör Taşıyıcı Bant Simülasyonu',
        image: '/images/products/uarm_education_1.jpg',
        gallery: ['/images/products/uarm_education_1.jpg', '/images/products/uarm_education_2.jpg', '/images/products/uarm_education_3.jpg'],
        videoBg: '/videos/xarm.mp4',
        url: 'https://www.robotsepeti.com/arama?q=ufactory+uarm+egitim+kiti',
        description: 'Üniversite laboratuvarları ve mesleki teknik eğitim merkezleri için eksiksiz Endüstri 4.0 simülasyonu. Nesne tespiti, sorting ve paletleme algoritmalarını doğrudan Python veya ROS üzerinden uygulayın.',
        price: '66.045 TL + KDV',
        specs: { 'Platform': 'uArm Uyumlu', 'Sensör Desteği': 'Renk / Boyut Ayrımı', 'Yazılım': 'Python / Blockly' },
        features: ['Laboratuvar Masası Ölçeği', 'Gerçek Zamanlı Görüntü İşleme Entegrasyonu', 'Endüstri 4.0 Simülasyonu', 'STEM / STEAM Uyumluluğu'],
        badge: 'AR-GE Eğitim',
        color: 'from-indigo-600 to-blue-800'
      },
      {
        id: 'laser-head',
        name: 'uArm Laser Head',
        tagline: 'Lazer Gravür ve Eksiltmeli İmalat',
        image: '/images/products/uarm_laser_1.jpg',
        gallery: ['/images/products/uarm_laser_1.jpg', '/images/products/uarm_laser_2.jpg', '/images/products/uarm_laser_3.jpg'],
        url: 'https://www.robotsepeti.com/arama?q=ufactory+uarm+laser',
        description: 'Robot kolunuzu 3D lazer CNC ve gravür makinesine dönüştüren lazer modülü. Ahşap levhalar, MDF, karton ve deri yüzeyler üzerinde hassas yüzey işleme (processing) ve eksiltmeli imalat.',
        price: '7.995 TL - 8.002 TL + KDV',
        specs: { 'Uygulama': 'Gravür / Kesim', 'Materyal': 'Ahşap, MDF, Deri', 'Ekipman': 'Güvenlik Gözlüğü Dahil' },
        color: 'from-red-600 to-orange-800'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-orange-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              {/* Robot Sepeti Logo */}
              <div className="flex items-center">
                <img src="/images/robotsepeti_logo_cropped.png" alt="Robotsepeti - uFactory Türkiye Yetkili Distribütörü" className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              </div>
              {/* Divider */}
              <div className="h-8 w-px bg-white/20"></div>
              {/* UFACTORY Logo */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-12 md:h-12" fill="none">
                  <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="#EC6408" stroke="#EC6408" strokeWidth="1"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">UF</text>
                </svg>
                <span className="text-white font-black text-base md:text-xl tracking-widest hidden sm:block">UFACTORY</span>
              </div>
            </div>

            <div className="hidden lg:flex space-x-8 items-center font-medium text-sm tracking-wide">
              <a href="#katalog" className="text-slate-300 hover:text-white transition-colors">Teknik Özellikler</a>
              <a href="#yazilim" className="text-slate-300 hover:text-white transition-colors">Yazılım Ekosistemi</a>
              <a href="#vakalar" className="text-slate-300 hover:text-white transition-colors">Sektörler</a>
              <a href="#avantajlar" className="text-slate-300 hover:text-white transition-colors">Avantajlar & SSS</a>
              <a href="mailto:kurumsal@robotsepeti.com" className="bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2">
                Projeyi Anlat
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {/* Hero Video */}
          <video 
            ref={videoRef}
            preload="auto" 
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            aria-label="uFactory Endüstriyel Robot Kolu Serisi" 
            className="w-full h-full object-cover opacity-100" 
            src={heroVideoSrc}
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/80 via-transparent to-transparent"></div>
          
          {/* Custom Video Progress Bar (Zaman Çizgisi) */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
              style={{ width: `${videoProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md text-orange-400 text-sm font-bold tracking-widest uppercase">
            Endüstriyel Otomasyon Çözümleri
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            uFactory Robot Kolları <br />
            <span className="block mt-4 text-4xl md:text-5xl flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Türkiye Yetkili Distribütörü
              </span>
              <span className="text-white font-black px-5 py-1.5 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_40px_rgba(249,115,22,0.6)] border border-white/20 transform md:-rotate-2 hover:scale-110 transition-transform duration-300">
                Robotsepeti
              </span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-4xl mx-auto mb-10 leading-relaxed">
            KOBİ'lerden araştırma merkezlerine kadar her ölçekteki işletme için tasarlanmış, açık kaynak destekli ve yüksek performanslı uFactory endüstriyel robot kollarını keşfedin. Robotsepeti güvencesiyle Türkiye pazarında teknik destek ve hızlı teslimat avantajı.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#katalog" className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
              Kataloğu Keşfet <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">uFactory Robot Kolu Serileri Nedir?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            uFactory, endüstriyel otomasyon süreçlerini optimize etmek için tasarlanmış, yüksek hassasiyetli (tekrarlanabilirlik) ve hafif yapıya sahip robotik kol serisidir. Özellikle <strong>xArm 6 eksenli robot</strong> ve <strong>xArm 7</strong> modelleri, geniş payload kapasitesi ve açık mimari (Python SDK, ROS desteği) sayesinde üretim, montaj, paketleme (pick and place) ve araştırma laboratuvarlarında standartları belirler.
          </p>
        </div>
      </section>

      {/* INTERACTIVE CATALOG SECTION */}
      <section id="katalog" className="py-24 bg-slate-950 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent bg-[length:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className={`transition-all duration-500 transform ${selectedProduct ? 'opacity-0 -translate-y-10 h-0 overflow-hidden absolute' : 'opacity-100 translate-y-0 relative mb-16'}`}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Teknik Özellikler ve Payload Bilgileri</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                İhtiyacınıza uygun taşıma kapasitesi (payload) ve erişim mesafesine sahip, esnek üretime uygun uFactory modellerini ve teknik özelliklerini inceleyin.
              </p>
              
              <div className="inline-flex flex-wrap justify-center gap-2 bg-slate-900 rounded-3xl p-1.5 border border-slate-800">
                {(['xarm', 'lite', 'accessories', 'education'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'xarm' ? 'Endüstriyel xArm & 850' : tab === 'lite' ? 'Masaüstü Lite Serisi' : tab === 'accessories' ? 'Uç İşleyiciler & Çevre' : 'Eğitim & AR-GE Kitleri'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GRID VIEW */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 transform ${
              selectedProduct || isAnimating ? 'opacity-0 scale-95 pointer-events-none absolute hidden' : 'opacity-100 scale-100 relative'
            }`}
          >
            {products[activeTab].map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductSelect(product)}
                className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col h-[520px]"
              >
                <div className="h-[55%] relative overflow-hidden bg-slate-950 flex items-center justify-center">
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-slate-950/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-20 tracking-widest uppercase">
                      {product.badge}
                    </div>
                  )}
                  {/* Video or Image Background for Card */}
                  {product.videoBg ? (
                    <video 
                      preload="auto"
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      aria-label={`${product.name} endüstriyel robot kolu — Robotsepeti`}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                      src={product.videoBg}
                    />
                  ) : product.image ? (
                    <img 
                      src={product.image} 
                      alt={`${product.name} — Robotsepeti uFactory Türkiye`}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center">
                      <Settings size={48} className="text-white/10" />
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
                </div>
                
                <div className="p-8 h-[45%] flex flex-col justify-between bg-slate-900">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">{product.tagline}</p>
                    <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex items-center text-orange-500 font-bold text-sm mt-4 group-hover:text-white transition-colors uppercase tracking-wider">
                    Teknik Analizi Gör <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DETAILED VIEW */}
          <div className={`transition-all duration-700 ease-in-out transform origin-top ${
              selectedProduct && !isAnimating ? 'opacity-100 translate-y-0 scale-100 relative' : 'opacity-0 translate-y-10 scale-95 absolute pointer-events-none hidden'
            }`}
          >
            {selectedProduct && (
              <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl shadow-black/40 relative">
                
                {/* Back Button */}
                <button 
                  onClick={handleBackToGrid}
                  className="absolute top-6 left-6 z-30 w-12 h-12 bg-slate-950/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all duration-300 border border-white/10 shadow-lg hover:shadow-orange-500/30 hover:scale-110"
                >
                  <ArrowLeft size={22} />
                </button>

                <div className="grid lg:grid-cols-2">
                  {/* LEFT: Media Gallery Panel */}
                  <div className="relative h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[800px] bg-slate-950 flex flex-col overflow-hidden">
                    
                    {/* Main Media Area */}
                    <div className="relative flex-1 overflow-hidden group/zoom cursor-crosshair">
                      {/* Video View */}
                      {showVideo && selectedProduct.videoBg ? (
                        <video 
                          preload="auto"
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          aria-label={`${selectedProduct.name} endüstriyel robot kolu inceleme — Robotsepeti`}
                          key={selectedProduct.videoBg}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ objectPosition: 'center center' }}
                          src={selectedProduct.videoBg}
                        />
                      ) : (
                        /* Gallery Image View with Zoom */
                        <div 
                          className="absolute inset-0 w-full h-full overflow-hidden"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                        >
                          {selectedProduct.gallery && selectedProduct.gallery.length > 0 ? (
                            <img 
                              src={selectedProduct.gallery[galleryIndex]}
                              alt={`${selectedProduct.name} görsel ${galleryIndex + 1}`}
                              style={{ transformOrigin: zoomOrigin }}
                              className="w-full h-full object-contain bg-white transition-transform duration-200 ease-out group-hover/zoom:scale-[2]"
                              draggable={false}
                            />
                          ) : selectedProduct.image ? (
                            <img 
                              src={selectedProduct.image}
                              alt={`${selectedProduct.name} — Robotsepeti`}
                              style={{ transformOrigin: zoomOrigin }}
                              className="w-full h-full object-contain bg-white transition-transform duration-200 ease-out group-hover/zoom:scale-[2]"
                              draggable={false}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
                              <Settings size={80} className="text-white/10" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                      <div className={`absolute inset-0 bg-gradient-to-tr ${selectedProduct.color} opacity-5 mix-blend-screen pointer-events-none z-10`}></div>
                      
                      {/* Zoom hint badge */}
                      {!showVideo && (selectedProduct.gallery || selectedProduct.image) && (
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-60 group-hover/zoom:opacity-0 transition-opacity duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                          <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Yakınlaştır</span>
                        </div>
                      )}

                      {/* Video indicator */}
                      {showVideo && selectedProduct.videoBg && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Canlı Video</span>
                        </div>
                      )}

                      {/* Product Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
                        {selectedProduct.badge && (
                          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase">
                            {selectedProduct.badge}
                          </div>
                        )}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                          {selectedProduct.name}
                        </h2>
                        <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mt-1 drop-shadow-lg">
                          {selectedProduct.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Thumbnail Strip (Gallery + Video Toggle) */}
                    {(selectedProduct.videoBg || (selectedProduct.gallery && selectedProduct.gallery.length > 1)) && (
                      <div className="flex gap-2 p-3 bg-slate-950 border-t border-slate-800/50 overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 transparent' }}>
                        {/* Video Thumbnail */}
                        {selectedProduct.videoBg && (
                          <button
                            onClick={() => { setShowVideo(true); }}
                            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${showVideo ? 'border-orange-500 ring-2 ring-orange-500/30' : 'border-slate-700 hover:border-slate-500'}`}
                          >
                            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                              <Play size={20} className="text-white/80" />
                            </div>
                            <div className="absolute bottom-0.5 left-0 right-0 text-center">
                              <span className="text-[8px] text-white/60 font-bold uppercase">Video</span>
                            </div>
                          </button>
                        )}
                        {/* Image Thumbnails */}
                        {selectedProduct.gallery && selectedProduct.gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setShowVideo(false); setGalleryIndex(idx); }}
                            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${!showVideo && galleryIndex === idx ? 'border-orange-500 ring-2 ring-orange-500/30' : 'border-slate-700 hover:border-slate-500'}`}
                          >
                            <img 
                              src={img} 
                              alt={`${selectedProduct.name} görsel ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Specs & Details Panel */}
                  <div className="p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col relative bg-slate-900 lg:max-h-[800px] lg:overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 transparent' }}>
                    <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
                      <Settings size={280} />
                    </div>

                    {/* Price Badge */}
                    {selectedProduct.price && (
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">Fiyat Skalası</span>
                        </div>
                        <p className="text-green-300 font-bold text-sm">{selectedProduct.price}</p>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-base text-slate-400 leading-relaxed mb-8">
                      {selectedProduct.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Cpu size={14} className="text-orange-500" />
                        Donanım Spesifikasyonları
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(selectedProduct.specs).map(([key, value], i) => (
                          <div key={i} className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl group hover:border-orange-500/30 transition-all duration-300 hover:bg-slate-950/80">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5 group-hover:text-orange-400 transition-colors">
                              {key}
                            </p>
                            <p className="text-lg font-black text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    {selectedProduct.features && (
                      <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Target size={14} className="text-orange-500" />
                          Mühendislik Özetleri
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {selectedProduct.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium bg-slate-800/30 px-4 py-3.5 rounded-xl border border-slate-800/50 hover:border-orange-500/20 transition-colors">
                              <Crosshair className="text-orange-500 flex-shrink-0" size={16} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <a href="mailto:kurumsal@robotsepeti.com" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 flex-1 flex justify-center items-center gap-2">
                        <ShoppingBag size={18} /> Teklif Almak İçin Tıklayın
                      </a>
                      <a href={selectedProduct.url || "https://www.robotsepeti.com"} target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 flex-1 flex justify-center items-center gap-2">
                        <Globe size={18} /> {selectedProduct.name} Ürün Sayfasını İncele
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SOFTWARE, CONTROL & SAFETY SECTION */}
      <section id="yazilim" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h4 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">Açık Mimari & Endüstriyel Standartlar</h4>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Yazılım Ekosistemi ve Güvenlik Ağı</h2>
             <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Açık kaynak kodlu yazılım ekosistemi sayesinde ek lisans maliyetleri olmadan geniş çaplı entegrasyon. Kullanıcı dostu arayüzlerden, ileri seviye ROS/ROS2 geliştirmelerine kadar kapsamlı donanım desteği. Python SDK ve Modbus TCP üzerinden robot kolu programlama kolaylığı.
             </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Software Architecture */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Yazılım ve Yörünge Planlama</h3>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0"><Settings size={28}/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">UFactory Studio & Blockly</h4>
                    <p className="text-slate-600 leading-relaxed">Kurulum gerektirmeyen web tabanlı grafik platform. Sürükle-bırak bloklarıyla anında programlama. <strong>Teach by Hand (Manuel Mod):</strong> Frenleri serbest bırakıp robotu fiziksel sürükleyerek saniyeler içinde yeni görevler öğretin. Yerçekimi yönü IMU ile otomatik algılanır.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0"><Code size={28}/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Python & C++ SDK, 250Hz Veri Akışı</h4>
                    <p className="text-slate-600 leading-relaxed">Studio içindeki entegre Python IDE'si ile görsel projeleri koda dönüştürün. <code>servo_cartesian</code> modları sayesinde dış kameralardan gelen anlık sapmalara milisaniyeler içinde reaksiyon gösterin.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0"><Server size={28}/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">ROS / ROS2 ve Digital Twin</h4>
                    <p className="text-slate-600 leading-relaxed">MoveIt, RViz ve Gazebo ile tam entegre. Robotun fiziksel kurulumu yapılmadan önce dijital ikizi (Digital Twin) üzerinden <strong>Singularity (Tekillik)</strong> çözümleri ve kompleks kinematik hesaplamalar yapılabilir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware Safety & Control */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">ISO Onaylı Güvenlik Mekanizmaları</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <Activity className="text-orange-500 mb-4" size={32} />
                    <h4 className="font-bold text-slate-900 mb-2">Çarpışma Algılama ve Geri Sekme</h4>
                    <p className="text-sm text-slate-600">Dahili akım/tork sensörleri engeli algılar. 0-5 arası hassasiyetle durur ve ezilmeyi önlemek için (Collision Rebound) bir miktar geriye çekilir.</p>
                 </div>
                 
                 <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <Shield className="text-orange-500 mb-4" size={32} />
                    <h4 className="font-bold text-slate-900 mb-2">Safety Boundary & İndirgenmiş Mod</h4>
                    <p className="text-sm text-slate-600">Kartezyen uzayda 3 boyutlu görünmez kafes çizimi. İnsan yaklaştığında hız ve ivmelenme otomatik olarak kısıtlanır.</p>
                 </div>

                 <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 sm:col-span-2 flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0"><Lock size={32}/></div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Kategori 1 ve Kategori 2 Duruşları</h4>
                      <p className="text-sm text-slate-600"><strong>Stop Cat 1:</strong> Acil durdurma butonunda yörüngeden sapmadan 300ms içinde frenleri kilitler.<br/><strong>Stop Cat 2 (Stand-by):</strong> Lazer bariyer ihlalinde gücü açık tutarak durur, "Safeguard Reset" ile işe anında devam eder.</p>
                    </div>
                 </div>
              </div>

              {/* Control Boxes Info */}
              <div className="mt-6 bg-slate-900 p-6 rounded-3xl text-white">
                 <h4 className="font-bold mb-3 flex items-center gap-2"><Cpu size={20} className="text-orange-500"/> Modüler Kontrol Kutuları (AC/DC)</h4>
                 <p className="text-sm text-slate-400">Sabit hatlar için <strong>AC (100-240V)</strong>, AGV/AMR otonom mobil robotlar için 2.6 kg hafifliğinde <strong>DC (24-72V)</strong> kontrol kutusu seçenekleri. Her ikisi de zengin CI/CO, DI/DO, AI/AO arayüzleri barındırır.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section id="vakalar" className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-950 skew-x-[-15deg] transform origin-bottom -z-10 opacity-50"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex justify-between items-end mb-16">
               <div>
                 <h4 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Global Uygulama Alanları ve Endüstriyel Çözümler</h4>
                 <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">Hangi Sektörler İçin Uygundur?</h2>
               </div>
               <p className="text-slate-400 max-w-md mt-6 lg:mt-0 font-medium">
                 Farklı sektörlerden başarılı entegrasyon örnekleri ve saha uygulamaları. Üretim, AR-GE, Lojistik ve Gıda sektörlerinde endüstriyel robot kolu kullanımı.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* Case 1 */}
               <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center"><Target size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">Aivero: 3B Bin Picking</h3>
                  </div>
                  <p className="text-slate-400 mb-6 line-clamp-3">Endüstrideki en zor problemlerden olan düzensiz kutu içi parça alma işlemini, bulut tabanlı 3B vizyon ve makine öğrenimi ile xArm'a entegre ederek hücre maliyetini 10.000$ altına indirdiler.</p>
                  <a href="https://www.robotsepeti.com/arama?q=ufactory" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold text-sm uppercase tracking-wider group-hover:text-orange-300 flex items-center">uFactory Çözümlerini İncele <ChevronRight size={16}/></a>
               </div>

               {/* Case 2 */}
               <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center"><Globe size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">Extend Robotics: VR Tele-Operasyon</h3>
                  </div>
                  <p className="text-slate-400 mb-6 line-clamp-3">Tehlikeli nükleer veya kimyasal alanlardaki görevleri insan zekasıyla çözmek için xArm sistemlerini Sanal Gerçeklik (VR) gözlükleriyle uzaktan, sezgisel bir insan kolu gibi yönettiler.</p>
                  <a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold text-sm uppercase tracking-wider group-hover:text-orange-300 flex items-center">Senaryoyu İncele <ChevronRight size={16}/></a>
               </div>

               {/* Case 3 */}
               <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center"><Briefcase size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">Botlegger & VLT: Foodtech Otomasyonu</h3>
                  </div>
                  <p className="text-slate-400 mb-6 line-clamp-3">Yüksek işçi devir hızına karşı kahve baristaları, dondurma otomatları ve hatta sıcak yağda falafel kızartma işlemleri için xArm ve Lite 6 ile otonom, standart hizmet sunan kiosklar yaratıldı.</p>
                  <a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold text-sm uppercase tracking-wider group-hover:text-orange-300 flex items-center">Senaryoyu İncele <ChevronRight size={16}/></a>
               </div>

               {/* Case 4 */}
               <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center"><Cpu size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">RoboHub Eindhoven: Mobil AMR</h3>
                  </div>
                  <p className="text-slate-400 mb-6 line-clamp-3">Eindhoven Teknoloji Üniversitesi ekibi, RoboCup@Work uluslararası yarışmasında Otonom Mobil Robot (AMR) üzerinde Lite 6'yı şasi olarak kullanarak entegre otonomi sağladı.</p>
                  <a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold text-sm uppercase tracking-wider group-hover:text-orange-300 flex items-center">Senaryoyu İncele <ChevronRight size={16}/></a>
               </div>
            </div>
         </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
             <h4 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Masaüstü Robotikten Sanayi Devrimine</h4>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">UFactory & Robotsepeti Tarihçesi</h2>
             <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                2013'ten bugüne, açık kaynaklı otomasyonu herkes için erişilebilir kılan inovasyon yolculuğumuz.
             </p>
          </div>

          <div className="relative">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/20 via-orange-500/50 to-transparent transform -translate-x-1/2 rounded-full"></div>
            
            <div className="relative z-10">
              {TIMELINE_DATA.map((data, index) => (
                <TimelineItem key={index} data={data} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Robotsepeti'nden uFactory Satın Almanın Avantajları
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Türkiye tek yetkili distribütörü olarak uçtan uca endüstriyel otomasyon çözümleri sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                <Shield className="text-orange-500 mb-6" size={40} />
                <h3 className="text-xl font-bold text-white mb-4">Resmi Türkiye Garantisi</h3>
                <p className="text-slate-400">Tüm uFactory xArm ve Lite6 serisi robot kolları ve aksesuarları, doğrudan Robotsepeti güvencesiyle garanti kapsamındadır.</p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                <Settings className="text-orange-500 mb-6" size={40} />
                <h3 className="text-xl font-bold text-white mb-4">Teknik Destek ve Kurulum</h3>
                <p className="text-slate-400">Alanında uzman mühendislik ekibimiz ile üretim hattınıza entegrasyon, Python SDK programlama ve ROS desteği sağlıyoruz.</p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                <Lock className="text-orange-500 mb-6" size={40} />
                <h3 className="text-xl font-bold text-white mb-4">Stoktan Hızlı Teslimat</h3>
                <p className="text-slate-400">Yerel stok yönetimi sayesinde haftalarca beklemeden endüstriyel robot kolu donanımlarına ve end-effector ünitelerine hızlıca ulaşın.</p>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Sık Sorulan Sorular</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">uFactory ürünleri Türkiye garantisi kapsamında mı?</h3>
              <p className="text-slate-600">Evet, Robotsepeti üzerinden satın alınan tüm uFactory ürünleri resmi Türkiye distribütörü garantisi altındadır ve teknik destek tarafımızca sağlanmaktadır.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hangi robot kolu benim endüstriyel projeme daha uygun?</h3>
              <p className="text-slate-600">Seçim yaparken payload kapasitesi ve tekrar konumlandırma hassasiyeti kritiktir. xArm 6 genel endüstriyel kullanım, xArm 7 ise engelden kaçınma ve dar alanlar için idealdir. Detaylı teknik analiz için mühendislik ekibimizle görüşebilirsiniz.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">xArm serisi için hangi programlama dilleri destekleniyor?</h3>
              <p className="text-slate-600">uFactory robot kolları tamamen açık mimariye sahiptir. ROS, ROS2 desteğinin yanı sıra kapsamlı Python SDK ve C++ kütüphaneleri ile programlanabilir. Ayrıca Modbus TCP üzerinden endüstriyel haberleşme mümkündür.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Kurulum ve robot kolu programlama eğitim desteğiniz var mı?</h3>
              <p className="text-slate-600">Evet, Robotsepeti olarak uFactory cobot sistemlerinin sahada kurulumu, entegrasyonu ve teknik personeliniz için temel robot kolu programlama eğitimlerini sağlıyoruz.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">uFactory ürünlerinde teslimat süreleri nedir?</h3>
              <p className="text-slate-600">Popüler xArm ve Lite6 modellerinin stok durumuna göre teslimatlarımız doğrudan Türkiye depomuzdan veya hızlı tedarik zincirimiz üzerinden 2-4 hafta içerisinde gerçekleşmektedir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Robot Sepeti Role */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 lg:p-16 mb-16 flex flex-col lg:flex-row items-center justify-between border border-slate-700 shadow-2xl">
             <div className="lg:w-2/3 mb-8 lg:mb-0">
               <h3 className="text-3xl font-black text-white mb-4">Türkiye'nin Tek Yetkili Çözüm Ortağı</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 Robot Sepeti (Robotsepeti Teknoloji A.Ş.), e-ticaretin ötesinde; endüstriyel Ar-Ge, Teknokent girişimleri ve Türk KOBİ'leri için stratejik entegratördür.
               </p>
               <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-500" size={18}/> TL, USD, EUR Kur Esnekliği</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-500" size={18}/> Doğrudan Yerel Stok ve Yedek Parça</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-500" size={18}/> Seed Robotics & Unitree Multidisipliner Entegrasyon</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-500" size={18}/> B2B Mühendislik Desteği & Kurulum</li>
               </ul>
             </div>
             <div className="lg:w-1/3 flex flex-col items-center lg:items-end w-full">
                <a href="mailto:kurumsal@robotsepeti.com" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-orange-600/30 mb-4 inline-block text-center">
                  Distribütörle İletişime Geç
                </a>
                <span className="text-slate-500 font-bold flex items-center gap-2">0212 697 62 12 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span></span>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-12 mb-12">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              {/* Robot Sepeti Logo - Footer */}
              <div className="flex items-center">
                <img src="/images/robotsepeti_logo_cropped.png" alt="Robotsepeti - uFactory Türkiye Yetkili Distribütörü" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              </div>
              {/* Divider */}
              <div className="h-10 w-px bg-white/20"></div>
              {/* UFACTORY Logo - Footer */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                  <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="#EC6408" stroke="#EC6408" strokeWidth="1"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">UF</text>
                </svg>
                <div className="leading-none">
                  <span className="block font-bold text-lg text-white tracking-wider">UFACTORY</span>
                  <span className="block text-[10px] text-slate-500 font-bold tracking-[0.15em] mt-1">TÜRKİYE DİSTRİBÜTÖRÜ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider">İletişim</h4>
              <ul className="space-y-4">
                <li className="font-bold text-white">Telefon: +90 850 318 80 50</li>
                <li><a href="mailto:kurumsal@robotsepeti.com" className="hover:text-orange-400">kurumsal@robotsepeti.com</a></li>
                <li><a href="mailto:destek@robotsepeti.com" className="hover:text-orange-400">destek@robotsepeti.com</a></li>
                <li>Web: www.robotsepeti.com</li>
                <li className="leading-relaxed text-slate-500 mt-4">Teknopark İstanbul, Sanayi Mah. Teknopark Bulvarı, No: 1/1A, Pendik, İstanbul</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Hızlı Linkler</h4>
              <ul className="space-y-4">
                <li><a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">uFactory Teknik Dokümanlar</a></li>
                <li><a href="https://github.com/UFACTORY" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">ROS / ROS2 GitHub Repoları</a></li>
                <li><a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">uFactory Studio İndir</a></li>
                <li><a href="https://www.robotsepeti.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">uFactory Robotik Kol Eğitim Kitleri</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Yetkili Distribütör Güvencesi</h4>
              <p className="leading-relaxed mb-4 text-slate-500">
                uFactory ürünleri dünya genelinde 80'den fazla ülkede aktif üretim ve AR-GE sistemlerinde çalışmaktadır. Robotsepeti, bu kalitenin Türkiye'deki tek resmi ve yetkili distribütörüdür. Tüm ürünler yerel garanti ve mühendislik desteği altındadır.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase">
            © 2024 Robotsepeti Teknoloji A.Ş. & uFactory. Tüm hakları saklıdır. uFactory Türkiye Yetkili Distribütörü.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
