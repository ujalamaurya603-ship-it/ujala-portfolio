import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Skills from '../sections/Skills.jsx'
import Projects from '../sections/Projects.jsx'
import Journey from '../sections/Journey.jsx'
import { Certificates, GithubActivity } from '../sections/Certificates.jsx'
import AskAI from '../sections/AskAI.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certificates />
        <GithubActivity />
        <AskAI />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
