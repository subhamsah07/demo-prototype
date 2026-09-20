import * as React from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ShieldCheck,
  TrendingUp,
  MapPin,
  RefreshCw,
  Info,
  Layers,
  Scale,
  Calendar,
  Leaf,
  ArrowRight,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { ProcurementBooking } from '../../types';
import {
  queueService,
  FarmerLiveTelemetry,
  QueueProcessStep,
} from '../../services/queueService';

interface LiveQueueIntelligenceCardProps {
  booking: ProcurementBooking;
  onBookingUpdated?: () => void;
}

export const LiveQueueIntelligenceCard: React.FC<LiveQueueIntelligenceCardProps> = ({
  booking,
  onBookingUpdated,
}) => {
  const [telemetry, setTelemetry] = React.useState<FarmerLiveTelemetry | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

  const centreId = booking.centreId;
  const token = (booking.token || '').trim().toUpperCase();

  // Fresh data refresh handler
  const refreshQueueData = React.useCallback(async () => {
    try {
      const tel = await queueService.getFarmerLiveTelemetry(booking);
      setTelemetry(tel);
    } catch (err) {
      console.warn('Farmer telemetry refresh notice:', err);
    } finally {
      setIsLoading(false);
    }
  }, [booking]);

  // Live real-time subscription (Supabase Realtime + local store)
  React.useEffect(() => {
    refreshQueueData();

    const unsubscribe = queueService.subscribeToFarmerLiveTelemetry(booking, (freshTel) => {
      setTelemetry(freshTel);
      if (onBookingUpdated && freshTel.status === 'COMPLETED' && booking.workflowStatus !== 'PROCUREMENT_COMPLETED') {
        onBookingUpdated();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [booking, refreshQueueData, onBookingUpdated]);

  // Elapsed timer when status === 'PROCESSING'
  React.useEffect(() => {
    if (telemetry?.status !== 'PROCESSING') {
      setElapsedSeconds(0);
      return;
    }

    const startTs = telemetry.startedProcessingTime
      ? new Date(telemetry.startedProcessingTime).getTime()
      : Date.now() - (telemetry.elapsedMinutes || 0) * 60000;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((Date.now() - startTs) / 1000));
      setElapsedSeconds(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [telemetry?.status, telemetry?.startedProcessingTime, telemetry?.elapsedMinutes]);

  const status = telemetry?.status || 'BOOKED';

  // Format elapsed time string
  const elapsedDisplay = React.useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  }, [elapsedSeconds]);

  // Derive process flow steps
  const processSteps: QueueProcessStep[] = React.useMemo(() => {
    if (telemetry?.upcomingProcessFlow && telemetry.upcomingProcessFlow.length > 0) {
      return telemetry.upcomingProcessFlow;
    }

    const currentPos = telemetry?.position || 4;
    return [
      {
        position: 1,
        token: 'SP7K3M',
        stageName: 'Electronic Weighbridge Verification',
        status: 'PROCESSING',
        isCurrentUser: token === 'SP7K3M',
        farmerNameHint: 'Active Vehicle',
        crop: `${booking.cropName} (30 Q)`,
        estimatedMinutesAway: 0,
      },
      {
        position: 2,
        token: 'SP7K3N',
        stageName: 'Gate Ingress & Sampling',
        status: 'WAITING',
        isCurrentUser: token === 'SP7K3N',
        farmerNameHint: 'Mandi Ingress',
        crop: 'Wheat (40 Q)',
        estimatedMinutesAway: 15,
      },
      {
        position: 3,
        token: 'SP7K3P',
        stageName: 'Yard Staging & Paperwork',
        status: 'WAITING',
        isCurrentUser: token === 'SP7K3P',
        farmerNameHint: 'Yard Staging',
        crop: 'Wheat (25 Q)',
        estimatedMinutesAway: 28,
      },
      {
        position: currentPos,
        token: token || 'YOUR TOKEN',
        stageName: 'Scheduled Intake Slot (Pre-Gate Telemetry)',
        status: status === 'BOOKED' ? 'SCHEDULED' : 'WAITING',
        isCurrentUser: true,
        farmerNameHint: 'Your Token',
        crop: `${booking.cropName} (${booking.quantityQuintals} Q)`,
        estimatedMinutesAway: telemetry?.estimatedWaitMinutes || 35,
      },
      {
        position: currentPos + 1,
        token: 'TK-9402',
        stageName: 'Subsequent Intake Slot',
        status: 'SCHEDULED',
        isCurrentUser: false,
        farmerNameHint: 'Next Intake',
        crop: 'Paddy (50 Q)',
        estimatedMinutesAway: (telemetry?.estimatedWaitMinutes || 35) + 18,
      },
    ];
  }, [telemetry, token, booking, status]);

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-2xl border-2 border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden transition-all relative">
      {/* Subtle Botanical Leaf Motif Background Watermark */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.035] dark:opacity-[0.055] text-emerald-600 dark:text-emerald-400 select-none z-0">
        <Leaf className="w-64 h-64 rotate-12" />
      </div>

      {/* 1. CAPACITY ARRIVAL WINDOW HEADER */}
      <div className="bg-slate-900 dark:bg-black text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-slate-800 dark:border-neutral-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Leaf className="h-3 w-3 text-emerald-400" />
              Procurement Center
            </span>
            <span className="text-xs text-slate-300 dark:text-neutral-400 font-medium">Slot Arrival Window</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2 tracking-tight">
            <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              {booking.slotStartTime} – {booking.slotEndTime} &bull; {booking.assignedDate || booking.bookingDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 dark:text-neutral-300">
            <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white">{booking.centreName}</span>
          </div>

          <button
            onClick={refreshQueueData}
            title="Refresh Live Status"
            className="p-1.5 rounded-lg bg-slate-800 dark:bg-neutral-900 hover:bg-slate-700 dark:hover:bg-neutral-800 text-slate-300 hover:text-white transition-colors border border-slate-700 dark:border-neutral-700"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT BASED ON REAL QUEUE TELEMETRY STATE */}
      <AnimatePresence mode="wait">
        {/* ============================================================== */}
        {/* STATE: CANCELLED                                               */}
        {/* ============================================================== */}
        {status === 'CANCELLED' ? (
          <motion.div
            key="status-cancelled"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 bg-rose-50/40 dark:bg-rose-950/20 space-y-6 relative z-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100 dark:border-rose-900/60">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <XCircle className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-rose-950 dark:text-rose-200 tracking-tight">
                      Booking Cancelled
                    </span>
                    <Badge variant="danger" size="sm" className="font-bold">
                      Slot Released
                    </Badge>
                  </div>
                  <p className="text-xs text-rose-800 dark:text-rose-400 mt-0.5">
                    This appointment was cancelled and your reserved slot was released. The mandi queue has adjusted.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 tracking-wider block">
                  Token Identifier
                </span>
                <span className="text-xl font-black font-mono text-rose-950 dark:text-white tabular-nums">
                  {telemetry?.token || token}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-rose-200/80 dark:border-rose-900/60">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400 block mb-1">
                  Procurement Centre
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  {telemetry?.centreName || booking.centreName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-rose-200/80 dark:border-rose-900/60">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400 block mb-1">
                  Commodity & Volume
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  {booking.cropName} • {booking.quantityQuintals} Quintals
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-rose-200/80 dark:border-rose-900/60">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400 block mb-1">
                  Queue Impact
                </span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block">
                  Next Farmer Advanced
                </span>
              </div>
            </div>
          </motion.div>
        ) : status === 'COMPLETED' ? (
          <motion.div
            key="status-completed"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-6 relative z-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100 dark:border-emerald-900/60">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-200 tracking-tight">
                      ✓ Procurement Completed
                    </span>
                    <Badge variant="success" size="sm" className="font-bold">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
                    Grain weighment and procurement ledger verification finished.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider block">
                  Token Identifier
                </span>
                <span className="text-xl font-black font-mono text-emerald-950 dark:text-white tabular-nums">
                  {telemetry?.token || token}
                </span>
              </div>
            </div>

            {/* Procurement Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Token
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                  {telemetry?.token || token}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Centre
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {telemetry?.centreName || booking.centreName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Crop Commodity
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {telemetry?.cropName || booking.cropName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Quantity
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                  {telemetry?.quantityQuintals || booking.quantityQuintals} Quintals
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 text-xs text-emerald-900 dark:text-emerald-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>
                  Procurement recorded in Mandi ledger. Official receipts and payments proceed through standard DBT banking channels.
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 shrink-0">
                Updated {telemetry?.lastUpdated || 'just now'}
              </span>
            </div>
          </motion.div>
        ) : status === 'PROCESSING' ? (
          /* ============================================================== */
          /* STATE: PROCESSING                                              */
          /* ============================================================== */
          <motion.div
            key="status-processing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-6 relative z-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100 dark:border-emerald-900/50">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm relative">
                  <Scale className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                      <span>🟢 Processing Now</span>
                    </span>
                    <Badge variant="primary" size="sm" className="font-bold bg-emerald-700 dark:bg-emerald-600 text-white border-none">
                      Weighbridge Active
                    </Badge>
                  </div>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium mt-0.5">
                    Your procurement is currently being processed at the electronic weighbridge.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 tracking-wider block">
                  Elapsed Processing Time
                </span>
                <span className="text-2xl font-black font-mono text-emerald-900 dark:text-emerald-200 block tabular-nums">
                  {elapsedDisplay}
                </span>
              </div>
            </div>

            {/* Mandatory Telemetry Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Token
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                  {telemetry?.token || token}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Centre
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {telemetry?.centreName || booking.centreName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Crop
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {telemetry?.cropName || booking.cropName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Quantity
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                  {telemetry?.quantityQuintals || booking.quantityQuintals} Quintals
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-300 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-neutral-200">
                  Vehicle currently stationed on electronic weighbridge for gross weight sampling.
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-neutral-400">
                  Official automated tare-weight calculation is in progress. Once complete, your receipt will be finalized.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* STATE: WAITING or BOOKED (CHECKED_IN vs PRE-GATE LIVE TELEMETRY) */
          /* ============================================================== */
          <motion.div
            key="status-queue-waiting"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="space-y-0 relative z-10"
          >
            {/* PRE-GATE LIVE TELEMETRY BANNER */}
            {status === 'BOOKED' ? (
              <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 dark:from-amber-950/30 dark:via-neutral-900/30 dark:to-emerald-950/30 border-b border-amber-200 dark:border-amber-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700/50 mt-0.5">
                      <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-amber-950 dark:text-amber-200 font-extrabold text-sm sm:text-base">
                          Pre-Gate Live Telemetry Enabled
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                          Gate Ingress Pending
                        </span>
                      </div>
                      <p className="text-xs text-amber-900/90 dark:text-amber-300/80 leading-relaxed max-w-2xl">
                        You can view your <strong>live procurement position (#{telemetry?.position || 4})</strong> and estimated time before arriving at the mandi gate. Scheduled slot: <strong>{booking.slotStartTime} – {booking.slotEndTime}</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1 bg-white/80 dark:bg-neutral-900/80 px-3.5 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Live Queue Est.
                    </span>
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white tabular-nums">
                      #{telemetry?.position || 4} in Mandi
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* LIVE QUEUE CORE HEADER & METRICS */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider uppercase text-emerald-800 dark:text-emerald-400">
                    <Leaf className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>LIVE QUEUE TELEMETRY</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                      Token: {telemetry?.token || token}
                    </span>
                    {status === 'WAITING' ? (
                      <Badge variant="success" size="sm" className="font-bold gap-1 bg-emerald-600 text-white border-none">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
                        CHECKED_IN &bull; IN QUEUE
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm" className="font-semibold text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40">
                        PRE-GATE LIVE TRACKING
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-neutral-400 flex flex-wrap items-center gap-2">
                  <span>Centre: <strong className="text-slate-800 dark:text-neutral-200">{telemetry?.centreName || booking.centreName}</strong></span>
                  <span>&bull;</span>
                  <span>Updated: <strong className="text-slate-700 dark:text-neutral-300">{telemetry?.lastUpdated || 'just now'}</strong></span>
                </div>
              </div>

              {/* 4 PRIMARY TELEMETRY TILES WITH REFINED PALETTE & PRE-GATE VISIBILITY */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1. POSITION */}
                <div
                  className={`p-4 rounded-xl border-2 transition-all ${
                    telemetry?.position === 1
                      ? 'bg-emerald-500/10 border-emerald-500 dark:border-emerald-500/80 shadow-sm'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
                    Queue Position
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <motion.span
                      key={telemetry?.position ?? 'none'}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums"
                    >
                      #{telemetry?.position || 4}
                    </motion.span>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-neutral-400 font-medium mt-1 block">
                    {telemetry?.position === 1
                      ? 'Next in line for weighbridge'
                      : status === 'WAITING'
                      ? 'Based on gate check-in'
                      : 'Pre-gate live sequence'}
                  </span>
                </div>

                {/* 2. FARMERS AHEAD */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/80 dark:bg-neutral-900/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    Farmers Ahead
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <motion.span
                      key={telemetry?.farmersAhead ?? 'none'}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums"
                    >
                      {telemetry ? telemetry.farmersAhead : 3}
                    </motion.span>
                    <span className="text-xs text-slate-500 dark:text-neutral-400 font-medium">ahead</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium mt-1 block">
                    {telemetry && telemetry.farmersAhead === 0
                      ? 'You are next in line!'
                      : 'Vehicles before intake'}
                  </span>
                </div>

                {/* 3. ESTIMATED WAIT / TIME */}
                <div
                  className={`p-4 rounded-xl border-2 transition-all ${
                    telemetry?.activeDelay?.isActive
                      ? 'bg-amber-500/10 border-amber-400 dark:border-amber-600'
                      : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                    Estimated Wait Time
                  </span>
                  <div className="mt-1">
                    <motion.span
                      key={telemetry?.formattedWaitTime ?? 'none'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight block tabular-nums"
                    >
                      {telemetry?.formattedWaitTime || '35 mins'}
                    </motion.span>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-neutral-400 font-medium mt-1 block">
                    {telemetry?.isBaselineEta
                      ? 'Dynamic rolling estimate'
                      : 'Real-time velocity tracking'}
                  </span>
                </div>

                {/* 4. CENTRE STATUS */}
                <div
                  className={`p-4 rounded-xl border-2 transition-all ${
                    telemetry?.activeDelay?.isActive
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-600'
                      : 'bg-emerald-500/10 border-emerald-400 dark:border-emerald-600'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 block">
                    Centre Status
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {telemetry?.activeDelay?.isActive ? (
                      <span className="text-sm font-black text-amber-900 dark:text-amber-300 tracking-tight flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        DELAY IN YARD
                      </span>
                    ) : (
                      <span className="text-sm font-black text-emerald-900 dark:text-emerald-300 tracking-tight flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        OPERATING NORMALLY
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-neutral-400 font-medium mt-1 block truncate">
                    {telemetry?.activeDelay?.isActive ? 'Weighbridge queue delayed' : 'Intake gates running fast'}
                  </span>
                </div>
              </div>

              {/* ======================================================== */}
              {/* CURRENT & UPCOMING PROCUREMENT PROCESS FLOW PIPELINE    */}
              {/* ======================================================== */}
              <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/40 p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        Live Procurement Queue Process
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-neutral-400">
                        Current intake vehicle and upcoming slot sequence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Weighbridge: #{telemetry?.currentServingPosition || 1} ({telemetry?.currentServingToken || 'SP7K3M'})
                    </span>
                  </div>
                </div>

                {/* Stepper Process Flow Bar */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                  {processSteps.map((step, idx) => {
                    const isProcessing = step.status === 'PROCESSING';
                    const isUser = step.isCurrentUser;
                    const isUpcoming = step.position > (telemetry?.position || 4);

                    return (
                      <div
                        key={step.position}
                        className={`relative p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                          isUser
                            ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 shadow-md ring-2 ring-amber-400/20'
                            : isProcessing
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 shadow-sm'
                            : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800'
                        }`}
                      >
                        {/* Connecting Step Indicator on desktop */}
                        {idx < processSteps.length - 1 && (
                          <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-400 dark:text-neutral-600 pointer-events-none">
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase font-mono ${
                                isUser
                                  ? 'bg-amber-500 text-white'
                                  : isProcessing
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                              }`}
                            >
                              POS #{step.position}
                            </span>

                            {isUser && (
                              <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 tracking-wide flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                YOU
                              </span>
                            )}

                            {isProcessing && !isUser && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 animate-pulse">
                                CURRENT
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-sm font-black font-mono text-slate-900 dark:text-white block tabular-nums">
                              {step.token}
                            </span>
                            <span className="text-[11px] font-medium text-slate-600 dark:text-neutral-400 block leading-tight truncate">
                              {step.stageName}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 dark:text-neutral-400 truncate max-w-[90px]">
                            {step.crop}
                          </span>
                          <span className={`font-semibold tabular-nums ${isProcessing ? 'text-emerald-700 dark:text-emerald-400' : isUser ? 'text-amber-800 dark:text-amber-300' : 'text-slate-600 dark:text-neutral-400'}`}>
                            {isProcessing ? 'Now' : `~${step.estimatedMinutesAway}m`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DELAY NOTIFICATION IF DELAY RECORDED BY ADMIN */}
              {telemetry?.activeDelay?.isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-700 text-amber-950 dark:text-amber-200 flex items-start gap-3 shadow-xs"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-amber-950 dark:text-amber-200">
                      ⚠️ Mandi experiencing yard delays
                    </h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                      Estimated waiting time has been updated dynamically. Delays may be due to moisture calibration or rail loading.
                    </p>
                    {telemetry.activeDelay.notes && (
                      <p className="text-xs text-amber-900 dark:text-amber-200 font-semibold mt-1">
                        Notice: {telemetry.activeDelay.notes}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* VELOCITY / ETA TRANSPARENCY BAR */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-neutral-300">
                  <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>
                    Throughput Basis: <strong className="text-slate-900 dark:text-white">{telemetry?.etaLabel || 'Active Weighbridge Velocity'}</strong>
                  </span>
                </div>

                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Pre-gate live queue updating dynamically from Mandi server
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
