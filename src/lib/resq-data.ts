export type EmergencyType = "Medical Emergency" | "Road Accident" | "Fire" | "Police" | "Other";

export type EmergencyReport = {
  type: EmergencyType;
  description: string;
  location: string;
  coordinates?: string;
  timestamp?: string;
  photoAttached?: boolean;
};

export const REPORT_STORAGE_KEY = "resq-ai-report";

export interface EmergencyProfile {
  code: string;
  severity: "Critical" | "High" | "Moderate";
  confidence: number;
  priority: "IMMEDIATE" | "URGENT" | "REVIEW";
  eta: string;
  response: string;
  unitCallsign: string;
  protocol: string;
  explanation: string;
  riskFactors: string[];
}

export const emergencyProfiles: Record<EmergencyType, EmergencyProfile> = {
  "Medical Emergency": {
    code: "MED-01",
    severity: "High",
    confidence: 89,
    priority: "URGENT",
    eta: "4-6 min",
    response: "Ambulance (ALS Unit)",
    unitCallsign: "Ambulance Unit AMB-204",
    protocol: "AI Recommendation: Immediate Paramedic Assistance",
    explanation:
      "AI analysis of the report indicates acute medical distress. A simulated ambulance response has been prioritized for rapid patient support.",
    riskFactors: [
      "Potential respiratory or cardiovascular symptoms observed",
      "Immediate on-scene first aid and stabilization recommended",
      "Prepare patient details for incoming paramedic team",
    ],
  },
  "Road Accident": {
    code: "RTA-02",
    severity: "Critical",
    confidence: 92,
    priority: "IMMEDIATE",
    eta: "3-5 min",
    response: "Ambulance + Police Traffic Unit",
    unitCallsign: "Ambulance AMB-204 + Patrol Unit 12",
    protocol: "AI Recommendation: Coordinated Medical & Traffic Support",
    explanation:
      "AI analysis detects a vehicular collision with potential injuries and road hazards. A coordinated medical and traffic response team has been recommended.",
    riskFactors: [
      "High-impact collision with possible passenger injuries",
      "Roadway blockage and oncoming traffic hazards",
      "Simultaneous medical aid and traffic control needed",
    ],
  },
  Fire: {
    code: "FIR-03",
    severity: "Critical",
    confidence: 94,
    priority: "IMMEDIATE",
    eta: "3-5 min",
    response: "Fire Rescue Engine + Ambulance",
    unitCallsign: "Fire Engine 07 + Ambulance AMB-108",
    protocol: "AI Recommendation: Fire Rescue & Medical Support",
    explanation:
      "AI analysis identifies immediate thermal and smoke hazards. Coordinated fire suppression with standby medical support is recommended.",
    riskFactors: [
      "Risk of rapid fire spread and heavy smoke inhalation",
      "Evacuation of surrounding occupants required",
      "On-scene burn treatment and oxygen support recommended",
    ],
  },
  Police: {
    code: "Police",
    severity: "High",
    confidence: 87,
    priority: "URGENT",
    eta: "4-5 min",
    response: "Police Response Patrol",
    unitCallsign: "Police Patrol Unit 04",
    protocol: "AI Recommendation: Security & Safety Response",
    explanation:
      "AI analysis indicates a safety or security incident. A nearby response patrol has been selected to ensure civilian safety.",
    riskFactors: [
      "Direct security risk to individuals in the immediate area",
      "Area monitoring and situation de-escalation needed",
      "Assistance for witnesses and reporting parties",
    ],
  },
  Other: {
    code: "GEN-05",
    severity: "Moderate",
    confidence: 78,
    priority: "REVIEW",
    eta: "6-8 min",
    response: "Emergency Coordinator",
    unitCallsign: "Emergency Coordinator Unit 01",
    protocol: "AI Recommendation: Coordinator Review",
    explanation:
      "AI analysis requires further verification for this incident type. An emergency response coordinator has been assigned to assess the situation.",
    riskFactors: [
      "Incident requires additional details or visual verification",
      "Environmental inspection recommended",
      "Resource allocation will adapt based on new details",
    ],
  },
};

export const fallbackReport: EmergencyReport = {
  type: "Road Accident",
  description:
    "Two vehicles involved near Sector 4 intersection. Driver conscious but unable to exit vehicle safely.",
  location: "Sector 4 Junction, Metro Central",
  coordinates: "28.6139° N, 77.2090° E",
  timestamp: "19:48 IST",
  photoAttached: false,
};

export const historyItems = [
  {
    id: "ER-2026-10482",
    type: "Road Accident",
    severity: "Critical" as const,
    date: "05 Oct 2026",
    time: "14:22 IST",
    location: "Main Ring Expressway, KM 14",
    response: "Ambulance + Police Traffic Unit",
    unit: "AMB-204 + Patrol 12",
    responseTime: "4 min 30 sec",
    outcome: "Patient stabilized on scene and transferred to Metro Hospital.",
    status: "Resolved" as const,
  },
  {
    id: "ER-2026-10391",
    type: "Medical Emergency",
    severity: "High" as const,
    date: "18 Sep 2026",
    time: "09:15 IST",
    location: "302 Greenfield Residency, Tower B",
    response: "Ambulance (ALS Unit)",
    unit: "AMB-108",
    responseTime: "5 min 10 sec",
    outcome: "Medical distress stabilized by on-scene crew. Patient admitted.",
    status: "Resolved" as const,
  },
  {
    id: "ER-2026-10124",
    type: "Fire Emergency",
    severity: "Critical" as const,
    date: "02 Aug 2026",
    time: "21:40 IST",
    location: "Commercial Complex, Sector 9",
    response: "Fire Rescue Engine + Ambulance",
    unit: "Fire Engine 07 + AMB-102",
    responseTime: "6 min 15 sec",
    outcome: "Fire suppressed. Occupants safely evacuated without major injuries.",
    status: "Resolved" as const,
  },
];
