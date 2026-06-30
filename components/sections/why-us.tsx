import { Shield, Clock, ThumbsUp, Award, Headphones, Leaf } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Vetted Professionals",
    description: "All our staff undergo thorough background checks, training, and verification.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Clock,
    title: "Punctual & Reliable",
    description: "We arrive on time, every time. Your schedule is our priority.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not satisfied? We'll redo the job for free. No questions asked.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "We use premium, eco-friendly products that are safe for your family and pets.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always available via WhatsApp for any queries or rescheduling.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "We use environmentally responsible products that are safe and effective.",
    color: "from-teal-500 to-green-600",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">
            The Kevin Kipkoech Difference
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don&apos;t just clean — we create a healthier, happier environment for you and your loved ones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group flex gap-4 p-6 rounded-2xl border border-border bg-card card-hover"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
