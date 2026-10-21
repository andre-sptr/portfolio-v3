export const expertise = [
  { id: "network", title: "Networking & Telecommunications", icon: "network", description: "The infrastructure that keeps systems connected.", skills: ["Network Configuration", "Routing & Switching", "Network Troubleshooting", "Radio Trunking Operations", "Telecommunications Operations"] },
  { id: "automation", title: "Operations & Automation", icon: "workflow", description: "Bringing structure to everyday operational work.", skills: ["Operational Data Management", "SLA & KPI Monitoring", "Data Automation", "Reporting Workflows", "Bot Development"] },
  { id: "iot", title: "IoT & Embedded Systems", icon: "cpu", description: "Connecting physical devices with digital systems.", skills: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Embedded Systems"] },
  { id: "software", title: "Software & Digital Applications", icon: "code", description: "Building practical web and AI-powered applications.", skills: ["Python", "TypeScript", "C/C++", "PHP", "CI", "Laravel", "Node.js", "AI-Powered Applications"] },
] as const;

export const toolkit = [
  { category: "Networking & Telecommunications", items: ["Network Configuration & Troubleshooting", "Routing & Switching", "Radio Trunking Operations"] },
  { category: "Operations & Automation", items: ["Operational Data Management", "SLA & KPI Monitoring", "Data Automation", "Bot Development"] },
  { category: "IoT & Embedded Systems", items: ["Arduino", "ESP32", "Raspberry Pi", "MQTT"] },
  { category: "Programming & Web Development", items: ["Python", "TypeScript", "C/C++", "PHP", "CI", "Laravel", "Node.js"] },
  { category: "Tools", items: ["Microsoft Office", "MATLAB", "Arduino IDE", "Visual Studio Code"] },
  { category: "Languages", items: ["Bahasa Indonesia · Native", "English · Intermediate"] },
  { category: "Working together", items: ["Operational coordination", "Data management", "Problem solving", "Communication"] },
] as const;
