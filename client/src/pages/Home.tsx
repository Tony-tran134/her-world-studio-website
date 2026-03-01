import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Phone, Mail, Star, Calendar } from "lucide-react";
import { useState } from "react";

/**
 * Her World Studio - Women Empowerment Design
 * Bold red (#d32f2f), white, and black color scheme
 * Swedish language, prominent booking features
 * Animations suitable for all ages
 */

export default function Home() {
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
      <section className="bg-red-600 text-white py-20 md:py-32 relative overflow-hidden">
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
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                Boka Tid <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-red-700 font-bold">
                Se Tjänster
              </Button>
            </div>
          </div>
          <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-nail-art-ao2ZnDUY7Na4jcBeUFjcmb.webp"
              alt="Lyxiga naglar"
              className="w-full h-full object-cover"
            />
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
              { icon: "👩‍💼", title: "Erfarna Tekniker", desc: "Över 8 års erfarenhet av nagel- och skönhetsvård" },
              { icon: "🏥", title: "Medicinsk Sanitet", desc: "Högsta hygienstandarder för din säkerhet" },
              { icon: "🎨", title: "100+ Designalternativ", desc: "Oändliga möjligheter för dina naglar" },
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
                <div className="bg-red-600 text-white p-6">
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
                    onClick={() => setSelectedService(service.category)}
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

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Betyg</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
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

          {bookingSubmitted ? (
            <div className="bg-white text-red-600 p-8 rounded-lg border-4 border-white">
              <p className="text-lg font-bold">✓ Tack! Vi kontaktar dig snart för att bekräfta din bokning.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="bg-white text-gray-900 p-8 rounded-lg flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Din e-postadress"
                value={bookingEmail}
                onChange={(e) => setBookingEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-600 font-medium"
                required
              />
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 font-bold">
                Boka Nu
              </Button>
            </form>
          )}

          <p className="text-red-50 mt-6 font-medium">
            Eller ring oss på <span className="font-bold">073-464-3339</span>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Kontakta Oss</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Adress</h3>
              <p className="text-gray-600">
                Närlundavägen 8J<br />
                252 75 Helsingborg<br />
                Sverige
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">
                <a href="tel:073-464-3339" className="hover:text-red-600 transition font-semibold">
                  073-464-3339
                </a>
                <br />
                <span className="text-sm">Mån–Fre: 10:00–20:30</span>
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition border-2 border-gray-200 hover:border-red-600">
              <Mail className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Öppettider</h3>
              <p className="text-gray-600">
                <span className="block font-semibold">Måndag–Fredag</span>
                <span className="block font-bold text-red-600">10:00–20:30</span>
                <span className="block text-sm mt-2">Drop-in välkommet!</span>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container text-center">
          <p className="mb-2 font-medium">© 2025 Her World Studio. Alla rättigheter förbehållna.</p>
          <p className="text-gray-400">
            Närlundavägen 8J, 252 75 Helsingborg, Sverige | 073-464-3339
          </p>
        </div>
      </footer>
    </div>
  );
}
