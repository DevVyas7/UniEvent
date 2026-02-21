import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, CalendarDays, Users, Building2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { events, users } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const totalEvents = events.length;
  const totalDepartments = Array.from(new Set(events.map(e => e.department))).length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');
  const highlightEvents = events.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">UniEvent</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Explore</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-slate-950">
          {heroImage && (
            <div className="absolute inset-0 z-0 opacity-40">
               <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>
          )}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8">
              <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10 px-4 py-1.5 text-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Empowering Campus Collaboration
              </Badge>
              <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-white">
                One Portal. <br />
                <span className="text-primary-foreground/80">Every Campus Event.</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                The unified platform for university departments to host festivals, workshops, and seminars. Empowering students with a single click to their next big achievement.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-bold shadow-2xl shadow-accent/20">
                  <Link href="/login">Explore Events</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10">
                  <Link href="/login">Dept. Portal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* University Stats Bar */}
        <section className="bg-primary py-12 border-y border-primary-foreground/10 shadow-inner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-primary-foreground text-center">
              <div className="space-y-1">
                <div className="text-4xl md:text-5xl font-black">{totalEvents}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Events Hosted</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl md:text-5xl font-black">{totalDepartments}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Active Departments</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl md:text-5xl font-black">{totalStudents}+</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Students Engaged</div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Events */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight">University Highlights</h3>
                <p className="text-muted-foreground text-lg">See what's happening across our various campuses this week.</p>
              </div>
              <Button variant="ghost" asChild className="group">
                <Link href="/login" className="flex items-center gap-2">
                  View All Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlightEvents.map((event, i) => (
                <Card key={event.id} className="group border-none shadow-xl hover:shadow-2xl transition-all overflow-hidden bg-card">
                  <div className="relative h-48 w-full bg-slate-200">
                    <Image 
                      src={PlaceHolderImages[i % PlaceHolderImages.length].imageUrl}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-primary/90 backdrop-blur-sm border-none shadow-lg">
                        {event.department}
                       </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{event.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter mt-1">
                      <CalendarDays className="w-3.5 h-3.5 text-primary" />
                      {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                    <Button variant="link" className="px-0 mt-4 h-auto text-accent" asChild>
                      <Link href="/login">Read Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24 bg-card overflow-hidden relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="space-y-8">
                <h3 className="text-4xl font-bold tracking-tight leading-tight">Tailored for the <br /><span className="text-primary underline decoration-accent/30 underline-offset-8">Academic Experience</span></h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  UniEvent isn't just an event tracker. It's an ecosystem designed to bridge the gap between departmental planning and student achievement.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl h-fit">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Verified Academic Credits</h4>
                      <p className="text-muted-foreground">Automatically track and verify ECTS or departmental credits for students through event attendance.</p>
                    </div>
                  </div>
                   <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl h-fit">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Centralized Management</h4>
                      <p className="text-muted-foreground">Coordinators can manage multiple events, track enrollment, and download participant rosters in one place.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full opacity-50" />
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <Card className="border-none shadow-2xl translate-y-8">
                    <CardHeader className="p-8 text-center">
                      <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-accent" />
                      </div>
                      <CardTitle className="text-xl">Student Hub</CardTitle>
                      <CardDescription className="mt-2">Join events from any department with ease.</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="border-none shadow-2xl">
                    <CardHeader className="p-8 text-center">
                      <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <CalendarDays className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Dept. Tools</CardTitle>
                      <CardDescription className="mt-2">Plan, organize, and track with smart roster tools.</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
             <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-1 rounded-md">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">UniEvent</h1>
            </Link>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/login" className="hover:text-white transition-colors">Find Events</Link>
              <Link href="/login" className="hover:text-white transition-colors">Faculty Portal</Link>
              <Link href="/login" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} UniEvent. Built for the future of academic campus collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
