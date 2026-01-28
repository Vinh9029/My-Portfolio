// e:\MyPortfolio\my-portoflio\app\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Facebook, Mail, ChevronDown, ExternalLink, CheckCircle,
    Code2, Brain, Terminal, Cpu, Database, Award
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push('/login')}
                    role="button"
                >
                    <Cpu className="text-cyan-500" />
                    <span className="text-slate-100">DQUOCVINH<span className="text-cyan-500">.AI</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                    {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hover:text-cyan-400 transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

const Section = ({ children, id, className = "", style }: { children: React.ReactNode, id?: string, className?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-24 px-6 md:px-12 relative bg-cover bg-center bg-no-repeat bg-fixed ${className}`} style={style}>
        {style?.backgroundImage && (
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] z-0"></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
            {children}
        </div>
    </section>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-16">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white flex items-center gap-3"
        >
            <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block"></span>
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 mt-4 ml-5 text-lg max-w-2xl"
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

// --- Data ---
const skills = [
    { category: "Core AI & ML", icon: <Brain className="w-6 h-6 text-purple-400" />, items: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Transformers", "LLMs"] },
    { category: "Languages", icon: <Code2 className="w-6 h-6 text-cyan-400" />, items: ["Python", "C++", "Java", "TypeScript", "SQL"] },
    { category: "Data Engineering", icon: <Database className="w-6 h-6 text-emerald-400" />, items: ["Pandas", "NumPy", "Apache Spark", "MongoDB", "Vector DBs"] },
    { category: "DevOps & Tools", icon: <Terminal className="w-6 h-6 text-orange-400" />, items: ["Docker", "Git", "Linux", "AWS", "CI/CD"] }
];

const projects = [
    { title: "Face Recognition System", desc: "Real-time face detection and recognition system.", tags: ["Python", "OpenCV", "CNN", "FaceNet"], link: "#", color: "from-blue-500 to-cyan-500" },
    { title: "Context-Aware NLP Chatbot", desc: "Intelligent chatbot built with Transformer architecture.", tags: ["PyTorch", "HuggingFace", "BERT", "FastAPI"], link: "#", color: "from-purple-500 to-pink-500" },
    { title: "Autonomous Drone Navigation", desc: "Simulation of autonomous drone pathfinding.", tags: ["Reinforcement Learning", "Unity", "Python", "PPO"], link: "#", color: "from-emerald-500 to-teal-500" },
    { title: "AI Recommendation Engine", desc: "Collaborative filtering system suggesting products.", tags: ["Scikit-learn", "Redis", "System Design"], link: "#", color: "from-orange-500 to-red-500" }
];

const certificates = [
  { 
    title: "Professional AI Certification", 
    issuer: "Coursera", 
    date: "2023", 
    desc: "Advanced certification in deep learning architectures and computer vision systems.", 
    verifyUrl: "https://coursera.org/verify/123",
    imageUrl: "/cert-placeholder.png" 
  },
  { 
    title: "Data Science Specialization", 
    issuer: "Udemy", 
    date: "2022", 
    desc: "Comprehensive curriculum covering statistical analysis, machine learning, and data visualization.", 
    verifyUrl: "https://udemy.com/certificate/UC-123",
    imageUrl: "/cert-placeholder.png"
  }
];

const experience = [
    { year: "2023 - Present", role: "BSc Computer Science (AI)", org: "Ton Duc Thang University", desc: "Specializing in Artificial Intelligence. GPA: 3.8/4.0." },
    { year: "2022", role: "AI Research Intern", org: "TechStart Lab", desc: "Assisted in data preprocessing and model training." }
];

export default function Home() {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 pt-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[100px]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-4xl"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wide">
                        AVAILABLE FOR INTERNSHIPS
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Intelligence</span> <br />
                        from Data.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Hi, I'm <strong className="text-white">Vinh</strong>. An AI Engineering Student passionate about Machine Learning, Deep Learning, and solving real-world problems with code.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#projects" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 w-full sm:w-auto">
                            View My Work
                        </a>
                        <a href="#contact" className="px-8 py-4 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 text-white rounded-full font-semibold transition-all w-full sm:w-auto">
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="animate-bounce" size={24} />
                </motion.div>
            </section>

            {/* About Section */}
            <Section id="about" className="bg-slate-900/20">
                <SectionTitle subtitle="Get to know me better">About Me</SectionTitle>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-slate-400 leading-relaxed"
                    >
                        <p>I am a second-year Computer Science student at the <span className="text-white font-medium">University of Science</span>, specializing in <span className="text-cyan-400 font-medium">Artificial Intelligence</span>.</p>
                        <p>My journey began with a curiosity about how machines learn. Today, I'm building neural networks and exploring the frontiers of Computer Vision and NLP.</p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            {[{ label: "Major", value: "Computer Science (AI)" }, { label: "Focus", value: "Deep Learning & MLOps" }, { label: "Location", value: "Ho Chi Minh City" }].map((item, idx) => (
                                <div key={idx} className="px-5 py-3 bg-slate-900 rounded-xl border border-slate-800">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                                    <div className="text-slate-200 font-medium">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative aspect-square rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
                            <div className="text-center p-8">
                                <Brain size={80} className="text-cyan-500/50 mx-auto mb-4" />
                                <p className="text-slate-600 text-sm">Profile Image Placeholder</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Skills Section */}
            <Section id="skills">
                <SectionTitle subtitle="My technical toolkit">Technical Skills</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                                    {skillGroup.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white">{skillGroup.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-slate-950 text-slate-400 text-sm rounded-full border border-slate-800 group-hover:text-cyan-100 group-hover:border-cyan-500/20 transition-all">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Projects Section */}
      <Section id="projects" style={{ backgroundImage: "url('/homepage2.png')" }}>
                <SectionTitle subtitle="Some things I've built">Featured Projects</SectionTitle>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all hover:-translate-y-1"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`}></div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                    <a href={project.link} className="text-slate-500 hover:text-white transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                                <p className="text-slate-400 mb-8 leading-relaxed h-20 overflow-hidden">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono font-medium text-cyan-300 bg-cyan-950/50 px-3 py-1.5 rounded-md border border-cyan-900/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/vinh9029" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors border-b border-cyan-500/30 hover:border-cyan-400 pb-0.5">
                        View more on GitHub <Github size={16} />
                    </a>
                </div>
            </Section>

            {/* Certificates Section */}
            <Section id="certificates">
                <SectionTitle subtitle="Professional certifications and achievements">Certificates</SectionTitle>
                <div className="grid md:grid-cols-2 gap-6">
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all group overflow-hidden flex flex-col"
                        >
              {/* Certificate Image / Link Area */}
              <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="relative h-48 bg-slate-950 block overflow-hidden group-hover:opacity-90 transition-opacity">
                 {/* Replace src with cert.imageUrl when you have real images */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-950">
                    <Award size={48} className="opacity-20" />
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm border border-slate-800">
                      <CheckCircle size={12} /> Verified
                    </span>
                 </div>
                 {/* <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" /> */}
              </a>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                  <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-950">{cert.date}</span>
                                </div>
                <div className="text-cyan-500/80 text-sm font-medium mb-4">{cert.issuer}</div>
                <p className="text-slate-400 leading-relaxed text-sm mb-4">{cert.desc}</p>
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="mt-auto text-sm text-slate-500 hover:text-white inline-flex items-center gap-1 transition-colors">
                  View Credential <ExternalLink size={12} />
                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Experience Section */}
      <Section id="experience" style={{ backgroundImage: "url('/homepage1.png')" }}>
                <SectionTitle subtitle="My academic and professional journey">Experience</SectionTitle>
                <div className="max-w-3xl mx-auto">
                    <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 pb-4">
                        {experience.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8 md:pl-12"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                                    <span className="text-sm font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50 w-fit">{item.year}</span>
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                </div>
                                <div className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                    {item.org}
                                </div>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact" className="py-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-16 rounded-3xl border border-slate-800 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Let's Work Together</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
                        I'm currently looking for internship opportunities or collaboration on AI projects.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <a href="mailto:email@example.com" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 hover:bg-cyan-50 rounded-full font-bold transition-all hover:scale-105">
                            <Mail size={20} />
                            Say Hello
                        </a>
                        <div className="flex justify-center gap-4">
                            <a href="https://github.com/vinh9029" target="_blank" rel="noreferrer" className="p-4 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-all text-slate-300 border border-slate-700 hover:border-slate-600">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-all text-slate-300 border border-slate-700 hover:border-slate-600">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://www.facebook.com/8129029sng" target="_blank" rel="noreferrer" className="p-4 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-all text-slate-300 border border-slate-700 hover:border-slate-600">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950">
                <p>© {new Date().getFullYear()} Duong Quoc Vinh. Built with Next.js, Tailwind & Framer Motion.</p>
            </footer>
        </div>
    );
}
