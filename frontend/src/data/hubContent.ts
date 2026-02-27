export interface HubFeature {
    title: string;
    description: string;
    icon?: string;
}

export interface HubService {
    title: string;
    description: string;
    capabilities: string[];
}

export interface HubStat {
    val: string;
    label: string;
}

export interface HubStoryFrame {
    title: string;
    description: string;
    image?: string;
}

export interface HubStaticContent {
    id: string;
    introduction: string;
    objective: string;
    specializedInformation: string;
    features: HubFeature[];
    services?: HubService[];
    futureScope?: string[];
    stats?: HubStat[];
    storyFrames?: HubStoryFrame[];
    contactInfo?: {
        email: string;
        phone: string;
        operationHours: string;
        address: string;
    };
    ctaLabel: string;
    ctaPath: string;
    accent: string;
}

// Keys MUST be DIFFERENT from the product solutionIds
// (solar-energy, battery-bess, future-tech) so product pages still show grids.
export const hubContent: Record<string, HubStaticContent> = {
    'application': {
        id: 'application',
        accent: '#ffcc00',
        introduction: "APPLICATION ENGINEERING // SITE INFRASTRUCTURE",
        objective: "Engineering the interface between raw power and industrial scale. We don't just provide hardware; we engineer energetic ecosystems that bridge the gap from technical potential to field-ready performance.",
        specializedInformation: "Our multi-disciplinary team specializes in extreme-environment hardening, grid-impact simulations, and deep-sea power module synchronization for global energy fleets.",
        stats: [
            { val: "2500+", label: "DEPLOYMENTS" },
            { val: "IP67", label: "RATING" },
            { val: "42", label: "COUNTRIES" },
            { val: "24/7", label: "MONITORING" }
        ],
        storyFrames: [
            { title: "TOPOLOGICAL CLUSTER", description: "Mapping energy distribution across global industrial clusters with sub-millisecond precision.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" },
            { title: "FIELD SYNCHRONIZATION", description: "Real-time deployment tracking and site-ready hardware integration via Powerfrill Cloud.", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000" },
            { title: "PRECISION HARDENING", description: "Stress-testing modules for arctic, desert, and deep-sea operative cycles.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977c?auto=format&fit=crop&q=80&w=2000" }
        ],
        features: [
            { title: "Custom Integration", description: "Bespoke engineering for high-voltage industrial interfaces." },
            { title: "Site Dynamics", description: "Comprehensive spectral and structural analysis for extreme deployments." },
            { title: "Grid Impact", description: "Seamless legacy synchronization using wide-bandgap semiconductors." }
        ],
        services: [
            {
                title: "Strategy & Audit",
                description: "Deep-layer analysis for large-scale industrial transition.",
                capabilities: ["Feasibility Math", "Load Balancing", "Thermal Diagnostics"]
            },
            {
                title: "Remote Ops",
                description: "Managing fleets via autonomous decentralized kernels.",
                capabilities: ["AI Overlords", "Predictive Swap", "Fleet Telemetry"]
            }
        ],
        ctaLabel: "EXPLORE FIELD MODULES",
        ctaPath: "/products"
    },
    'innovation': {
        id: 'innovation',
        accent: "#00ffcc",
        introduction: "R&D INNOVATION // GEN-4 ARCHITECTURE",
        objective: "The power grid of 2035 starts here. We are redefining the limits of efficiency through Silicon Carbide (SiC) stacks and solid-state energy kernels.",
        specializedInformation: "Our research focuses on wide-bandgap semiconductor evolution, kinetic chain energy transfers, and the development of self-healing grid AI.",
        stats: [
            { val: "18", label: "PATENTS" },
            { val: "GEN-4", label: "ARCH_TYPE" },
            { val: "99.8%", label: "PEAK_EFF" },
            { val: "2035", label: "TARGET" }
        ],
        storyFrames: [
            { title: "SiC MOLECULAR CORE", description: "Gen-4 SiC power stacks reducing thermal switching loss by 40%.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" },
            { title: "SOLID-STATE KERNEL", description: "Pioneering non-flammable, ultra-high density solid cells for mission-critical storage.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" },
            { title: "NEURAL GRID AI", description: "Implementing predictive load re-routing via decentralized AI clusters.", image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=2000" }
        ],
        features: [
            { title: "SiC Evolution", description: "Next-gen power conversion stacks for ultra-fast EV charging." },
            { title: "Atomic Storage", description: "Solid-state prototypes with 5X higher energy density than LFP." },
            { title: "Kinetic Sync", description: "Decentralized AI redistribution for self-healing urban grids." }
        ],
        futureScope: [
            "Hyper-Fast Charging (> 1.2kV)",
            "Solid-State Field Pilots (2027)",
            "Kinetic AI Redeployment",
            "Molecular Thermal Buffers"
        ],
        ctaLabel: "VIEW TECH STACK",
        ctaPath: "/products"
    },
    'bess-info': {
        id: 'bess-info',
        accent: "#ff6600",
        introduction: "INDUSTRIAL BESS // THE CORE OF GRID RESILIENCE",
        objective: "Battery Energy Storage Systems (BESS) represent the critical buffer for modern power infrastructure. These systems stabilize the utility grid by capturing surplus renewable energy and discharging it with sub-millisecond precision to optimize Levelized Cost of Storage (LCOS).",
        specializedInformation: "Functionality: Our systems provide essential grid services including primary frequency response, voltage regulation, and black-start capabilities, ensuring zero-latency reliability for mission-critical industrial infrastructure.",
        stats: [
            { val: "1.2GW", label: "GLOBAL_FLEET" },
            { val: " < 20ms", label: "INERTIAL_RESP" },
            { val: "LFP/SS", label: "CELL_CHEM" },
            { val: "20Y+", label: "DESIGN_LIFE" }
        ],
        storyFrames: [
            { title: "GRID FREQUENCY STABILITY", description: "Providing instantaneous synthetic inertia to mitigate grid oscillations with sub-20ms reaction times.", image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=2000" },
            { title: "INDUSTRIAL PEAK SHAVING", description: "Optimizing operational OPEX by managing industrial load profiles and discharging during peak tariff windows.", image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=2000" },
            { title: "TRANSITION INFRASTRUCTURE", description: "The strategic bridge enabling the transition from legacy baseload to 100% intermittent renewable penetration.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000" }
        ],
        features: [
            { title: "Grid Ancillary Services", description: "Stabilizing frequency and voltage via advanced four-quadrant power conversion (PCS)." },
            { title: "Load Profile Optimization", description: "AI-driven peak-shaving and energy arbitrage to minimize industrial energy expenditure." },
            { title: "Microgrid Integration", description: "Centralized energy heart for independent, resilient high-availability power zones." }
        ],
        ctaLabel: "EXPLORE BESS SOLUTIONS",
        ctaPath: "/hub/battery-bess"
    },
    'about': {
        id: 'about',
        accent: "#ff0066",
        introduction: "MISSION // GLOBAL DECARBONIZATION",
        objective: "Digitizing and democratizing the global energy grid since 2018. We provide the vertically integrated hardware that powers modern resilient cities.",
        specializedInformation: "We are an ISO-certified engineering conglomerate with an active footprint in 42 regions, dedicated to reaching Net-Zero via advanced hardware.",
        stats: [
            { val: "2018", label: "GENESIS" },
            { val: "500+", label: "ENGINEERS" },
            { val: "ISO", label: "STANDARDS" },
            { val: "NET-0", label: "GOAL" }
        ],
        storyFrames: [
            { title: "OUR HERITAGE", description: "Born from the need for high-density resilient industrial power.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" },
            { title: "GLOBAL FOOTPRINT", description: "Distributed engineering hubs active in North America, Europe, Asia, and MEA.", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000" },
            { title: "THE MISSION", description: "Accelerating the global transition to sustainable hardware architecture.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" }
        ],
        features: [
            { title: "Our Mission", description: "To accelerate the transition to sustainable industrial infrastructure." },
            { title: "Global Scale", description: "Active operations in North America, Europe, Asia, and MEA." },
            { title: "ISO Certified", description: "Adhering to the highest global standards for quality and safety." }
        ],
        contactInfo: {
            email: "ops@powerfrill.tech",
            phone: "+1 (800) POWER-FRILL",
            operationHours: "24/7 TECHNICAL SUPPORT",
            address: "Energy Innovation Plaza, HQ-01, Global Industrial Hub"
        },
        ctaLabel: "OUR ECOSYSTEM",
        ctaPath: "/products"
    }
};
