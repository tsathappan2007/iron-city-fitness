import { useState, useEffect } from 'react'
import {
  Dumbbell,
  Clock,
  Users,
  MapPin,
  Check,
  Flame,
  Trophy,
  CheckCircle,
  Search,
  Calculator,
  ArrowRight,
  X,
  Plus,
  Minus,
  Mail,
  Phone
} from 'lucide-react'
import { GYM_INFO, OFFERS, MEMBERSHIPS, TRAINERS, FACILITY_ZONES, TIMETABLE } from './data/gymData'
import type { GymClass } from './data/gymData'

function App() {
  // State for active sections/filters
  const [selectedDay, setSelectedDay] = useState<string>('Monday')
  const [selectedShift, setSelectedShift] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedZone, setSelectedZone] = useState<string>('zone-strength')
  const [activeHeroCard, setActiveHeroCard] = useState<number>(0)
  const [activeNav, setActiveNav] = useState<string>('home')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  
  // Simulated countdown timer for the summer shred offer
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 35,
    seconds: 18
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        } else {
          clearInterval(interval)
          return prev
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Class booking simulator state
  const [classes, setClasses] = useState<GymClass[]>(TIMETABLE)
  const [bookedClasses, setBookedClasses] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleBookClass = (classId: string, className: string) => {
    if (bookedClasses.includes(classId)) {
      // Unbook
      setClasses(prev => prev.map(c => c.id === classId ? { ...c, spotsLeft: c.spotsLeft + 1 } : c))
      setBookedClasses(prev => prev.filter(id => id !== classId))
      showToast(`Cancelled booking for ${className}`)
    } else {
      // Book
      const targetClass = classes.find(c => c.id === classId)
      if (targetClass && targetClass.spotsLeft > 0) {
        setClasses(prev => prev.map(c => c.id === classId ? { ...c, spotsLeft: c.spotsLeft - 1 } : c))
        setBookedClasses(prev => [...prev, classId])
        showToast(`Successfully booked a spot in ${className}!`)
      } else {
        showToast(`Sorry, ${className} is fully booked!`)
      }
    }
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Cost Calculator State
  const [calcTier, setCalcTier] = useState<string>('iron-core')
  const [calcBilling, setCalcBilling] = useState<'monthly' | 'annual'>('monthly')
  const [calcPT, setCalcPT] = useState<number>(2) // 2 sessions/mo default
  const [calcNutrition, setCalcNutrition] = useState<boolean>(false)
  const [calcSauna, setCalcSauna] = useState<boolean>(false)
  const [calcTowel, setCalcTowel] = useState<boolean>(false)
  
  // Calculate dynamic pricing
  const getCalculatorTotal = () => {
    const selectedMembership = MEMBERSHIPS.find(m => m.id === calcTier)
    if (!selectedMembership) return 0
    
    const basePrice = calcBilling === 'monthly' ? selectedMembership.monthlyPrice : selectedMembership.annualPrice
    const ptCost = calcPT * 1500 // ₹1,500 per session
    const nutritionCost = calcNutrition ? 2000 : 0
    const saunaCost = calcSauna ? 1000 : 0
    const towelCost = calcTowel ? 500 : 0
    
    return basePrice + ptCost + nutritionCost + saunaCost + towelCost
  }

  // Contract Modal State
  const [isContractOpen, setIsContractOpen] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientSigned, setClientSigned] = useState<boolean>(false)
  const [signedDate, setSignedDate] = useState<string>('')

  const handleOpenContract = () => {
    setClientSigned(false)
    setClientName('')
    setIsContractOpen(true)
  }

  const handleSignContract = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName.trim()) return
    setClientSigned(true)
    setSignedDate(new Date().toLocaleDateString())
    showToast("Demo contract digitally signed!")
  }

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    showToast("Thanks for subscribing to our Iron Newsletter!")
    setNewsletterEmail('')
  }

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email) return
    showToast(`Thank you, ${contactForm.name}! We will contact you soon.`)
    setContactForm({ name: '', email: '', message: '' })
  }

  const handleHeroCardClick = (index: number) => {
    setActiveHeroCard(index)
    let targetId = ''
    if (index === 0) targetId = 'timetable'
    else if (index === 1) targetId = 'trainers'
    else if (index === 2 || index === 3) targetId = 'facilities'
    
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Timetable Filters
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const shifts = ['All', 'Morning', 'Afternoon', 'Evening']

  const filteredClasses = classes.filter(c => {
    const matchesDay = c.day === selectedDay
    const matchesShift = selectedShift === 'All' || c.shift === selectedShift
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDay && matchesShift && matchesSearch
  })

  const activeZone = FACILITY_ZONES.find(z => z.id === selectedZone) || FACILITY_ZONES[0]

  return (
    <div className="min-h-screen bg-[#08080a] text-gray-100 font-sans selection:bg-brand-orange selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-brand-orange/30 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
          <CheckCircle className="text-brand-orange shrink-0" size={24} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/[0.03] backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/25 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-orange p-2 rounded">
              <Dumbbell className="text-black stroke-[2.5]" size={22} />
            </div>
            <span className="font-heading text-2xl font-black tracking-widest text-white">
              IRON CITY<span className="text-brand-orange">.</span>
            </span>
          </div>
          
          {/* Desktop Navigation Capsule */}
          <nav 
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:relative md:flex items-center bg-slate-950/60 border border-white/5 rounded-full p-1 h-11"
          >
            {/* Sliding Glass Indicator */}
            <div 
              className={`absolute h-9 w-[88px] bg-white/[0.08] border border-white/10 rounded-full transition-all duration-300 ease-in-out z-0 left-1
                ${(hoveredNav || activeNav) === 'home' ? 'translate-x-0' : ''}
                ${(hoveredNav || activeNav) === 'offers' ? 'translate-x-[96px]' : ''}
                ${(hoveredNav || activeNav) === 'timetable' ? 'translate-x-[192px]' : ''}
                ${(hoveredNav || activeNav) === 'facilities' ? 'translate-x-[288px]' : ''}
                ${(hoveredNav || activeNav) === 'trainers' ? 'translate-x-[384px]' : ''}
                ${(hoveredNav || activeNav) === 'pricing' ? 'translate-x-[480px]' : ''}
              `}
            />
            
            <a 
              href="#home" 
              onClick={() => setActiveNav('home')}
              onMouseEnter={() => setHoveredNav('home')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'home' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Home
            </a>
            <a 
              href="#offers" 
              onClick={() => setActiveNav('offers')}
              onMouseEnter={() => setHoveredNav('offers')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'offers' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Offers
            </a>
            <a 
              href="#timetable" 
              onClick={() => setActiveNav('timetable')}
              onMouseEnter={() => setHoveredNav('timetable')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'timetable' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Schedule
            </a>
            <a 
              href="#facilities" 
              onClick={() => setActiveNav('facilities')}
              onMouseEnter={() => setHoveredNav('facilities')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'facilities' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Zones
            </a>
            <a 
              href="#trainers" 
              onClick={() => setActiveNav('trainers')}
              onMouseEnter={() => setHoveredNav('trainers')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'trainers' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Coaches
            </a>
            <a 
              href="#pricing" 
              onClick={() => setActiveNav('pricing')}
              onMouseEnter={() => setHoveredNav('pricing')}
              className={`w-24 h-9 flex items-center justify-center text-xs tracking-wider uppercase font-extrabold transition-colors z-10 
                ${(hoveredNav || activeNav) === 'pricing' ? 'text-white font-black' : 'text-gray-400 hover:text-white'}
              `}
            >
              Pricing
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a 
              href="#pricing" 
              onClick={() => setActiveNav('pricing')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-black font-heading tracking-wider uppercase text-sm font-black px-6 py-3 rounded-sm transition-all duration-200 hover:scale-105"
            >
              Join Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/gym_hero.png" 
            alt="Iron City Gym" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto my-12 px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/85">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 px-4 py-1.5 rounded-full text-brand-orange text-xs uppercase font-bold tracking-widest">
              <Flame size={14} />
              PREMIER 24/7 ATHLETIC CLUB
            </div>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight uppercase">
              {GYM_INFO.tagline.split(' ').map((word, i) => (
                <span key={i} className={word === 'LEGACY.' || word === 'GOALS.' ? 'text-brand-orange block sm:inline' : 'block sm:inline mr-4'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-xl leading-relaxed">
              {GYM_INFO.description}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <a 
                href="#timetable" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-black font-heading tracking-widest uppercase font-black px-8 py-4 rounded-sm transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                Book a Demo Class <ArrowRight size={18} />
              </a>
              <a 
                href="#calculator" 
                className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 font-heading tracking-widest uppercase font-black px-8 py-4 rounded-sm transition-all duration-200 flex items-center gap-2"
              >
                Calculate Membership
              </a>
            </div>

            {/* Live Capacity Widget */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 max-w-lg bg-white/5 border border-white/5 p-4 rounded backdrop-blur-sm">
              <div className="relative shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm font-semibold text-white">
                  LIVE CAPACITY: <span className="text-brand-orange">{GYM_INFO.capacity.current}</span> / {GYM_INFO.capacity.max} Lifting Now
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {GYM_INFO.capacity.status}. Plenty of platforms and power racks available.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Grid cards with sliding glass indicator */}
          <div className="relative w-full md:w-[500px] h-[624px] md:h-[304px] shrink-0">
            {/* Sliding Glass Indicator */}
            <div 
              className={`absolute bg-white/[0.08] border border-brand-orange/40 rounded-lg backdrop-blur-md shadow-lg shadow-brand-orange/5 transition-all duration-500 ease-in-out pointer-events-none z-0 
                h-36 w-full md:w-[calc(50%-0.5rem)]
                ${activeHeroCard === 0 ? 'translate-x-0 translate-y-0' : ''}
                ${activeHeroCard === 1 ? 'translate-x-0 translate-y-[160px] md:translate-x-[calc(100%+1rem)] md:translate-y-0' : ''}
                ${activeHeroCard === 2 ? 'translate-x-0 translate-y-[320px] md:translate-x-0 md:translate-y-[160px]' : ''}
                ${activeHeroCard === 3 ? 'translate-x-0 translate-y-[480px] md:translate-x-[calc(100%+1rem)] md:translate-y-[160px]' : ''}
              `}
            />

            {/* Card 0 */}
            <button 
              onClick={() => handleHeroCardClick(0)}
              className={`absolute text-left p-6 rounded transition-all duration-500 ease-in-out group h-36 w-full md:w-[calc(50%-0.5rem)] top-0 left-0 z-10 flex flex-col justify-center
                ${activeHeroCard === 0 ? 'bg-transparent border border-transparent' : 'bg-white/5 border border-white/5 hover:border-brand-orange/30'}
              `}
            >
              <Clock className="text-brand-orange mb-2 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="font-heading text-lg font-bold text-white tracking-wider uppercase">24/7 Access</h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">Train on your own schedule, any time, any day.</p>
            </button>

            {/* Card 1 */}
            <button 
              onClick={() => handleHeroCardClick(1)}
              className={`absolute text-left p-6 rounded transition-all duration-500 ease-in-out group h-36 w-full md:w-[calc(50%-0.5rem)] z-10 flex flex-col justify-center
                top-[160px] left-0 md:top-0 md:left-[calc(50%+0.5rem)]
                ${activeHeroCard === 1 ? 'bg-transparent border border-transparent' : 'bg-white/5 border border-white/5 hover:border-brand-orange/30'}
              `}
            >
              <Users className="text-brand-orange mb-2 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="font-heading text-lg font-bold text-white tracking-wider uppercase">15+ Coaches</h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">Certified experts in powerlifting and sports prep.</p>
            </button>

            {/* Card 2 */}
            <button 
              onClick={() => handleHeroCardClick(2)}
              className={`absolute text-left p-6 rounded transition-all duration-500 ease-in-out group h-36 w-full md:w-[calc(50%-0.5rem)] z-10 flex flex-col justify-center
                top-[320px] left-0 md:top-[160px] md:left-0
                ${activeHeroCard === 2 ? 'bg-transparent border border-transparent' : 'bg-white/5 border border-white/5 hover:border-brand-orange/30'}
              `}
            >
              <MapPin className="text-brand-orange mb-2 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="font-heading text-lg font-bold text-white tracking-wider uppercase">Elite Zones</h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">4 dedicated spaces for strength, HIIT, and recovery.</p>
            </button>

            {/* Card 3 */}
            <button 
              onClick={() => handleHeroCardClick(3)}
              className={`absolute text-left p-6 rounded transition-all duration-500 ease-in-out group h-36 w-full md:w-[calc(50%-0.5rem)] z-10 flex flex-col justify-center
                top-[480px] left-0 md:top-[160px] md:left-[calc(50%+0.5rem)]
                ${activeHeroCard === 3 ? 'bg-transparent border border-transparent' : 'bg-white/5 border border-white/5 hover:border-brand-orange/30'}
              `}
            >
              <Trophy className="text-brand-orange mb-2 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="font-heading text-lg font-bold text-white tracking-wider uppercase">Top Tier Gear</h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">Eleiko, Rogue & Hammer Strength official partner.</p>
            </button>
          </div>
        </div>
      </section>

      {/* Offers & Discounts Section */}
      <section id="offers" className="py-24 bg-[#0c0c0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-orange font-heading font-black tracking-widest uppercase text-sm">
              EXCLUSIVE PROMOTIONS
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide">
              Current Offers & Member Deals
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Start your fitness journey with our limited-time promotions. Select an offer below and mention the code during sign-up to claim your discount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS.map((offer) => (
              <div 
                key={offer.id} 
                className={`relative flex flex-col justify-between bg-slate-950 p-8 rounded border transition-all duration-300 hover:-translate-y-2 box-shadow-glow-hover ${
                  offer.endsInDays 
                    ? 'border-brand-orange/30' 
                    : 'border-white/5'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${
                      offer.endsInDays 
                        ? 'bg-brand-orange text-black' 
                        : 'bg-white/10 text-white'
                    }`}>
                      {offer.badge}
                    </span>
                    {offer.endsInDays && (
                      <span className="text-brand-orange text-xs font-bold animate-pulse flex items-center gap-1">
                        <Clock size={12} /> ENDS SOON
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-black tracking-wider text-white uppercase mt-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                  {offer.endsInDays && (
                    <div className="bg-white/5 border border-white/5 p-3 rounded text-center">
                      <div className="text-[10px] text-gray-400 tracking-widest uppercase mb-1.5">
                        Urgent Countdown
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-white font-mono font-bold">
                        <div className="bg-slate-900 py-1 rounded">
                          <span className="text-sm">{String(timeLeft.days).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-gray-500 font-sans tracking-tight">DAYS</span>
                        </div>
                        <div className="bg-slate-900 py-1 rounded">
                          <span className="text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-gray-500 font-sans tracking-tight">HRS</span>
                        </div>
                        <div className="bg-slate-900 py-1 rounded">
                          <span className="text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-gray-500 font-sans tracking-tight">MINS</span>
                        </div>
                        <div className="bg-slate-900 py-1 rounded">
                          <span className="text-sm text-brand-orange">{String(timeLeft.seconds).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-gray-500 font-sans tracking-tight">SECS</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between bg-slate-900 px-4 py-2 rounded border border-white/5">
                    <span className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Promo Code</span>
                    <span className="font-mono text-sm font-bold text-brand-orange tracking-widest">{offer.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* shifts, Timetables, and Working Hours */}
      <section id="timetable" className="py-24 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="text-brand-orange font-heading font-black tracking-widest uppercase text-sm">
                TRAINING HOURS & WEEKLY SHIFTS
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Class Schedule & Shifts
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Browse our weekly class schedule. Filter classes by day and shifts (Morning, Afternoon, Evening). Complete your mock booking to experience the member portal reservation flow.
              </p>
            </div>

            {/* General Gym Hours Card */}
            <div className="shrink-0 w-full lg:w-96 bg-white/5 border border-white/5 p-6 rounded-lg backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-white font-heading text-lg font-bold tracking-wider uppercase border-b border-white/10 pb-2">
                <Clock className="text-brand-orange" size={18} />
                <span>General Gym Hours</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-semibold">{GYM_INFO.workingHours.weekdays.days}</span>
                  <span className="text-gray-400">{GYM_INFO.workingHours.weekdays.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-semibold">{GYM_INFO.workingHours.saturdays.days}</span>
                  <span className="text-gray-400">{GYM_INFO.workingHours.saturdays.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-semibold">{GYM_INFO.workingHours.sundays.days}</span>
                  <span className="text-gray-400">{GYM_INFO.workingHours.sundays.hours}</span>
                </div>
                <div className="text-xs text-brand-orange italic pt-1 border-t border-white/5">
                  {GYM_INFO.workingHours.vipNote}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filters Panel */}
          <div className="bg-slate-950 border border-white/5 p-6 rounded-lg mb-8 space-y-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Shift Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase mr-2 hidden sm:inline">Shift:</span>
                <div className="inline-flex rounded bg-slate-900 p-1 border border-white/5">
                  {shifts.map(shift => (
                    <button
                      key={shift}
                      onClick={() => setSelectedShift(shift)}
                      className={`px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider font-bold transition-all duration-150 ${
                        selectedShift === shift
                          ? 'bg-brand-orange text-black'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search class, trainer, or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange/50 transition-colors"
                />
              </div>
            </div>

            {/* Day Selector (Horizontal Scrollable Tabs) */}
            <div className="border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase mr-2 shrink-0 hidden sm:inline">Weekdays:</span>
                <div className="flex gap-2 shrink-0">
                  {weekdays.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-5 py-2.5 rounded text-xs uppercase tracking-wider font-extrabold transition-all duration-200 border ${
                        selectedDay === day
                          ? 'bg-brand-orange border-brand-orange text-black font-black scale-105 shadow-lg shadow-brand-orange/10'
                          : 'bg-slate-900 border-white/5 text-gray-300 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((c) => {
                const isBooked = bookedClasses.includes(c.id);
                const difficultyColor = 
                  c.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                  c.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                  'text-rose-500 bg-rose-500/10 border-rose-500/20';

                return (
                  <div 
                    key={c.id} 
                    className={`bg-slate-950 border p-6 rounded-lg flex flex-col justify-between transition-all duration-300 hover:border-brand-orange/20 ${
                      isBooked ? 'border-brand-orange/50 ring-1 ring-brand-orange/30' : 'border-white/5'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Class Header */}
                      <div className="flex items-start justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${difficultyColor}`}>
                          {c.difficulty}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold tracking-wider bg-white/5 px-2 py-0.5 rounded">
                          {c.shift} Shift
                        </span>
                      </div>

                      {/* Title & Room */}
                      <div>
                        <h3 className="font-heading text-xl font-black uppercase text-white tracking-wide">
                          {c.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                          <MapPin size={12} className="text-brand-orange" />
                          <span>{c.room}</span>
                        </div>
                      </div>

                      {/* Time & Duration Info */}
                      <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded text-xs border border-white/5">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Clock size={14} className="text-brand-orange" />
                          <span className="font-mono font-semibold">{c.time}</span>
                        </div>
                        <div className="text-right text-gray-400 font-medium">
                          Duration: <span className="text-white font-mono">{c.duration}</span>
                        </div>
                      </div>

                      {/* Trainer Bio Name */}
                      <div className="flex items-center gap-2.5 pt-2">
                        <div className="h-7 w-7 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-xs font-bold text-brand-orange">
                          {c.trainer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-300 font-semibold">Coach {c.trainer}</span>
                      </div>
                    </div>

                    {/* Booking Control */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">LIFTING SPOTS</div>
                        <div className="text-xs text-gray-300 mt-0.5 font-bold">
                          {c.spotsLeft === 0 ? (
                            <span className="text-rose-500 font-extrabold">FULLY BOOKED</span>
                          ) : (
                            <span>
                              <span className="text-brand-orange font-mono text-sm font-black">{c.spotsLeft}</span> / {c.totalSpots} Left
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookClass(c.id, c.name)}
                        disabled={c.spotsLeft === 0 && !isBooked}
                        className={`font-heading tracking-widest uppercase font-black text-xs px-5 py-2.5 rounded-sm transition-all duration-200 ${
                          isBooked
                            ? 'bg-emerald-500 text-black hover:bg-emerald-600 hover:scale-105'
                            : c.spotsLeft === 0
                            ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                            : 'bg-slate-900 text-white border border-white/10 hover:border-brand-orange hover:text-brand-orange hover:scale-105'
                        }`}
                      >
                        {isBooked ? 'Booked ✓' : c.spotsLeft === 0 ? 'Full' : 'Book Spot'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-950 border border-white/5 p-12 rounded text-center max-w-xl mx-auto space-y-4">
              <Dumbbell className="text-gray-600 mx-auto" size={40} />
              <h3 className="font-heading text-xl font-bold uppercase text-white">No Classes Scheduled</h3>
              <p className="text-gray-400 text-sm">
                There are no classes matching your filters on {selectedDay}. Try selecting a different shift or clearing your search.
              </p>
              <button 
                onClick={() => { setSelectedShift('All'); setSearchQuery(''); }}
                className="text-brand-orange text-xs uppercase font-bold tracking-widest hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Facilities & Gym Zones Section */}
      <section id="facilities" className="py-24 bg-[#0c0c0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-orange font-heading font-black tracking-widest uppercase text-sm">
              EXPLORE OUR KINGDOM
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide">
              Gym Zones & Premium Facilities
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Iron City Fitness is designed for optimal athletic performance. Switch between our specialized zones to see the premium, heavy-duty gear and recovery systems engineered for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Zone Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-2 lg:pb-0">
                {FACILITY_ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`w-full text-left p-5 rounded border transition-all duration-200 shrink-0 lg:shrink flex flex-col gap-1.5 ${
                      selectedZone === zone.id
                        ? 'bg-brand-orange border-brand-orange text-black font-bold'
                        : 'bg-slate-950 border-white/5 text-gray-300 hover:border-white/10'
                    }`}
                  >
                    <span className={`font-heading text-lg font-black uppercase tracking-wide ${
                      selectedZone === zone.id ? 'text-black' : 'text-white'
                    }`}>
                      {zone.name}
                    </span>
                    <span className={`text-xs ${
                      selectedZone === zone.id ? 'text-slate-950/80 font-medium' : 'text-gray-400'
                    }`}>
                      {zone.tagline}
                    </span>
                  </button>
                ))}
              </div>

              {/* Extra Facility Highlights */}
              <div className="hidden lg:block bg-slate-950 border border-white/5 p-6 rounded">
                <h4 className="font-heading text-sm font-black uppercase text-white tracking-wider mb-3">ADDITIONAL AMENITIES</h4>
                <ul className="text-xs text-gray-400 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <Check className="text-brand-orange shrink-0" size={14} /> Modern secure locker rooms with private showers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-brand-orange shrink-0" size={14} /> Supplement and pre-workout shake bar
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-brand-orange shrink-0" size={14} /> Filtered high-flow water stations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-brand-orange shrink-0" size={14} /> Superfast member Wi-Fi & device charge docks
                  </li>
                </ul>
              </div>
            </div>

            {/* Active Zone Display Card */}
            <div className="lg:col-span-8 bg-slate-950 border border-white/5 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300">
              <div className="relative h-64 sm:h-96 overflow-hidden">
                <img 
                  src={activeZone.image} 
                  alt={activeZone.name} 
                  className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-brand-orange text-black px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {activeZone.tagline}
                  </span>
                  <h3 className="font-heading text-3xl font-black uppercase text-white tracking-wide mt-2">
                    {activeZone.name}
                  </h3>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {activeZone.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-heading text-sm font-black uppercase text-white tracking-wider flex items-center gap-1.5 pt-2">
                      <Trophy className="text-brand-orange" size={15} />
                      Featured Premium Equipment
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeZone.premiumEquipment.map((eq, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 border border-white/5 p-3 rounded">
                          <Check className="text-brand-orange shrink-0 mt-0.5" size={14} />
                          <span>{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-gray-400">
                    Official gear partner: <span className="text-white font-semibold">Eleiko, Rogue, Hammer Strength</span>
                  </span>
                  <a 
                    href="#timetable" 
                    className="text-brand-orange text-xs uppercase font-extrabold tracking-widest flex items-center gap-1.5 hover:underline"
                  >
                    View classes in this Zone <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-orange font-heading font-black tracking-widest uppercase text-sm">
              ELITE ATHLETIC COACHING
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide">
              Meet Our World Class Trainers
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Our coaches aren't just rep counters. They are certified sports scientists, competitive lifters, and movement experts dedicated to unlocking your genetic physical potential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAINERS.map((trainer) => (
              <div 
                key={trainer.id} 
                className="group relative bg-slate-950 border border-white/5 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-orange/30"
              >
                {/* Trainer Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent"></div>
                  
                  {/* Nickname overlay */}
                  {trainer.nickname && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-orange text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                        "{trainer.nickname}"
                      </span>
                    </div>
                  )}

                  {/* Specialty and Experience overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest block">
                      {trainer.specialty}
                    </span>
                    <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wide leading-none mt-1">
                      {trainer.name}
                    </h3>
                  </div>
                </div>

                {/* Trainer Info Panel */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-gray-400 text-xs leading-relaxed italic">
                    "{trainer.bio}"
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      CERTIFICATIONS & DEGREES
                    </div>
                    <ul className="text-[11px] text-gray-300 space-y-1.5">
                      {trainer.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <Check className="text-brand-orange shrink-0 mt-0.5" size={12} />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Experience: <span className="text-white font-bold">{trainer.experience}</span></span>
                    <span className="text-brand-orange font-bold uppercase tracking-wider">Elite Coach</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Memberships Section */}
      <section id="pricing" className="py-24 bg-[#0c0c0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-orange font-heading font-black tracking-widest uppercase text-sm">
              TRANSPARENT PRICING
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide">
              Flexible Membership Plans
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Choose the plan that matches your training goals. Save up to 20% on our annual commitment programs. No hidden maintenance or facility enhancement fees.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {MEMBERSHIPS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-slate-950 p-8 rounded-lg border flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular 
                    ? 'border-brand-orange/50 ring-1 ring-brand-orange/30 box-shadow-glow' 
                    : 'border-white/5'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-black px-4 py-1 text-[9px] font-black uppercase tracking-widest rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Name & Target */}
                  <div>
                    <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1.5 italic leading-snug">
                      {plan.target}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="border-y border-white/5 py-4">
                    <div className="flex items-baseline">
                      <span className="text-xs font-bold text-gray-400 mr-0.5">₹</span>
                      <span className="text-5xl font-black text-white tracking-tight font-heading">
                        {plan.monthlyPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-400 text-xs ml-1.5 uppercase tracking-wider">/ Month</span>
                    </div>
                    <div className="text-[10px] text-brand-orange font-bold mt-1 uppercase tracking-widest">
                      Billed monthly (₹{(plan.annualPrice * 12).toLocaleString('en-IN')}/yr if annual)
                    </div>
                  </div>

                  {/* Plan description */}
                  <p className="text-xs text-gray-300">
                    {plan.description}
                  </p>

                  {/* Feature list */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">WHAT'S INCLUDED</div>
                    <ul className="text-xs text-gray-300 space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="text-brand-orange shrink-0 mt-0.5" size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6">
                  <button 
                    onClick={() => {
                      setCalcTier(plan.id)
                      const calcSection = document.getElementById('calculator')
                      if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`w-full font-heading tracking-widest uppercase font-black text-xs py-3.5 rounded-sm transition-all duration-200 ${
                      plan.isPopular
                        ? 'bg-brand-orange text-black hover:bg-brand-orange/90 hover:scale-105'
                        : 'bg-slate-900 text-white border border-white/10 hover:border-brand-orange hover:text-brand-orange'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Membership Cost Calculator Segment */}
          <div id="calculator" className="scroll-mt-24 max-w-4xl mx-auto bg-slate-950 border border-white/5 rounded-lg overflow-hidden transition-all duration-300">
            <div className="bg-brand-orange px-8 py-6 flex items-center gap-3">
              <Calculator className="text-black stroke-[2.5]" size={24} />
              <div>
                <h3 className="font-heading text-xl font-black uppercase text-black tracking-wide">
                  Interactive Member Cost Calculator
                </h3>
                <p className="text-black/80 text-xs font-semibold">
                  Customize your training protocol, select optional add-ons, and generate a sample contract demo in real time.
                </p>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="md:col-span-7 space-y-6">
                {/* Step 1: Base Tier */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    1. Select Base Plan
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {MEMBERSHIPS.map(plan => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setCalcTier(plan.id)}
                        className={`p-3 rounded border text-xs uppercase font-extrabold text-center transition-all duration-150 ${
                          calcTier === plan.id
                            ? 'bg-brand-orange/10 border-brand-orange text-brand-orange'
                            : 'bg-slate-900 border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {plan.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Billing frequency */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    2. Choose Commitment Billing
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setCalcBilling('monthly')}
                      className={`p-3 rounded border text-xs uppercase font-extrabold text-center transition-all duration-150 ${
                        calcBilling === 'monthly'
                          ? 'bg-brand-orange/10 border-brand-orange text-brand-orange'
                          : 'bg-slate-900 border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly Rate
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcBilling('annual')}
                      className={`p-3 rounded border text-xs uppercase font-extrabold text-center transition-all duration-150 ${
                        calcBilling === 'annual'
                          ? 'bg-brand-orange/10 border-brand-orange text-brand-orange'
                          : 'bg-slate-900 border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      Annual commitment (-15%)
                    </button>
                  </div>
                </div>

                {/* Step 3: PT slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>3. Personal Coaching Sessions</span>
                    <span className="text-brand-orange font-bold font-mono">
                      {calcPT} {calcPT === 1 ? 'Session' : 'Sessions'} / Month (+₹{(calcPT * 1500).toLocaleString('en-IN')})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900 p-3 rounded border border-white/5">
                    <button 
                      type="button" 
                      onClick={() => setCalcPT(p => Math.max(0, p - 1))}
                      className="p-1 rounded bg-white/5 border border-white/5 hover:border-brand-orange text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="8" 
                      value={calcPT}
                      onChange={(e) => setCalcPT(parseInt(e.target.value))}
                      className="flex-1 accent-brand-orange bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <button 
                      type="button" 
                      onClick={() => setCalcPT(p => Math.min(8, p + 1))}
                      className="p-1 rounded bg-white/5 border border-white/5 hover:border-brand-orange text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Private 1-on-1 athletic coaching sessions. Custom lifting programming and physical technique optimization (₹1,500/session rate).
                  </p>
                </div>

                {/* Step 4: Add-ons checkboxes */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    4. Optional Add-ons & Amenities
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded cursor-pointer hover:border-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={calcNutrition}
                        onChange={(e) => setCalcNutrition(e.target.checked)}
                        className="rounded accent-brand-orange h-4 w-4 shrink-0 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Tailored Nutrition & Macro Coaching (+₹2,000/mo)</div>
                        <div className="text-[10px] text-gray-400">Registered sports nutritionist consultation and weekly menu templates.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded cursor-pointer hover:border-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={calcSauna}
                        onChange={(e) => setCalcSauna(e.target.checked)}
                        className="rounded accent-brand-orange h-4 w-4 shrink-0 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Full Recovery Sauna & Steam Access (+₹1,000/mo)</div>
                        <div className="text-[10px] text-gray-400">Included in Iron Core. Unlock sauna, eucalyptus steam, and cold plunge.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 bg-slate-900 border border-white/5 p-3 rounded cursor-pointer hover:border-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={calcTowel}
                        onChange={(e) => setCalcTowel(e.target.checked)}
                        className="rounded accent-brand-orange h-4 w-4 shrink-0 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Premium Towel Service (+₹500/mo)</div>
                        <div className="text-[10px] text-gray-400">Unlimited fresh, cooled performance towel checkout daily.</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Total display Column */}
              <div className="md:col-span-5 bg-slate-900 p-6 rounded border border-white/5 flex flex-col justify-between gap-6">
                <div>
                  <h4 className="font-heading text-base font-black uppercase text-white tracking-wider border-b border-white/10 pb-2 mb-4">
                    Estimate Summary
                  </h4>

                  <ul className="text-xs space-y-2.5 mb-6 text-gray-300">
                    <li className="flex justify-between">
                      <span>Base Plan ({MEMBERSHIPS.find(m => m.id === calcTier)?.name}):</span>
                      <span className="font-semibold text-white font-mono">
                        ₹{calcBilling === 'monthly' 
                          ? MEMBERSHIPS.find(m => m.id === calcTier)?.monthlyPrice.toLocaleString('en-IN') 
                          : MEMBERSHIPS.find(m => m.id === calcTier)?.annualPrice.toLocaleString('en-IN')}/mo
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Coaching Sessions ({calcPT}):</span>
                      <span className="font-semibold text-white font-mono">₹{(calcPT * 1500).toLocaleString('en-IN')}/mo</span>
                    </li>
                    {calcNutrition && (
                      <li className="flex justify-between">
                        <span>Nutrition Protocol:</span>
                        <span className="font-semibold text-white font-mono">+₹2,000/mo</span>
                      </li>
                    )}
                    {calcSauna && (
                      <li className="flex justify-between">
                        <span>Recovery Spa Access:</span>
                        <span className="font-semibold text-white font-mono">+₹1,000/mo</span>
                      </li>
                    )}
                    {calcTowel && (
                      <li className="flex justify-between">
                        <span>Towel Service:</span>
                        <span className="font-semibold text-white font-mono">+₹500/mo</span>
                      </li>
                    )}
                  </ul>

                  <div className="bg-slate-950 p-4 rounded border border-white/5 text-center space-y-1">
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ESTIMATED INVESTMENT</div>
                    <div className="text-3xl font-black text-brand-orange font-mono">
                      ₹{getCalculatorTotal().toLocaleString('en-IN')}
                      <span className="text-xs text-gray-400 font-normal font-sans ml-1">/ Month</span>
                    </div>
                    <div className="text-[9px] text-gray-400">
                      {calcBilling === 'annual' ? 'Billed annually - 12 month commitment' : 'Month-to-month, cancel anytime'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleOpenContract}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-black font-heading tracking-widest uppercase font-black text-xs py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
                  >
                    Generate Contract Demo <ArrowRight size={14} />
                  </button>
                  <p className="text-[9px] text-gray-500 text-center leading-relaxed">
                    This is a functional simulation. Clicking above will generate a demo membership contract based on your selected selections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Signature Demo Modal */}
      {isContractOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-white/10 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-heading text-lg font-black uppercase text-white tracking-wider">
                IRON CITY FITNESS - MEMBERSHIP AGREEMENT
              </span>
              <button 
                onClick={() => setIsContractOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-300 leading-relaxed">
              <div className="text-center border border-brand-orange/20 bg-brand-orange/5 p-4 rounded mb-2">
                <span className="font-heading text-base font-black text-brand-orange block uppercase tracking-wider mb-1">
                  DEMO CONTRACT PREVIEW
                </span>
                <span className="text-[10px] text-gray-400">
                  Verify your selections and sign below to simulate member registration.
                </span>
              </div>

              {/* Agreement details */}
              <div className="space-y-4">
                <p>
                  <strong>1. PARTIES:</strong> This agreement is made between <strong>Iron City Fitness LLC</strong> ("Club") and the undersigned member ("Member").
                </p>
                <p>
                  <strong>2. MEMEBERSHIP PRIVILEGES:</strong> The Member has selected the <strong>{MEMBERSHIPS.find(m => m.id === calcTier)?.name}</strong> tier, with a billing format of <strong>{calcBilling.toUpperCase()}</strong>.
                </p>
                <p>
                  <strong>3. FINANCIAL COMMITMENT:</strong> The Member agrees to make a monthly investment of <strong>₹{getCalculatorTotal().toLocaleString('en-IN')} / Month</strong>.
                </p>
                <p>
                  <strong>4. INCLUDED ADD-ONS:</strong> The custom plan is configured with:
                  <span className="block pl-4 mt-1 font-semibold text-brand-orange">
                    • {calcPT} private personal training sessions/mo
                    {calcNutrition && ' • Sports nutrition profiling'}
                    {calcSauna && ' • Recovery Sauna & Eucalyptus Steam access'}
                    {calcTowel && ' • Premium daily towel service'}
                  </span>
                </p>
                <p>
                  <strong>5. RULES & PROTOCOLS:</strong> The Member agrees to re-rack all heavy barbells and steel plates, wipe down bench surfaces post-workout, and respect the athletic focus of all training spaces. Failure to re-rack weights will result in immediate loss of lifting privileges.
                </p>
              </div>

              {/* Signature form */}
              <div className="border-t border-white/10 pt-6">
                {!clientSigned ? (
                  <form onSubmit={handleSignContract} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Type Your Full Name to Sign
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="bg-slate-900 border border-white/5 p-4 rounded flex items-center gap-3">
                      <input
                        type="checkbox"
                        required
                        id="terms"
                        className="rounded accent-brand-orange h-4 w-4 shrink-0"
                      />
                      <label htmlFor="terms" className="text-[10px] text-gray-400 cursor-pointer">
                        I hereby agree to the terms, fitness safety declarations, and the iron rule: <strong>Always re-rack my weights.</strong>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 text-black font-heading tracking-widest uppercase font-black text-xs py-3.5 rounded-sm transition-all duration-200"
                    >
                      Sign Agreement & Finalize Demo
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-lg text-center space-y-4 animate-fade-in">
                    <CheckCircle className="text-emerald-500 mx-auto" size={32} />
                    <div>
                      <h4 className="font-heading text-lg font-black uppercase text-white tracking-wider">
                        CONTRACT SIGNED & RECORDED
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1">
                        Agreement successfully recorded on {signedDate}.
                      </p>
                    </div>
                    
                    {/* Simulated Signed Area */}
                    <div className="bg-slate-900 border border-dashed border-emerald-500/40 py-4 px-6 rounded max-w-sm mx-auto">
                      <div className="font-signature text-2xl text-emerald-400 italic font-medium tracking-wide">
                        {clientName}
                      </div>
                      <div className="text-[8px] text-gray-500 tracking-wider uppercase border-t border-white/5 mt-2 pt-1">
                        Digitally Secured Signature ID: ICF-{Math.floor(Math.random() * 1000000)}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsContractOpen(false)}
                      className="bg-slate-950 text-white border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-sm"
                    >
                      Close Preview
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Contact Info Section */}
      <section id="contact" className="py-24 bg-[#08080a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Gym Info Panel */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-orange p-1.5 rounded">
                    <Dumbbell className="text-black stroke-[2.5]" size={16} />
                  </div>
                  <span className="font-heading text-xl font-black tracking-widest text-white">
                    IRON CITY FITNESS
                  </span>
                </div>
                <h2 className="font-heading text-4xl font-black uppercase text-white tracking-wide">
                  Forge Your Legacy With Us
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Have questions about our equipment, corporate programs, or elite coaching availability? Get in touch with our operations desk, or stop by the gym floor for a complimentary tour and protein shake.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5">
                  <MapPin className="text-brand-orange shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-white block uppercase tracking-wide mb-1">Gym Location</strong>
                    <span className="text-gray-400">No:1/247 Palani complex, 2nd floor, Tirumudivakkam Main Rd, Thirumudivakkam, Tamil Nadu 600132</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5">
                  <Phone className="text-brand-orange shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-white block uppercase tracking-wide mb-1">Operations Desk</strong>
                    <span className="text-gray-400">+91 90926 27602</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5">
                  <Mail className="text-brand-orange shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-white block uppercase tracking-wide mb-1">General Inquiries</strong>
                    <span className="text-gray-400">lift@ironcityfitness.com</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">FOLLOW THE MOVEMENT</span>
                <div className="flex gap-2.5">
                  <a href="#" className="h-9 w-9 bg-white/5 rounded border border-white/5 hover:border-brand-orange hover:text-brand-orange flex items-center justify-center text-gray-400 transition-colors" aria-label="Instagram">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="#" className="h-9 w-9 bg-white/5 rounded border border-white/5 hover:border-brand-orange hover:text-brand-orange flex items-center justify-center text-gray-400 transition-colors" aria-label="Facebook">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" className="h-9 w-9 bg-white/5 rounded border border-white/5 hover:border-brand-orange hover:text-brand-orange flex items-center justify-center text-gray-400 transition-colors" aria-label="Twitter">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7 bg-slate-950 border border-white/5 p-8 rounded-lg flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wide mb-2">
                  Drop Us a Message
                </h3>
                <p className="text-gray-400 text-xs leading-normal">
                  Fill out the form below to test our contact form integration. Simulated response triggers immediately on submission.
                </p>
              </div>

              <form onSubmit={handleContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/5 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange"
                      placeholder="Marcus Aurelius"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/5 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange"
                      placeholder="marcus@rome.org"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-slate-900 border border-white/5 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange resize-none"
                    placeholder="How do I arrange a corporate package for 10 lifters?"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-black font-heading tracking-widest uppercase font-black text-xs px-6 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 w-full sm:w-auto"
                >
                  Send Message <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 text-gray-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/5 p-1 rounded border border-white/5">
              <Dumbbell className="text-gray-400" size={14} />
            </div>
            <span className="font-heading text-sm font-black tracking-widest text-white">
              IRON CITY FITNESS
            </span>
          </div>
          
          {/* Newsletter Segment */}
          <div className="w-full md:w-auto max-w-sm flex items-center gap-2 bg-slate-900 border border-white/5 px-3 py-1.5 rounded">
            <Mail className="text-gray-400 shrink-0" size={14} />
            <form onSubmit={handleNewsletter} className="flex-1 flex gap-2">
              <input
                type="email"
                required
                placeholder="Get Iron newsletter"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-transparent text-xs text-white border-none outline-none w-full placeholder-gray-500 focus:ring-0"
              />
              <button 
                type="submit" 
                className="text-brand-orange hover:text-white text-xs uppercase font-extrabold tracking-widest transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          <div className="text-center md:text-right text-[10px] space-y-1">
            <p>&copy; 2026 Iron City Fitness. All rights reserved.</p>
            <p>Designed and built as an interactive premium demo website.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
