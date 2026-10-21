export type ProjectKind = "tickets" | "automation" | "fire" | "assistant" | "finance";
export type Project = {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  organization: string;
  category: string;
  description: string;
  need: string;
  functions: string[];
  role: string;
  kind: ProjectKind;
};

export const projects: Project[] = [
  {
    id: "sitiket", name: "SiTiket", subtitle: "Network Fault Ticket Management", period: "Feb–Jun 2026",
    organization: "PT Telkom Infrastruktur Indonesia", category: "Web Application", kind: "tickets",
    description: "A web-based network fault ticket management system designed to track, manage, and follow up on network disturbance tickets.",
    need: "Tracking and following up on network disturbance tickets.",
    functions: ["Track network fault tickets", "Manage disturbance records", "Follow up on network issues"],
    role: "Developed the web-based fault ticket management system.",
  },
  {
    id: "daily-recap", name: "Daily Fault Recap", subtitle: "Automated WhatsApp Bot", period: "Jan–Feb 2026",
    organization: "PT Telkom Infrastruktur Indonesia", category: "Data Automation", kind: "automation",
    description: "An automated WhatsApp bot developed to extract daily fault ticket data, populate spreadsheets, and capture required screenshots for operational reporting.",
    need: "Routine preparation of daily fault ticket recaps for operational reporting.",
    functions: ["Extract daily fault ticket data", "Populate spreadsheets", "Capture required reporting screenshots"],
    role: "Developed the automated WhatsApp reporting bot.",
  },
  {
    id: "firesense", name: "FireSense", subtitle: "Real-Time Fire Monitoring", period: "Jan–Jul 2025",
    organization: "Politeknik Caltex Riau", category: "Monitoring Application", kind: "fire",
    description: "A real-time fire detection and monitoring application designed to support early warning systems.",
    need: "Fire detection and monitoring to support early warning.",
    functions: ["Real-time fire detection", "Monitoring to support early warning systems"],
    role: "Designed and developed the fire monitoring application.",
  },
  {
    id: "aet-ai", name: "AET AI PCR", subtitle: "AI-Powered Information Platform", period: "Sep–Oct 2025",
    organization: "Politeknik Caltex Riau", category: "AI Application", kind: "assistant",
    description: "An AI-powered web platform developed to streamline information access and automate responses for the AET Student Association.",
    need: "Access to information for the AET Student Association.",
    functions: ["Provide web-based access to information", "Automate responses using AI"],
    role: "Developed the AI-powered information platform.",
  },
  {
    id: "fiscal-ai", name: "Fiscal AI Finance", subtitle: "Personal Financial Tracking", period: "Jul–Sep 2025",
    organization: "Personal Project", category: "AI Application", kind: "finance",
    description: "A web-based personal finance application that uses AI to automate expense categorization and support financial data analysis.",
    need: "Categorizing personal expenses and analyzing financial data.",
    functions: ["Automate expense categorization using AI", "Support financial data analysis"],
    role: "Developed the personal finance web application.",
  },
];
