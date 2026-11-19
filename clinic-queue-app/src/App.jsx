import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  Stethoscope, Clock, MapPin, Users, Heart, Search, Plus,
  ArrowUp, ArrowDown, CheckCircle, XCircle, PauseCircle,
  PlayCircle, QrCode, LogOut, Bell, UserPlus, Building2, Calendar, Globe,
  Tv, Copy, Check, Power, History, X, Pencil
} from 'lucide-react';

const APP_TIME_ZONE = 'Asia/Kolkata';

const TRANSLATIONS = {
  en: {
    appName: 'ClinicQueue',
    signInHeader: 'Sign in with your phone number',
    signUpHeader: 'Create your account',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your name',
    phoneNumber: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    registerNumber: 'Register Number',
    registerNumberPlaceholder: 'e.g. REG-1042 (if provided by clinic)',
    regNoShort: 'Reg No',
    optionalTag: '(Optional)',
    accountRole: 'Account Role',
    patientRole: 'Patient',
    ownerRole: 'Clinic Owner',
    ownerSecretLabel: 'Admin Passcode',
    ownerSecretPlaceholder: 'Enter admin passcode provided by sales',
    password: 'Password',
    signInBtn: 'Sign In',
    signUpBtn: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    invalidPhoneError: 'Please enter a valid phone number.',
    invalidLoginError: 'Invalid phone number or password.',
    invalidOwnerCodeError: 'Invalid Admin passcode. Reach out to Sales Team.',
    ownerPortal: 'Clinic Owner Portal',
    signOut: 'Sign Out',
    myClinics: 'My Clinics',
    registerNewClinic: 'Register New Clinic',
    addClinicDetails: 'Add Clinic Details',
    clinicName: 'Clinic Name',
    clinicNamePlaceholder: 'e.g. City Care Clinic',
    areaNeighborhood: 'Area / Neighborhood',
    areaPlaceholder: 'e.g. Anna Nagar',
    specialty: 'Specialty',
    specialtyPlaceholder: 'e.g. Dental, Pediatric, General',
    fullAddress: 'Full Address',
    addressPlaceholder: 'Street address',
    totalRooms: 'Consultation Rooms / Doctors',
    avgConsultMins: 'Avg Consult Time (Mins)',
    openTime: 'Opening Time',
    closeTime: 'Closing Time',
    cancel: 'Cancel',
    saveClinic: 'Save Clinic',
    editHoursWaitBtn: 'Edit Hours & Wait',
    editHoursWaitTitle: 'Edit Clinic Hours & Wait Time',
    saveChangesBtn: 'Save Changes',
    savingBtn: 'Saving...',
    noClinicsYet: 'No clinics registered yet',
    noClinicsDesc: 'Click "Register New Clinic" above to start managing your patient queue.',
    bookingPausedBadge: 'Online Booking Paused',
    acceptingPatientsBadge: 'Accepting Patients',
    closedBadge: 'Closed for the Day',
    closeClinicBtn: 'Close Clinic',
    openClinicBtn: 'Open Clinic',
    estWait: 'Est. Wait',
    mins: 'mins',
    deskQr: 'Desk QR',
    visitedLogBtn: 'Visited Patients',
    visitedHistoryTitle: 'Visited Patients History',
    filterToday: 'Today',
    filterLast7Days: 'Last 7 Days',
    filterAllTime: 'All Time',
    filterAllTypes: 'All Types',
    filterOnline: 'Online',
    filterWalkIn: 'Walk-in',
    noVisitedRecords: 'No completed patient visits found for this filter.',
    totalVisits: 'Total Visits',
    totalPatientsCount: 'Total Patients',
    visitedAt: 'Visited',
    resumeOnline: 'Resume Online',
    pauseOnline: 'Pause Online',
    walkInPatientName: 'Walk-in Patient Name',
    patientNamePlaceholder: 'Patient name',
    phoneOptionalLabel: 'Phone (Optional)',
    phoneShortPlaceholder: 'Phone',
    regNoOptionalLabel: 'Register No (Optional)',
    regNoShortPlaceholder: 'Reg No',
    patientsLabel: 'Patients',
    patientSingular: 'Patient',
    patientPlural: 'Patients',
    addWalkInBtn: 'Add Walk-In',
    activePatientQueue: 'Active Patient Queue',
    noPatientsWaiting: 'No patients currently waiting.',
    callIn: 'Call In',
    complete: 'Complete',
    scanQrDesc: 'Scan at front desk to join the live clinic queue',
    close: 'Close',
    hiUser: 'Hi',
    calledInAlert: "IT'S YOUR TURN! Please step into the clinic now.",
    firstInQueueAlert: 'YOU ARE #1 IN QUEUE! Please be ready—the doctor will call you in shortly.',
    nowConsulting: 'Now Consulting',
    yourActiveAppointment: 'Your Active Appointment',
    queuePosition: 'Queue Position',
    leaveQueue: 'Leave Queue',
    searchPlaceholder: 'Search clinics by name or specialty...',
    favorites: 'Favorites',
    allAreas: 'All',
    hours: 'Hours',
    inQueue: 'In Queue',
    onlineQueuePausedBtn: 'Online Queue Temporarily Paused',
    closedClinicBtn: 'Clinic Closed for Today',
    alreadyInQueueBtn: 'Already in Queue',
    joinQueueBtn: 'Join Queue',
    selectPatientsDesc: 'Select how many patients are visiting for consultation',
    numberOfPatients: 'Number of Patients',
    confirmBooking: 'Confirm Booking'
  },
  ta: {
    appName: 'ClinicQueue',
    signInHeader: 'உங்கள் தொலைபேசி எண் மூலம் உள்நுழையவும்',
    signUpHeader: 'புதிய கணக்கை உருவாக்கவும்',
    fullName: 'முழுப் பெயர்',
    fullNamePlaceholder: 'உங்கள் பெயரை உள்ளிடவும்',
    phoneNumber: 'தொலைபேசி எண்',
    phonePlaceholder: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
    registerNumber: 'பதிவு எண்',
    registerNumberPlaceholder: 'எ.கா. REG-1042 (மருத்துவமனை வழங்கியிருந்தால்)',
    regNoShort: 'Reg No',
    optionalTag: '(விருப்பத்திற்குரியது)',
    accountRole: 'கணக்கு வகை',
    patientRole: 'பார்வையாளர்கள்',
    ownerRole: 'மருத்துவமனை உரிமையாளர்',
    ownerSecretLabel: 'நிர்வாகி கடவுச்சொல்',
    ownerSecretPlaceholder: 'விற்பனை குழு வழங்கிய நிர்வாகி கடவுச்சொல்லை உள்ளிடவும்',
    password: 'கடவுச்சொல்',
    signInBtn: 'உள்நுழைக',
    signUpBtn: 'பதிவு செய்க',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    invalidPhoneError: 'சரியான தொலைபேசி எண்ணை உள்ளிடவும்.',
    invalidLoginError: 'தவறான தொலைபேசி எண் அல்லது கடவுச்சொல்.',
    invalidOwnerCodeError: 'தவறான நிர்வாகி கடவுச்சொல். விற்பனை குழுவைத் தொடர்பு கொள்ளவும்.',
    ownerPortal: 'மருத்துவமனை நிர்வாகப் பக்கம்',
    signOut: 'வெளியேறு',
    myClinics: 'எனது மருத்துவமனைகள்',
    registerNewClinic: 'புதிய மருத்துவமனையைப் பதிவு செய்க',
    addClinicDetails: 'மருத்துவமனை விவரங்களைச் சேர்க்கவும்',
    clinicName: 'மருத்துவமனை பெயர்',
    clinicNamePlaceholder: 'எ.கா. சிட்டி கேர் கிளினிக்',
    areaNeighborhood: 'பகுதி / இடம்',
    areaPlaceholder: 'எ.கா. அண்ணா நகர்',
    specialty: 'சிறப்புப் பிரிவு',
    specialtyPlaceholder: 'எ.கா. பல், குழந்தைகள், பொது மருத்துவம்',
    fullAddress: 'முழு முகவரி',
    addressPlaceholder: 'தெரு முகவரி',
    totalRooms: 'ஆலோசனை அறைகள் / மருத்துவர்கள்',
    avgConsultMins: 'சராசரி ஆலோசனை நேரம் (நிமிடங்கள்)',
    openTime: 'திறக்கும் நேரம்',
    closeTime: 'மூடும் நேரம்',
    cancel: 'ரத்து செய்',
    saveClinic: 'மருத்துவமனையைச் சேமி',
    editHoursWaitBtn: 'நேரம் & காத்திருப்பு மாற்று',
    editHoursWaitTitle: 'மருத்துவமனை நேரம் & காத்திருப்பு நேரத்தை மாற்று',
    saveChangesBtn: 'மாற்றங்களைச் சேமி',
    savingBtn: 'சேமிக்கிறது...',
    noClinicsYet: 'மருத்துவமனைகள் எதுவும் பதிவு செய்யப்படவில்லை',
    noClinicsDesc: 'பார்வையாளர்கள் வரிசையை நிர்வகிக்க மேலே உள்ள "புதிய மருத்துவமனையைப் பதிவு செய்க" என்பதைக் கிளிக் செய்யவும்.',
    bookingPausedBadge: 'ஆன்லைன் முன்பதிவு நிறுத்தப்பட்டுள்ளது',
    acceptingPatientsBadge: 'பார்வையாளர்கள் ஏற்கப்படுகிறார்கள்',
    closedBadge: 'இன்று மருத்துவமனை மூடப்பட்டுள்ளது',
    closeClinicBtn: 'மருத்துவமனையை மூடு',
    openClinicBtn: 'மருத்துவமனையைத் திற',
    estWait: 'காத்திருப்பு நேரம்',
    mins: 'நிமிடங்கள்',
    deskQr: 'வரவேற்பு QR',
    visitedLogBtn: 'வந்து சென்றவர்கள்',
    visitedHistoryTitle: 'மருத்துவமனைக்கு வந்து சென்றவர்கள் பட்டியல்',
    filterToday: 'இன்று',
    filterLast7Days: 'கடந்த 7 நாட்கள்',
    filterAllTime: 'அனைத்து நாட்கள்',
    filterAllTypes: 'அனைத்து வகை',
    filterOnline: 'ஆன்லைன்',
    filterWalkIn: 'நேரடி (Walk-in)',
    noVisitedRecords: 'தேர்ந்தெடுத்த நாட்களில் ஆலோசனை முடித்தவர்கள் யாரும் இல்லை.',
    totalVisits: 'மொத்த பதிவுகள்',
    totalPatientsCount: 'மொத்த நோயாளிகள்',
    visitedAt: 'நேரம்',
    resumeOnline: 'ஆன்லைன் பதிவைத் தொடங்கு',
    pauseOnline: 'ஆன்லைன் பதிவை நிறுத்து',
    walkInPatientName: 'நேரடி பார்வையாளர்கள் பெயர்',
    patientNamePlaceholder: 'பார்வையாளர்கள் பெயர்',
    phoneOptionalLabel: 'தொலைபேசி (விருப்பம்)',
    phoneShortPlaceholder: 'தொலைபேசி',
    regNoOptionalLabel: 'பதிவு எண் (விருப்பம்)',
    regNoShortPlaceholder: 'Reg No',
    patientsLabel: 'பார்வையாளர்கள்',
    patientSingular: 'பார்வையாளர்',
    patientPlural: 'பார்வையாளர்கள்',
    addWalkInBtn: 'நேரடி பார்வையாளர்களைச் சேர்',
    activePatientQueue: 'தற்போதைய பார்வையாளர்கள் வரிசை',
    noPatientsWaiting: 'தற்போது பார்வையாளர்கள் யாரும் காத்திருக்கவில்லை.',
    callIn: 'உள்ளே அழைக்கவும்',
    complete: 'முடிந்தது',
    scanQrDesc: 'நேரடி வரிசையில் இணைய வரவேற்பறையில் ஸ்கேன் செய்யவும்',
    close: 'மூடு',
    hiUser: 'வணக்கம்',
    calledInAlert: 'உங்கள் முறை வந்துவிட்டது! தயவுசெய்து இப்போது உள்ளே செல்லவும்.',
    firstInQueueAlert: 'நீங்கள் வரிசையில் #1 இடத்தில் உள்ளீர்கள்! தயாராக இருங்கள்—மருத்துவர் உங்களை விரைவில் அழைப்பார்.',
    nowConsulting: 'ஆலோசனை நடைபெறுகிறது',
    yourActiveAppointment: 'உங்கள் தற்போதைய முன்பதிவு',
    queuePosition: 'வரிசையில் இடம்',
    leaveQueue: 'வரிசையை விட்டு வெளியேறு',
    searchPlaceholder: 'மருத்துவமனை பெயர் அல்லது பிரிவு மூலம் தேடவும்...',
    favorites: 'பிடித்தவை',
    allAreas: 'அனைத்தும்',
    hours: 'நேரம்',
    inQueue: 'வரிசையில்',
    onlineQueuePausedBtn: 'ஆன்லைன் வரிசை தற்காலிகமாக நிறுத்தப்பட்டுள்ளது',
    closedClinicBtn: 'இன்று மருத்துவமனை மூடப்பட்டுள்ளது',
    alreadyInQueueBtn: 'ஏற்கனவே வரிசையில் உள்ளீர்கள்',
    joinQueueBtn: 'வரிசையில் இணையவும்',
    selectPatientsDesc: 'ஆலோசனைக்கு வரும் பார்வையாளர்களின் எண்ணிக்கையைத் தேர்ந்தெடுக்கவும்',
    numberOfPatients: 'பார்வையாளர்களின் எண்ணிக்கை',
    confirmBooking: 'முன்பதிவை உறுதி செய்'
  }
};

function formatTime12Hour(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return timeStr || '';
  const [rawHours, rawMinutes] = timeStr.split(':');
  const hours = parseInt(rawHours, 10);
  if (Number.isNaN(hours)) return timeStr;

  const minutes = rawMinutes ? rawMinutes.slice(0, 2) : '00';
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${hour12}:${minutes} ${period}`;
}

function getIstDateString(dateObj = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);
}

function getStartOfIstDayIso(daysAgo = 0) {
  const baseDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  const istDateStr = getIstDateString(baseDate);
  return new Date(`${istDateStr}T00:00:00+05:30`).toISOString();
}

function formatIstDateTime(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-IN', {
    timeZone: APP_TIME_ZONE,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function normalizeDigits(val) {
  return String(val || '').replace(/\D/g, '');
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('clinicqueue_lang') || 'en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Privacy TV Connect State
  const [tvClinicId, setTvClinicId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tv') || null;
  });
  const [copiedTvLink, setCopiedTvLink] = useState(false);

  // Auth State
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [role, setRole] = useState('patient');
  const [ownerCode, setOwnerCode] = useState('');
  const [authError, setAuthError] = useState('');

  // App Data
  const [clinics, setClinics] = useState([]);
  const [queue, setQueue] = useState([]);
  const [patientRegMap, setPatientRegMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Patient Booking State
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [slotCount, setSlotCount] = useState(1);

  // Owner Management State
  const [showCreateClinic, setShowCreateClinic] = useState(false);
  const [clinicForm, setClinicForm] = useState({
    name: '', area: '', address: '', specialty: 'General Clinic',
    total_rooms: 1, avg_consult_minutes: 15, open_time: '09:00', close_time: '20:00'
  });
  const [editingClinicSettings, setEditingClinicSettings] = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    open_time: '09:00',
    close_time: '20:00',
    avg_consult_minutes: 15,
    total_rooms: 1
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInRegNo, setWalkInRegNo] = useState('');
  const [walkInSlots, setWalkInSlots] = useState(1);
  const [showQrModal, setShowQrModal] = useState(null);

  // Visited Patients History State
  const [historyClinic, setHistoryClinic] = useState(null);
  const [visitedPatients, setVisitedPatients] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyDateRange, setHistoryDateRange] = useState('today'); // 'today' | '7days' | 'all'
  const [historyTypeFilter, setHistoryTypeFilter] = useState('all'); // 'all' | 'online' | 'walk-in'

  function toggleLanguage(selectedLang) {
    setLang(selectedLang);
    localStorage.setItem('clinicqueue_lang', selectedLang);
  }

  function LanguageSwitcher() {
    return (
      <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
        <Globe className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
        <button
          type="button"
          onClick={() => toggleLanguage('en')}
          className={`px-2 py-1 text-xs font-semibold rounded-md transition ${
            lang === 'en'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => toggleLanguage('ta')}
          className={`px-2 py-1 text-xs font-semibold rounded-md transition ${
            lang === 'ta'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          தமிழ்
        </button>
      </div>
    );
  }

  function resolveRegNumber(item) {
    if (item?.register_number && String(item.register_number).trim()) {
      return String(item.register_number).trim();
    }
    if (item?.patient_id && patientRegMap[`id:${item.patient_id}`]) {
      return patientRegMap[`id:${item.patient_id}`];
    }
    const phoneDigits = normalizeDigits(item?.patient_phone);
    if (phoneDigits && patientRegMap[`phone:${phoneDigits}`]) {
      return patientRegMap[`phone:${phoneDigits}`];
    }
    return '';
  }

  async function hydratePatientRegNumbers(items) {
    const ids = [...new Set((items || []).map(i => i.patient_id).filter(Boolean))];
    const phones = [
      ...new Set((items || []).map(i => normalizeDigits(i.patient_phone)).filter(Boolean))
    ];

    if (ids.length === 0 && phones.length === 0) return;

    const nextMap = {};

    if (ids.length > 0) {
      const { data: byId } = await supabase
        .from('profiles')
        .select('id, phone, register_number')
        .in('id', ids);

      (byId || []).forEach(p => {
        if (p.register_number && String(p.register_number).trim()) {
          const cleanReg = String(p.register_number).trim();
          nextMap[`id:${p.id}`] = cleanReg;
          const pDigits = normalizeDigits(p.phone);
          if (pDigits) nextMap[`phone:${pDigits}`] = cleanReg;
        }
      });
    }

    if (phones.length > 0) {
      const { data: allProfiles } = await supabase
        .from('profiles')
        .select('id, phone, register_number');

      (allProfiles || []).forEach(p => {
        if (p.register_number && String(p.register_number).trim()) {
          const cleanReg = String(p.register_number).trim();
          const pDigits = normalizeDigits(p.phone);
          if (pDigits && phones.includes(pDigits)) {
            nextMap[`phone:${pDigits}`] = cleanReg;
            if (p.id) nextMap[`id:${p.id}`] = cleanReg;
          }
        }
      });
    }

    if (Object.keys(nextMap).length > 0) {
      setPatientRegMap(prev => ({ ...prev, ...nextMap }));
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session || tvClinicId) {
      fetchClinics();
      fetchQueue();

      const channel = supabase
        .channel('clinic-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'clinics' }, fetchClinics)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, () => {
          fetchQueue();
          if (historyClinic) {
            fetchVisitedHistory(historyClinic.id, historyDateRange);
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [session, tvClinicId]);

  useEffect(() => {
    if (historyClinic) {
      fetchVisitedHistory(historyClinic.id, historyDateRange);
    }
  }, [historyClinic, historyDateRange]);

  async function fetchVisitedHistory(clinicId, dateRange) {
    setLoadingHistory(true);
    let query = supabase
      .from('queue')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    if (dateRange === 'today') {
      query = query.gte('created_at', getStartOfIstDayIso(0));
    } else if (dateRange === '7days') {
      query = query.gte('created_at', getStartOfIstDayIso(7));
    }

    const { data } = await query.limit(200);
    const records = data || [];
    setVisitedPatients(records);
    await hydratePatientRegNumbers(records);
    setLoadingHistory(false);
  }

  async function getNextTokenNumber(clinicId) {
    const { data } = await supabase
      .from('queue')
      .select('token_number')
      .eq('clinic_id', clinicId)
      .order('token_number', { ascending: false })
      .limit(1);

    if (data && data.length > 0 && data[0].token_number) {
      return data[0].token_number + 1;
    }
    return 1;
  }

  function openTvView(clinicId) {
    setTvClinicId(clinicId);
    const url = new URL(window.location.href);
    url.searchParams.set('tv', clinicId);
    window.history.pushState({}, '', url);
  }

  function closeTvView() {
    setTvClinicId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('tv');
    window.history.pushState({}, '', url);
  }

  function copyTvShareLink(clinicId) {
    const shareUrl = window.location.origin + '/?tv=' + clinicId;
    navigator.clipboard.writeText(shareUrl);
    setCopiedTvLink(true);
    setTimeout(() => setCopiedTvLink(false), 2000);
  }

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
    setLoading(false);
  }

  async function fetchClinics() {
    const { data } = await supabase.from('clinics').select('*').order('created_at', { ascending: true });
    if (data) setClinics(data);
  }

  async function fetchQueue() {
    const { data } = await supabase
      .from('queue')
      .select('*')
      .in('status', ['waiting', 'in-consult'])
      .order('position', { ascending: true });
    if (data) {
      setQueue(data);
      hydratePatientRegNumbers(data);
    }
  }

  function formatPhoneToAuthEmail(rawPhone) {
    const digitsOnly = rawPhone.replace(/\D/g, '');
    return `${digitsOnly}@clinicqueue.app`;
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError('');

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 7) {
      setAuthError(t.invalidPhoneError);
      return;
    }

    if (isSignUp && role === 'owner') {
      const validSecretCode = import.meta.env.VITE_OWNER_SECRET || 'CLINIC2026';
      if (ownerCode !== validSecretCode) {
        setAuthError(t.invalidOwnerCodeError);
        return;
      }
    }

    const authEmail = formatPhoneToAuthEmail(cleanDigits);
    const cleanRegNo = role === 'patient' ? registerNumber.trim() : '';

    if (isSignUp) {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: authEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone.trim(),
            register_number: cleanRegNo || null,
            role
          }
        }
      });
      if (error) {
        setAuthError(error.message);
      } else if (signUpData?.user?.id && cleanRegNo) {
        await supabase
          .from('profiles')
          .update({ register_number: cleanRegNo })
          .eq('id', signUpData.user.id);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password
      });
      if (error) setAuthError(t.invalidLoginError);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  async function toggleFavorite(clinicId) {
    if (!profile) return;
    const currentFavs = profile.favorite_clinics || [];
    const updatedFavs = currentFavs.includes(clinicId)
      ? currentFavs.filter(id => id !== clinicId)
      : [...currentFavs, clinicId];

    setProfile({ ...profile, favorite_clinics: updatedFavs });
    await supabase.from('profiles').update({ favorite_clinics: updatedFavs }).eq('id', profile.id);
  }

  async function handleJoinQueue(clinic) {
    const clinicQueue = queue.filter(q => q.clinic_id === clinic.id);
    const nextPosition = clinicQueue.length > 0 ? Math.max(...clinicQueue.map(q => q.position)) + 1 : 1;
    const nextToken = await getNextTokenNumber(clinic.id);
    const patientRegNo = profile?.register_number ? String(profile.register_number).trim() : null;

    const basePayload = {
      clinic_id: clinic.id,
      patient_id: profile.id,
      patient_name: profile.full_name,
      patient_phone: profile.phone,
      room_count: slotCount,
      booking_type: 'online',
      status: 'waiting',
      position: nextPosition,
      token_number: nextToken
    };

    let { error } = await supabase
      .from('queue')
      .insert([{ ...basePayload, ...(patientRegNo ? { register_number: patientRegNo } : {}) }]);

    if (error && patientRegNo) {
      ({ error } = await supabase.from('queue').insert([basePayload]));
    }

    if (!error) {
      setSelectedClinic(null);
      setSlotCount(1);
      fetchQueue();
    }
  }

  async function handleCancelBooking(entryId) {
    await supabase.from('queue').update({ status: 'cancelled' }).eq('id', entryId);
    fetchQueue();
  }

  async function handleCreateClinic(e) {
    e.preventDefault();
    const { error } = await supabase.from('clinics').insert([{
      ...clinicForm,
      owner_id: profile.id
    }]);
    if (!error) {
      setShowCreateClinic(false);
      setClinicForm({
        name: '', area: '', address: '', specialty: 'General Clinic',
        total_rooms: 1, avg_consult_minutes: 15, open_time: '09:00', close_time: '20:00'
      });
      fetchClinics();
    }
  }

  function openEditSettingsModal(clinic) {
    setEditingClinicSettings(clinic);
    setSettingsForm({
      open_time: (clinic.open_time || '09:00').slice(0, 5),
      close_time: (clinic.close_time || '20:00').slice(0, 5),
      avg_consult_minutes: clinic.avg_consult_minutes || 15,
      total_rooms: clinic.total_rooms || 1
    });
  }

  async function handleSaveClinicSettings(e) {
    e.preventDefault();
    if (!editingClinicSettings) return;

    setSavingSettings(true);
    const { error } = await supabase
      .from('clinics')
      .update({
        open_time: settingsForm.open_time,
        close_time: settingsForm.close_time,
        avg_consult_minutes: Math.max(1, parseInt(settingsForm.avg_consult_minutes, 10) || 15),
        total_rooms: Math.max(1, parseInt(settingsForm.total_rooms, 10) || 1)
      })
      .eq('id', editingClinicSettings.id);

    setSavingSettings(false);
    if (!error) {
      setEditingClinicSettings(null);
      fetchClinics();
    }
  }

  async function togglePauseBooking(clinic) {
    await supabase.from('clinics').update({ is_paused: !clinic.is_paused }).eq('id', clinic.id);
    fetchClinics();
  }

  async function toggleCloseClinic(clinic) {
    const newClosedState = !clinic.is_closed;
    await supabase.from('clinics').update({ is_closed: newClosedState }).eq('id', clinic.id);
    fetchClinics();
  }

  async function handleAddWalkIn(e, clinicId) {
    e.preventDefault();
    if (!walkInName.trim()) return;

    const clinicQueue = queue.filter(q => q.clinic_id === clinicId);
    const nextPosition = clinicQueue.length > 0 ? Math.max(...clinicQueue.map(q => q.position)) + 1 : 1;
    const nextToken = await getNextTokenNumber(clinicId);
    const cleanWalkInRegNo = walkInRegNo.trim() || null;

    const basePayload = {
      clinic_id: clinicId,
      patient_name: walkInName.trim(),
      patient_phone: walkInPhone.trim(),
      room_count: walkInSlots,
      booking_type: 'walk-in',
      status: 'waiting',
      position: nextPosition,
      token_number: nextToken
    };

    let { data: insertedRows, error } = await supabase
      .from('queue')
      .insert([{ ...basePayload, ...(cleanWalkInRegNo ? { register_number: cleanWalkInRegNo } : {}) }])
      .select();

    if (error && cleanWalkInRegNo) {
      ({ data: insertedRows, error } = await supabase
        .from('queue')
        .insert([basePayload])
        .select());
    }

    if (!error) {
      if (cleanWalkInRegNo && insertedRows?.[0]?.id) {
        setPatientRegMap(prev => ({
          ...prev,
          [`id:${insertedRows[0].id}`]: cleanWalkInRegNo
        }));
      }
      setWalkInName('');
      setWalkInPhone('');
      setWalkInRegNo('');
      setWalkInSlots(1);
      fetchQueue();
    }
  }

  async function updateQueueStatus(entryId, newStatus) {
    await supabase.from('queue').update({ status: newStatus }).eq('id', entryId);
    fetchQueue();
    if (newStatus === 'completed' && historyClinic) {
      fetchVisitedHistory(historyClinic.id, historyDateRange);
    }
  }

  async function swapQueuePosition(clinicId, index, direction) {
    const clinicQueue = queue.filter(q => q.clinic_id === clinicId);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= clinicQueue.length) return;

    const currentItem = clinicQueue[index];
    const targetItem = clinicQueue[targetIndex];

    await Promise.all([
      supabase.from('queue').update({ position: targetItem.position }).eq('id', currentItem.id),
      supabase.from('queue').update({ position: currentItem.position }).eq('id', targetItem.id)
    ]);
    fetchQueue();
  }

  function calculateWaitMinutes(clinic, clinicQueue) {
    const totalSlotsWaiting = clinicQueue
      .filter(q => q.status === 'waiting')
      .reduce((acc, item) => acc + item.room_count, 0);
    return Math.round((totalSlotsWaiting * clinic.avg_consult_minutes) / Math.max(1, clinic.total_rooms));
  }

  if (tvClinicId) {
    const tvClinic = clinics.find(c => String(c.id) === String(tvClinicId));
    const clinicQueue = queue.filter(q => String(q.clinic_id) === String(tvClinicId));
    const inConsultTokens = clinicQueue.filter(q => q.status === 'in-consult');
    const waitingTokens = clinicQueue.filter(q => q.status === 'waiting');

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500 p-2.5 rounded-xl text-slate-950">
              <Tv className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                {tvClinic ? tvClinic.name : t.appName}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                {lang === 'ta' ? 'காத்திருப்போர் அறை நேரடி திரை' : 'Waiting Room Live Display'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyTvShareLink(tvClinicId)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              {copiedTvLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedTvLink ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (lang === 'ta' ? 'டிவி இணைப்பை நகலெடு' : 'Copy TV Link')}
            </button>
            <LanguageSwitcher />
            {session && (
              <button
                onClick={closeTvView}
                className="px-3.5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold"
              >
                {lang === 'ta' ? 'வெளியேறு' : 'Exit TV'}
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/90 border-2 border-emerald-500/60 rounded-3xl p-6 flex flex-col">
            <h2 className="text-xl font-extrabold tracking-wider text-emerald-400 uppercase mb-6">
              {lang === 'ta' ? 'தற்போது உள்ளே இருப்பவர்கள்' : 'NOW CONSULTING'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inConsultTokens.map(item => (
                <div key={item.id} className="bg-emerald-500 text-slate-950 rounded-2xl p-6 text-center shadow-lg">
                  <span className="text-xs font-extrabold uppercase block opacity-80">
                    {lang === 'ta' ? 'டோக்கன்' : 'TOKEN'}
                  </span>
                  <span className="text-6xl font-black block mt-1">
                    #{item.token_number || item.position}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col">
            <h2 className="text-xl font-extrabold tracking-wider text-amber-400 uppercase mb-6">
              {lang === 'ta' ? 'அடுத்து காத்திருப்பவர்கள்' : 'WAITING / NEXT UP'} ({waitingTokens.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {waitingTokens.map((item, idx) => (
                <div
                  key={item.id}
                  className={idx === 0
                    ? 'rounded-2xl p-5 text-center border bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'rounded-2xl p-5 text-center border bg-slate-800/80 border-slate-700 text-white'
                  }
                >
                  <span className="text-[11px] font-bold uppercase opacity-70 block">
                    {lang === 'ta' ? 'டோக்கன்' : 'TOKEN'}
                  </span>
                  <span className="text-4xl font-black block mt-1">
                    #{item.token_number || item.position}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // LOGIN / SIGNUP SCREEN
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-slate-100">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-teal-600 p-2.5 rounded-xl text-white">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{t.appName}</h1>
          </div>

          <h2 className="text-lg font-semibold text-center text-slate-700 mb-6">
            {isSignUp ? t.signUpHeader : t.signInHeader}
          </h2>

          {authError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.fullName}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder={t.fullNamePlaceholder}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.phoneNumber}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder={t.phonePlaceholder}
              />
            </div>

            {isSignUp && role === 'patient' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.registerNumber} <span className="text-slate-400 font-normal">{t.optionalTag}</span>
                </label>
                <input
                  type="text"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder={t.registerNumberPlaceholder}
                />
              </div>
            )}

            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t.accountRole}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('patient')}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                        role === 'patient'
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {t.patientRole}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRole('owner');
                        setRegisterNumber('');
                      }}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                        role === 'owner'
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {t.ownerRole}
                    </button>
                  </div>
                </div>

                {role === 'owner' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.ownerSecretLabel}</label>
                    <input
                      type="password"
                      required
                      value={ownerCode}
                      onChange={(e) => setOwnerCode(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder={t.ownerSecretPlaceholder}
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition shadow-sm"
            >
              {isSignUp ? t.signUpBtn : t.signInBtn}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError('');
                setRegisterNumber('');
              }}
              className="text-teal-600 font-semibold hover:underline"
            >
              {isSignUp ? t.signInBtn : t.signUpBtn}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ==================== OWNER VIEW ====================
  if (profile?.role === 'owner') {
    const myClinics = clinics.filter(c => c.owner_id === profile.id);

    const filteredVisitedPatients = visitedPatients.filter(item => {
      if (historyTypeFilter === 'all') return true;
      return item.booking_type === historyTypeFilter;
    });

    const totalPatientsServed = filteredVisitedPatients.reduce(
      (sum, item) => sum + (item.room_count || 1),
      0
    );

    return (
      <div className="min-h-screen bg-slate-50 pb-12">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="bg-teal-600 p-2 rounded-lg text-white">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{t.appName}</h1>
                <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {t.ownerPortal}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <span className="text-sm text-slate-600 hidden md:inline">{profile.full_name}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 font-medium"
              >
                <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">{t.signOut}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-6 gap-2">
            <h2 className="text-xl font-bold text-slate-800">{t.myClinics}</h2>
            <button
              onClick={() => setShowCreateClinic(!showCreateClinic)}
              className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" /> {t.registerNewClinic}
            </button>
          </div>

          {showCreateClinic && (
            <form onSubmit={handleCreateClinic} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">{t.addClinicDetails}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.clinicName}</label>
                  <input required value={clinicForm.name} onChange={e => setClinicForm({ ...clinicForm, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={t.clinicNamePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.areaNeighborhood}</label>
                  <input required value={clinicForm.area} onChange={e => setClinicForm({ ...clinicForm, area: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={t.areaPlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.specialty}</label>
                  <input value={clinicForm.specialty} onChange={e => setClinicForm({ ...clinicForm, specialty: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={t.specialtyPlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.fullAddress}</label>
                  <input value={clinicForm.address} onChange={e => setClinicForm({ ...clinicForm, address: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={t.addressPlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.totalRooms}</label>
                  <input type="number" min="1" value={clinicForm.total_rooms} onChange={e => setClinicForm({ ...clinicForm, total_rooms: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.avgConsultMins}</label>
                  <input type="number" min="5" value={clinicForm.avg_consult_minutes} onChange={e => setClinicForm({ ...clinicForm, avg_consult_minutes: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.openTime}</label>
                  <input type="time" value={clinicForm.open_time} onChange={e => setClinicForm({ ...clinicForm, open_time: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.closeTime}</label>
                  <input type="time" value={clinicForm.close_time} onChange={e => setClinicForm({ ...clinicForm, close_time: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateClinic(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">{t.cancel}</button>
                <button type="submit" className="px-5 py-2 text-sm bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">{t.saveClinic}</button>
              </div>
            </form>
          )}

          {myClinics.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-800">{t.noClinicsYet}</h3>
              <p className="text-slate-500 text-sm mt-1">{t.noClinicsDesc}</p>
            </div>
          ) : (
            myClinics.map(clinic => {
              const clinicQueue = queue.filter(q => q.clinic_id === clinic.id);
              const waitMins = calculateWaitMinutes(clinic, clinicQueue);
              const isClosedForDay = clinic.is_closed;

              return (
                <div key={clinic.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                  <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-slate-900">{clinic.name}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isClosedForDay
                            ? 'bg-red-100 text-red-800'
                            : clinic.is_paused
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isClosedForDay ? t.closedBadge : clinic.is_paused ? t.bookingPausedBadge : t.acceptingPatientsBadge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {clinic.area}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatTime12Hour(clinic.open_time)} - {formatTime12Hour(clinic.close_time)}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {t.estWait}: {waitMins} {t.mins} ({clinic.avg_consult_minutes || 15}m/slot)</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => openEditSettingsModal(clinic)}
                        className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700"
                      >
                        <Pencil className="w-4 h-4" /> {t.editHoursWaitBtn}
                      </button>

                      <button
                        onClick={() => {
                          setHistoryDateRange('today');
                          setHistoryTypeFilter('all');
                          setHistoryClinic(clinic);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 border border-teal-200 bg-teal-50/70 hover:bg-teal-100/70 rounded-lg text-sm font-medium text-teal-800"
                      >
                        <History className="w-4 h-4" /> {t.visitedLogBtn}
                      </button>

                      <button
                        onClick={() => setShowQrModal(clinic)}
                        className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <QrCode className="w-4 h-4" /> {t.deskQr}
                      </button>

                      <button
                        onClick={() => openTvView(clinic.id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium"
                      >
                        <Tv className="w-4 h-4 text-teal-400" /> {lang === 'ta' ? 'டிவி திரை' : 'TV Screen'}
                      </button>

                      <button
                        onClick={() => togglePauseBooking(clinic)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white ${
                          clinic.is_paused ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                      >
                        {clinic.is_paused ? <><PlayCircle className="w-4 h-4" /> {t.resumeOnline}</> : <><PauseCircle className="w-4 h-4" /> {t.pauseOnline}</>}
                      </button>

                      <button
                        onClick={() => toggleCloseClinic(clinic)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white transition ${
                          isClosedForDay ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        <Power className="w-4 h-4" /> {isClosedForDay ? t.openClinicBtn : t.closeClinicBtn}
                      </button>
                    </div>
                  </div>

                  {/* Add Manual Walk-In Form */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <form onSubmit={(e) => handleAddWalkIn(e, clinic.id)} className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t.walkInPatientName}</label>
                        <input
                          required
                          value={walkInName}
                          onChange={e => setWalkInName(e.target.value)}
                          placeholder={t.patientNamePlaceholder}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div className="w-full sm:w-36">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t.phoneOptionalLabel}</label>
                        <input
                          value={walkInPhone}
                          onChange={e => setWalkInPhone(e.target.value)}
                          placeholder={t.phoneShortPlaceholder}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div className="w-full sm:w-36">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t.regNoOptionalLabel}</label>
                        <input
                          value={walkInRegNo}
                          onChange={e => setWalkInRegNo(e.target.value)}
                          placeholder={t.regNoShortPlaceholder}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div className="w-full sm:w-32">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t.patientsLabel}</label>
                        <select
                          value={walkInSlots}
                          onChange={e => setWalkInSlots(parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                        >
                          {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? t.patientSingular : t.patientPlural}</option>)}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        <UserPlus className="w-4 h-4" /> {t.addWalkInBtn}
                      </button>
                    </form>
                  </div>

                  {/* Live Queue List */}
                  <div className="p-6">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                      {t.activePatientQueue} ({clinicQueue.length})
                    </h4>

                    {clinicQueue.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-6">{t.noPatientsWaiting}</p>
                    ) : (
                      <div className="space-y-3">
                        {clinicQueue.map((item, idx) => {
                          const regNo = resolveRegNumber(item);
                          return (
                            <div
                              key={item.id}
                              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border gap-3 ${
                                item.status === 'in-consult'
                                  ? 'bg-teal-50/60 border-teal-300'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shrink-0">
                                  #{idx + 1}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-extrabold bg-teal-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                                      Token #{item.token_number || item.position}
                                    </span>
                                    <span className="font-bold text-slate-900">{item.patient_name}</span>
                                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${
                                      item.booking_type === 'walk-in'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {item.booking_type}
                                    </span>
                                    {item.room_count > 1 && (
                                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                        {item.room_count} {t.patientsLabel}
                                      </span>
                                    )}
                                  </div>
                                  {(item.patient_phone || regNo) && (
                                    <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                                      {item.patient_phone && <span>{item.patient_phone}</span>}
                                      {regNo && (
                                        <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                          {t.regNoShort}: {regNo}
                                        </span>
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  onClick={() => swapQueuePosition(clinic.id, idx, -1)}
                                  disabled={idx === 0}
                                  className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => swapQueuePosition(clinic.id, idx, 1)}
                                  disabled={idx === clinicQueue.length - 1}
                                  className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>

                                {item.status === 'waiting' ? (
                                  <button
                                    onClick={() => updateQueueStatus(item.id, 'in-consult')}
                                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg"
                                  >
                                    {t.callIn}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateQueueStatus(item.id, 'completed')}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" /> {t.complete}
                                  </button>
                                )}

                                <button
                                  onClick={() => updateQueueStatus(item.id, 'cancelled')}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                                  title="Remove"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </main>

        {/* Edit Clinic Hours & Default Wait Time Modal */}
        {editingClinicSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <form
              onSubmit={handleSaveClinicSettings}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t.editHoursWaitTitle}</h3>
                  <p className="text-xs text-slate-500">{editingClinicSettings.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingClinicSettings(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    {t.openTime}
                  </label>
                  <input
                    type="time"
                    required
                    value={settingsForm.open_time}
                    onChange={(e) => setSettingsForm({ ...settingsForm, open_time: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">{formatTime12Hour(settingsForm.open_time)}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    {t.closeTime}
                  </label>
                  <input
                    type="time"
                    required
                    value={settingsForm.close_time}
                    onChange={(e) => setSettingsForm({ ...settingsForm, close_time: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">{formatTime12Hour(settingsForm.close_time)}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    {t.avgConsultMins}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={settingsForm.avg_consult_minutes}
                    onChange={(e) => setSettingsForm({ ...settingsForm, avg_consult_minutes: parseInt(e.target.value, 10) || 1 })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    {t.totalRooms}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={settingsForm.total_rooms}
                    onChange={(e) => setSettingsForm({ ...settingsForm, total_rooms: parseInt(e.target.value, 10) || 1 })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingClinicSettings(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-5 py-2 text-sm bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  {savingSettings ? t.savingBtn : t.saveChangesBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Visited Patients History Modal */}
        {historyClinic && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t.visitedHistoryTitle}</h3>
                  <p className="text-xs text-slate-500">{historyClinic.name}</p>
                </div>
                <button
                  onClick={() => setHistoryClinic(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Bar */}
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'today', label: t.filterToday },
                    { id: '7days', label: t.filterLast7Days },
                    { id: 'all', label: t.filterAllTime }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setHistoryDateRange(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        historyDateRange === tab.id
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'all', label: t.filterAllTypes },
                    { id: 'online', label: t.filterOnline },
                    { id: 'walk-in', label: t.filterWalkIn }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setHistoryTypeFilter(type.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        historyTypeFilter === type.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Strip */}
              <div className="px-5 py-2.5 bg-teal-50/60 border-b border-teal-100 flex items-center gap-6 text-xs">
                <span className="text-slate-600">
                  {t.totalVisits}: <strong className="text-slate-900">{filteredVisitedPatients.length}</strong>
                </span>
                <span className="text-slate-600">
                  {t.totalPatientsCount}: <strong className="text-teal-700">{totalPatientsServed}</strong>
                </span>
              </div>

              {/* Patient List */}
              <div className="p-5 overflow-y-auto flex-1 space-y-2.5">
                {loadingHistory ? (
                  <div className="py-10 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                  </div>
                ) : filteredVisitedPatients.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-10">{t.noVisitedRecords}</p>
                ) : (
                  filteredVisitedPatients.map(item => {
                    const regNo = resolveRegNumber(item);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              Token #{item.token_number || item.position}
                            </span>
                            <span className="font-bold text-slate-900 text-sm">{item.patient_name}</span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${
                              item.booking_type === 'walk-in'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.booking_type}
                            </span>
                            {item.room_count > 1 && (
                              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                {item.room_count} {t.patientsLabel}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                            {item.patient_phone && <span>{item.patient_phone}</span>}
                            {regNo && (
                              <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {t.regNoShort}: {regNo}
                              </span>
                            )}
                            <span>{formatIstDateTime(item.created_at)}</span>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                          ✓ {t.complete}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setHistoryClinic(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-sm"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {showQrModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{showQrModal.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{t.scanQrDesc}</p>
              <div className="bg-slate-50 p-4 rounded-xl inline-block border border-slate-200 mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin)}`}
                  alt="Clinic Queue QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <button
                onClick={() => setShowQrModal(null)}
                className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-semibold text-sm"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== PATIENT VIEW ====================
  const myActiveBookings = queue.filter(q => q.patient_id === profile?.id);
  const areas = ['All', ...new Set(clinics.map(c => c.area))];
  const favIds = profile?.favorite_clinics || [];

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'All' || clinic.area === selectedArea;
    const matchesFav = !showFavoritesOnly || favIds.includes(clinic.id);
    return matchesSearch && matchesArea && matchesFav;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg text-white">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">{t.appName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <span className="text-sm text-slate-600 hidden md:inline">{t.hiUser}, {profile?.full_name}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 font-medium"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">{t.signOut}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        {myActiveBookings.map(booking => {
          const clinic = clinics.find(c => c.id === booking.clinic_id);
          if (!clinic) return null;
          const clinicQueue = queue.filter(q => q.clinic_id === clinic.id);
          const myIndex = clinicQueue.findIndex(q => q.id === booking.id);
          const isCalledIn = booking.status === 'in-consult';
          const isFirstInWaiting = !isCalledIn && myIndex === 0;

          return (
            <div
              key={booking.id}
              className={`rounded-2xl p-5 border shadow-sm ${
                isCalledIn
                  ? 'bg-emerald-50 border-emerald-400 animate-pulse'
                  : isFirstInWaiting
                  ? 'bg-amber-50 border-amber-400'
                  : 'bg-teal-900 text-white border-teal-800'
              }`}
            >
              {isCalledIn && (
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                  <Bell className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.calledInAlert}</span>
                </div>
              )}
              {isFirstInWaiting && (
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{t.firstInQueueAlert}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className={`text-xs uppercase font-bold tracking-wider ${
                    isCalledIn ? 'text-emerald-700' : isFirstInWaiting ? 'text-amber-700' : 'text-teal-300'
                  }`}>
                    {isCalledIn ? t.nowConsulting : t.yourActiveAppointment}
                    <span className="ml-2 text-xs font-extrabold bg-teal-600 text-white px-2.5 py-0.5 rounded-full">
                      {lang === 'ta' ? 'டோக்கன்' : 'Token'} #{booking.token_number || booking.position}
                    </span>
                  </span>
                  <h3 className={`text-xl font-bold mt-0.5 ${
                    isCalledIn || isFirstInWaiting ? 'text-slate-900' : 'text-white'
                  }`}>
                    {clinic.name}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    isCalledIn || isFirstInWaiting ? 'text-slate-700' : 'text-teal-100'
                  }`}>
                    {t.queuePosition}: <strong>#{myIndex + 1}</strong> • {t.patientsLabel}: <strong>{booking.room_count}</strong>
                  </p>
                </div>
                {!isCalledIn && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold self-start sm:self-center ${
                      isFirstInWaiting
                        ? 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                        : 'bg-teal-800 hover:bg-teal-700 text-white'
                    }`}
                  >
                    {t.leaveQueue}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                showFavoritesOnly
                  ? 'bg-rose-50 text-rose-600 border-rose-300'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-600' : ''}`} /> {t.favorites}
            </button>

            {areas.map(area => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  selectedArea === area
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {area === 'All' ? t.allAreas : area}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClinics.map(clinic => {
            const clinicQueue = queue.filter(q => q.clinic_id === clinic.id);
            const waitMins = calculateWaitMinutes(clinic, clinicQueue);
            const isFav = favIds.includes(clinic.id);
            const alreadyBooked = myActiveBookings.some(b => b.clinic_id === clinic.id);
            const isClosedForDay = clinic.is_closed;

            return (
              <div key={clinic.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                          {clinic.specialty || 'General Clinic'}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isClosedForDay
                            ? 'bg-red-100 text-red-700'
                            : clinic.is_paused
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {isClosedForDay ? t.closedBadge : clinic.is_paused ? t.bookingPausedBadge : t.acceptingPatientsBadge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">{clinic.name}</h3>
                    </div>
                    <button
                      onClick={() => toggleFavorite(clinic.id)}
                      className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> {clinic.area} {clinic.address ? `• ${clinic.address}` : ''}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" /> {t.hours}: {formatTime12Hour(clinic.open_time)} - {formatTime12Hour(clinic.close_time)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-xs text-slate-500 block">{t.inQueue}</span>
                      <span className="text-base font-bold text-slate-900">{clinicQueue.length} {t.patientsLabel}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-xs text-slate-500 block">{t.estWait}</span>
                      <span className="text-base font-bold text-teal-700">~{waitMins} {t.mins}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {clinic.is_paused ? (
                    <button disabled className="w-full py-2.5 bg-amber-100 text-amber-800 rounded-xl text-sm font-semibold cursor-not-allowed">
                      {t.onlineQueuePausedBtn}
                    </button>
                  ) : alreadyBooked ? (
                    <button disabled className="w-full py-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-sm font-semibold">
                      {t.alreadyInQueueBtn}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedClinic(clinic);
                        setSlotCount(1);
                      }}
                      className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                    >
                      {t.joinQueueBtn}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selectedClinic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900">{selectedClinic.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{t.selectPatientsDesc}</p>

            <div className="my-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.numberOfPatients}</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSlotCount(num)}
                    className={`py-2.5 rounded-xl font-bold border text-sm transition ${
                      slotCount === num
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedClinic(null)}
                className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => handleJoinQueue(selectedClinic)}
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm"
              >
                {t.confirmBooking}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}