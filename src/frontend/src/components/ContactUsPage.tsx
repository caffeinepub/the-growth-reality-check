import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, MapPin, Clock, AlertCircle, Award, Users, BookOpen, TrendingUp, MessageCircle, ExternalLink } from 'lucide-react';
import HeroBanner from './HeroBanner';
import { buildWhatsAppUrl, openWhatsApp } from '@/lib/whatsapp';

const WHATSAPP_NUMBER = '918829921156';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      phoneNumber: '',
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegisterNow = () => {
    if (!validateForm()) {
      return;
    }

    // Build WhatsApp URL with form data
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, formData);
    setWhatsappUrl(url);

    // Attempt to open WhatsApp
    const opened = openWhatsApp(url);

    // If opening failed (popup blocked), show fallback UI
    if (!opened) {
      setShowFallback(true);
    } else {
      // Show fallback after a short delay in case the popup was blocked
      setTimeout(() => {
        setShowFallback(true);
      }, 500);
    }
  };

  const handleStartOver = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      city: '',
    });
    setWhatsappUrl(null);
    setShowFallback(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <HeroBanner
        title="Get in Touch"
        subtitle="Contact Us"
        description="Start your journey as a Financial Advisor with Axis Max Life"
      />

      <Card className="border-4 border-primary/30 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-card via-primary/5 to-accent/5">
        <CardHeader className="text-center space-y-4 pb-8 pt-10 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
          <CardTitle className="text-4xl md:text-5xl font-display font-bold gradient-text">Ready to Get Started?</CardTitle>
          <CardDescription className="text-xl md:text-2xl font-semibold text-foreground">
            Fill in your details and we'll get back to you about our next training batch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10 pb-12 pt-10">
          {showFallback && whatsappUrl ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border-2 border-primary/20 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-gradient-to-br from-primary to-accent p-4 shadow-glow-lg">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold gradient-text">Opening WhatsApp...</h3>
                <p className="text-lg md:text-xl text-foreground font-semibold">
                  We're redirecting you to WhatsApp with your information pre-filled.
                </p>
                <p className="text-base md:text-lg text-muted-foreground font-medium">
                  हम आपको व्हाट्सएप पर भेज रहे हैं।
                </p>
                
                <div className="pt-4 space-y-4">
                  <p className="text-base text-muted-foreground font-medium">
                    If WhatsApp didn't open automatically, click the button below:
                  </p>
                  <Button
                    size="lg"
                    onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
                    className="text-xl font-bold h-16 px-12 rounded-2xl shadow-glow-lg pulse-glow group hover:scale-105 transition-transform duration-300"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Open WhatsApp
                    <ExternalLink className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleStartOver}
                  className="text-lg font-semibold h-14 px-10 rounded-xl border-2"
                >
                  Submit Another Form
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-card rounded-2xl p-8 space-y-6 border-2 border-border shadow-lg">
                <h4 className="text-2xl font-display font-bold text-center">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-base font-bold">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`h-14 text-lg rounded-xl border-2 ${errors.fullName ? 'border-destructive' : ''}`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phoneNumber" className="text-base font-bold">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneNumber: e.target.value });
                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                      }}
                      className={`h-14 text-lg rounded-xl border-2 ${errors.phoneNumber ? 'border-destructive' : ''}`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="city" className="text-base font-bold">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-14 text-lg rounded-xl border-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleRegisterNow}
                  className="text-xl font-bold h-16 px-12 rounded-2xl shadow-glow-lg pulse-glow group hover:scale-105 transition-transform duration-300"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Send via WhatsApp
                </Button>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <Card className="border-2 border-primary/20 rounded-2xl hover-lift bg-gradient-to-br from-card to-primary/5">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-4 shadow-glow-sm">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Phone</h3>
                    <p className="text-muted-foreground text-lg font-medium">+91 88299 21156</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 rounded-2xl hover-lift bg-gradient-to-br from-card to-accent/5">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-accent to-primary p-4 shadow-glow-accent">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Business Hours</h3>
                    <p className="text-muted-foreground text-lg font-medium">Mon - Sat: 9 AM - 6 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20 rounded-2xl">
            <CardContent className="pt-8 pb-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-4 shadow-glow-sm">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl">Office Address</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                    Axis Max Life Insurance<br />
                    Corporate Office<br />
                    India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 rounded-2xl p-8 border-2 border-accent/20">
            <h3 className="font-display font-bold text-2xl mb-6 text-center gradient-text">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                <Award className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground font-medium">Comprehensive training program for aspiring Financial Advisors</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                <BookOpen className="w-6 h-6 text-accent shrink-0 mt-1" />
                <span className="text-foreground font-medium">Industry-recognized certification upon completion</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground font-medium">Flexible learning schedules to fit your lifestyle</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                <Users className="w-6 h-6 text-accent shrink-0 mt-1" />
                <span className="text-foreground font-medium">Expert mentorship and ongoing support</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 md:col-span-2">
                <TrendingUp className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground font-medium">Career opportunities with Axis Max Life Insurance</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
