export interface ProductData {
    id: string;
    menuId: 'solar-energy' | 'battery-bess' | 'future-tech';
    groupId: string;
    categoryId: string;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    productType: 'hardware' | 'informational';
    brief: string;
    features: { value: string; label: string }[];
    description: string;
    advantages?: string[];
    applications?: string;
    proTip?: string;
    gallery?: string[];
    priceLabel?: string;
    availability?: string;
    rating?: number;
    hideQuotation?: boolean;
    industryTags: string[];
    technologyTags: string[];
    applicationTags: string[];
    specifications: Record<string, string>;
    solutionId: string;
    category: string;
    categoryPath: string[];
}


export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    solutionId: string;
    menuId: string;
    groupId: string;
}

export interface CategoryGroup {
    id: string;
    name: string;
    menuId: string;
}

export interface SolutionHub {
    id: string;
    title: string;
    heroImage: string;
    path: string;
}



export const productsData: ProductData[] = [
    // --- SOLAR POWER SOLUTIONS ---
    // Solar Panels
    {
        id: 'mono-facial',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'solar-panels',
        slug: 'mono-facial-solar-panels',
        title: 'Mono Facial Solar Panels',
        subtitle: 'High-Efficiency Single-Side Technology',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        productType: 'hardware',
        brief: 'Ultra-efficient single-crystalline solar modules designed for maximum power density in residential and commercial rooftops.',
        features: [
            { value: 'Up to 22%', label: 'EFFICIENCY' },
            { value: 'Single-Side', label: 'CAPTURE' },
            { value: '25 Years', label: 'WARRANTY' }
        ],
        description: 'Mono Facial solar panels utilize single-crystalline silicon technology for maximum efficiency. These panels are ideal for residential and commercial installations, offering reliable power generation with a sleek, uniform appearance.',
        industryTags: ['Residential', 'Commercial'],
        technologyTags: ['Monocrystalline', 'Perc'],
        applicationTags: ['Rooftop', 'Grid-tie'],
        specifications: {
            'Max Power': '550W',
            'Efficiency': '22.1%',
            'Operating Temp': '-40°C to +85°C',
            'Frame': 'Anodized Aluminum',
            'Glass': '3.2mm Tempered'
        },
        solutionId: 'solar-energy',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Mono Facial']
    },
    {
        id: 'bi-facial',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'solar-panels',
        slug: 'bi-facial-solar-panels',
        title: 'Bi-Facial Solar Panels',
        subtitle: 'Dual-Side Energy Capture Technology',
        image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800',
        productType: 'hardware',
        brief: 'Harness sunlight from both sides to increase total energy yield by up to 30%, ideal for high-albedo environments.',
        features: [
            { value: 'Up to 30%', label: 'MORE ENERGY' },
            { value: 'Dual-Side', label: 'CAPTURE' },
            { value: 'Extended', label: 'WARRANTY' }
        ],
        description: 'Boost Your Solar Power: Bifacial solar panels capture sunlight on both sides, generating up to 30% more energy than traditional panels. Ideal for reflective surfaces, they maximize your investment in solar.',
        industryTags: ['Utility Scale', 'Industrial'],
        technologyTags: ['Bifacial', 'Dual-Glass'],
        applicationTags: ['Ground Mount', 'Water Surfaces'],
        specifications: {
            'Bifaciality Factor': '70% ± 5%',
            'Max Power (Front)': '545W',
            'Efficiency': '21.5%',
            'Junction Box': 'IP68 rated',
            'Static Load': '5400Pa (Front)'
        },
        solutionId: 'solar-energy',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Bi-Facial']
    },
    {
        id: 'topcon',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'solar-panels',
        slug: 'topcon-solar-panels',
        title: 'TOPCon Solar Panels',
        subtitle: 'Next-Generation Cell Technology',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
        productType: 'hardware',
        brief: 'The gold standard in N-type cell technology, offering superior low-light performance and minimal degradation over 30 years.',
        features: [
            { value: 'Up to 25%', label: 'EFFICIENCY' },
            { value: 'Low', label: 'DEGRADATION' },
            { value: '30 Years', label: 'LIFESPAN' }
        ],
        description: 'TOPCon (Tunnel Oxide Passivated Contact) technology represents the cutting edge of solar cell innovation, delivering exceptional efficiency rates and minimal degradation over time for superior long-term performance.',
        industryTags: ['Premium Residential', 'Enterprise'],
        technologyTags: ['N-Type', 'TOPCon'],
        applicationTags: ['All-Weather', 'High-Temp Areas'],
        specifications: {
            'Cell Type': 'N-Type Monocrystalline',
            'Efficiency': '24.8%',
            'Degradation': '<0.4% per year',
            'Temp Coefficient': '-0.30%/°C',
            'Warranty': '30 Year Performance'
        },
        solutionId: 'solar-energy',
        category: 'SOLAR PANEL',
        categoryPath: ['Solar Panels', 'Topcon']
    },
    // Autonomous Cleaning Robotic Systems
    {
        id: 'dobby-r1',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'robotic-cleaning',
        slug: 'dobby-r1-cleaning-robot',
        title: 'Dobby R1',
        subtitle: 'Compact Autonomous Panel Cleaner',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        productType: 'hardware',
        brief: 'Intelligent, waterless cleaning robot designed for residential and light-commercial rooftop installations.',
        features: [
            { value: 'Autonomous', label: 'OPERATION' },
            { value: 'Waterless', label: 'CLEANING' },
            { value: '8 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R1 is a compact, autonomous cleaning robot designed for residential and small commercial solar installations. It navigates panels independently, removing dust and debris without water.',
        industryTags: ['Residential', 'Light Commercial'],
        technologyTags: ['AI Navigation', 'Waterless Cleaning'],
        applicationTags: ['Rooftop Maintenance'],
        specifications: {
            'Cleaning Speed': '15 sqm/min',
            'Obstacle Clearance': 'Up to 50mm',
            'Weight': '12.5 kg',
            'Charging Time': '2 Hours',
            'Max Slope': '25 degrees'
        },
        solutionId: 'solar-energy',
        category: 'AUTONOMOUS CLEANING ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning Robotic Systems', 'Dobby R1']
    },
    {
        id: 'dobby-r2',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'robotic-cleaning',
        slug: 'dobby-r2-industrial-robot',
        title: 'Dobby R2',
        subtitle: 'Industrial-Grade Cleaning Robot',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        productType: 'hardware',
        brief: 'Heavy-duty maintenance solution for utility-scale solar farms, featuring swarm-logic and AI pathfinding.',
        features: [
            { value: 'Heavy Duty', label: 'PERFORMANCE' },
            { value: 'AI-Powered', label: 'NAVIGATION' },
            { value: '12 Hours', label: 'BATTERY LIFE' }
        ],
        description: 'Dobby R2 is designed for utility-scale solar farms, featuring advanced AI navigation, heavy-duty cleaning capabilities, and extended battery life for large-area coverage.',
        industryTags: ['Utility Scale', 'Industrial'],
        technologyTags: ['Swarm Intelligence', 'Heavy Duty'],
        applicationTags: ['Ground Mount Maintenance', 'Desert Solar'],
        specifications: {
            'Daily Coverage': '1.5 MW Plants',
            'Connectivity': '4G/LoRaWAN',
            'Brush Life': '2000 Hours',
            'Navigation': 'SLAM AI',
            'IP Rating': 'IP67'
        },
        solutionId: 'solar-energy',
        category: 'AUTONOMOUS CLEANING ROBOTIC SYSTEMS',
        categoryPath: ['Autonomous Cleaning Robotic Systems', 'Dobby R2']
    },
    // Active Tracking Systems
    {
        id: 'single-axis-tracker',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'tracking-systems',
        slug: 'single-axis-solar-tracker',
        title: 'Single Axis Tracker',
        subtitle: 'East-West Solar Tracking',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
        productType: 'hardware',
        brief: 'Precision sun-tracking system that follows the east-west path, increasing total annual yield by up to 25%.',
        features: [
            { value: 'Up to 25%', label: 'MORE YIELD' },
            { value: 'East-West', label: 'TRACKING' },
            { value: 'Low', label: 'MAINTENANCE' }
        ],
        description: 'Single Axis Trackers follow the sun from east to west throughout the day, increasing energy yield by up to 25% compared to fixed installations.',
        industryTags: ['Utility Scale', 'Enterprise'],
        technologyTags: ['Sun Tracking', 'Precision Actuators'],
        applicationTags: ['Large Ground Mounts'],
        specifications: {
            'Tracking Range': '±60 degrees',
            'Wind Stow Speed': '25 m/s',
            'Motor Typology': 'DC Brushless',
            'Backtracking': 'Standard AI',
            'MTBF': '100,000 Hours'
        },
        solutionId: 'solar-energy',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Single Axis Tracker']
    },
    {
        id: 'dual-axis-tracker',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'tracking-systems',
        slug: 'dual-axis-solar-tracker',
        title: 'Dual Axis Tracker',
        subtitle: 'Full Sun Path Optimization',
        image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800',
        productType: 'hardware',
        brief: 'The ultimate tracking solution that follows both horizontal and vertical sun movements for 40% higher energy capture.',
        features: [
            { value: 'Up to 40%', label: 'MORE YIELD' },
            { value: '360°', label: 'TRACKING' },
            { value: 'Premium', label: 'PERFORMANCE' }
        ],
        description: 'Dual Axis Trackers provide maximum energy capture by following the sun both horizontally and vertically, optimizing panel angles throughout the day and across seasons.',
        industryTags: ['Precision R&D', 'High-Yield Projects'],
        technologyTags: ['Dual-Axis', '360 Degree Tracking'],
        applicationTags: ['Solar Concentrators', 'High-Performance Hubs'],
        specifications: {
            'Azimuth Range': '360 degrees',
            'Tilt Range': '0 to 90 degrees',
            'Accuracy': '±0.5 degrees',
            'Control System': 'PLC based',
            'Protection': 'Automatic Stow'
        },
        solutionId: 'solar-energy',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Dual Axis Tracker']
    },
    {
        id: 'weather-mitigation',
        menuId: 'solar-energy',
        groupId: 'solar-power-solutions',
        categoryId: 'tracking-systems',
        slug: 'weather-mitigation-system',
        title: 'Weather Mitigation System',
        subtitle: 'Intelligent Storm Protection',
        image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800',
        productType: 'hardware',
        brief: 'Cloud-connected AI system that predicts severe weather and automatically stows trackers to prevent damage.',
        features: [
            { value: 'AI-Driven', label: 'PROTECTION' },
            { value: 'Real-time', label: 'MONITORING' },
            { value: 'Automatic', label: 'STOW MODE' }
        ],
        description: 'Our Weather Mitigation System uses AI-powered weather prediction to automatically adjust and stow solar panels during severe weather events, protecting your investment.',
        industryTags: ['Safety', 'Asset Management'],
        technologyTags: ['Predictive AI', 'IoT Monitoring'],
        applicationTags: ['All Solar Farms'],
        specifications: {
            'Prediction Horizon': '30 Minutes',
            'Sensor Array': 'Wind/Rain/Hail',
            'Communication': 'Wireless Mesh',
            'Reaction Time': '< 3 Seconds',
            'Scalability': 'Unlimited Trackers'
        },
        solutionId: 'solar-energy',
        category: 'ACTIVE TRACKING SYSTEMS',
        categoryPath: ['Active tracking Systems', 'Weather Mitigation']
    },
    // --- INVERTERS & POWER ELECTRONICS ---
    {
        id: 'on-grid-inverters',
        menuId: 'solar-energy',
        groupId: 'inverters-electronics',
        categoryId: 'on-grid-inverters',
        slug: 'on-grid-power-inverters',
        title: 'On Grid Inverters',
        subtitle: 'Grid-Tied Solar Power Conversion',
        image: 'https://images.unsplash.com/photo-1592833159057-65a2845722dc?w=800',
        productType: 'hardware',
        brief: 'High-efficiency grid-tied inverters designed for seamless synchronization with the utility grid, ensuring maximum feed-in reliability.',
        features: [
            { value: '98%+', label: 'EFFICIENCY' },
            { value: 'Smart', label: 'MONITORING' },
            { value: 'Sync', label: 'GRID SYNC' }
        ],
        description: 'High-efficiency grid-tied inverters designed to seamlessly synchronize solar power with the utility grid for residential and commercial feed-in.',
        industryTags: ['Residential', 'Net Metering'],
        technologyTags: ['String Inverter', 'Pure Sine Wave'],
        applicationTags: ['Grid-Tie Systems'],
        specifications: {
            'Max DC Input': '15 kW',
            'AC Efficiency': '98.4%',
            'MPPT Range': '160V-950V',
            'Communication': 'WiFi/RS485',
            'Protection': 'Anti-islanding, DC Reverse Polarity'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'On Grid Inverters']
    },
    {
        id: 'off-grid-inverters',
        menuId: 'solar-energy',
        groupId: 'inverters-electronics',
        categoryId: 'off-grid-inverters',
        slug: 'off-grid-power-inverters',
        title: 'Off Grid Inverters',
        subtitle: 'Standalone Power Reliability',
        image: 'https://images.unsplash.com/photo-1620846660144-a0953a99527e?w=800',
        productType: 'hardware',
        brief: 'Robust standalone inverters with integrated battery management, ideal for remote locations and complete energy independence.',
        features: [
            { value: 'Pure Sine', label: 'WAVE' },
            { value: 'Battery', label: 'SUPPORT' },
            { value: 'Built-in', label: 'CHARGER' }
        ],
        description: 'Robust off-grid inverters that provide reliable power in remote locations, featuring built-in battery chargers and generator support.',
        industryTags: ['Rural Electrification', 'Remote Living'],
        technologyTags: ['Transformer-based', 'High Surge'],
        applicationTags: ['Off-Grid Cabins', 'Remote Towers'],
        specifications: {
            'Rated Power': '5 kW',
            'Surge Power': '15 kVA',
            'Battery Voltage': '48VDC',
            'Waveform': 'Pure Sine Wave',
            'Transfer Time': '< 10ms'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'Off Grid Inverters']
    },
    {
        id: 'hybrid-inverters',
        menuId: 'solar-energy',
        groupId: 'inverters-electronics',
        categoryId: 'hybrid-inverters',
        slug: 'hybrid-energy-management-inverters',
        title: 'Hybrid Inverters',
        subtitle: 'Smart Energy Management',
        image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800',
        productType: 'hardware',
        brief: 'Multi-mode power managers that intelligently handle solar, battery, grid, and generator inputs for ultimate energy security.',
        features: [
            { value: 'Multi', label: 'MODE' },
            { value: 'Backup', label: 'POWER' },
            { value: 'Smart', label: 'CONTROL' }
        ],
        description: 'Versatile hybrid inverters that manage power flow between solar panels, batteries, the grid, and your loads for ultimate energy security.',
        industryTags: ['Smart Homes', 'Enterprise Continuity'],
        technologyTags: ['Bi-directional', 'ESS Integrated'],
        applicationTags: ['Peak Shaving', 'Zero Export'],
        specifications: {
            'Switching Time': 'UPS level (< 5ms)',
            'Battery Logic': 'Default LFP / Custom',
            'Max Parallel': 'Up to 6 units',
            'Grid Interaction': 'Bi-directional',
            'App Monitoring': 'Real-time Analytics'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'Hybrid Inverters']
    },
    {
        id: 'solar-net-meters',
        menuId: 'solar-energy',
        groupId: 'inverters-electronics',
        categoryId: 'solar-net-meters',
        slug: 'precision-solar-net-meters',
        title: 'Solar Net Meters',
        subtitle: 'Bi-Directional Energy Measurement',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        productType: 'hardware',
        brief: 'Utility-grade bi-directional meters for accurate recording of energy import/export, essential for net metering billing.',
        features: [
            { value: 'Bi-Direct', label: 'METERING' },
            { value: 'Utility', label: 'APPROVED' },
            { value: 'Precise', label: 'DATA' }
        ],
        description: 'Utility-grade bi-directional meters for accurate recording of energy imported from and exported to the grid.',
        industryTags: ['Utility', 'Grid Management'],
        technologyTags: ['Digital Billing', 'Tamper-proof'],
        applicationTags: ['Billing Centers', 'Smart Grids'],
        specifications: {
            'Accuracy': 'Class 1.0',
            'Interface': 'RS485/Optical',
            'Standard': 'IEC 62053-21',
            'Sealing': 'Utility Grade',
            'Data Retention': '> 10 Years'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'Solar Net Meters']
    },
    // --- PLANT INFRASTRUCTURE ---
    {
        id: 'earthing-lightning',
        menuId: 'solar-energy',
        groupId: 'plant-infrastructure',
        categoryId: 'safety-systems',
        slug: 'safety-protection-systems',
        title: 'Earthing & Lightning Arresters',
        subtitle: 'System Protection & Safety',
        image: 'https://images.unsplash.com/photo-1620846660144-a0953a99527e?w=800',
        productType: 'hardware',
        brief: 'Heavy-duty grounding and lightning protection systems to safeguard high-value solar assets from surges and strikes.',
        features: [
            { value: 'High', label: 'CONDUCTIVITY' },
            { value: 'Surge', label: 'PROTECTION' },
            { value: 'Safety', label: 'STD' }
        ],
        description: 'Essential electrical safety components to protect your solar investment from lightning strikes and electrical faults.',
        industryTags: ['Infrastructure', 'Safety'],
        technologyTags: ['ESE Technology', 'Maintenance-free'],
        applicationTags: ['All Industrial Installations'],
        specifications: {
            'Material': 'High Conductivity Copper',
            'Arrestor Type': 'ESE / Rod',
            'Standard': 'IS 2309 / IEC 62305',
            'Surge Rating': '200kA Peak',
            'Soil Condition': 'Chemical filling compatible'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'Earthing & Lightning Arresters']
    },
    {
        id: 'scada-data',
        menuId: 'solar-energy',
        groupId: 'plant-infrastructure',
        categoryId: 'monitoring-systems',
        slug: 'scada-monitoring-systems',
        title: 'SCADA & Data Loggers',
        subtitle: 'Remote Plant Monitoring',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800',
        productType: 'hardware',
        brief: 'Enterprise monitoring platform that provides real-time performance analytics, fault detection, and cloud-based reporting.',
        features: [
            { value: 'Real-Time', label: 'DATA' },
            { value: 'Cloud', label: 'ACCESS' },
            { value: 'Remote', label: 'CONTROL' }
        ],
        description: 'Advanced monitoring systems that provide real-time insights into plant performance, fault detection, and reporting.',
        industryTags: ['Management', 'Operations'],
        technologyTags: ['IoT', 'Cloud Analytics'],
        applicationTags: ['MW Scale Plants', 'Distributed Portfolios'],
        specifications: {
            'Polling Interval': '1-60 seconds',
            'Cloud Storage': 'Unlimited (Tiered)',
            'Alerts': 'SMS/Email/Push',
            'Protocol': 'Modbus TCP/RTU',
            'Hardware': 'Industrial PLC'
        },
        solutionId: 'solar-energy',
        category: 'INVERTERS & POWER ELECTRONICS',
        categoryPath: ['Inverters & Power Electronics', 'Scada & Data Logger Systems']
    },

    // --- MOUNTING STRUCTURES ---
    {
        id: 'cad-framework',
        menuId: 'solar-energy',
        groupId: 'mounting-structures',
        categoryId: 'cad-framework',
        slug: 'cad-engineered-mounting-framework',
        title: 'Computer Aided Framework',
        subtitle: 'Precision Engineered Mounting',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        productType: 'hardware',
        brief: 'Aeronautical-grade mounting frameworks designed using advanced CAD simulation for maximum structural integrity and wind resistance.',
        features: [
            { value: 'CAD', label: 'DESIGNED' },
            { value: 'Precision', label: 'FIT' },
            { value: 'High', label: 'STRENGTH' }
        ],
        description: 'Aeronautical-grade mounting frameworks designed using advanced CAD simulation for maximum structural integrity and wind resistance.',
        industryTags: ['Engineering', 'Design'],
        technologyTags: ['CAD/CAM', 'Structural FEA'],
        applicationTags: ['High-Wind Zones', 'Complex Rooftops'],
        specifications: {
            'Wind Rating': 'Up to 200 km/h',
            'Material': 'Al 6005-T5',
            'Corrosion Class': 'C4 High',
            'Warranty': '15 Years',
            'Standards': 'AS/NZS 1170'
        },
        solutionId: 'solar-energy',
        category: 'MOUNTING STRUCTURES',
        categoryPath: ['Mounting Structures', 'CAD Framework']
    },
    {
        id: 'steel-frames',
        menuId: 'solar-energy',
        groupId: 'mounting-structures',
        categoryId: 'steel-frames',
        slug: 'pre-treated-steel-panels-frames',
        title: 'Pre Treated Steel Frames',
        subtitle: 'Corrosion Resistant Structures',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        productType: 'hardware',
        brief: 'Hot-dip galvanized steel frames with proprietary anti-corrosion coating, ideal for coastal and high-humidity environments.',
        features: [
            { value: 'Galvanized', label: 'STEEL' },
            { value: 'Anti-Rust', label: 'COATING' },
            { value: 'Durable', label: 'BUILD' }
        ],
        description: 'Hot-dip galvanized steel frames with proprietary anti-corrosion coating, ideal for coastal and high-humidity environments.',
        industryTags: ['Construction', 'Hardware'],
        technologyTags: ['Hot-dip Galvanizing', 'HDG'],
        applicationTags: ['Coastal Areas', 'Industrial Clusters'],
        specifications: {
            'Coating Type': 'Zinc-Magnesium-Aluminum',
            'Service Life': '30+ Years',
            'Yield Strength': '350 MPa',
            'Fasteners': 'SS304/SS316',
            'Mounting Depth': 'Adjustable'
        },
        solutionId: 'solar-energy',
        category: 'MOUNTING STRUCTURES',
        categoryPath: ['Mounting Structures', 'Steel Frames']
    },
    {
        id: 'prefab-mounting',
        menuId: 'solar-energy',
        groupId: 'mounting-structures',
        categoryId: 'prefab-mounting',
        slug: 'prefabricated-solar-mounting',
        title: 'Prefabricated Mounting Structures',
        subtitle: 'Rapid Installation Systems',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        productType: 'hardware',
        brief: 'Snap-and-click prefabricated mounting kits that reduce on-site installation time by 50% without compromising stability.',
        features: [
            { value: 'Snap-Fit', label: 'TECH' },
            { value: 'Fast', label: 'INSTALL' },
            { value: 'Modular', label: 'BLOCKS' }
        ],
        description: 'Snap-and-click prefabricated mounting kits that reduce on-site installation time by 50% without compromising stability.',
        industryTags: ['DIFM', 'Commercial Install'],
        technologyTags: ['Click-Fit Architecture', 'Pre-assembled'],
        applicationTags: ['Rapid Deployment', 'Project Scaling'],
        specifications: {
            'Install Time': '0.5 Man-hour / kW',
            'Parts Count': 'Minimal (Pre-bundled)',
            'Load Capacity': '6000 Pa Front',
            'Orientation': 'Portrait/Landscape',
            'Rail Type': 'Slotted Universal'
        },
        solutionId: 'solar-energy',
        category: 'MOUNTING STRUCTURES',
        categoryPath: ['Mounting Structures', 'Prefab Mounting']
    },

    // --- AUTOMOTIVE BATTERY PACKS ---
    {
        id: 'li-ion-4w',
        menuId: 'battery-bess',
        groupId: 'automotive-battery-packs',
        categoryId: '4w-packs',
        slug: 'li-ion-4w-packs',
        title: 'Li-Ion 4W Battery Packs',
        subtitle: 'Proterra EV Bus Standard',
        image: '/thumbnail_4w_pack.png',
        productType: 'hardware',
        brief: 'Next-generation 800V battery architecture designed for premium electric sports cars, featuring ultra-fast charging.',
        features: [
            { value: '120 kWh', label: 'CAPACITY' },
            { value: '800V', label: 'VOLTAGE' },
            { value: 'Liquid', label: 'COOLING' }
        ],
        description: 'Next-generation 800V battery architecture designed for premium electric sports cars. Features ultra-fast charging and advanced liquid cooling for peak thermal stability.',
        industryTags: ['Automotive', 'High Performance'],
        technologyTags: ['800V Architecture', 'Liquid Cooling', 'NMC'],
        applicationTags: ['Performance EVs', 'Hypercars'],
        specifications: {
            'Energy Density': '250 Wh/kg',
            'Max Discharge': '500 kW',
            'Charge Time': '10-80% in 15 min',
            'Thermal Mgmt': 'Active Liquid',
            'Communication': 'CAN FD / FlexRay'
        },
        solutionId: 'battery-bess',
        category: 'AUTOMOTIVE BATTERY PACKS',
        categoryPath: ['Automotive Battery Packs', '4 Wheeler']
    },
    {
        id: 'li-ion-3w',
        menuId: 'battery-bess',
        groupId: 'automotive-battery-packs',
        categoryId: '3w-packs',
        slug: 'li-ion-3w-packs',
        title: 'Li-Ion 3W Battery Packs',
        subtitle: 'Commercial Rickshaw Power',
        image: '/thumbnail_3w_pack.png',
        productType: 'hardware',
        brief: 'Robust, air-cooled LFP battery system optimized for urban delivery and last-mile logistics.',
        features: [
            { value: '15 kWh', label: 'CAPACITY' },
            { value: '48V', label: 'VOLTAGE' },
            { value: 'LFP', label: 'SAFETY' }
        ],
        description: 'Robust, air-cooled LFP battery system optimized for urban delivery. Built for safety, high cycle life, and low maintenance in last-mile logistics.',
        industryTags: ['Logistics', 'Urban Mobility'],
        technologyTags: ['LFP', 'Air Cooling'],
        applicationTags: ['E-Rickshaws', 'Delivery Vans'],
        specifications: {
            'Cell Chemistry': 'LiFePO4',
            'Cycle Life': '> 3000 cycles',
            'Ingress': 'IP65',
            'Weight': '85 kg',
            'Charge Rate': '0.5C Standard'
        },
        solutionId: 'battery-bess',
        category: 'AUTOMOTIVE BATTERY PACKS',
        categoryPath: ['Automotive Battery Packs', '3 Wheeler']
    },
    {
        id: 'series-p86',
        menuId: 'battery-bess',
        groupId: 'automotive-battery-packs',
        categoryId: '2w-packs',
        slug: 'series-p86-components',
        title: 'Series P-86 Components',
        subtitle: 'High-Fidelity 3D Battery Module',
        image: '/thumbnail_2w_pack.png',
        productType: 'hardware',
        brief: 'Precision-engineered P-86 battery module for high-performance 2-wheelers.',
        features: [
            { value: 'P-86', label: 'SERIES' },
            { value: '3.6 kWh', label: 'CAPACITY' },
            { value: 'IP67', label: 'SEALED' }
        ],
        description: 'The Series P-86 represents the pinnacle of compact energy density for 2-wheeler applications. Featuring advanced thermal management, a rugged extruded aluminum tray, and precisely integrated cylindrical cells.',
        industryTags: ['Electric Scooters', 'Motorcycles'],
        technologyTags: ['Cylindrical Cells', 'Liquid Cooling', 'Smart BMS'],
        applicationTags: ['High-Performance 2-Wheelers'],
        specifications: {
            'Top Plate': 'Die-cast Aluminum',
            'Cell Type': '21700 Cylindrical',
            'Cooling': 'Active Liquid',
            'Cables': 'Industrial Grade Copper',
            'Connectors': 'High-Amp Amphenol'
        },
        solutionId: 'battery-bess',
        category: 'AUTOMOTIVE BATTERY PACKS',
        categoryPath: ['Automotive Battery Packs', '2 Wheeler']
    },

    // --- ENERGY STORAGE SYSTEMS - BESS & UTILITY ---
    {
        id: 'residential-bess',
        menuId: 'battery-bess',
        groupId: 'energy-storage-solutions',
        categoryId: 'micro-storage',
        slug: 'homepower-industrial-residential-storage',
        title: 'HomePower 5K // Series-i',
        subtitle: 'Professional Grade Residential Storage',
        image: '/thumbnail_micro_storage.png',
        productType: 'hardware',
        brief: 'High-density LiFePO4 residential storage kernel with integrated 8kW hybrid inversion and dynamic grid-balancing AI.',
        features: [
            { value: '5.12 kWh', label: 'MODULAR_CAP' },
            { value: '8.0 kW', label: 'PEAK_INVERSION' },
            { value: 'Tier-1', label: 'CELL_QUALITY' }
        ],
        description: 'The HomePower 5K Series-i is a professional-grade all-in-one residential storage solution. Engineered with a high-bandwidth hybrid inverter, it enables sub-20ms transition to backup power. The system utilizes CloudSync architecture for real-time fleet management and predictive load shifting.',
        industryTags: ['Residential', 'Smart Infrastructure', 'Micro-Grid'],
        technologyTags: ['LiFePO4', 'Hybrid Inversion', 'CloudSync'],
        applicationTags: ['Critical Backup', 'Solar Arbitrage'],
        specifications: {
            'Nominal Energy': '5.12 kWh (Scalable to 81kWh)',
            'Max Discharge Power': '8.0 kW (Transient 10s)',
            'Round Trip Efficiency': '> 95%',
            'Cell Lifecycle': '10,000 Cycles @ 0.5C',
            'Communication': 'CAN / RS485 / WiFi / LoRaWAN',
            'Ingress Protection': 'IP65 (All-Weather)'
        },
        solutionId: 'battery-bess',
        category: 'ENERGY STORAGE SYSTEMS',
        categoryPath: ['Energy Storage Systems', 'Micro Power Banks']
    },
    {
        id: 'energy-farms',
        menuId: 'battery-bess',
        groupId: 'energy-storage-solutions',
        categoryId: 'container-farms',
        slug: 'powergrid-megawatt-industrial-bess',
        title: 'PowerGrid MW-Series',
        subtitle: 'Utility-Scale Containerized BESS',
        image: '/thumbnail_container_farms.png',
        productType: 'hardware',
        brief: 'Utility-grade energy storage ecosystem engineered for frequency regulation, grid stabilization, and large-scale renewable time-shifting.',
        features: [
            { value: '4.2 MWh', label: 'SYS_CAPACITY' },
            { value: '1500V', label: 'DC_ARCHITECTURE' },
            { value: 'Liquid', label: 'THERMAL_MGMT' }
        ],
        description: 'The PowerGrid MW-Series is a flagship utility-scale BESS designed for deep grid integration. Featuring 1500V DC architecture and active liquid cooling, it maintains peak performance across extreme climatic variables. Each unit integrates Stat-X autonomous fire suppression and a multi-level redundant BMS for maximum operational security.',
        industryTags: ['Utility Operations', 'IPP', 'Grid Stability'],
        technologyTags: ['1500V LFP', 'Liquid Cooling', 'Autonomous Suppression'],
        applicationTags: ['Frequency Control', 'Black Start', 'Energy Arbitrage'],
        specifications: {
            'Rated Capacity': '4.22 MWh (Standard 40ft)',
            'DC System Voltage': '1500V (High Efficiency)',
            'Round Trip Efficiency': '> 92% (AC-AC)',
            'Response Time': '< 20ms (Full Load)',
            'Life Expectancy': '20 Years / 6000 Cycles',
            'Compliance': 'IEEE 1547 / UL 9540 / IEC 62933'
        },
        solutionId: 'battery-bess',
        category: 'ENERGY STORAGE SYSTEMS',
        categoryPath: ['Energy Storage Systems', 'Energy Farms']
    },

    // --- AEROSPACE & UAV BATTERY PACKS ---
    {
        id: 'sky-force-uav',
        menuId: 'battery-bess',
        groupId: 'aerospace-battery-packs',
        categoryId: 'aerospace-high-density',
        slug: 'skyforce-uav-flight-packs',
        title: 'SkyForce UAV',
        subtitle: 'High Energy Density Flight Packs',
        image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=1200',
        productType: 'hardware',
        brief: 'Specialized lightweight, high-capacity battery systems for aerospace and UAV applications, featuring flight-safety certified BMS.',
        features: [
            { value: '300 Wh/kg', label: 'DENSITY' },
            { value: 'Flight', label: 'CERT' },
            { value: 'Light', label: 'WEIGHT' }
        ],
        description: 'SkyForce series offers specialized energy solutions for the aerospace sector, focusing on weight reduction without compromising on power delivery.',
        industryTags: ['Aerospace', 'UAV'],
        technologyTags: ['NMC', 'Carbon Casing'],
        applicationTags: ['Long Range Flight', 'Cargo Drones'],
        specifications: {
            'Energy Density': '300 Wh/kg',
            'Voltage': '44.4 V (12S)',
            'Capacity': '22,000 mAh',
            'Housing': 'Carbon Fiber Composite',
            'Flight Temp': '-20 to 60°C'
        },
        solutionId: 'battery-bess',
        category: 'AEROSPACE BATTERY PACKS',
        categoryPath: ['Aerospace Battery Packs', 'High Energy Density']
    },

    // --- FUTURE TECH - THERMAL ENERGY SYSTEMS ---
    {
        id: 'solar-thermal-gen',
        menuId: 'future-tech',
        groupId: 'thermal-energy-systems',
        categoryId: 'solar-thermal-gen',
        slug: 'industrial-solar-thermal-generators',
        title: 'Industrial Solar Thermal Generators',
        subtitle: 'Concentrated Solar Heat-to-Power',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
        productType: 'hardware',
        brief: 'High-temperature concentrated solar power (CSP) generators that convert direct solar radiation into high-grade industrial heat.',
        features: [
            { value: '800°C', label: 'TEMP' },
            { value: 'Clean', label: 'HEAT' },
            { value: 'Storage', label: 'READY' }
        ],
        description: 'Full-scale industrial CSP units designed for high-temperature steam generation and thermal energy storage application.',
        industryTags: ['Manufacturing', 'Process Heat'],
        technologyTags: ['CSP', 'Absorber Tubes'],
        applicationTags: ['Food Processing', 'Chemical Plants'],
        specifications: {
            'Max Temperature': '850°C',
            'Optical Efficiency': '78%',
            'Concentration Ratio': '100x',
            'Fluid': 'Synthetic Oil / Molten Salt',
            'Mirror Area': '12.5 m2 per unit'
        },
        solutionId: 'future-tech',
        category: 'THERMAL ENERGY SYSTEMS',
        categoryPath: ['Thermal Energy Systems', 'Solar Thermal Generators']
    },
    {
        id: 'salt-batteries',
        menuId: 'future-tech',
        groupId: 'thermal-energy-systems',
        categoryId: 'salt-batteries',
        slug: 'molten-salt-thermal-batteries',
        title: 'Molten Salt Thermal Batteries',
        subtitle: 'High-Temperature Energy Storage',
        image: 'https://images.unsplash.com/photo-1544724569-5f546fa6627a?w=1200',
        productType: 'hardware',
        brief: 'Phase-change thermal energy storage using molten salt composites for massive 24-hour heat banking.',
        features: [
            { value: '24h', label: 'STORAGE' },
            { value: 'Phase', label: 'CHANGE' },
            { value: 'Zero', label: 'LOSS' }
        ],
        description: 'Molten salt thermal storage systems for concentrated solar power applications, delivering stable heat for continuous power generation.',
        industryTags: ['Grid Scale', 'Industrial Storage'],
        technologyTags: ['PCM', 'Molten Salt'],
        applicationTags: ['Overnight Heat', 'Grid Peak Balancing'],
        specifications: {
            'Storage Density': '450 kWh / m3',
            'Temp Range': '230 - 565°C',
            'Charging Eff': '96%',
            'Service Life': '35 Years',
            'Material': 'Eutectic Salt Blend'
        },
        solutionId: 'future-tech',
        category: 'THERMAL ENERGY SYSTEMS',
        categoryPath: ['Thermal Energy Systems', 'Salt Batteries']
    },

    // --- FUTURE TECH - HYDROGEN GENERATION SYSTEMS ---
    {
        id: 'green-hydrogen',
        menuId: 'future-tech',
        groupId: 'hydrogen-generation-systems',
        categoryId: 'green-hydrogen',
        slug: 'industrial-green-hydrogen-systems',
        title: 'Green Hydrogen Systems',
        subtitle: 'Zero-Emission Fuel Production',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200',
        productType: 'hardware',
        brief: 'PEM-based electrolyzer units designed to convert surplus renewable electricity into high-purity green hydrogen fuel.',
        features: [
            { value: '99.99%', label: 'PURITY' },
            { value: 'PEM', label: 'CORE' },
            { value: 'Modular', label: 'H2' }
        ],
        description: 'Modular green hydrogen generators that integrate with wind/solar farms to produce clean industrial gas on-site.',
        industryTags: ['Refineries', 'Steel', 'Transport'],
        technologyTags: ['Proton Exchange Membrane', 'Electrolyzer'],
        applicationTags: ['Heavy Haulage', 'Zero-Carbon Steel'],
        specifications: {
            'Stack Power': '1.0 MW',
            'Pressure': '30 Bar (Direct)',
            'H2 Quality': '5.0 Pure',
            'Water Cons': '9 L / kg H2',
            'Footprint': 'Standard 40ft Container'
        },
        solutionId: 'future-tech',
        category: 'HYDROGEN GENERATION SYSTEMS',
        categoryPath: ['Hydrogen Generation Systems', 'Green Hydrogen']
    },
    {
        id: 'about-main',
        menuId: 'future-tech',
        groupId: 'corporate-info',
        categoryId: 'about',
        slug: 'about-main',
        title: 'About Powerfrill',
        subtitle: 'Engineering the Future of Energy',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200',
        productType: 'informational',
        brief: 'Powerfrill is a global leader in high-performance energy components and systems, specializing in industrial solar, advanced BESS, and future energy technologies.',
        features: [
            { label: 'Innovation', value: 'Leading R&D in energy' },
            { label: 'Quality', value: 'Industrial grade standards' },
            { label: 'Service', value: 'Global support network' }
        ],
        description: 'With a deep focus on industrial sustainability, Powerfrill provides the engineering core for the next generation of energy infrastructure. From high-efficiency TOPCon solar modules to utility-scale energy storage, our systems are designed for maximum durability and performance in the most demanding environments.',
        industryTags: ['Corporate', 'Industrial', 'Energy'],
        technologyTags: ['Solar', 'BESS', 'Hydrogen'],
        applicationTags: ['Corporate Knowledge'],
        specifications: {
            'Established': '2018',
            'Headquarters': 'Global',
            'Specialization': 'Energy Systems',
            'Sectors': 'Solar, Battery, Future Tech'
        },
        solutionId: 'future-tech',
        category: 'CORPORATE INFO',
        categoryPath: ['Corporate Info', 'About'],
        hideQuotation: true
    },
    {
        id: 'contact-main',
        menuId: 'future-tech',
        groupId: 'corporate-info',
        categoryId: 'contact',
        slug: 'contact-main',
        title: 'Contact Us',
        subtitle: 'Connect with Our Engineering Team',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
        productType: 'informational',
        brief: 'Get in touch with Powerfrill for project consultations, technical support, or partnership inquiries.',
        features: [
            { label: 'Support', value: '24/7 Technical assistance' },
            { label: 'Sales', value: 'Enterprise solutions' },
            { label: 'Partners', value: 'Global network access' }
        ],
        description: 'Our team of engineers and energy specialists is ready to assist with your project requirements. Whether you are looking for specific system components or full utility-scale solutions, we provide the technical expertise to ensure success.',
        industryTags: ['Support', 'Sales', 'Corporate'],
        technologyTags: ['Assistance', 'Consultation'],
        applicationTags: ['Communication'],
        specifications: {
            'Email': 'info@powerfrill.com',
            'Support': '+1 (800) POWER-FR',
            'Availability': 'Mon-Fri, 9am-6pm EST'
        },
        solutionId: 'future-tech',
        category: 'CORPORATE INFO',
        categoryPath: ['Corporate Info', 'Contact'],
        hideQuotation: true
    }
];

// --- MASTER NAVIGATION DATA ---

export const solutions: SolutionHub[] = [
    {
        id: 'solar-energy',
        title: 'Application Engineering & Services',
        heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920',
        path: 'Application Engineering & Services'
    },
    {
        id: 'battery-bess',
        title: 'Battery Packs & Energy Storage Systems',
        heroImage: 'https://images.unsplash.com/photo-1548613053-2207038148f9?w=1920',
        path: 'Battery Packs & Energy Storage Systems'
    },
    {
        id: 'future-tech',
        title: 'Future Roadmap & Global R&D',
        heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920',
        path: 'Future Roadmap & Global R&D'
    },
    {
        id: 'about',
        title: 'About Powerfrill Corporate',
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
        path: 'About Powerfrill Corporate'
    }
];

export const groups: CategoryGroup[] = [
    // Solar Groups
    { id: 'solar-power-solutions', name: 'Solar Power Solutions', menuId: 'solar-energy' },
    { id: 'inverters-electronics', name: 'Inverters & Power Electronics', menuId: 'solar-energy' },
    { id: 'plant-infrastructure', name: 'Plant Infrastructure', menuId: 'solar-energy' },
    { id: 'mounting-structures', name: 'Mounting Structures', menuId: 'solar-energy' },

    // Battery & BESS Groups
    { id: 'energy-storage-solutions', name: 'Energy Storage Systems', menuId: 'battery-bess' },
    { id: 'automotive-battery-packs', name: 'Automotive Battery Packs', menuId: 'battery-bess' },
    { id: 'aerospace-battery-packs', name: 'Aerospace Battery Packs', menuId: 'battery-bess' },

    // Future Tech Groups
    { id: 'thermal-energy-systems', name: 'Thermal Energy Systems', menuId: 'future-tech' },
    { id: 'hydrogen-generation-systems', name: 'Hydrogen Generation Systems', menuId: 'future-tech' }
];

export const categories: Category[] = [
    // SOLAR ENERGY - Solar Power Solutions
    { id: 'solar-panels', name: 'Solar Panels', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200', description: 'High-efficiency photovoltaic modules including Mono-facial, Bi-facial, and TOPCon technologies.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'solar-power-solutions' },
    { id: 'robotic-cleaning', name: 'Autonomous Cleaning Robotic Systems', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', description: 'Waterless autonomous cleaning robots (Dobby series) for industrial solar arrays.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'solar-power-solutions' },
    { id: 'tracking-systems', name: 'Active Tracking Systems', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200', description: 'Single and dual-axis solar trackers with AI-driven weather mitigation.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'solar-power-solutions' },

    // SOLAR ENERGY - Inverters & Power Electronics
    { id: 'on-grid-inverters', name: 'On Grid Inverters', image: 'https://images.unsplash.com/photo-1592833159057-65a2845722dc?w=1200', description: 'Grid-tied power conversion systems.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'inverters-electronics' },
    { id: 'off-grid-inverters', name: 'Off Grid Inverters', image: 'https://images.unsplash.com/photo-1620846660144-a0953a99527e?w=1200', description: 'Standalone power reliability systems.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'inverters-electronics' },
    { id: 'hybrid-inverters', name: 'Hybrid Inverters', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200', description: 'Smart energy management inverters.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'inverters-electronics' },
    { id: 'solar-net-meters', name: 'Solar Net Meters', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200', description: 'Bi-directional energy measurement.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'inverters-electronics' },

    // SOLAR ENERGY - Plant Infrastructure
    { id: 'safety-systems', name: 'Earthing & Lightning Arresters', image: 'https://images.unsplash.com/photo-1620846660144-a0953a99527e?w=1200', description: 'Critical plant safety infrastructure.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'plant-infrastructure' },
    { id: 'monitoring-systems', name: 'SCADA & Data Logger Systems', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1200', description: 'Remote plant monitoring and control.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'plant-infrastructure' },
    { id: 'efficiency-management', name: 'Plant Efficiency Management Systems', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200', description: 'AI-driven performance optimization.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'plant-infrastructure' },

    // SOLAR ENERGY - Mounting Structures
    { id: 'cad-framework', name: 'Computer Aided Framework', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200', description: 'Precision engineered mounting.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'mounting-structures' },
    { id: 'steel-frames', name: 'Pre Treated Steel Frames', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200', description: 'Corrosion resistant structures.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'mounting-structures' },
    { id: 'prefab-mounting', name: 'Prefabricated Mounting Structures', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', description: 'Rapid installation systems.', solutionId: 'solar-energy', menuId: 'solar-energy', groupId: 'mounting-structures' },

    // BATTERY & BESS - Energy Storage Systems
    { id: 'micro-storage', name: 'Micro Power Banks', image: '/thumbnail_micro_storage.png', description: 'Residential energy storage.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'energy-storage-solutions' },
    { id: 'enterprise-storage', name: 'Enterprise Power Banks', image: '/thumbnail_enterprise_storage.png', description: 'Commercial scale energy storage.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'energy-storage-solutions' },
    { id: 'container-farms', name: 'Energy Farms Containerized Banks', image: '/thumbnail_container_farms.png', description: 'Megawatt-scale storage containers.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'energy-storage-solutions' },
    { id: 'utility-storage', name: 'Utility Scale Energy Storage', image: '/thumbnail_utility_storage.png', description: 'Grid-level storage solutions.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'energy-storage-solutions' },

    // BATTERY & BESS - Automotive Battery Packs
    { id: '2w-packs', name: '2 Wheeler Battery Packs', image: '/battery_hero_bg.png', description: 'E-scooter and motorcycle packs.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'automotive-battery-packs' },
    { id: '3w-packs', name: '3 Wheeler Battery Packs', image: '/thumbnail_3w_pack.png', description: 'Last-mile delivery and rickshaw packs.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'automotive-battery-packs' },
    { id: '4w-packs', name: '4 Wheeler Battery Packs', image: '/thumbnail_4w_pack.png', description: 'Passenger and commercial EV packs.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'automotive-battery-packs' },

    // BATTERY & BESS - Aerospace Battery Packs
    { id: 'aerospace-high-density', name: 'High Energy Density Packs', image: '/thumbnail_aerospace_pack.png', description: 'Flight-rated UAV and aerospace packs.', solutionId: 'battery-bess', menuId: 'battery-bess', groupId: 'aerospace-battery-packs' },

    // FUTURE TECH - Thermal Energy Systems
    { id: 'solar-thermal-gen', name: 'Solar Thermal Generators', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200', description: 'Concentrated solar power generation.', solutionId: 'future-tech', menuId: 'future-tech', groupId: 'thermal-energy-systems' },
    { id: 'salt-batteries', name: 'Salt / Silica Thermal Batteries', image: 'https://images.unsplash.com/photo-1544724569-5f546fa6627a?w=1200', description: 'Molten salt and silica storage.', solutionId: 'future-tech', menuId: 'future-tech', groupId: 'thermal-energy-systems' },

    // FUTURE TECH - Hydrogen Generation Systems
    { id: 'green-hydrogen', name: 'Green Hydrogen Systems', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200', description: 'Zero-emission electrolyzer systems.', solutionId: 'future-tech', menuId: 'future-tech', groupId: 'hydrogen-generation-systems' }
];

// --- HELPER FUNCTIONS ---

export const getProductById = (id: string): ProductData | undefined => {
    return productsData.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): ProductData | undefined => {
    return productsData.find(product => product.slug === slug);
};

export const getProductsByCategoryId = (categoryId: string): ProductData[] => {
    return productsData.filter(product => product.categoryId === categoryId);
};

export const getCategoriesByGroupId = (groupId: string): Category[] => {
    return categories.filter(category => category.groupId === groupId);
};

export const getGroupsByMenuId = (menuId: string): CategoryGroup[] => {
    return groups.filter(group => group.menuId === menuId);
};

export const getProductsByMenuId = (menuId: string): ProductData[] => {
    return productsData.filter(product => product.menuId === menuId);
};


