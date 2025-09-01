import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  Target,
  DollarSign,
  Calendar,
  Award,
  Rocket,
  BarChart3,
  Globe
} from "lucide-react";

const PitchDeck = () => {
  const slides = [
    {
      id: 1,
      title: "AI-Powered E-Commerce Platform",
      subtitle: "Revolutionizing Online Shopping with Intelligent Recommendations",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Next-generation mobile commerce platform combining AI recommendations, 
            seamless payments, and real-time messaging for the ultimate shopping experience.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="px-4 py-2">AI-Powered</Badge>
            <Badge variant="secondary" className="px-4 py-2">Mobile-First</Badge>
            <Badge variant="secondary" className="px-4 py-2">Real-Time</Badge>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Current E-Commerce Limitations",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Poor Discovery</h4>
              <p className="text-sm">90% of products go undiscovered due to ineffective search and browsing</p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Generic Experience</h4>
              <p className="text-sm">One-size-fits-all approach leads to 70% cart abandonment rates</p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Complex Payments</h4>
              <p className="text-sm">Complicated checkout processes cause 25% of users to abandon purchases</p>
            </div>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-elegant">
            <div className="text-6xl font-bold text-destructive mb-4">$4.9T</div>
            <p className="text-muted-foreground">
              Global e-commerce market size with massive room for optimization through AI and better UX
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "AI-First Mobile Commerce Platform",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>AI analyzes behavior patterns to suggest perfect products</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Mobile-First Design</CardTitle>
              <CardDescription>Optimized for mobile commerce with React Native</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Instasend Integration</CardTitle>
              <CardDescription>Seamless local payment processing for African markets</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    },
    {
      id: 4,
      title: "Key Features",
      subtitle: "Comprehensive E-Commerce Solution",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Core Features</h4>
            {[
              "AI-powered product recommendations",
              "Real-time chat & customer support",
              "Advanced search & filtering",
              "Secure payment processing",
              "Order tracking & management",
              "Multi-vendor marketplace support"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Premium Features</h4>
            {[
              "Personalized shopping experiences",
              "Advanced analytics dashboard",
              "Inventory management system",
              "Multi-currency support",
              "Social commerce integration",
              "WhatsApp Business API integration"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Award className="w-4 h-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Market Opportunity",
      subtitle: "Massive Growth Potential in African E-Commerce",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="p-6 bg-primary/10 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">400%</div>
              <p className="text-muted-foreground">Projected growth in African e-commerce by 2025</p>
            </div>
            <div className="p-6 bg-primary/10 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">$29B</div>
              <p className="text-muted-foreground">African e-commerce market size by 2025</p>
            </div>
            <div className="p-6 bg-primary/10 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <p className="text-muted-foreground">Mobile commerce adoption rate in Africa</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Target Markets</h4>
            <div className="space-y-3">
              <div className="p-3 bg-card rounded-lg border">
                <div className="font-medium">Primary: Kenya, Nigeria, South Africa</div>
                <div className="text-sm text-muted-foreground">High mobile penetration, growing middle class</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="font-medium">Secondary: Ghana, Uganda, Tanzania</div>
                <div className="text-sm text-muted-foreground">Emerging markets with rapid digital adoption</div>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <div className="font-medium">Future: Continental expansion</div>
                <div className="text-sm text-muted-foreground">54 countries, 1.3B+ population</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Technology Stack",
      subtitle: "Modern, Scalable Architecture",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-6">Frontend</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "React Native", desc: "Mobile app" },
                { name: "React", desc: "Web interface" },
                { name: "TypeScript", desc: "Type safety" },
                { name: "Tailwind CSS", desc: "Styling" }
              ].map((tech, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border text-center">
                  <div className="font-medium">{tech.name}</div>
                  <div className="text-sm text-muted-foreground">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6">Backend</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "FastAPI", desc: "Python backend" },
                { name: "Supabase", desc: "Database & auth" },
                { name: "OpenAI", desc: "AI recommendations" },
                { name: "Instasend", desc: "Payments" }
              ].map((tech, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border text-center">
                  <div className="font-medium">{tech.name}</div>
                  <div className="text-sm text-muted-foreground">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "4-Day Development Timeline",
      subtitle: "Rapid MVP Deployment Strategy",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Day 1: Frontend & Core Setup</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Finalize UI/UX screens</li>
                <li>• Set up project repositories</li>
                <li>• Scaffold database schema</li>
                <li>• Implement basic navigation</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Day 2: Backend & Database</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Implement FastAPI backend</li>
                <li>• Build core APIs (auth, products, cart)</li>
                <li>• Connect frontend to backend</li>
                <li>• Test DB queries & API responses</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Day 3: AI + Payment Integration</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Integrate AI recommendation engine</li>
                <li>• Add Instasend payment API</li>
                <li>• Implement checkout flow</li>
                <li>• Basic admin panel</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Day 4: Testing & Deployment</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• End-to-end testing</li>
                <li>• Bug fixes & UI polish</li>
                <li>• Deploy backend & database</li>
                <li>• Package React Native APK</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Business Model & Revenue",
      subtitle: "Multiple Revenue Streams",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Transaction Fees</CardTitle>
              <CardDescription>2-3% commission on each sale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center mb-2">Primary</div>
              <p className="text-sm text-muted-foreground text-center">
                Main revenue from marketplace transactions
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Monthly subscriptions for advanced tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center mb-2">$29/month</div>
              <p className="text-sm text-muted-foreground text-center">
                Analytics, AI insights, priority support
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Advertising</CardTitle>
              <CardDescription>Promoted listings and sponsored content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center mb-2">Future</div>
              <p className="text-sm text-muted-foreground text-center">
                Additional revenue from vendor promotions
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 9,
      title: "Competitive Advantage",
      subtitle: "What Sets Us Apart",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Our Advantages</h4>
              {[
                { icon: Zap, title: "AI-First Approach", desc: "Built from ground up with AI at the core" },
                { icon: Smartphone, title: "Mobile-Native", desc: "Designed specifically for African mobile users" },
                { icon: Globe, title: "Local Payment Integration", desc: "Deep integration with local payment providers" },
                { icon: Users, title: "Community-Driven", desc: "Real-time messaging and social commerce features" }
              ].map((advantage, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{advantage.title}</div>
                    <div className="text-sm text-muted-foreground">{advantage.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card p-6 rounded-xl border">
              <h4 className="text-xl font-semibold mb-4">Market Differentiation</h4>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium text-primary mb-1">vs Traditional E-commerce</div>
                  <div className="text-sm">AI-powered personalization vs generic product catalogs</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium text-primary mb-1">vs International Players</div>
                  <div className="text-sm">Local payment methods and cultural understanding</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium text-primary mb-1">vs Local Competitors</div>
                  <div className="text-sm">Advanced AI technology and mobile-first design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Next Steps & Investment",
      subtitle: "Ready to Scale",
      content: (
        <div className="text-center space-y-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-primary/10 rounded-xl">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">MVP Ready</div>
              <p className="text-muted-foreground">4-day development plan for immediate launch</p>
            </div>
            <div className="p-6 bg-primary/10 rounded-xl">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Scalable Tech</div>
              <p className="text-muted-foreground">Modern architecture ready for millions of users</p>
            </div>
            <div className="p-6 bg-primary/10 rounded-xl">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Market Ready</div>
              <p className="text-muted-foreground">Validated opportunity in high-growth markets</p>
            </div>
          </div>
          <div className="bg-gradient-primary p-8 rounded-xl text-white">
            <h3 className="text-3xl font-bold mb-4">Let's Build the Future of African E-Commerce</h3>
            <p className="text-xl mb-6 text-white/90">
              Join us in revolutionizing how Africa shops online with AI-powered commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Request Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Detailed Business Plan
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI E-Commerce Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Pitch Deck - Revolutionizing African Commerce with AI
          </p>
        </div>

        <div className="space-y-12">
          {slides.map((slide) => (
            <Card key={slide.id} className="shadow-elegant border-primary/20">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Badge variant="outline" className="px-3 py-1">
                    Slide {slide.id}
                  </Badge>
                </div>
                <CardTitle className="text-3xl mb-2">{slide.title}</CardTitle>
                <CardDescription className="text-lg">{slide.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {slide.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;