import * as React from 'react';
import { X, Shield, Lock, User, Building, CheckCircle2, AlertCircle } from 'lucide-react';

interface OfficialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const OfficialLoginModal: React.FC<OfficialLoginModalProps> = ({
  isOpen,
  onClose,
  darkMode = false,
}) => {
  const [role, setRole] = React.useState('mandi_official');
  const [officialId, setOfficialId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [centreCode, setCentreCode] = React.useState('MN-042');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all ${
          darkMode
            ? 'bg-black border-emerald-900/60 text-slate-100 shadow-emerald-950/40'
            : 'bg-white border-emerald-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg border transition-colors ${
            darkMode
              ? 'border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-900'
              : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close Official Login"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-emerald-700 text-white shadow-md">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold tracking-tight">Official Mandi Portal</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                UI Preview
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Department of Food, Civil Supplies & Consumer Affairs
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>
            <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
              Official Session Initialized (Demo)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
              Frontend UI preview verified. Backend authentication credentials will be wired in the official production phase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Notice */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                darkMode
                  ? 'bg-neutral-950 border-emerald-900/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                Authorized access only for Mandi Secretaries, Weighbridge Inspectors, and Quality Assurance Officials.
              </span>
            </div>

            {/* Official Designation Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-slate-300">
                Official Designation / पद
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-lg border outline-none transition-colors ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                }`}
              >
                <option value="mandi_official">Mandi Gate Supervisor / मंडी पर्यवेक्षक</option>
                <option value="weighbridge_operator">Weighbridge Operator / तौल ऑपरेटर</option>
                <option value="quality_inspector">Quality & Moisture Analyst / गुणवत्ता निरीक्षक</option>
                <option value="depot_manager">District Procurement Officer / जिला खरीद अधिकारी</option>
              </select>
            </div>

            {/* Mandi Centre Code */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-slate-300">
                Mandi Centre Code
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={centreCode}
                  onChange={(e) => setCentreCode(e.target.value)}
                  placeholder="e.g. MN-042 (Khanna Grain Mandi)"
                  className={`w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg border outline-none transition-colors ${
                    darkMode
                      ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Government Employee ID */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-slate-300">
                Official Gov ID / Employee No.
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={officialId}
                  onChange={(e) => setOfficialId(e.target.value)}
                  placeholder="e.g. GOV-PB-8841"
                  className={`w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg border outline-none transition-colors ${
                    darkMode
                      ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Security Access PIN */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-slate-300">
                Security Passcode / PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg border outline-none transition-colors ${
                    darkMode
                      ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span>Verify & Sign In as Official</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
