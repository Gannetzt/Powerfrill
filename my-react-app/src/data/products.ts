export interface ProductData {
    id: string;
    category: string;
    categoryPath: string[];
    title: string;
    subtitle: string;
    image: string;
    features: { value: string; label: string }[];
    description: string;
    advantages?: string[];
    solutionId: string;
    applications?: string;
    proTip?: string;
}



export const productsData: ProductData[] = [
    // Solar Panels
    {
        id: 'mono-facial',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Mono Facial'],
        title: 'Mono Facial Solar Panels',
        subtitle: 'High-Efficiency Single-Side Technology',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        features: [
            { value: 'Up to 22%', label: 'EFFICIENCY' },
            { value: 'Single-Side', label: 'CAPTURE' },
            { value: '25 Years', label: 'WARRANTY' }
        ],
        description: 'Mono Facial solar panels utilize single-crystalline silicon technology for maximum efficiency. These panels are ideal for residential and commercial installations, offering reliable power generation with a sleek, uniform appearance.',
        solutionId: 'solar',
        applications: 'Residential, Commercial Roofs'
    },
    {
        id: 'bi-facial',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Bi-Facial'],
        title: 'Bi-Facial Solar Panels',
        subtitle: 'Dual-Side Energy Capture Technology',
        image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800',
        features: [
            { value: 'Up to 30%', label: 'MORE ENERGY' },
            { value: 'Dual-Side', label: 'CAPTURE' },
            { value: 'Extended', label: 'WARRANTY' }
        ],
        description: 'Boost Your Solar Power: Bifacial solar panels capture sunlight on both sides, generating up to 30% more energy than traditional panels. Ideal for reflective surfaces, they maximize your investment in solar.',
        solutionId: 'solar',
        proTip: 'Ideal for reflective surfaces like white rooftops, snow, or sand to capture back-side light.'
    },
    {
        id: 'topcon',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Topcon'],
        title: 'TOPCon Solar Panels',
        subtitle: 'Next-Generation Cell Technology',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
        features: [
            { value: 'Up to 25%', label: 'EFFICIENCY' },
            { value: 'Low', label: 'DEGRADATION' },
            { value: '30 Years', label: 'LIFESPAN' }
        ],
        description: 'TOPCon (Tunnel Oxide Passivated Contact) technology represents the cutting edge of solar cell innovation, delivering exceptional efficiency rates and minimal degradation over time for superior long-term performance.',
        solutionId: 'solar'
    },
    // Autonomous Cleaning Robotic Systems
    {
        id: 'dobby-r1',
        category: 'AUTONOMOUS CLEANING ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning Robotic Systems', 'Dobby R1'],
        title: 'Dobby R1',
        subtitle: 'Compact Autonomous Panel Cleaner',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        features: [
            { value: 'Autonomous', label: 'OPERATION' },
            { value: 'Waterless', label: 'CLEANING' },
            { value: '8 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R1 is a compact, autonomous cleaning robot designed for residential and small commercial solar installations. It navigates panels independently, removing dust and debris without water.',
        solutionId: 'solar'
    },
    {
        id: 'dobby-r2',
        category: 'AUTONOMOUS CLEANING ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning Robotic Systems', 'Dobby R2'],
        title: 'Dobby R2',
        subtitle: 'Industrial-Grade Cleaning Robot',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        features: [
            { value: 'Heavy Duty', label: 'PERFORMANCE' },
            { value: 'AI-Powered', label: 'NAVIGATION' },
            { value: '12 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R2 is designed for utility-scale solar farms, featuring advanced AI navigation, heavy-duty cleaning capabilities, and extended battery life for large-area coverage.',
        solutionId: 'solar'
    },
    // Active Tracking Systems
    {
        id: 'single-axis-tracker',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Single Axis Tracker'],
        title: 'Single Axis Tracker',
        subtitle: 'East-West Solar Tracking',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
        features: [
            { value: 'Up to 25%', label: 'MORE YIELD' },
            { value: 'East-West', label: 'TRACKING' },
            { value: 'Low', label: 'MAINTENANCE' }
        ],
        description: 'Single Axis Trackers follow the sun from east to west throughout the day, increasing energy yield by up to 25% compared to fixed installations.',
        solutionId: 'solar'
    },
    {
        id: 'dual-axis-tracker',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Dual Axis Tracker'],
        title: 'Dual Axis Tracker',
        subtitle: 'Full Sun Path Optimization',
        image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800',
        features: [
            { value: 'Up to 40%', label: 'MORE YIELD' },
            { value: '360°', label: 'TRACKING' },
            { value: 'Premium', label: 'PERFORMANCE' }
        ],
        description: 'Dual Axis Trackers provide maximum energy capture by following the sun both horizontally and vertically, optimizing panel angles throughout the day and across seasons.',
        solutionId: 'solar'
    },
    {
        id: 'weather-mitigation',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Weather Mitigation'],
        title: 'Weather Mitigation System',
        subtitle: 'Intelligent Storm Protection',
        image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800',
        features: [
            { value: 'AI-Driven', label: 'PROTECTION' },
            { value: 'Real-time', label: 'MONITORING' },
            { value: 'Automatic', label: 'STOW MODE' }
        ],
        description: 'Our Weather Mitigation System uses AI-powered weather prediction to automatically adjust and stow solar panels during severe weather events, protecting your investment.',
        solutionId: 'solar'
    },
    // Energy Storage Systems
    {
        id: 'micro-power-banks',
        category: 'MISCELLANEOUS',
        categoryPath: ['Miscellaneous', 'Micro Power Banks'],
        title: 'Micro Power Banks',
        subtitle: 'Residential Energy Storage',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800',
        features: [
            { value: '5-15 kWh', label: 'CAPACITY' },
            { value: 'Home', label: 'USE' },
            { value: 'Compact', label: 'DESIGN' }
        ],
        description: 'Micro Power Banks provide reliable home energy storage, perfect for residential solar installations seeking energy independence and backup power.',
        solutionId: 'storage'
    },
    {
        id: 'enterprise-power-banks',
        category: 'MISCELLANEOUS',
        categoryPath: ['Miscellaneous', 'Enterprise Power Banks'],
        title: 'Enterprise Power Banks',
        subtitle: 'Commercial Energy Solutions',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800',
        features: [
            { value: '50-500 kWh', label: 'CAPACITY' },
            { value: 'Commercial', label: 'SCALE' },
            { value: 'Modular', label: 'DESIGN' }
        ],
        description: 'Enterprise Power Banks deliver scalable energy storage for businesses, enabling peak shaving, demand response, and reliable backup power.',
        solutionId: 'storage'
    },
    {
        id: 'energy-farms',
        category: 'MISCELLANEOUS',
        categoryPath: ['Miscellaneous', 'Energy Farms'],
        title: 'Energy Farms – Containerized Banks',
        subtitle: 'Large-Scale Containerized Storage',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        features: [
            { value: '1-10 MWh', label: 'CAPACITY' },
            { value: 'Containerized', label: 'FORMAT' },
            { value: 'Rapid', label: 'DEPLOYMENT' }
        ],
        description: 'Energy Farms utilize standardized shipping containers packed with high-density battery systems for rapid deployment of megawatt-scale storage solutions.',
        solutionId: 'storage'
    },
    {
        id: 'utility-scale',
        category: 'MISCELLANEOUS',
        categoryPath: ['Miscellaneous', 'Utility Scale'],
        title: 'Utility Scale Energy Storage',
        subtitle: 'Grid-Level Power Solutions',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
        features: [
            { value: '10+ MWh', label: 'CAPACITY' },
            { value: 'Grid', label: 'INTEGRATION' },
            { value: 'Utility', label: 'GRADE' }
        ],
        description: 'Utility Scale Energy Storage provides grid-level power solutions for renewable integration, frequency regulation, and large-scale energy management.',
        solutionId: 'storage'
    },
    {
        id: 'mobile-power-banks',
        category: 'MISCELLANEOUS',
        categoryPath: ['Miscellaneous', 'Mobile Power Banks'],
        title: 'Mobile Power Banks',
        subtitle: 'Portable Energy Solutions',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        features: [
            { value: 'Portable', label: 'DESIGN' },
            { value: 'Quick', label: 'DEPLOY' },
            { value: 'Versatile', label: 'USE' }
        ],
        description: 'Mobile Power Banks offer portable energy storage for events, construction sites, emergency response, and temporary power needs.',
        solutionId: 'storage'
    },
    {
        id: 'lithium-standard',
        category: 'LITHIUM-ION PACKS',
        categoryPath: ['Lithium-Ion Packs', 'Standard Modules'],
        title: 'Lithium-Ion Standard Packs',
        subtitle: 'Compact 48V Modules',
        image: 'https://images.unsplash.com/photo-1558449028-c114ad473d09?w=800',
        features: [
            { value: '48V', label: 'VOLTAGE' },
            { value: '100Ah', label: 'CAPACITY' },
            { value: 'CANbus', label: 'INTERFACE' }
        ],
        description: 'Standardized lithium iron phosphate modules for light electric vehicles and home energy storage.',
        solutionId: 'batteries'
    },
    {
        id: 'modular-custom',
        category: 'CUSTOM MODULAR SYSTEMS',
        categoryPath: ['Custom Modular Systems', 'High-Power Modules'],
        title: 'Custom High-Power Packs',
        subtitle: 'Scalable Energy Solutions',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800',
        features: [
            { value: 'Custom', label: 'VOLTAGE' },
            { value: 'IP67', label: 'PROTECTION' },
            { value: 'Active', label: 'COOLING' }
        ],
        description: 'Bespoke battery pack design and assembly for high-performance industrial applications.',
        solutionId: 'batteries'
    }
];



export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    solutionId: string;
}

export interface SolutionHub {
    id: string;
    title: string;
    heroImage: string;
    path: string;
}

export const solutions: SolutionHub[] = [
    {
        id: 'solar',
        title: 'Solar energy & Solar Power Solutions',
        heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920',
        path: 'Solar energy & Solar Power Solutions'
    },
    {
        id: 'storage',
        title: 'Energy storage systems',
        heroImage: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920',
        path: 'Energy storage systems'
    },
    {
        id: 'batteries',
        title: 'Battery Packs',
        heroImage: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1920',
        path: 'Battery Packs'
    }
];

export const categories: Category[] = [
    // Solar Group
    {
        id: 'solar-panels',
        name: 'Solar Panels',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
        description: 'Advanced mono-facial, bi-facial, and TOPCon technologies for maximum energy yield.',
        solutionId: 'solar'
    },
    {
        id: 'robotic-systems',
        name: 'Autonomous Cleaning Robotic Systems',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
        description: 'Intelligent robotic solutions (Dobby R1 & R2) to maintain peak industrial efficiency.',
        solutionId: 'solar'
    },
    {
        id: 'tracking-systems',
        name: 'Active tracking Systems',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200',
        description: 'Single/Dual axis and weather mitigation systems for full sun path optimization.',
        solutionId: 'solar'
    },
    {
        id: 'miscellaneous',
        name: 'Miscellaneous',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200',
        description: 'Custom energy components and additional solar power supporting technologies.',
        solutionId: 'solar'
    },
    // Storage Group
    {
        id: 'residential-storage',
        name: 'Residential Storage',
        image: 'https://images.unsplash.com/photo-1620720402163-35f5d1896023?w=1200',
        description: 'Micro power banks and home battery systems for energy independence.',
        solutionId: 'storage'
    },
    {
        id: 'industrial-storage',
        name: 'Industrial Storage',
        image: 'https://images.unsplash.com/photo-1558449028-2a4066c1b312?w=1200',
        description: 'Enterprise energy farms and utility-scale containerized storage solutions.',
        solutionId: 'storage'
    },
    // Battery Packs Group
    {
        id: 'lithium-packs',
        name: 'Lithium-Ion Packs',
        image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=1200',
        description: 'High-density lithium battery modules for diverse industrial applications.',
        solutionId: 'batteries'
    },
    {
        id: 'modular-systems',
        name: 'Custom Modular Systems',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
        description: 'Customizable battery configurations tailored to specific power requirements.',
        solutionId: 'batteries'
    }
];



// Add specific types for the new category to productsData
// I'll add these at the end of productsData array


export const getProductById = (id: string): ProductData | undefined => {
    return productsData.find(product => product.id === id);
};

export const getProductsByCategoryId = (categoryId: string): ProductData[] => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];
    return productsData.filter(product => product.categoryPath[0] === category.name);
};

export const getCategoriesBySolutionId = (solutionId: string): Category[] => {
    return categories.filter(c => c.solutionId === solutionId);
};


