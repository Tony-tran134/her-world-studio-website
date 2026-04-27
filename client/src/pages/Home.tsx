import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Phone, Mail, Star, Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { SparklesText } from "@/components/SparklesText";

/**
 * Her World Studio - Women Empowerment Design
 * Bold red (#640606), white, and black color scheme
 * English language, prominent booking features
 * Animations suitable for all ages
 */

export default function Home() {
  // Bokadirekt Integration
  // Business ID: 131326
  // Booking widget embedded in BookingModal component
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 3) % testimonials.length);
  };

  // Handle service selection - redirect to Bokadirekt
  const handleServiceClick = (serviceName: string) => {
    const serviceUrls: { [key: string]: string } = {
      "Gel Nails": "https://www.bokadirekt.se/places/her-world-studio-131326#gel-naglar",
      "Acrylic Nails": "https://www.bokadirekt.se/places/her-world-studio-131326#akryl-naglar",
      "Lashes & Brows": "https://www.bokadirekt.se/places/her-world-studio-131326#fransar-bryn",
      "Pedicure": "https://www.bokadirekt.se/places/her-world-studio-131326#pedikyr",
    };
    const url = serviceUrls[serviceName] || "https://www.bokadirekt.se/places/her-world-studio-131326";
    window.open(url, "_blank");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingEmail) {
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setBookingEmail("");
      }, 3000);
    }
  };

  const services = [
    {
      category: "Gel Nails",
      items: [
        { name: "Natural Gel Nails", price: "400 kr", time: "60 min" },
        { name: "Gel Color/French", price: "450 kr", time: "70 min" },
        { name: "Gel Chrome/Glitter", price: "500 kr", time: "70 min" },
        { name: "Advanced Nail Design", price: "550 kr", time: "90 min" },
      ],
      description: "Glossy, durable gel nails that last for weeks",
      icon: "💅",
    },
    {
      category: "Acrylic Nails",
      items: [
        { name: "Natural Acrylic Nails", price: "450 kr", time: "60 min" },
        { name: "Acrylic Color/French", price: "500 kr", time: "70 min" },
        { name: "Acrylic Chrome", price: "550 kr", time: "70 min" },
        { name: "Advanced Nail Design", price: "650 kr", time: "110 min" },
      ],
      description: "Strong and durable acrylic nails for long-lasting results",
      icon: "✨",
    },
    {
      category: "Lashes & Brows",
      items: [
        { name: "Classic Lashes", price: "550 kr", time: "75 min" },
        { name: "Mix Lashes", price: "650 kr", time: "85 min" },
        { name: "Lash Lift & Tint", price: "595 kr", time: "50 min" },
      ],
      description: "Beautiful lashes and perfectly shaped brows that enhance your eyes",
      icon: "👁️",
    },
    {
      category: "Pedicure",
      items: [
        { name: "Zen Pedicure (no color)", price: "400 kr", time: "50 min" },
        { name: "Luxury Pedicure (with color)", price: "450 kr", time: "60 min" },
        { name: "Shellac on Toenails", price: "300 kr", time: "30 min" },
        { name: "Nail Design on Toenails", price: "500 kr", time: "60 min" },
      ],
      description: "Well-groomed feet that make you confident from toes to top",
      icon: "🦶",
    },
  ];

  const testimonials = [
    {
      name: "Emma",
      text: "I feel so confident after visiting Her World Studio. It's more than just beauty, it's an experience of taking care of myself.",
      rating: 5,
    },
    {
      name: "Sofia",
      text: "The lash extensions are fantastic! The whole team is so professional and makes me feel valued. I recommend it to all my friends.",
      rating: 5,
    },
    {
      name: "Lisa",
      text: "Best pedicure I've ever had. The environment is so relaxing and the staff really cares about details. Totally worth it!",
      rating: 5,
    },
    {
      name: "Riza Hope Molo",
      text: "Amazing work! She really is very meticulous in every nail. I didn't feel rushed like other nail salons. Very very happy and will come back again! Glad I found this gem 🥰",
      rating: 5,
    },
    {
      name: "Johanna H Lundgren",
      text: "Esmee is amazing. Very talented and detailed. Will come again!",
      rating: 5,
    },
    {
      name: "Liv Ekström",
      text: "Really lovely service and super nice results!!",
      rating: 5,
    },
    {
      name: "Katerina",
      text: "So beautiful! Never been happier with my nails! First time here and will definitely come back! She takes her time, does the nails beautifully and carefully! Did them better than my inspiration picture! Very satisfied!!!",
      rating: 5,
    },
    {
      name: "Melinda",
      text: "She is super skilled & very careful!! Will definitely continue to do my nails here✨",
      rating: 5,
    },
    {
      name: "Mah Sarin",
      text: "Esmee is so good and nice🤎 I will definitely come back 🤎🤎🤎",
      rating: 5,
    },
    {
      name: "Milena",
      text: "Professional and thorough, I am very satisfied 😇🤩",
      rating: 5,
    },
    {
      name: "Helene Beaino",
      text: "I'm very happy, she's very talented.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-red-600 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-2xl font-bold flex items-center gap-2" style={{ justifyContent: 'center' }}> {/* make the text symmertrical horizontolly */}
            <SparklesText text="Her World" className="text-2xl" sparklesCount={6} colors={{ first: "#640606", second: "#FFFFFF" }} />
            <span className="text-red-600">Studio</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="font-medium text-gray-800 hover:text-red-600 transition">
              Services
            </a>
            <a href="#about" className="font-medium text-gray-800 hover:text-red-600 transition">
              About Us
            </a>
            <a href="#contact" className="font-medium text-gray-800 hover:text-red-600 transition">
              Contact
            </a>
            <Button 
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-red-600 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-red-600 p-4 space-y-3">
            <a 
              href="#services" 
              className="block font-medium text-gray-800 hover:text-red-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="block font-medium text-gray-800 hover:text-red-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a 
              href="#contact" 
              className="block font-medium text-gray-800 hover:text-red-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button 
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="text-white py-20 md:py-32 relative overflow-hidden" style={{backgroundColor: '#640606'}}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full -mr-48 -mt-48 opacity-50" />
        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontSize: '40px', marginLeft: '10px' }}>
              Your Time.<br />
              Your Space.<br />
              Your Beauty.
            </h1>
            <p className="text-lg text-red-50 max-w-lg" style={{ fontSize: '18px', marginBottom: '20px', marginLeft: '15px', width: '300px' }}>
              Experience luxury beauty care in our modern studio in Helsingborg. We celebrate your strength and confidence through professional beauty treatments.
              <br />
              <span className="text-sm font-semibold">2025 Her World Studio.</span>
            </p>
            <div className="flex gap-4 pt-4" style={{ marginLeft: '-11px' }}>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold"
              style={{ paddingLeft: '11px', paddingRight: '11px', marginLeft: '12px', width: '180px' }}
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Appointment <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-red-700 font-bold"
              style={{ paddingLeft: '11px', paddingRight: '11px' }}
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Services
            </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl mx-auto">
            <img
              src="https://cdn.discordapp.com/attachments/1302332021456240681/1495061167390064660/Untitled13_20260331195347.png?ex=69eec2f7&is=69ed7177&hm=a96ae60eeed884387d3eb8661bc2d77ac4f9c4973c2585a5356031e8be97bf58&"
              alt="Her World Studio - Luxury Beauty Care"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">Our Services</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" style={{opacity: '4.7'}} />
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover our complete range of professional nail and beauty care, each treatment performed with precision and care.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition border-2 border-gray-200 hover:border-red-600">
                <button
                  onClick={() => setExpandedService(expandedService === service.category ? null : service.category)}
                  className="w-full text-white p-6 hover:opacity-90 transition" 
                  style={{backgroundColor: '#640606'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <span className="text-4xl">{service.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{service.category}</h3>
                        <p className="text-red-100 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <span className="text-2xl ml-4">{expandedService === service.category ? '−' : '+'}</span>
                  </div>
                </button>
                {expandedService === service.category && (
                  <div className="p-8">
                    <div className="space-y-3 mb-6">
                      {service.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-start pb-3 border-b border-gray-200 last:border-0">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                          <p className="font-bold text-red-600">{item.price}</p>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleServiceClick(service.category)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      Book This Service
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Why Choose Her World Studio?</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💅", title: "Experienced Nail Technicians", desc: "Over 8 years of experience in nail and beauty care" },
              { icon: "🏥", title: "Sanitation", desc: "Highest hygiene standards for your safety" },
              { icon: "🎨", title: "30+ Design Options", desc: "Endless possibilities for your nails" },
              { icon: "❗", title: "One Client at a Time", desc: "We give each client personal attention and focus" },
            ].map((item, i) => (
              <Card key={i} className="p-8 text-center hover:shadow-lg transition hover:border-red-600">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Spotlight - Esmee B */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Meet Our Star</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden border-2 border-red-600 hover:shadow-2xl transition">
              <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
                {/* Esmee's Photo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/dacc7ad7-8bb0-4217-8139-7fc201b2cd0a/-/resize/200x/"
                      alt="Esmee B - Nail Technician"
                      className="w-48 h-48 rounded-lg object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-red-600 text-white rounded-full p-4 text-center shadow-lg">
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-xs">out of 5</div>
                    </div>
                  </div>
                </div>
                {/* Esmee's Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Esmee B</h3>
                    <p className="text-red-600 font-semibold text-lg mb-4">Nail Technician, Lash Stylist & Brow Artist</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="font-bold text-gray-900">500+ Positive Reviews</p>
                        <p className="text-gray-600 text-sm">From satisfied clients on Bokadirekt</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💼</span>
                      <div>
                        <p className="font-bold text-gray-900">8+ Years Experience</p>
                        <p className="text-gray-600 text-sm">Certified with professional products from Lilly Nails</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <p className="font-bold text-gray-900">Specialization</p>
                        <p className="text-gray-600 text-sm">Gel Nails, Acrylic Nails, Nail Design, Lash Extensions & Brows</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic pt-4 border-t border-gray-200">
                    I love making others confident and beautiful. Every nail is a work of art.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials with Falling Animation */}
      <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden min-h-screen">
        <div className="container relative z-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Reviews</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(currentTestimonialIndex, currentTestimonialIndex + 3).map((testimonial, idx) => (
              <Card key={idx} className="p-8 flex flex-col border-2 border-gray-200 hover:border-red-600 transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-red-600 text-red-600" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 flex-grow italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
          {testimonials.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNextTestimonial}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 flex items-center gap-2"
              >
                Next Reviews
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Falling Reviews Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {testimonials.map((testimonial, idx) => {
            const randomLeft = Math.random() * 100;
            const randomDuration = 8 + Math.random() * 4;
            const randomDelay = Math.random() * 2;
            return (
              <div
                key={`falling-${idx}`}
                className="falling-review"
                style={{
                  left: `${randomLeft}%`,
                  animationDuration: `${randomDuration}s`,
                  animationDelay: `${randomDelay}s`,
                  width: "200px",
                }}
              >
                <Card className="p-4 bg-white border-2 border-red-600 shadow-lg">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-red-600 text-red-600" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-xs mb-2 italic line-clamp-2">"{testimonial.text}"</p>
                  <p className="font-bold text-gray-900 text-xs">— {testimonial.name}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-salon-interior-WEjYTdxAWJXNCWcHxpLYx2.webp"
              alt="Her World Studio interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">About Her World Studio</h2>
            <div className="w-12 h-1 bg-red-600" />
            <p className="text-lg text-gray-700">
              Her World Studio was founded with a passion for beauty and self-care. We are a private, cozy and modern studio where you can relax and enjoy professional beauty treatments.
            </p>
            <p className="text-lg text-gray-700">
              With over 8 years of experience in nail and beauty care, our certified technicians use only high-quality products and medical sanitation to ensure your safety and satisfaction.
            </p>
            <p className="text-lg text-gray-700">
              We believe that beauty is personal, and every client deserves a customized experience. Whether you're looking for a quick manicure or an elaborate nail design, we're here to make you confident and beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 md:py-32 text-white" style={{ backgroundColor: '#640606' }}>
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-lg text-red-50 mb-8">
            Reserve your appointment now and experience luxury beauty care in Helsingborg.
          </p>

          <div className="bg-white text-gray-900 p-8 rounded-lg">
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Open Booking System
            </Button>
          </div>

          <p className="text-red-50 mt-6 font-medium">
            Or call us at <span className="font-bold">073-464 3339</span>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Contact Us</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <a href="https://www.google.com/maps/place/Her+World+Studio/@56.0351022,12.7140577,17z/data=!3m1!4b1!4m15!1m8!3m7!1s0x4652330038290c19:0xdd9fd2af51020e02!2sHer+World+Studio!8m2!3d56.0350992!4d12.7166326!10e1!16s%2Fg%2F11zk7nssp_!3m5!1s0x4652330038290c19:0xdd9fd2af51020e02!8m2!3d56.0350992!4d12.7166326!16s%2Fg%2F11zk7nssp_?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600 cursor-pointer">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">
                  Närlundavägen 8J<br />
                  252 75 Helsingborg<br />
                  Sweden
                </p>
              </Card>
            </a>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:073-464-3339" className="hover:text-red-600 transition font-semibold">
                  073-464 33 39
                </a>
                <br />
                <span className="text-sm">Mon–Fri: 09:00–20:30<br />Sat–Sun: 10:00–18:00</span>
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600 cursor-pointer" onClick={() => setIsHoursModalOpen(true)}>
              <Mail className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                <span className="block text-sm">Call us outside hours! 📞✨</span>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Opening Hours Modal */}
      {isHoursModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <Card className="w-full max-w-md bg-white border-2 border-red-600 animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Opening Hours</h2>
                <button
                  onClick={() => setIsHoursModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday", hours: "10:00 - 20:30" },
                  { day: "Tuesday", hours: "09:00 - 20:30" },
                  { day: "Wednesday", hours: "09:00 - 20:30" },
                  { day: "Thursday", hours: "09:00 - 20:30" },
                  { day: "Friday", hours: "09:00 - 20:30" },
                  { day: "Saturday", hours: "10:00 - 18:00" },
                  { day: "Sunday", hours: "10:00 - 18:00" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0">
                    <span className="font-semibold text-gray-900">{item.day}</span>
                    <span className="text-red-600 font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container text-center">
          <p className="mb-2 font-medium">© 2025 Her World Studio.</p>
          <p className="text-gray-400">
            Närlundavägen 8J, 252 75 Helsingborg, Sweden | 073-464-3339
          </p>
        </div>
      </footer>
    </div>
  );
}
