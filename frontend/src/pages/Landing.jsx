import {
  ArrowRight,
  Heart,
  Users,
  MapPin,
  Clock,
  Droplets,
  Shield,
  Zap,
  Search,
  Bell,
  FileText,
  CheckCircle,
  Activity,
  RefreshCw,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  Star,
  TrendingUp,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const statTargets = [10000, 50000, 150, 30];
  const statLabels = ["Lives Saved", "Blood Units", "Partner Hospitals", "Min Response"];
  const statValues = ["10,000+", "50,000+", "150+", "< 30min"];
  const statIcons = [Heart, Droplets, MapPin, Clock];
  const statColors = ["from-rose-500 to-red-600", "from-red-500 to-rose-600", "from-pink-500 to-red-500", "from-orange-500 to-red-500"];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Easy Donor Registration",
      description: "Simple and secure donor registration process with medical history tracking and eligibility verification.",
      gradient: "from-rose-500 to-red-600",
      bg: "bg-rose-50",
    },
    {
      icon: Droplets,
      title: "Real-time Inventory Tracking",
      description: "Monitor blood inventory levels, expiration dates, and distribution in real-time across all partner facilities.",
      gradient: "from-red-500 to-pink-600",
      bg: "bg-red-50",
    },
    {
      icon: Zap,
      title: "Quick Emergency Response",
      description: "Emergency request system with automated matching and notification to ensure rapid response in critical situations.",
      gradient: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
    },
  ];

  const processSteps = [
    { step: "01", icon: FileText, title: "Register & Screen", description: "Complete simple registration and health screening process", color: "bg-rose-500" },
    { step: "02", icon: Search, title: "Find Match", description: "Our system matches blood needs with compatible donors", color: "bg-red-500" },
    { step: "03", icon: Bell, title: "Get Notified", description: "Receive instant alerts for urgent needs in your area", color: "bg-pink-500" },
    { step: "04", icon: Heart, title: "Donate & Save Lives", description: "Visit approved centers and make your life-saving donation", color: "bg-rose-600" },
  ];

  const bloodTypes = [
    { type: "A+", need: "High", donors: "32%", urgency: 2 },
    { type: "A-", need: "Critical", donors: "8%", urgency: 3 },
    { type: "B+", need: "Medium", donors: "12%", urgency: 1 },
    { type: "B-", need: "High", donors: "3%", urgency: 2 },
    { type: "O+", need: "High", donors: "35%", urgency: 2 },
    { type: "O-", need: "Critical", donors: "5%", urgency: 3 },
    { type: "AB+", need: "Low", donors: "4%", urgency: 0 },
    { type: "AB-", need: "Medium", donors: "1%", urgency: 1 },
  ];

  const needConfig = {
    Critical: { bar: "bg-red-500", badge: "bg-red-100 text-red-700 border border-red-200", card: "border-red-300 bg-gradient-to-b from-red-50 to-white", text: "text-red-600", glow: "shadow-red-100" },
    High:     { bar: "bg-orange-400", badge: "bg-orange-100 text-orange-700 border border-orange-200", card: "border-orange-200 bg-gradient-to-b from-orange-50 to-white", text: "text-orange-500", glow: "shadow-orange-100" },
    Medium:   { bar: "bg-amber-400", badge: "bg-amber-100 text-amber-700 border border-amber-200", card: "border-amber-200 bg-gradient-to-b from-amber-50 to-white", text: "text-amber-500", glow: "" },
    Low:      { bar: "bg-green-400", badge: "bg-green-100 text-green-700 border border-green-200", card: "border-green-200 bg-gradient-to-b from-green-50 to-white", text: "text-green-500", glow: "" },
  };

  const donationFacts = [
    { icon: Heart, title: "One Donation, Multiple Lives", description: "A single blood donation can save up to 3 lives. Your one hour can give someone a lifetime.", stat: "3 Lives Saved", color: "text-rose-600", bg: "bg-rose-100" },
    { icon: RefreshCw, title: "Blood Regeneration", description: "Your body replaces blood within 24-48 hours. Red blood cells fully replenish in 4-6 weeks.", stat: "48 Hours", color: "text-red-600", bg: "bg-red-100" },
    { icon: Users, title: "Constant Need", description: "Every 2 seconds, someone needs blood. Your regular donation ensures continuous supply.", stat: "Every 2 Sec", color: "text-pink-600", bg: "bg-pink-100" },
    { icon: AlertTriangle, title: "Short Shelf Life", description: "Red blood cells last 42 days, platelets just 5 days. Regular donations are essential.", stat: "42 Days Max", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  const eligibilityInfo = [
    {
      icon: CheckCircle,
      title: "Who Can Donate",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      accent: "border-emerald-400",
      items: ["Age 17–75 (16 with parental consent)", "Weight at least 110 lbs (50 kg)", "Good general health", "No flu or cold symptoms"],
    },
    {
      icon: Activity,
      title: "Health Benefits",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      accent: "border-blue-400",
      items: ["Free health screening", "Burns 650 calories per donation", "Reduces risk of heart disease", "Stimulates blood cell production"],
    },
    {
      icon: Shield,
      title: "Safety First",
      iconColor: "text-violet-600",
      iconBg: "bg-violet-100",
      accent: "border-violet-400",
      items: ["Sterile, disposable equipment", "Trained medical staff", "Comfortable environment", "Post-donation care"],
    },
  ];

  const emergencyNeeds = [
    { type: "Accident Victims", units: "Up to 100 units", icon: AlertTriangle, color: "from-red-500 to-rose-600" },
    { type: "Cancer Patients", units: "8 units weekly", icon: Heart, color: "from-pink-500 to-red-500" },
    { type: "Surgery Patients", units: "5–10 units", icon: Stethoscope, color: "from-rose-500 to-pink-600" },
    { type: "Burn Victims", units: "20+ units", icon: Activity, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-rose-900 pt-20">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-400/30 bg-red-500/10 text-red-200 text-sm font-medium mb-8 backdrop-blur-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              Saving Lives Every Day · 10,000+ Donors Active
            </div>

            {/* Headline */}
            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Connect{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-400 via-red-300 to-pink-400 bg-clip-text text-transparent">
                  Blood Donors
                </span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M0 4 Q75 0 150 4 Q225 8 300 4" stroke="url(#ul)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ul" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fb7185"/><stop offset="1" stopColor="#f43f5e"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {" "}with Those{" "}
              <span className="bg-gradient-to-r from-red-200 to-rose-200 bg-clip-text text-transparent">in Need</span>
            </h1>

            <p className={`text-lg md:text-xl text-red-100/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Our advanced blood bank system ensures efficient donation, storage, and distribution — saving lives when every second counts.
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register/donor"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
              >
                <Heart className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                Become a Donor
              </Link>
            </div>

            {/* Inline stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {statValues.map((val, i) => {
                const Icon = statIcons[i];
                return (
                  <div key={i} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-rose-400 mb-1" aria-hidden="true" />
                    <span className="text-2xl font-black text-white">{val}</span>
                    <span className="text-xs text-red-200/70 font-medium">{statLabels[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── BLOOD TYPE INVENTORY ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-4">Live Inventory</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Current Blood Needs</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">Real-time blood type requirements across our network. Your donation matters now.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {bloodTypes.map((blood, index) => {
              const cfg = needConfig[blood.need];
              const fillPct = blood.urgency === 3 ? 90 : blood.urgency === 2 ? 65 : blood.urgency === 1 ? 40 : 20;
              return (
                <div key={index} className={`relative rounded-2xl border-2 ${cfg.card} ${cfg.glow} shadow-lg p-5 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default`}>
                  {blood.urgency === 3 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping absolute" />
                      <span className="w-2 h-2 bg-white rounded-full relative" />
                    </span>
                  )}
                  <div className={`text-3xl font-black mb-2 ${cfg.text}`}>{blood.type}</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
                    <div className={`h-1.5 rounded-full ${cfg.bar} transition-all duration-1000`} style={{ width: `${fillPct}%` }} />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>{blood.need}</span>
                  <div className="text-xs text-slate-400 mt-2 font-medium">{blood.donors} donors</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold mb-4">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Why Choose BloodConnect?</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">We provide a comprehensive platform connecting donors, hospitals and blood banks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.gradient}`} />
                  <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 bg-gradient-to-br ${f.gradient} bg-clip-text`} style={{ color: "transparent", stroke: "url(#g1)" }} aria-hidden="true" />
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#f43f5e"/><stop offset="1" stopColor="#e11d48"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <Icon className="w-7 h-7 text-red-600 -ml-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.description}</p>
                  <div className="mt-6 flex items-center gap-1 text-red-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DONATION FACTS ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-4">Why It Matters</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Your Donation Saves Lives</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">Every donation creates a ripple effect of hope and healing in our community.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {donationFacts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div key={i} className="relative group bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  <div className={`relative w-14 h-14 rounded-2xl ${fact.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-7 h-7 ${fact.color}`} aria-hidden="true" />
                  </div>
                  <div className={`relative text-2xl font-black ${fact.color} mb-2`}>{fact.stat}</div>
                  <h3 className="relative text-base font-bold text-slate-800 mb-2">{fact.title}</h3>
                  <p className="relative text-sm text-slate-500 leading-relaxed">{fact.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY NEEDS ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-rose-900">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-red-200 text-sm font-semibold mb-4 border border-white/20">Urgent Need</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Who Needs Your Blood?</h2>
            <p className="text-lg text-red-100/70 max-w-xl mx-auto">Your donation directly impacts patients in critical situations every single day.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {emergencyNeeds.map((need, i) => {
              const Icon = need.icon;
              return (
                <div key={i} className="group relative overflow-hidden rounded-3xl bg-white/8 border border-white/10 backdrop-blur-sm p-6 text-center hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${need.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{need.type}</h3>
                  <p className="text-sm text-red-200/70">{need.units}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center bg-white/8 border border-white/15 rounded-3xl p-8 backdrop-blur-sm">
            <TrendingUp className="w-10 h-10 text-rose-400 mx-auto mb-4" aria-hidden="true" />
            <p className="text-xl font-bold text-white mb-2">
              <span className="text-rose-300">47%</span> of people are eligible to donate — but only <span className="text-rose-300">5%</span> do.
            </p>
            <p className="text-red-200/70">Your single donation can make all the difference.</p>
            <Link
              to="/register/donor"
              className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
            >
              Donate Now <Heart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">Four simple steps to become a life-saver. Join thousands making a difference.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-rose-200 via-red-300 to-pink-200" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="group flex flex-col items-center text-center">
                    <div className={`relative w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10`}>
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-slate-100 rounded-full text-xs font-black text-slate-600 flex items-center justify-center shadow-sm">{i + 1}</span>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 w-full">
                      <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-semibold mb-4">Eligibility & Benefits</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Are You Ready to Donate?</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">Safe, simple, and rewarding — discover the benefits of blood donation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {eligibilityInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className={`bg-white rounded-3xl border-2 ${info.accent} shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`w-14 h-14 ${info.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon className={`w-7 h-7 ${info.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-5">{info.title}</h3>
                  <ul className="space-y-3">
                    {info.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle className={`w-5 h-5 ${info.iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST / SECURITY ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold mb-5">Security & Compliance</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">Secure &amp; Fully Compliant</h2>
              <p className="text-slate-500 leading-relaxed mb-8">Our system meets all healthcare data security standards with end-to-end encryption and strict compliance with medical regulations.</p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, label: "HIPAA compliant data handling", color: "text-violet-600", bg: "bg-violet-100" },
                  { icon: Lock, label: "End-to-end encryption", color: "text-blue-600", bg: "bg-blue-100" },
                  { icon: Star, label: "Regular independent security audits", color: "text-amber-600", bg: "bg-amber-100" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${item.color}`} aria-hidden="true" />
                      </div>
                      <span className="text-slate-700 font-medium">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
                <div className="relative text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-white font-black text-2xl mb-2">256-bit Encrypted</p>
                  <p className="text-violet-200 text-sm mb-6">All data protected end-to-end</p>
                  <div className="grid grid-cols-3 gap-3">
                    {["HIPAA", "ISO 27001", "SOC 2"].map((badge, i) => (
                      <div key={i} className="bg-white/15 rounded-xl p-3 border border-white/20">
                        <p className="text-white text-xs font-bold">{badge}</p>
                        <p className="text-violet-200 text-xs">Compliant</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-600 to-red-700">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="w-14 h-14 text-rose-200 mx-auto mb-6 animate-pulse" aria-hidden="true" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready to Save Lives?</h2>
            <p className="text-lg text-red-100/80 mb-10 leading-relaxed">
              Join our community of donors and healthcare professionals working together to ensure blood is available when and where it's needed most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register/donor"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-red-600 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Join Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register/facility"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Partner as Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
