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
        description: 'Mono Facial solar panels utilize single-crystalline silicon technology for maximum efficiency. These panels are ideal for residential and commercial installations, offering reliable power generation with a sleek, uniform appearance.'
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
        description: 'Boost Your Solar Power: Bifacial solar panels capture sunlight on both sides, generating up to 30% more energy than traditional panels. Ideal for reflective surfaces, they maximize your investment in solar.'
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
        description: 'TOPCon (Tunnel Oxide Passivated Contact) technology represents the cutting edge of solar cell innovation, delivering exceptional efficiency rates and minimal degradation over time for superior long-term performance.'
    },
    // Autonomous Cleaning Robotic Systems
    {
        id: 'dobby-r1',
        category: 'ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning', 'Dobby R1'],
        title: 'Dobby R1',
        subtitle: 'Compact Autonomous Panel Cleaner',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        features: [
            { value: 'Autonomous', label: 'OPERATION' },
            { value: 'Waterless', label: 'CLEANING' },
            { value: '8 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R1 is a compact, autonomous cleaning robot designed for residential and small commercial solar installations. It navigates panels independently, removing dust and debris without water.'
    },
    {
        id: 'dobby-r2',
        category: 'ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning', 'Dobby R2'],
        title: 'Dobby R2',
        subtitle: 'Industrial-Grade Cleaning Robot',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        features: [
            { value: 'Heavy Duty', label: 'PERFORMANCE' },
            { value: 'AI-Powered', label: 'NAVIGATION' },
            { value: '12 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R2 is designed for utility-scale solar farms, featuring advanced AI navigation, heavy-duty cleaning capabilities, and extended battery life for large-area coverage.'
    },
    // Active Tracking Systems
    {
        id: 'single-axis-tracker',
        category: 'TRACKING SYSTEMS',
        categoryPath: ['Active Tracking', 'Single Axis Tracker'],
        title: 'Single Axis Tracker',
        subtitle: 'East-West Solar Tracking',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
        features: [
            { value: 'Up to 25%', label: 'MORE YIELD' },
            { value: 'East-West', label: 'TRACKING' },
            { value: 'Low', label: 'MAINTENANCE' }
        ],
        description: 'Single Axis Trackers follow the sun from east to west throughout the day, increasing energy yield by up to 25% compared to fixed installations.'
    },
    {
        id: 'dual-axis-tracker',
        category: 'TRACKING SYSTEMS',
        categoryPath: ['Active Tracking', 'Dual Axis Tracker'],
        title: 'Dual Axis Tracker',
        subtitle: 'Full Sun Path Optimization',
        image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800',
        features: [
            { value: 'Up to 40%', label: 'MORE YIELD' },
            { value: '360°', label: 'TRACKING' },
            { value: 'Premium', label: 'PERFORMANCE' }
        ],
        description: 'Dual Axis Trackers provide maximum energy capture by following the sun both horizontally and vertically, optimizing panel angles throughout the day and across seasons.'
    },
    {
        id: 'weather-mitigation',
        category: 'TRACKING SYSTEMS',
        categoryPath: ['Active Tracking', 'Weather Mitigation'],
        title: 'Weather Mitigation System',
        subtitle: 'Intelligent Storm Protection',
        image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800',
        features: [
            { value: 'AI-Driven', label: 'PROTECTION' },
            { value: 'Real-time', label: 'MONITORING' },
            { value: 'Automatic', label: 'STOW MODE' }
        ],
        description: 'Our Weather Mitigation System uses AI-powered weather prediction to automatically adjust and stow solar panels during severe weather events, protecting your investment.'
    },
    // Energy Storage Systems
    {
        id: 'micro-power-banks',
        category: 'ENERGY STORAGE',
        categoryPath: ['Energy Storage', 'Micro Power Banks'],
        title: 'Micro Power Banks',
        subtitle: 'Residential Energy Storage',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800',
        features: [
            { value: '5-15 kWh', label: 'CAPACITY' },
            { value: 'Home', label: 'USE' },
            { value: 'Compact', label: 'DESIGN' }
        ],
        description: 'Micro Power Banks provide reliable home energy storage, perfect for residential solar installations seeking energy independence and backup power.'
    },
    {
        id: 'enterprise-power-banks',
        category: 'ENERGY STORAGE',
        categoryPath: ['Energy Storage', 'Enterprise Power Banks'],
        title: 'Enterprise Power Banks',
        subtitle: 'Commercial Energy Solutions',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800',
        features: [
            { value: '50-500 kWh', label: 'CAPACITY' },
            { value: 'Commercial', label: 'SCALE' },
            { value: 'Modular', label: 'DESIGN' }
        ],
        description: 'Enterprise Power Banks deliver scalable energy storage for businesses, enabling peak shaving, demand response, and reliable backup power.'
    },
    {
        id: 'energy-farms',
        category: 'ENERGY STORAGE',
        categoryPath: ['Energy Storage', 'Energy Farms'],
        title: 'Energy Farms – Containerized Banks',
        subtitle: 'Large-Scale Containerized Storage',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        features: [
            { value: '1-10 MWh', label: 'CAPACITY' },
            { value: 'Containerized', label: 'FORMAT' },
            { value: 'Rapid', label: 'DEPLOYMENT' }
        ],
        description: 'Energy Farms utilize standardized shipping containers packed with high-density battery systems for rapid deployment of megawatt-scale storage solutions.'
    },
    {
        id: 'utility-scale',
        category: 'ENERGY STORAGE',
        categoryPath: ['Energy Storage', 'Utility Scale'],
        title: 'Utility Scale Energy Storage',
        subtitle: 'Grid-Level Power Solutions',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
        features: [
            { value: '10+ MWh', label: 'CAPACITY' },
            { value: 'Grid', label: 'INTEGRATION' },
            { value: 'Utility', label: 'GRADE' }
        ],
        description: 'Utility Scale Energy Storage provides grid-level power solutions for renewable integration, frequency regulation, and large-scale energy management.'
    },
    {
        id: 'mobile-power-banks',
        category: 'ENERGY STORAGE',
        categoryPath: ['Energy Storage', 'Mobile Power Banks'],
        title: 'Mobile Power Banks',
        subtitle: 'Portable Energy Solutions',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        features: [
            { value: 'Portable', label: 'DESIGN' },
            { value: 'Quick', label: 'DEPLOY' },
            { value: 'Versatile', label: 'USE' }
        ],
        description: 'Mobile Power Banks offer portable energy storage for events, construction sites, emergency response, and temporary power needs.'
    },
    // Pumps and Motors
    {
        id: 'pumps-sub',
        category: 'PUMPS AND MOTORS',
        categoryPath: ['Pumps and Motors', 'Pumps'],
        title: 'Pumps',
        subtitle: 'High-Efficiency Fluid Solutions',
        image: 'https://images.unsplash.com/photo-1581092921461-7d1a9da9cd61?w=800',
        features: [
            { value: 'Industrial', label: 'GRADE' },
            { value: 'Variable', label: 'SPEED' },
            { value: 'Corrosion', label: 'RESISTANT' }
        ],
        description: 'Our industrial pumps are engineered for demanding environments, providing reliable fluid management for water systems and industrial processes.',
        advantages: ['Unmatched Reliability', 'Precision Control', 'Low Maintenance Costs']
    },

    {
        id: 'motors-sub',
        category: 'PUMPS AND MOTORS',
        categoryPath: ['Pumps and Motors', 'Motors'],
        title: 'Motors',
        subtitle: 'Powering Industrial Excellence',
        image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800',
        features: [
            { value: 'High', label: 'TORQUE' },
            { value: 'IE4/IE5', label: 'EFFICIENCY' },
            { value: 'Smart', label: 'MONITORING' }
        ],
        description: 'Premium electric motors designed for maximum efficiency and durability, suitable for a wide range of industrial and energy applications.',
        advantages: ['Energy Efficiency IE5', 'Robust Construction', 'Smart Diagnostics']
    },

    {
        id: 'qx-webshop',
        category: 'PUMPS AND MOTORS',
        categoryPath: ['Pumps and Motors', 'QX-Webshop'],
        title: 'QX-Webshop',
        subtitle: 'Digital Spare Parts Management',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
        features: [
            { value: '24/7', label: 'ORDERING' },
            { value: 'Real-time', label: 'INVENTORY' },
            { value: 'Global', label: 'SHIPPING' }
        ],
        description: 'Our QX-Webshop provides a streamlined digital interface for managing spare parts, technical documentation, and order tracking for all pump and motor systems.',
        advantages: ['Instant Quotations', 'Global Logistics', 'Technical Archive Access']
    }

];


export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
}

export const categories: Category[] = [
    {
        id: 'solar-panels',
        name: 'Solar Panels',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
        description: 'Advanced solar cell technology for maximum energy yield and long-term durability.'
    },
    {
        id: 'robotic-systems',
        name: 'Autonomous Cleaning',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
        description: 'Intelligent robotic solutions to maintain peak efficiency of your solar installations.'
    },
    {
        id: 'tracking-systems',
        name: 'Active Tracking',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200',
        description: 'Maximize energy capture with intelligent solar tracking systems that follow the sun.'
    },
    {
        id: 'energy-storage',
        name: 'Energy Storage',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200',
        description: 'Reliable battery storage solutions from residential power banks to utility-scale farms.'
    },
    {
        id: 'pumps-motors',
        name: 'Pumps and Motors',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
        description: 'Industrial-grade pumping and motor solutions for water management and energy systems.'
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

