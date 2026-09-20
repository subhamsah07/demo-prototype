import * as React from 'react';
import { X, Mail, PhoneCall, MessageSquareText, Star, CheckCircle2, Copy, Check, LifeBuoy } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'contact' | 'feedback';
  darkMode?: boolean;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'contact',
  darkMode = false,
}) => {
  const [activeTab, setActiveTab] = React.useState<'contact' | 'feedback'>(defaultTab);
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  
  // Feedback Form State
  const [feedbackName, setFeedbackName] = React.useState('');
  const [feedbackPhone, setFeedbackPhone] = React.useState('');
  const [feedbackMandi, setFeedbackMandi] = React.useState('');
  const [feedbackRating, setFeedbackRating] = React.useState<number>(5);
  const [feedbackCategory, setFeedbackCategory] = React.useState('queue_speed');
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('smartprocurementsystem@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackName('');
      setFeedbackPhone('');
      setFeedbackMandi('');
      setFeedbackMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
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
          aria-label="Close Help Dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header & Navigation Tabs */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-emerald-700 text-white shadow-md">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">SmartProcure Help & Support</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assistance & Direct Feedback for Annadatas & Mandi Visitors
            </p>
          </div>
        </div>

        {/* Tab Switcher: Contact Us | Feedback */}
        <div
          className={`grid grid-cols-2 p-1 rounded-xl mb-5 border ${
            darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'contact'
                ? darkMode
                  ? 'bg-emerald-900/70 text-emerald-300 shadow-xs'
                  : 'bg-white text-emerald-900 shadow-xs'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('feedback')}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'feedback'
                ? darkMode
                  ? 'bg-emerald-900/70 text-emerald-300 shadow-xs'
                  : 'bg-white text-emerald-900 shadow-xs'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareText className="h-4 w-4" />
            <span>Farmer Feedback</span>
          </button>
        </div>

        {/* TAB 1: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            {/* Primary Email Card */}
            <div
              className={`p-4 rounded-xl border transition-colors ${
                darkMode
                  ? 'bg-neutral-950 border-emerald-900/50'
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                Official Support Email
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white break-all">
                  smartprocurementsystem@gmail.com
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      darkMode
                        ? 'bg-neutral-900 border-neutral-700 text-slate-200 hover:bg-neutral-800'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:smartprocurementsystem@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Toll-Free Help Desk */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shrink-0">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  National Kisan Procurement Toll-Free
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  1800-180-1551 (Toll-Free) • 0172-2704123
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Active 24x7 during active Rabi & Kharif procurement harvest windows.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: FARMER FEEDBACK FORM (UI ONLY) */}
        {activeTab === 'feedback' && (
          <div>
            {feedbackSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                  Dhanyawaad, Annadata! Feedback Recorded
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                  Your suggestions help us eliminate wait times and make mandi operations smoother for every farmer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
                {/* Farmer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                      Farmer Name / नाम
                    </label>
                    <input
                      type="text"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="e.g. Harpreet Singh"
                      className={`w-full px-3 py-1.5 text-xs font-medium rounded-lg border outline-none transition-colors ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                      Mobile No. / मोबाइल
                    </label>
                    <input
                      type="tel"
                      value={feedbackPhone}
                      onChange={(e) => setFeedbackPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3 py-1.5 text-xs font-medium rounded-lg border outline-none transition-colors ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Mandi Visited & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                      Mandi Visited
                    </label>
                    <input
                      type="text"
                      value={feedbackMandi}
                      onChange={(e) => setFeedbackMandi(e.target.value)}
                      placeholder="e.g. Khanna Grain Mandi"
                      className={`w-full px-3 py-1.5 text-xs font-medium rounded-lg border outline-none transition-colors ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                      Feedback Subject
                    </label>
                    <select
                      value={feedbackCategory}
                      onChange={(e) => setFeedbackCategory(e.target.value)}
                      className={`w-full px-3 py-1.5 text-xs font-medium rounded-lg border outline-none transition-colors ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      }`}
                    >
                      <option value="queue_speed">Queue Speed & Slot Timing</option>
                      <option value="weighbridge">Weighbridge Accuracy</option>
                      <option value="app_ease">Mobile App Ease of Use</option>
                      <option value="dbt_payment">Direct Bank Payout (DBT)</option>
                      <option value="general">Other Mandi Experience</option>
                    </select>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                    Experience Rating / अनुभव रेटिंग
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-hidden"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= feedbackRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 dark:text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">
                      {feedbackRating === 5 ? 'Excellent (शानदार)' : feedbackRating >= 4 ? 'Very Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-700 dark:text-slate-300">
                    Your Remarks / सुझाव व टिप्पणी
                  </label>
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    rows={3}
                    placeholder="Tell us about gate wait time, weighbridge staff, or any problem encountered..."
                    className={`w-full p-2.5 text-xs font-medium rounded-lg border outline-none transition-colors ${
                      darkMode
                        ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                    }`}
                    required
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-all shadow-sm"
                  >
                    Submit Farmer Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
