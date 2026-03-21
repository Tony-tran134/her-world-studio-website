import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Phone, Mail, Star, Calendar } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";

/**
 * Her World Studio - Women Empowerment Design
 * Bold red (#d32f2f), white, and black color scheme
 * Swedish language, prominent booking features
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

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 3) % testimonials.length);
  };

  // Handle service selection - redirect to Bokadirekt
  const handleServiceClick = (serviceName: string) => {
    const serviceUrls: { [key: string]: string } = {
      "Gelnaglar": "https://www.bokadirekt.se/places/her-world-studio-131326#gel-naglar",
      "Akrylnaglar": "https://www.bokadirekt.se/places/her-world-studio-131326#akryl-naglar",
      "Fransar & Bryn": "https://www.bokadirekt.se/places/her-world-studio-131326#fransar-bryn",
      "Pedikyr": "https://www.bokadirekt.se/places/her-world-studio-131326#pedikyr",
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
      category: "Gelnaglar",
      items: [
        { name: "Gelnaglar Naturlig", price: "400 kr", time: "60 min" },
        { name: "Gelnaglar Färg/Fransk", price: "450 kr", time: "70 min" },
        { name: "Gelnaglar Chrome/Glitter", price: "500 kr", time: "70 min" },
        { name: "Avancerad Nageldesign", price: "550 kr", time: "90 min" },
      ],
      description: "Glansiga, hållbara gelnaglar som håller i veckor",
      icon: "💅",
    },
    {
      category: "Akrylnaglar",
      items: [
        { name: "Akrylnaglar Naturlig", price: "450 kr", time: "60 min" },
        { name: "Akrylnaglar Färg/Fransk", price: "500 kr", time: "70 min" },
        { name: "Akrylnaglar Chrome", price: "550 kr", time: "70 min" },
        { name: "Avancerad Nageldesign", price: "650 kr", time: "110 min" },
      ],
      description: "Starka och slitstarka akrylnaglar för långvarigt resultat",
      icon: "✨",
    },
    {
      category: "Fransar & Bryn",
      items: [
        { name: "Klassiska Fransar", price: "550 kr", time: "75 min" },
        { name: "Mix Fransar", price: "650 kr", time: "85 min" },
        { name: "Lash Lift & Färgning", price: "595 kr", time: "50 min" },
        { name: "Lash + Brow Lift", price: "995 kr", time: "60 min" },
      ],
      description: "Vackra fransar och välformade bryn som framhäver dina ögon",
      icon: "👁️",
    },
    {
      category: "Pedikyr",
      items: [
        { name: "Zen Pedikyr (utan färg)", price: "400 kr", time: "50 min" },
        { name: "Lyx Pedikyr (med färg)", price: "450 kr", time: "60 min" },
        { name: "Shellac på tånaglar", price: "300 kr", time: "30 min" },
      ],
      description: "Välvårdade fötter som gör dig självsäker från tår till topp",
      icon: "🦶",
    },
  ];

  const testimonials = [
    {
      name: "Emma",
      text: "Jag känner mig så självsäker efter att ha varit hos Her World Studio. Det är mer än bara skönhet, det är en upplevelse av att ta hand om mig själv.",
      rating: 5,
    },
    {
      name: "Sofia",
      text: "Franstilläggen är fantastiska! Hela teamet är så professionellt och gör mig känna mig värderad. Jag rekommenderar det till alla mina vänner.",
      rating: 5,
    },
    {
      name: "Lisa",
      text: "Bästa pedikyr jag någonsin haft. Miljön är så avslappnande och personalen bryr sig verkligen om detaljer. Helt värt det!",
      rating: 5,
    },
    {
      name: "Riza Hope Molo",
      text: "Amazing work! She really is very meticulous in every nail. I didn't feel rushed like other nail salons. Very very happy and will come back again! Glad I found this gem 🥰",
      rating: 5,
    },
    {
      name: "Johanna H Lundgren",
      text: "Esmee is amazing. Very talented and detailed . Will come again!",
      rating: 5,
    },
    {
      name: "Liv Ekström",
      text: "Really lovely service and super nice results!!",
      rating: 5,
    },
    {
      name: "Katerina",
      text: "Jättefina! Aldrig varit nöjdare med mina naglar! Första gången jag har varit här och kommer definitivt komma tillbaka! Hon tar sin tid, gör naglarna fint o nogrannt! Gjorde dom bättre än min inspo bild! Sjukt nöjd!!!",
      rating: 5,
    },
    {
      name: "Melinda",
      text: "Hon är super duktig & jätte noggrann!!\nKommer definitivt fortsätta att göra mina här✨",
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
          <div className="text-2xl font-bold">
            Her World <span className="text-red-600">Studio</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="font-medium text-gray-800 hover:text-red-600 transition">
              Tjänster
            </a>
            <a href="#about" className="font-medium text-gray-800 hover:text-red-600 transition">
              Om Oss
            </a>
            <a href="#contact" className="font-medium text-gray-800 hover:text-red-600 transition">
              Kontakt
            </a>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              Boka Nu
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-white py-20 md:py-32 relative overflow-hidden" style={{backgroundColor: '#640606'}}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full -mr-48 -mt-48 opacity-50" />
        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Din Tid.<br />
              Ditt Utrymme.<br />
              Din Skönhet.
            </h1>
            <p className="text-lg text-red-50 max-w-lg">
              Upplev lyxig skönhetsvård i vår moderna studio i Helsingborg. Vi firar din styrka och självkänsla genom professionell skönhetsbehandling.
              <br />
              <span className="text-sm font-semibold">2025 Her World Studio.</span>
            </p>
            <div className="flex gap-4 pt-4">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Boka Tid <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-red-700 font-bold"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Se Tjänster
            </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl mx-auto">
            <img
              src="https://cdn.bokadirekt.se/ucdn/895cb9c7-271e-4497-84a4-ead6a7949770/-/quality/better/-/preview/275x275/"
              alt="Her World Studio - Lyxig skönhetsvård"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">Våra Tjänster</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" style={{opacity: '4.7'}} />
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Upptäck vårt kompletta utbud av professionell nagel- och skönhetsvård, varje behandling utförd med precision och omsorg.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition border-2 border-gray-200 hover:border-red-600">
                <div className="text-white p-6" style={{backgroundColor: '#640606'}}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{service.category}</h3>
                      <p className="text-red-100 text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
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
              Boka denna tjänst
            </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Varför välja Her World Studio?</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💅", title: "Erfarna Nageltekniker", desc: "Över 8 års erfarenhet av nagel- och skönhetsvård" },
              { icon: "🏥", title: "Sanitet", desc: "Högsta hygienstandarder för din säkerhet" },
              { icon: "🎨", title: "30+ Designalternativ", desc: "Oändliga möjligheter för dina naglar" },
              { icon: "❗", title: "Endast EN KUND åt gången", desc: "Vi ger varje kund personlig uppmärksamhet och fokus" },
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
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Möt Vår Stjärna</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden border-2 border-red-600 hover:shadow-2xl transition">
              <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
                {/* Esmee's Photo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/dacc7ad7-8bb0-4217-8139-7fc201b2cd0a/-/resize/200x/"
                      alt="Esmee B - Nageltekniker"
                      className="w-48 h-48 rounded-lg object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-red-600 text-white rounded-full p-4 text-center shadow-lg">
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-xs">av 5</div>
                    </div>
                  </div>
                </div>
                {/* Esmee's Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Esmee B</h3>
                    <p className="text-red-600 font-semibold text-lg mb-4">Nageltekniker, Fransstylist & Lash and Brow Artist</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="font-bold text-gray-900">500+ Positiva Recensioner</p>
                        <p className="text-gray-600 text-sm">Från nöjda klienter på Bokadirekt</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💼</span>
                      <div>
                        <p className="font-bold text-gray-900">8+ År Erfarenhet</p>
                        <p className="text-gray-600 text-sm">Certifierad med professionella produkter från Lilly Nails</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <p className="font-bold text-gray-900">Specialisering</p>
                        <p className="text-gray-600 text-sm">Gelnaglar, Akrylnaglar, Nageldesign, Franstillägning & Bryn</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic pt-4 border-t border-gray-200">
                    Jag älskar att göra andra självsäkra och vackra. Varje nagel är en konstverk.
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
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Betyg</h2>
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
                Nästa Betyg
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
              alt="Her World Studio interiör"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Om Her World Studio</h2>
            <div className="w-12 h-1 bg-red-600" />
            <p className="text-lg text-gray-700">
              Her World Studio grundades med en passion för skönhet och självvård. Vi är en privat, mysig och modern studio där du kan koppla av och njuta av professionell skönhetsbehandling.
            </p>
            <p className="text-lg text-gray-700">
              Med över 8 års erfarenhet inom nagel- och skönhetsvård använder våra certifierade tekniker endast högkvalitativa produkter och medicinsk sanitet för att säkerställa din säkerhet och tillfredsställelse.
            </p>
            <p className="text-lg text-gray-700">
              Vi tror att skönhet är personligt, och varje klient förtjänar en skräddarsydd upplevelse. Oavsett om du letar efter en snabb manikyr eller en utarbetad nageldesign, är vi här för att göra dig självsäker och vacker.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 md:py-32 bg-red-600 text-white">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Redo att Boka?</h2>
          <p className="text-lg text-red-50 mb-8">
            Reservera din tid nu och upplev lyxig skönhetsvård i Helsingborg.
          </p>

          <div className="bg-white text-gray-900 p-8 rounded-lg">
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Öppna Bokningssystem
            </Button>
          </div>

          <p className="text-red-50 mt-6 font-medium">
            Eller ring oss på <span className="font-bold">073-464 3339</span>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Kontakta Oss</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <a href="https://www.google.com/maps/place/Her+World+Studio/@56.0351022,12.7140577,17z/data=!3m1!4b1!4m15!1m8!3m7!1s0x4652330038290c19:0xdd9fd2af51020e02!2sHer+World+Studio!8m2!3d56.0350992!4d12.7166326!10e1!16s%2Fg%2F11zk7nssp_!3m5!1s0x4652330038290c19:0xdd9fd2af51020e02!8m2!3d56.0350992!4d12.7166326!16s%2Fg%2F11zk7nssp_?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600 cursor-pointer">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Adress</h3>
                <p className="text-gray-600">
                  Närlundavägen 8J<br />
                  252 75 Helsingborg<br />
                  Sverige
                </p>
              </Card>
            </a>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">
                <a href="tel:073-464-3339" className="hover:text-red-600 transition font-semibold">
                  073-464 33 39
                </a>
                <br />
                <span className="text-sm">Mån–Fre: 09:00–20:30<br />Lör–Sön: 10:00–18:00</span>
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600 cursor-pointer" onClick={() => setIsHoursModalOpen(true)}>
              <Mail className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Öppettider</h3>
              <p className="text-gray-600">
                <span className="block text-sm">Ring oss utanför öppettid! 📞✨</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Öppettider</h2>
                <button
                  onClick={() => setIsHoursModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Måndag", hours: "10:00 - 20:30" },
                  { day: "Tisdag", hours: "09:00 - 20:30" },
                  { day: "Onsdag", hours: "09:00 - 20:30" },
                  { day: "Torsdag", hours: "09:00 - 20:30" },
                  { day: "Fredag", hours: "09:00 - 20:30" },
                  { day: "Lördag", hours: "10:00 - 18:00" },
                  { day: "Söndag", hours: "10:00 - 18:00" },
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
            Närlundavägen 8J, 252 75 Helsingborg, Sverige | 073-464-3339
          </p>
        </div>
      </footer>
    </div>
  );
}
