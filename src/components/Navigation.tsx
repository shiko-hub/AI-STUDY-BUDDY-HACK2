import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Brain, CreditCard, FileText, BookOpen, TrendingUp, Menu, X } from "lucide-react";
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    to: "/",
    icon: Home,
    label: "Home"
  }, {
    to: "/dashboard",
    icon: Brain,
    label: "Dashboard"
  }, {
    to: "/quiz",
    icon: CreditCard,
    label: "Generate Quiz"
  }, {
    to: "/flashcards",
    icon: FileText,
    label: "Flashcards"
  }, {
    to: "/study-guide",
    icon: BookOpen,
    label: "Study Guide"
  }, {
    to: "/progress",
    icon: TrendingUp,
    label: "Progress"
  }];
  return <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">EduBloom</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <NavLink key={item.to} to={item.to} className={({
            isActive
          }) => cn("flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth", isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")}>
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-card border">
              {navItems.map(item => <NavLink key={item.to} to={item.to} className={({
            isActive
          }) => cn("flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth", isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")} onClick={() => setIsMobileMenuOpen(false)}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>)}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;