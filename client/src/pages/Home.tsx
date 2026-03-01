import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, MapPin, Phone, Mail, Star } from "lucide-react";
import { useState } from "react";

/**
 * Her World Studio - Modern Elegance with Gradient Depth
 * Design Philosophy: Soft gradients, glassmorphic cards, sophisticated animations
 * Color Palette: White → pale rose gradient, soft lavender/blush accents, deep rose CTAs
 * Typography: Poppins throughout for consistency and modern feel
 */

export default function Home() {
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

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
        { name: "Gel Nyttset Natural", price: "400 kr", time: "60 min" },
        { name: "Gel Nyttset Färg/French Tip", price: "450 kr", time: "70 min" },
        { name: "Gel Nyttset Chrome/Glitter", price: "500 kr", time: "70 min" },
        { name: "Avancerad Nail Design", price: "550 kr", time: "90 min" },
      ],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-nail-art-ao2ZnDUY7Na4jcBeUFjcmb.webp",
    },
    {
      category: "Acrylic Nails",
      items: [
        { name: "Akryl Nyttset Natural", price: "450 kr", time: "60 min" },
        { name: "Akryl Nyttset Färg/French Tip", price: "500 kr", time: "70 min" },
        { name: "Akryl Nyttset Chrome", price: "550 kr", time: "70 min" },
        { name: "Avancerad Nail Design", price: "650 kr", time: "110 min" },
      ],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-nail-art-ao2ZnDUY7Na4jcBeUFjcmb.webp",
    },
    {
      category: "Lash Extensions",
      items: [
        { name: "Classic Fransar (Lilly Nails)", price: "550 kr", time: "75 min" },
        { name: "Mix Fransar (Lilly Nails)", price: "650 kr", time: "85 min" },
        { name: "Lash Lift & Färgning", price: "595 kr", time: "50 min" },
        { name: "Lash + Brow Lift & Färgning", price: "995 kr", time: "60 min" },
      ],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/service-lash-extensions-dkL8V6tsdsdy5RzBkkQrUd.webp",
    },
    {
      category: "Pedicure",
      items: [
        { name: "Zen Pedicure (utan färg)", price: "400 kr", time: "50 min" },
        { name: "Lyx Pedicure (med färg)", price: "450 kr", time: "60 min" },
        { name: "Shellac/Gellack på tårnaglar", price: "300 kr", time: "30 min" },
      ],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/service-pedicure-XXtaUCYJ6fn4MRTKQcNNbF.webp",
    },
  ];

  const testimonials = [
    {
      name: "Emma",
      text: "Absolutely stunning nails! The team is so professional and the salon is beautifully designed. I feel like I'm at a luxury spa.",
      rating: 5,
    },
    {
      name: "Sofia",
      text: "Her World Studio is my go-to place. The lash extensions are incredible and the aftercare advice is so helpful.",
      rating: 5,
    },
    {
      name: "Lisa",
      text: "Best pedicure I've ever had! The attention to detail and the relaxing atmosphere make it worth every krona.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">
            Her World <span className="text-primary">Studio</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-foreground hover:text-primary transition">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-white">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Time.<br />
              <span className="text-primary">Your Space.</span><br />
              Your Beauty.
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg">
              Experience luxury nail care and beauty treatments in our serene Helsingborg studio. From gel nails to lash extensions, we craft beauty with precision and care.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Book Appointment <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-white/50">
                View Services
              </Button>
            </div>
          </div>
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden glass shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-nail-art-ao2ZnDUY7Na4jcBeUFjcmb.webp"
              alt="Luxury nail art"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white/30 backdrop-blur-sm">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Her World Studio</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "✨", title: "Expert Technicians", desc: "Over 8 years of experience in nail and beauty care" },
              { icon: "🏥", title: "Medical-Grade Sanitation", desc: "Highest hygiene standards for your safety" },
              { icon: "🎨", title: "100+ Design Options", desc: "Endless creative possibilities for your nails" },
            ].map((item, i) => (
              <Card key={i} className="glass p-8 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            Discover our full range of professional nail and beauty treatments, each crafted with precision and care.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="glass overflow-hidden hover:shadow-xl transition group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-primary">{service.category}</h3>
                  <div className="space-y-3">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start pb-3 border-b border-white/20 last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-foreground/60">{item.time}</p>
                        </div>
                        <p className="font-semibold text-primary">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
                    Book This Service
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-white/30 backdrop-blur-sm">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="glass p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 flex-grow italic">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden glass shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663377297271/kwrSPf2AsTFYNn53QXRE4b/hero-salon-interior-WEjYTdxAWJXNCWcHxpLYx2.webp"
              alt="Her World Studio interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">About Her World Studio</h2>
            <p className="text-lg text-foreground/80">
              Founded with a passion for beauty and self-care, Her World Studio is a private, cozy, and modern sanctuary where you can relax and enjoy professional beauty treatments.
            </p>
            <p className="text-lg text-foreground/80">
              With over 8 years of experience in nail and beauty care, our certified technicians use only the highest-quality products and medical-grade sanitation standards to ensure your safety and satisfaction.
            </p>
            <p className="text-lg text-foreground/80">
              We believe that beauty is personal, and every client deserves a tailored experience. Whether you're looking for a quick manicure or an elaborate nail art design, we're here to make you feel confident and beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-lg text-foreground/80 mb-8">
            Reserve your appointment now and experience luxury beauty care in Helsingborg.
          </p>

          {bookingSubmitted ? (
            <div className="glass p-8 rounded-lg border border-primary/30 bg-primary/5">
              <p className="text-lg font-semibold text-primary">✓ Thank you! We'll contact you shortly to confirm your booking.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="glass p-8 rounded-lg flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                value={bookingEmail}
                onChange={(e) => setBookingEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Now
              </Button>
            </form>
          )}

          <p className="text-sm text-foreground/60 mt-6">
            Or call us directly at <span className="font-semibold">073-464-3339</span>
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="glass p-8 text-center hover:shadow-lg transition">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-foreground/70">
                Närlundavägen 8J<br />
                252 75 Helsingborg<br />
                Sweden
              </p>
            </Card>
            <Card className="glass p-8 text-center hover:shadow-lg transition">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-foreground/70">
                <a href="tel:073-464-3339" className="hover:text-primary transition">
                  073-464-3339
                </a>
                <br />
                <span className="text-sm">Mon–Fri: 10:00–20:30</span>
              </p>
            </Card>
            <Card className="glass p-8 text-center hover:shadow-lg transition">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-foreground/70">
                <span className="block">Monday–Friday</span>
                <span className="block font-semibold">10:00–20:30</span>
                <span className="block text-sm mt-2">Walk-ins welcome!</span>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-white/20 py-12">
        <div className="container text-center text-foreground/70">
          <p className="mb-2">© 2026 Her World Studio. All rights reserved.</p>
          <p className="text-sm">
            Närlundavägen 8J, 252 75 Helsingborg, Sweden | 073-464-3339
          </p>
        </div>
      </footer>
    </div>
  );
}
