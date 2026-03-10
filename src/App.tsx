import { motion } from "motion/react";
import { ArrowRight, Sparkles, Disc, Zap, Layers } from "lucide-react";

const navLinks = ["Stories", "Listen", "Team", "Tools"];

const boxes = [
  {
    title: "Shop with Klarna.",
    subtitle: "Enjoy buyer protection when you pay with Klarna.",
    buttonBg: "bg-[#F09B36]",
    buttonTextCol: "text-white",
    image: "https://picsum.photos/seed/shopping/600/800?blur=2",
    icon: <Sparkles className="w-32 h-32 text-white/20" />,
    buttonText: "Explore stores",
  },
  {
    title: "Discover Music.",
    subtitle: "Find your next favorite track with our curated playlists.",
    buttonBg: "bg-[#A68A56]",
    buttonTextCol: "text-white",
    image: "https://picsum.photos/seed/music/600/800?blur=2",
    icon: <Disc className="w-32 h-32 text-white/20" />,
    buttonText: "Start listening",
  },
  {
    title: "Lightning Fast.",
    subtitle: "Experience speeds like never before on our new platform.",
    buttonBg: "bg-white",
    buttonTextCol: "text-[#3A2613]",
    image: "https://picsum.photos/seed/fast/600/800?blur=2",
    icon: <Zap className="w-32 h-32 text-white/20" />,
    buttonText: "Upgrade now",
  },
  {
    title: "Build Together.",
    subtitle: "Collaborate with your team in real-time, anywhere.",
    buttonBg: "bg-[#D98528]",
    buttonTextCol: "text-white",
    image: "https://picsum.photos/seed/team/600/800?blur=2",
    icon: <Layers className="w-32 h-32 text-white/20" />,
    buttonText: "Invite team",
  }
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col p-6 md:p-10 font-sans selection:bg-white selection:text-[#F09B36] overflow-x-hidden text-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-between items-center mb-12 md:mb-16 z-10"
      >
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[#A68A56] rounded-full" />
          </div>
          Brand Design
        </div>
        
        <div className="hidden md:flex items-center gap-6 font-bold text-sm">
          {navLinks.map((link) => (
            <a key={link} href="#" className="hover:opacity-60 transition-opacity">
              {link}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-[1400px] mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-center mb-12 md:mb-20 w-full"
        >
          <h1 className="font-display text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter leading-[0.85]">
            Creative <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Excellence</span>
          </h1>
        </motion.div>

        {/* 4 Boxes Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
        >
          {boxes.map((box, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="relative overflow-hidden rounded-3xl flex flex-col h-[300px] md:h-[380px] cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow border border-white/10"
            >
              {/* Background Image */}
              <img 
                src={box.image} 
                alt={box.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1108] via-[#3A2613]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative Background Elements */}
              <div className="absolute -right-8 -top-8 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 ease-out z-10">
                {box.icon}
              </div>
              
              <div className="mt-auto relative z-20 p-8">
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight tracking-tight text-white">
                  {box.title}
                </h3>
                <p className="text-sm md:text-base text-white/80 mb-8 max-w-[90%] font-medium">
                  {box.subtitle}
                </p>
                
                <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-transform duration-300 group-hover:translate-x-2 ${box.buttonBg} ${box.buttonTextCol}`}>
                  {box.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
