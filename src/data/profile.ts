export const profile = {
  name: "Andre Saputra",
  headline: "Electronics and Telecommunication Engineering Graduate",
  location: "Jakarta Selatan, Indonesia",
  email: "andresaputra07012019@gmail.com",
  linkedin: "https://www.linkedin.com/in/andre-sptr",
  portrait: { src: "/images/andre-saputra.jpg", width: 433, height: 577 },
  cv: { href: "/documents/CV_Andre_Saputra.pdf", filename: "CV_Andre_Saputra.pdf", details: "PDF · 2 pages · 128 KB" },
  hero: {
    eyebrow: "Electronics & Telecommunication Engineering",
    lines: ["Engineering networks.", "Automating operations.", "Building digital solutions."],
    description: "I work across networking, telecommunications operations, data automation, IoT, and web-based applications to build practical technology solutions.",
  },
  about: {
    title: "Technology, Connected.",
    introduction: "I'm Andre, an Electronics and Telecommunication Engineering graduate from Politeknik Caltex Riau. I connect an understanding of physical infrastructure with a hands-on approach to automation and software.",
    description: "Currently an Engineer at PT Nexcom Indonesia, I support radio trunking operations, radio configuration, license registration and activation, and Radio Base Station maintenance.",
    note: "From the network to the application.",
  },
  contact: {
    title: "Have a project or an engineering challenge?",
    description: "Let's connect and explore how networking, automation, and software can support your next project.",
  },
  navigation: [
    { id: "about", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  footer: "Networking. Automation. Digital engineering.",
} as const;

export const interfaceCopy = {
  projects: { title: "Selected Projects.", description: "Practical systems, automation workflows, and digital applications.", detail: "View Details", illustration: "Conceptual interface", count: "05 projects / 2025–2026" },
  expertise: { title: "Where engineering meets automation.", description: "Connected capabilities, from the physical network to the digital experience." },
  experience: { title: "Experience in Practice.", description: "Working with infrastructure, operations, and the people behind them." },
  education: { title: "Education & Credentials." },
  toolkit: { title: "The technical toolkit.", description: "The technologies and tools I work with." },
} as const;
