import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Wheat,
  Building2,
  QrCode,
  Truck,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Layers,
  ChevronDown,
  ChevronUp,
  ListOrdered
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HowToUseWalkthroughProps {
  darkMode?: boolean;
}

export const HowToUseWalkthrough: React.FC<HowToUseWalkthroughProps> = ({ darkMode = false }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(false);
  const [desktopViewMode, setDesktopViewMode] = React.useState<'timeline' | 'simulator'>('timeline');
  const [showMobileFullList, setShowMobileFullList] = React.useState(false);

  const steps = [
    {
      stepNumber: '01',
      title: 'Step 1: Register Mobile & Link Bank Account',
      shortTitle: 'Registration',
      hindi: 'स्टेप 1: मोबाइल नंबर व बैंक खाता जोड़ें',
      desc: 'अपना 10 अंकों का मोबाइल नंबर और नाम दर्ज करके खाता बनाएं। बैंक खाता नंबर और IFSC कोड एक बार जोड़ें ताकि फसल का पूरा पैसा बिना किसी बिचौलिए के सीधे आपके खाते में आए।',
      icon: UserCheck,
      badge: 'Step 1: Registration',
      accentColor: 'from-red-600 to-rose-600',
      badgeBg: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-400/40',
      tagColor: 'border-red-500 text-red-600 dark:text-red-400',
      cropTag: 'Farmer Mobile & Bank Link',
      image: '/walkthrough/step1_registration.jpg',
      highlightLabel: 'Enter Mobile (98765-43210) & Link Bank A/C',
      mockVisual: {
        screenTitle: 'Register New Farmer Dashboard',
        line1: 'Farmer: Balwinder Singh • Mobile: 98765-43210',
        line2: 'Bank Account: SBI •••• 9814 (Linked for Direct DBT)',
        line3: 'Registration Type: Direct Farmer Portal',
        status: 'Account Verified & Ready to Book'
      }
    },
    {
      stepNumber: '02',
      title: 'Step 2: Select Your Crop & Quantity',
      shortTitle: 'Crop & Quantity',
      hindi: 'स्टेप 2: फसल और वजन चुनें (एमएसपी गारंटी)',
      desc: 'अपनी फसल (जैसे गेहूं, धान, सरसों) चुनें और बताएं कि कितने क्विंटल बेचना चाहते हैं। वेबसाइट पर सरकारी एमएसपी भाव (₹2,425/क्विंटल) और कुल मिलने वाली रकम तुरंत देखें।',
      icon: Wheat,
      badge: 'Step 2: Crop & MSP',
      accentColor: 'from-orange-500 to-amber-500',
      badgeBg: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/40',
      tagColor: 'border-orange-500 text-orange-600 dark:text-orange-400',
      cropTag: 'Wheat / गेहूं • MSP ₹2,425/Qtl',
      image: '/walkthrough/step2_crop_selection.jpg',
      highlightLabel: 'Select Wheat & Enter Estimated Quintals',
      mockVisual: {
        screenTitle: 'Select Crop & Quantity Dashboard',
        line1: 'Commodity: Wheat / गेहूं (Grade A Rabi 2026)',
        line2: 'Official MSP: ₹2,425 / Quintal (Government Rate)',
        line3: 'Quantity: 60 Quintals (6,000 kg)',
        status: 'MSP Rate Locked: ₹1,45,500'
      }
    },
    {
      stepNumber: '03',
      title: 'Step 3: Choose Mandi & Arrival Date',
      shortTitle: 'Mandi & Date',
      hindi: 'स्टेप 3: नजदीकी मंडी और तारीख चुनें',
      desc: 'अपनी नजदीकी सरकारी मंडी और ट्रैक्टर लाने की तारीख व 1 घंटे का समय चुनें। आपका गेट प्रवेश पक्का रहता है, हाईवे पर ट्रैक्टर की लंबी कतार में नहीं लगना पड़ेगा।',
      icon: Building2,
      badge: 'Step 3: Mandi Slot',
      accentColor: 'from-amber-500 to-yellow-500',
      badgeBg: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-400/40',
      tagColor: 'border-amber-500 text-amber-700 dark:text-amber-300',
      cropTag: 'Khanna Main Grain Mandi',
      image: '/walkthrough/step3_mandi_slot.jpg',
      highlightLabel: 'Select Khanna Mandi & 10:30 AM Arrival Slot',
      mockVisual: {
        screenTitle: 'Mandi & Time Slot Dashboard',
        line1: 'Centre: Khanna Main Grain Mandi (Gate #2)',
        line2: 'Reserved Date: 22 March 2026 (10:30 - 11:30 AM)',
        line3: 'Dock Status: Fast-Track Unloading Bay Assigned',
        status: 'Zero Highway Waiting Queue Guaranteed'
      }
    },
    {
      stepNumber: '04',
      title: 'Step 4: Get Digital Token & QR Gate Pass',
      shortTitle: 'QR Gate Pass',
      hindi: 'स्टेप 4: टोकन नंबर और QR गेट पास पाएं',
      desc: 'बुकिंग होते ही टोकन नंबर और QR कोड वाला डिजिटल गेट पास स्क्रीन पर आ जाएगा और आपके मोबाइल पर एसएमएस से पहुंच जाएगा। इसे गेट पर दिखाएं।',
      icon: QrCode,
      badge: 'Step 4: QR Gate Pass',
      accentColor: 'from-yellow-500 to-orange-500',
      badgeBg: 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300 border-yellow-400/40',
      tagColor: 'border-yellow-500 text-yellow-700 dark:text-yellow-300',
      cropTag: 'Token #SP-7892 • QR Pass',
      image: '/walkthrough/step4_qr_token.jpg',
      highlightLabel: 'QR Gate Pass & Tractor PB-10-CZ-4412',
      mockVisual: {
        screenTitle: 'Digital Mandi Gate Pass Dashboard',
        line1: 'Token Number: #SP-7892 (Encrypted QR Pass)',
        line2: 'Vehicle: PB-10-CZ-4412 (Tractor + Trolley)',
        line3: 'Pass Delivery: Saved on Phone & Sent via SMS',
        status: 'Ready to Scan at Mandi Gate'
      }
    },
    {
      stepNumber: '05',
      title: 'Step 5: Fast Gate Entry & Computerized Weighing',
      shortTitle: 'Gate & Weighing',
      hindi: 'स्टेप 5: 5 सेकंड में गेट प्रवेश और सही तौल',
      desc: 'तय समय पर मंडी पहुंचें। गेट पर आपका QR कोड 5 सेकंड में स्कैन होगा। फिर कंप्यूटर कांटे (इलेक्ट्रॉनिक वे-ब्रिज) पर बिना किसी धांधली के पारदर्शी तौल होगी।',
      icon: Truck,
      badge: 'Step 5: Mandi Weigh-in',
      accentColor: 'from-red-600 to-orange-600',
      badgeBg: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-400/40',
      tagColor: 'border-red-600 text-red-600 dark:text-red-400',
      cropTag: '60.00 Quintals Net Weight',
      image: '/walkthrough/step5_weighbridge.jpg',
      highlightLabel: 'Electronic Scale: Gross 8,420 kg & Tare 2,420 kg',
      mockVisual: {
        screenTitle: 'Express Gate & Weighbridge Dashboard',
        line1: 'Gate Queue: 0 Minutes Wait (Fast Track Express)',
        line2: 'Gross Weight: 8,420 kg • Tare: 2,420 kg',
        line3: 'Digital Scale: Automated Tamper-Proof Sensor',
        status: 'Net Crop: 6,000 kg (60.00 Quintals Verified)'
      }
    },
    {
      stepNumber: '06',
      title: 'Step 6: Digital J-Form & Direct Bank Payment',
      shortTitle: 'J-Form & Payment',
      hindi: 'स्टेप 6: सरकारी जे-फॉर्म रसीद व खाते में पैसे',
      desc: 'तौल पूरी होते ही सरकारी जे-फॉर्म रसीद आपके फोन पर आ जाएगी। आपकी फसल का पूरा एमएसपी पैसा 24 से 48 घंटे के अंदर सीधे आपके बैंक खाते में जमा हो जाएगा।',
      icon: CreditCard,
      badge: 'Step 6: Direct Bank Payment',
      accentColor: 'from-emerald-600 to-amber-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40',
      tagColor: 'border-emerald-600 text-emerald-600 dark:text-emerald-400',
      cropTag: '₹1,45,500 DBT Credit',
      image: '/walkthrough/step6_jform_payout.jpg',
      highlightLabel: 'Official J-Form Receipt & ₹1,45,500 Bank Transfer',
      mockVisual: {
        screenTitle: 'Digital J-Form & Bank Payout Dashboard',
        line1: 'Procurement Slip: J-FORM-2026-9901 (Verified)',
        line2: 'Total MSP Amount: ₹1,45,500 (100% Payout)',
        line3: 'Bank Settlement: Dispatched via Government DBT',
        status: 'Credited Directly to Farmer Bank Account'
      }
    }
  ];

  // Auto-cycle through steps if auto-playing in simulator mode
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section
      id="how-to-use"
      className={`py-12 sm:py-20 border-t transition-colors duration-200 ${
        darkMode ? 'bg-black border-neutral-800 text-white' : 'bg-[#fcfaf7] border-orange-100 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border tracking-wide mb-3 ${
              darkMode
                ? 'bg-orange-950/80 text-amber-300 border-orange-800'
                : 'bg-orange-100 text-orange-950 border-orange-300 shadow-2xs'
            }`}
          >
            <Wheat className="w-3.5 h-3.5 text-amber-500" />
            <span>Kisan Procurement Guide • 6 Simple Steps</span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2.5 ${
              darkMode ? 'text-white' : 'text-slate-950'
            }`}
          >
            How To Use SmartProcure
          </h2>
          <p
            className={`text-xs sm:text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-neutral-300' : 'text-slate-700'
            }`}
          >
            A step-by-step visual roadmap showing how farmers schedule grain appointments, bypass mandi gridlocks, and receive guaranteed MSP payments.
          </p>

          {/* Desktop View Mode Toggle (Shown only on md screens and up) */}
          <div className="hidden md:inline-flex mt-6 p-1 rounded-2xl border bg-black/5 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setDesktopViewMode('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                desktopViewMode === 'timeline'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md'
                  : darkMode
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Full 6-Step Roadmap</span>
            </button>
            <button
              type="button"
              onClick={() => setDesktopViewMode('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                desktopViewMode === 'simulator'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md'
                  : darkMode
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Interactive Step Simulator</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE APPROACH: FOCUSED INTERACTIVE STEP WIZARD (100% VISIBLE ON PHONES) */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-4">
          {/* Step Progress Tracker Header */}
          <div
            className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-orange-200 text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-amber-400">
                  Step {activeStep + 1} of {steps.length}
                </span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-neutral-400 truncate max-w-[140px]">
                  • {current.shortTitle}
                </span>
              </div>

              {/* Toggle to view all steps as a checklist */}
              <button
                type="button"
                onClick={() => setShowMobileFullList(!showMobileFullList)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                  showMobileFullList
                    ? 'bg-orange-600 text-white border-orange-600'
                    : darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-amber-300'
                    : 'bg-orange-50 border-orange-200 text-orange-800'
                }`}
              >
                <ListOrdered className="h-3 w-3" />
                <span>{showMobileFullList ? 'Hide List' : 'All Steps'}</span>
                {showMobileFullList ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            {/* Tap-to-jump Numbered Step Pills (Large 40px touch targets, no horizontal clipping) */}
            <div className="grid grid-cols-6 gap-1.5">
              {steps.map((st, idx) => {
                const isActive = activeStep === idx;
                const isPassed = idx < activeStep;
                return (
                  <button
                    key={st.stepNumber}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`h-10 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center cursor-pointer border ${
                      isActive
                        ? `bg-gradient-to-r ${st.accentColor} text-white border-transparent shadow-sm scale-105`
                        : isPassed
                        ? darkMode
                          ? 'bg-neutral-900 border-neutral-700 text-amber-400'
                          : 'bg-orange-100 border-orange-300 text-orange-800'
                        : darkMode
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                    aria-label={`Jump to Step ${st.stepNumber}: ${st.title}`}
                  >
                    <span>{st.stepNumber}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Mobile Step Card (Guaranteed 100% visible on small mobile screens) */}
          <div
            className={`rounded-2xl border-2 p-5 transition-all ${
              darkMode
                ? 'bg-neutral-950 border-neutral-800 text-white shadow-xl'
                : 'bg-white border-orange-200 text-slate-900 shadow-md'
            }`}
          >
            {/* Step Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm text-white bg-gradient-to-r ${current.accentColor} shadow-md shrink-0`}
                >
                  {current.stepNumber}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-amber-400 block">
                    {current.cropTag}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 block">
                    {current.hindi}
                  </span>
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-amber-400'
                    : 'bg-orange-50 border-orange-200 text-orange-600'
                }`}
              >
                <CurrentIcon className="h-5 w-5" />
              </div>
            </div>

            {/* Step Title */}
            <h3
              className={`text-base font-black tracking-tight mb-2 leading-snug ${
                darkMode ? 'text-white' : 'text-slate-950'
              }`}
            >
              {current.title}
            </h3>

            {/* Step Description */}
            <p
              className={`text-xs font-medium leading-relaxed mb-3.5 ${
                darkMode ? 'text-neutral-300' : 'text-slate-600'
              }`}
            >
              {current.desc}
            </p>

            {/* Mobile Step Website Screenshot with Highlight Indicator */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 mb-3.5 shadow-xs">
              <img
                src={current.image}
                alt={current.mockVisual.screenTitle}
                className="w-full h-36 sm:h-44 object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-1.5 bottom-1.5 bg-black/85 backdrop-blur-xs text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center justify-between border border-orange-500/50">
                <span className="truncate text-amber-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  👉 {current.highlightLabel}
                </span>
                <ArrowRight className="h-3 w-3 text-orange-400 shrink-0 ml-1" />
              </div>
            </div>

            {/* Compact Step Live Data Box */}
            <div
              className={`p-3 rounded-xl border text-xs font-mono font-bold mb-4 ${
                darkMode
                  ? 'bg-black border-neutral-800 text-amber-300'
                  : 'bg-orange-50/80 border-orange-200 text-orange-950'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-black mb-1">
                <span>{current.mockVisual.screenTitle}</span>
                <span className="text-emerald-500 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3 w-3" /> Ready
                </span>
              </div>
              <div className="text-[11px] text-slate-800 dark:text-neutral-200 font-semibold truncate mb-0.5">
                {current.mockVisual.line1}
              </div>
              <div className="text-[11px] text-orange-700 dark:text-amber-400 font-bold truncate">
                {current.mockVisual.status}
              </div>
            </div>

            {/* Mobile Navigation Prev / Next Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                  activeStep === 0
                    ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-neutral-800 text-slate-400'
                    : darkMode
                    ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Step ({steps[activeStep + 1].stepNumber})</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <Link to="/register">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Optional Expandable All 6 Steps Checklist for Mobile */}
          {showMobileFullList && (
            <div className="space-y-2 pt-1 animate-in fade-in duration-200">
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-neutral-400 px-1">
                Complete Process Overview (6 Steps)
              </div>
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isCurrent = activeStep === idx;
                return (
                  <div
                    key={`list-${st.stepNumber}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setShowMobileFullList(false);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isCurrent
                        ? darkMode
                          ? 'bg-neutral-900 border-orange-500 text-white ring-1 ring-orange-500'
                          : 'bg-orange-50 border-orange-400 text-orange-950 ring-1 ring-orange-400'
                        : darkMode
                        ? 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-900'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] text-white bg-gradient-to-r ${st.accentColor}`}
                      >
                        {st.stepNumber}
                      </span>
                      <div>
                        <div className="text-xs font-bold leading-tight">{st.title}</div>
                        <div className="text-[10px] text-slate-400 dark:text-neutral-400">{st.hindi}</div>
                      </div>
                    </div>
                    <Icon className="h-4 w-4 text-orange-500 shrink-0" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile Direct Action Link */}
          <div className="pt-2 text-center">
            <Link to="/dashboard/book">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Your Procurement Slot</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP APPROACH: FULL 6-CARD GRID ROADMAP OR INTERACTIVE SIMULATOR (md+) */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          {/* VIEW 1: COMPLETE 6-STEP ROADMAP */}
          {desktopViewMode === 'timeline' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {steps.map((st) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={st.stepNumber}
                      className={`rounded-2xl border-2 p-5 lg:p-6 transition-all duration-200 relative flex flex-col justify-between ${
                        darkMode
                          ? 'bg-neutral-950 border-neutral-800 text-white hover:border-orange-500/60'
                          : 'bg-white border-orange-100 text-slate-900 hover:border-orange-300 shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Top Header with Step Badge & Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white bg-gradient-to-r ${st.accentColor} shadow-sm shrink-0`}
                            >
                              {st.stepNumber}
                            </span>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-amber-400 block">
                                {st.cropTag}
                              </span>
                              <span className="text-[11px] font-bold text-slate-500 dark:text-neutral-400 block">
                                {st.hindi}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                              darkMode
                                ? 'bg-neutral-900 border-neutral-800 text-amber-400'
                                : 'bg-orange-50 border-orange-200 text-orange-600'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Step Title */}
                        <h3
                          className={`text-base font-black tracking-tight mb-2 ${
                            darkMode ? 'text-white' : 'text-slate-950'
                          }`}
                        >
                          {st.title}
                        </h3>

                        {/* Step Description */}
                        <p
                          className={`text-xs sm:text-sm font-medium leading-relaxed mb-4 ${
                            darkMode ? 'text-neutral-300' : 'text-slate-600'
                          }`}
                        >
                          {st.desc}
                        </p>
                      </div>

                      {/* Step Visual Preview Pill */}
                      <div
                        className={`p-3 rounded-xl border text-xs font-mono font-bold mt-auto ${
                          darkMode
                            ? 'bg-black border-neutral-800 text-amber-300'
                            : 'bg-orange-50/70 border-orange-200/80 text-orange-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400 uppercase font-black mb-1">
                          <span>Live Output</span>
                          <span className="text-emerald-500 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </span>
                        </div>
                        <div className="truncate text-slate-800 dark:text-neutral-200">{st.mockVisual.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA Banner */}
              <div
                className={`rounded-2xl border-2 p-6 lg:p-8 flex items-center justify-between gap-4 ${
                  darkMode
                    ? 'bg-gradient-to-r from-orange-950/50 via-neutral-950 to-neutral-950 border-orange-900/50 text-white'
                    : 'bg-gradient-to-r from-orange-100/70 via-amber-50 to-orange-50 border-orange-200 text-slate-950'
                }`}
              >
                <div>
                  <h4 className="text-lg lg:text-xl font-black mb-1">
                    Ready to experience seamless mandi procurement?
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-neutral-300">
                    Book your reserved tractor dock window today. Zero wait time, guaranteed MSP payout.
                  </p>
                </div>

                <Link to="/dashboard/book">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Your Slot Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* VIEW 2: INTERACTIVE STEP SIMULATOR */}
          {desktopViewMode === 'simulator' && (
            <div className="space-y-6">
              {/* Step Navigation Bar */}
              <div className="grid grid-cols-6 gap-2">
                {steps.map((st, idx) => {
                  const Icon = st.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={st.stepNumber}
                      type="button"
                      onClick={() => {
                        setActiveStep(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? `bg-gradient-to-r ${st.accentColor} text-white border-transparent shadow-md scale-[1.02]`
                          : darkMode
                          ? 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-orange-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-black ${isActive ? 'text-white' : 'text-orange-500'}`}>
                          {st.stepNumber}
                        </span>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-black truncate">{st.shortTitle}</div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Simulator Stage */}
              <div
                className={`rounded-3xl border-2 p-6 lg:p-10 shadow-xl transition-all duration-300 ${
                  darkMode
                    ? 'bg-neutral-950 border-neutral-800 shadow-2xl'
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className="grid grid-cols-12 gap-8 items-center">
                  {/* Left Column: Detailed Step Explanation */}
                  <div className="col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${current.badgeBg}`}>
                        {current.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400 dark:text-neutral-400">
                        {current.hindi}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl lg:text-3xl font-black tracking-tight ${
                        darkMode ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {current.title}
                    </h3>

                    <p
                      className={`text-sm lg:text-base leading-relaxed font-semibold ${
                        darkMode ? 'text-neutral-300' : 'text-slate-700'
                      }`}
                    >
                      {current.desc}
                    </p>

                    {/* Bullet Features */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div
                        className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
                          darkMode
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                            : 'bg-orange-50/60 border-orange-200 text-orange-950'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                        <span>Transparent & Middleman-Free</span>
                      </div>
                      <div
                        className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
                          darkMode
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                            : 'bg-amber-50/60 border-amber-200 text-amber-950'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                        <span>Direct Benefit Transfer (DBT)</span>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
                            setIsAutoPlaying(false);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            darkMode
                              ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveStep((prev) => (prev + 1) % steps.length);
                            setIsAutoPlaying(false);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-xs cursor-pointer"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                            isAutoPlaying
                              ? 'border-orange-500 text-orange-500 bg-orange-500/10'
                              : darkMode
                              ? 'border-neutral-800 text-neutral-400 hover:text-white'
                              : 'border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title={isAutoPlaying ? 'Pause Walkthrough' : 'Play Walkthrough'}
                        >
                          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                      </div>

                      <Link to="/dashboard/book">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
                        >
                          <span>Book Your Slot Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Simulated Screen Card */}
                  <div className="col-span-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className={`rounded-2xl border-2 p-5 lg:p-6 shadow-xl relative overflow-hidden ${
                          darkMode
                            ? 'bg-black border-neutral-800 shadow-2xl text-neutral-100'
                            : 'bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30 border-orange-200 text-slate-900 shadow-md'
                        }`}
                      >
                        {/* Card Screen Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${current.accentColor} text-white flex items-center justify-center shadow-xs`}>
                              <CurrentIcon className="h-4 w-4" />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">
                              {current.mockVisual.screenTitle}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-700 dark:text-amber-400 font-black">
                            LIVE SIMULATION
                          </span>
                        </div>

                        {/* Website Dashboard Image with Highlight Arrow / Line Indicator */}
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 mb-3.5 group shadow-xs">
                          <img
                            src={current.image}
                            alt={current.mockVisual.screenTitle}
                            className="w-full h-44 sm:h-52 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />

                          {/* Annotated Highlight Overlay with Arrow & Line */}
                          <div className="absolute inset-x-2 bottom-2 bg-black/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-between border border-orange-500/60 shadow-md">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                              <span className="text-amber-300 font-mono text-[10px] uppercase tracking-wider shrink-0">Action:</span>
                              <span className="truncate text-neutral-100">{current.highlightLabel}</span>
                            </div>
                            <div className="flex items-center gap-1 text-orange-400 text-xs shrink-0 font-black pl-1">
                              <span className="hidden sm:inline">Highlight</span>
                              <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
                            </div>
                          </div>

                          {/* Top Badge: Step Number & Tag */}
                          <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <span>Step {current.stepNumber}</span>
                          </div>
                        </div>

                        {/* Card Details Body */}
                        <div className="space-y-2.5 font-mono text-xs">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Step Detail 01</div>
                            <div className="font-bold text-xs text-slate-900 dark:text-white mt-0.5 truncate">
                              {current.mockVisual.line1}
                            </div>
                          </div>

                          <div
                            className={`p-2.5 rounded-xl border ${
                              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Step Detail 02</div>
                            <div className="font-bold text-xs text-slate-800 dark:text-neutral-200 mt-0.5 truncate">
                              {current.mockVisual.line2}
                            </div>
                          </div>

                          <div className={`p-2.5 rounded-xl bg-gradient-to-r ${current.accentColor} text-white flex items-center justify-between shadow-md`}>
                            <span className="text-[10px] font-bold">Status:</span>
                            <span className="text-xs font-black flex items-center gap-1.5 truncate">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                              {current.mockVisual.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
