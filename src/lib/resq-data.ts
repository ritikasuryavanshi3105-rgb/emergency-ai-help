export type EmergencyType = "Medical Emergency" | "Road Accident" | "Fire" | "Police" | "Other";

export type EmergencyReport = {
  type: EmergencyType;
  description: string;
  location: string;
};

export const REPORT_STORAGE_KEY = "resq-ai-report";

export const emergencyProfiles: Record<
  EmergencyType,
  { severity: string; confidence: number; priority: string; response: string; explanation: string }
> = {
  "Medical Emergency": {
    severity: "High",
    confidence: 89,
    priority: "URGENT",
    response: "Ambulance",
    explanation: "The report suggests urgent medical support may be appropriate. A simulated ambulance response has been selected.",
  },
  "Road Accident": {
    severity: "Critical",
    confidence: 92,
    priority: "IMMEDIATE",
    response: "Ambulance + Police",
    explanation: "The reported road incident may involve injuries and traffic risk. The prototype recommends coordinated medical and police support.",
  },
  Fire: {
    severity: "Critical",
    confidence: 94,
    priority: "IMMEDIATE",
    response: "Fire Unit + Ambulance",
    explanation: "The reported fire may present immediate safety risks. The prototype recommends fire response with medical support nearby.",
  },
  Police: {
    severity: "High",
    confidence: 87,
    priority: "URGENT",
    response: "Police Response Unit",
    explanation: "The report indicates a safety-related incident. The prototype recommends a nearby police response unit.",
  },
  Other: {
    severity: "Moderate",
    confidence: 78,
    priority: "REVIEW",
    response: "Emergency Coordinator",
    explanation: "The incident needs further review. The prototype recommends assessment by an emergency response coordinator.",
  },
};

export const fallbackReport: EmergencyReport = {
  type: "Road Accident",
  description: "Two vehicles involved near the main junction. One person may need assistance.",
  location: "Current Location",
};

export const historyItems = [
  { id: "ER-2026-10482", type: "Road Accident", severity: "Critical", date: "05 Oct 2026", response: "Ambulance + Police" },
  { id: "ER-2026-10391", type: "Medical Emergency", severity: "High", date: "18 Sep 2026", response: "Ambulance" },
  { id: "ER-2026-10124", type: "Fire Emergency", severity: "Critical", date: "02 Aug 2026", response: "Fire Unit + Ambulance" },
];
