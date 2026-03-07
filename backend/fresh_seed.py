import bcrypt
from sqlmodel import Session, SQLModel
from app.models import User, Product, UserRole
from app.database import engine

def create_db_and_tables():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)

def seed_data():
    password = "admin123"
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    with Session(engine) as session:
        # Create Admin
        admin = User(
            email="admin@powerfrill.com",
            full_name="System Administrator",
            hashed_password=hashed_password,
            role=UserRole.ADMIN,
            is_active=True
        )
        session.add(admin)
        
        products_to_seed = [
            # --- BATTERY & BESS ---
            {
                "id": "erickshaw-pro-max",
                "menuId": "battery-bess",
                "groupId": "automotive-battery-packs",
                "categoryId": "e-rickshaw",
                "slug": "professional-erickshaw-battery-60v",
                "title": "PowerFill Pro-Rickshaw Max",
                "subtitle": "AIS 156 Phase 2 Certified LFP Pack",
                "image": "/assets/erickshaw-pro.png",
                "productType": "hardware",
                "brief": "The ultimate power source for commercial E-Rickshaws.",
                "description": "Engineered for the demanding Indian terrain, the Pro-Rickshaw Max offers unmatched reliability.",
                "category": "E-RICKSHAW BATTERY",
                "features": [{"value": "100km+", "label": "RANGE"}, {"value": "AIS 156", "label": "CERTIFIED"}],
                "specifications": {"Nominal Voltage": "60V", "Rated Capacity": "100Ah"},
                "chemistry": "LFP (LiFePO4)",
                "certification": "AIS 156 Phase 2",
                "cycle_life": "3500+ Cycles",
                "warranty_years": 3,
                "charging_time": "3 Hours",
                "voltage_nominal": "60V",
                "capacity_ah": "100Ah",
                "solutionId": "battery-bess",
                "industryTags": ["Commercial", "Logistics"]
            },
            {
                "id": "escooter-pro-glide",
                "menuId": "battery-bess",
                "groupId": "automotive-battery-packs",
                "categoryId": "e-scooter",
                "slug": "professional-escooter-battery-72V",
                "title": "PowerFill Glide-Pro",
                "subtitle": "High-Performance E-Scooter Module",
                "image": "/assets/escooter-pro.png",
                "productType": "hardware",
                "brief": "Compact, high-density Lithium-ion pack for next-gen electric scooters.",
                "description": "The Glide-Pro is designed for urban commuters who demand performance and safety.",
                "category": "E-SCOOTER BATTERY",
                "features": [{"value": "72V", "label": "POWER"}, {"value": "2 Hours", "label": "CHARGE"}],
                "specifications": {"Nominal Voltage": "72V", "Capacity": "40Ah"},
                "chemistry": "NMC",
                "certification": "AIS 156 compliant",
                "cycle_life": "2000+ Cycles",
                "warranty_years": 2,
                "charging_time": "2 Hours",
                "voltage_nominal": "72V",
                "capacity_ah": "40Ah",
                "solutionId": "battery-bess",
                "industryTags": ["Mobility"]
            },
            {
                "id": "li-ion-4w",
                "menuId": "battery-bess",
                "groupId": "automotive-battery-packs",
                "categoryId": "4w-packs",
                "slug": "li-ion-4w-packs",
                "title": "Li-Ion 4W Battery Packs",
                "subtitle": "Proterra EV Bus Standard",
                "image": "/thumbnail_4w_pack.png",
                "productType": "hardware",
                "brief": "Next-generation 800V battery architecture.",
                "description": "Designed for premium electric sports cars and commercial buses. Features ultra-fast charging.",
                "category": "4 WHEELER BATTERY",
                "features": [{"value": "120 kWh", "label": "CAPACITY"}, {"value": "800V", "label": "VOLTAGE"}],
                "specifications": {"Density": "250 Wh/kg", "Thermal": "Liquid Cooling"},
                "chemistry": "NMC",
                "voltage_nominal": "800V",
                "solutionId": "battery-bess",
                "industryTags": ["Automotive"]
            },
            {
                "id": "series-p86",
                "menuId": "battery-bess",
                "groupId": "automotive-battery-packs",
                "categoryId": "2w-packs",
                "slug": "series-p86-components",
                "title": "Series P-86 Components",
                "subtitle": "High-Fidelity 3D Battery Module",
                "image": "/thumbnail_2w_pack.png",
                "productType": "hardware",
                "brief": "Precision-engineered P-86 module.",
                "description": "Advanced thermal management with rugged extruded aluminum tray.",
                "category": "2 WHEELER BATTERY",
                "features": [{"value": "P-86", "label": "SERIES"}, {"value": "IP67", "label": "SEALED"}],
                "specifications": {"Cell": "21700 Cylindrical", "Cooling": "Liquid"},
                "chemistry": "NMC",
                "solutionId": "battery-bess"
            },
            # --- ENERGY STORAGE ---
            {
                "id": "residential-bess",
                "menuId": "battery-bess",
                "groupId": "energy-storage-solutions",
                "categoryId": "micro-storage",
                "slug": "homepower-industrial-residential-storage",
                "title": "HomePower 5K",
                "subtitle": "Residential storage",
                "image": "/thumbnail_micro_storage.png",
                "productType": "hardware",
                "brief": "Residential storage solution.",
                "description": "Professional grade residential storage kernel with integrated hybrid inversion.",
                "category": "ENERGY STORAGE",
                "features": [{"value": "5.12 kWh", "label": "CAPACITY"}],
                "specifications": {"Cycles": "10,000"},
                "chemistry": "LFP",
                "solutionId": "battery-bess"
            },
            {
                "id": "energy-farms",
                "menuId": "battery-bess",
                "groupId": "energy-storage-solutions",
                "categoryId": "container-farms",
                "slug": "powergrid-megawatt-industrial-bess",
                "title": "PowerGrid MW-Series",
                "subtitle": "Containerized BESS",
                "image": "/thumbnail_container_farms.png",
                "productType": "hardware",
                "brief": "Utility-grade containerized storage.",
                "description": "Megawatt-scale storage containers for frequency regulation and grid stabilization.",
                "category": "ENERGY STORAGE",
                "features": [{"value": "4.2 MWh", "label": "CAPACITY"}],
                "specifications": {"DC": "1500V", "Efficiency": "92%"},
                "chemistry": "LFP",
                "solutionId": "battery-bess"
            },
            # --- SOLAR PANELS ---
            {
                "id": "mono-facial",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "solar-panels",
                "slug": "mono-facial-solar-panels",
                "title": "Mono Facial Solar Panels",
                "subtitle": "Single-Side Technology",
                "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
                "productType": "hardware",
                "brief": "Ultra-efficient single-crystalline modules.",
                "description": "Ideal for residential rooftops, offering reliable power with sleek appearance.",
                "category": "SOLAR PANEL",
                "features": [{"value": "22%", "label": "EFFICIENCY"}],
                "specifications": {"Max Power": "550W"},
                "solutionId": "solar-energy",
                "warranty_years": 25
            },
            {
                "id": "bi-facial",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "solar-panels",
                "slug": "bi-facial-solar-panels",
                "title": "Bi-Facial Solar Panels",
                "subtitle": "Dual-Side Capture",
                "image": "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800",
                "productType": "hardware",
                "brief": "Harness sunlight from both sides.",
                "description": "Increases yield by 30% in high-albedo environments like water or white roofs.",
                "category": "SOLAR PANEL",
                "features": [{"value": "+30%", "label": "YIELD"}],
                "specifications": {"Front Power": "545W"},
                "solutionId": "solar-energy"
            },
            {
                "id": "topcon",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "solar-panels",
                "slug": "topcon-solar-panels",
                "title": "TOPCon Solar Panels",
                "subtitle": "Next-Gen Cell Tech",
                "image": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
                "productType": "hardware",
                "brief": "Gold standard N-type technology.",
                "description": "Minimal degradation over 30 years with exceptional low-light performance.",
                "category": "SOLAR PANEL",
                "features": [{"value": "25%", "label": "EFFICIENCY"}],
                "specifications": {"Degradation": "<0.4%/yr"},
                "solutionId": "solar-energy",
                "warranty_years": 30
            },
            # --- ROBOTICS & TRACKING ---
            {
                "id": "dobby-r1",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "robotic-cleaning",
                "slug": "dobby-r1-cleaning-robot",
                "title": "Dobby R1",
                "subtitle": "Rooftop Cleaner",
                "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
                "productType": "hardware",
                "brief": "Waterless cleaning for rooftops.",
                "description": "Intelligent autonomous robot for light-commercial maintenance.",
                "category": "SOLAR ROBOTICS",
                "features": [{"value": "Waterless", "label": "CLEAN"}],
                "specifications": {"Battery": "8 Hours"},
                "solutionId": "solar-energy"
            },
            {
                "id": "dobby-r2",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "robotic-cleaning",
                "slug": "dobby-r2-industrial-robot",
                "title": "Dobby R2",
                "subtitle": "Utility Grade Cleaner",
                "image": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
                "productType": "hardware",
                "brief": "Heavy-duty maintenance for solar farms.",
                "description": "Features swarm-logic and AI pathfinding for large-scale operations.",
                "category": "SOLAR ROBOTICS",
                "features": [{"value": "Swarm", "label": "AI"}],
                "specifications": {"Coverage": "1.5 MW Plants"},
                "solutionId": "solar-energy"
            },
            {
                "id": "single-axis-tracker",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "tracking-systems",
                "slug": "single-axis-solar-tracker",
                "title": "Single Axis Tracker",
                "subtitle": "East-West Tracking",
                "image": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
                "productType": "hardware",
                "brief": "Precision sun-tracking system.",
                "description": "Follows the sun's path to increase total annual yield up to 25%.",
                "category": "TRACKERS",
                "features": [{"value": "25%", "label": "MORE YIELD"}],
                "specifications": {"Range": "±60 deg"},
                "solutionId": "solar-energy"
            },
            {
                "id": "dual-axis-tracker",
                "menuId": "solar-energy",
                "groupId": "solar-power-solutions",
                "categoryId": "tracking-systems",
                "slug": "dual-axis-solar-tracker",
                "title": "Dual Axis Tracker",
                "subtitle": "Full Sun Path",
                "image": "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800",
                "productType": "hardware",
                "brief": "Horizontal and vertical movement.",
                "description": "Ultimate tracking for solar concentrators or high-yield hubs; 40% higher capture.",
                "category": "TRACKERS",
                "features": [{"value": "40%", "label": "MORE YIELD"}],
                "specifications": {"Azimuth": "360 deg"},
                "solutionId": "solar-energy"
            },
            # --- INVERTERS & ELECTRONICS ---
            {
                "id": "on-grid-inverters",
                "menuId": "solar-energy",
                "groupId": "inverters-electronics",
                "categoryId": "on-grid-inverters",
                "slug": "on-grid-power-inverters",
                "title": "On Grid Inverters",
                "subtitle": "Grid-Tied Conversion",
                "image": "https://images.unsplash.com/photo-1592833159057-65a2845722dc?w=800",
                "productType": "hardware",
                "brief": "High-efficiency grid-tied conversion.",
                "description": "Pure sine wave inverters with smart monitoring for net metering.",
                "category": "POWER ELECTRONICS",
                "features": [{"value": "98%+", "label": "EFFICIENCY"}],
                "specifications": {"Input": "15 kW Max"},
                "solutionId": "solar-energy"
            },
            {
                "id": "hybrid-inverters",
                "menuId": "solar-energy",
                "groupId": "inverters-electronics",
                "categoryId": "hybrid-inverters",
                "slug": "hybrid-energy-management-inverters",
                "title": "Hybrid Inverters",
                "subtitle": "Energy Managers",
                "image": "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800",
                "productType": "hardware",
                "brief": "Manages solar, battery, and grid.",
                "description": "Bi-directional energy management for peak shaving and zero export.",
                "category": "POWER ELECTRONICS",
                "features": [{"value": "<5ms", "label": "UPS MODE"}],
                "specifications": {"Parallel": "6 Units"},
                "solutionId": "solar-energy"
            },
            # --- INFRASTRUCTURE & MOUNTING ---
            {
                "id": "earthing-lightning",
                "menuId": "solar-energy",
                "groupId": "plant-infrastructure",
                "categoryId": "safety-systems",
                "slug": "safety-protection-systems",
                "title": "Earthing & Arresters",
                "subtitle": "Lightning Protection",
                "image": "https://images.unsplash.com/photo-1620846660144-a0953a99527e?w=800",
                "productType": "hardware",
                "brief": "Grounding systems for solar assets.",
                "description": "Guardian of high-value assets against surges and atmospheric strikes.",
                "category": "SAFETY",
                "features": [{"value": "200kA", "label": "RATING"}],
                "specifications": {"Material": "Copper Bonded"},
                "solutionId": "solar-energy"
            },
            {
                "id": "cad-framework",
                "menuId": "solar-energy",
                "groupId": "mounting-structures",
                "categoryId": "cad-framework",
                "slug": "cad-engineered-mounting-framework",
                "title": "Computer Aided Framework",
                "subtitle": "Precision Mounting",
                "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
                "productType": "hardware",
                "brief": "CAD-simulated structural integrity.",
                "description": "Aeronautical-grade mounting frameworks for maximum wind resistance.",
                "category": "STRUCTURES",
                "features": [{"value": "200km/h", "label": "WIND RATING"}],
                "specifications": {"Material": "Al 6005-T5"},
                "solutionId": "solar-energy"
            },
            # --- FUTURE TECH ---
            {
                "id": "solar-thermal-gen",
                "menuId": "future-tech",
                "groupId": "thermal-energy-systems",
                "categoryId": "solar-thermal-gen",
                "slug": "industrial-solar-thermal-generators",
                "title": "Thermal Generators",
                "subtitle": "Concentrated Heat",
                "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
                "productType": "hardware",
                "brief": "Heat-to-power generation.",
                "description": "High-temperature CSP systems for industrial process heat.",
                "category": "THERMAL SYSTEMS",
                "features": [{"value": "850°C", "label": "TEMP"}],
                "specifications": {"Ratio": "100x"},
                "solutionId": "future-tech"
            },
            {
                "id": "salt-batteries",
                "menuId": "future-tech",
                "groupId": "thermal-energy-systems",
                "categoryId": "salt-batteries",
                "slug": "molten-salt-thermal-batteries",
                "title": "Salt Batteries",
                "subtitle": "Heat Storage",
                "image": "https://images.unsplash.com/photo-1544724569-5f546fa6627a?w=1200",
                "productType": "hardware",
                "brief": "Molten salt heat banking.",
                "description": "PCM-based thermal energy storage for 24-hour renewable banking.",
                "category": "THERMAL SYSTEMS",
                "features": [{"value": "24h", "label": "STORAGE"}],
                "specifications": {"Density": "450 kWh/m3"},
                "solutionId": "future-tech"
            },
            {
                "id": "green-hydrogen",
                "menuId": "future-tech",
                "groupId": "hydrogen-generation-systems",
                "categoryId": "green-hydrogen",
                "slug": "industrial-green-hydrogen-systems",
                "title": "Green Hydrogen",
                "subtitle": "PEM Electrolysis",
                "image": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200",
                "productType": "hardware",
                "brief": "Surplus renewable to H2.",
                "description": "Modular electrolyzers for high-purity industrial green fuel.",
                "category": "HYDROGEN",
                "features": [{"value": "99.99%", "label": "PURITY"}],
                "specifications": {"Purity": "5.0"},
                "solutionId": "future-tech"
            }
        ]
        
        for p_data in products_to_seed:
            product = Product(**p_data)
            session.add(product)
            
        session.commit()
    print("Database seeded with comprehensive 20+ industrial product catalog.")

if __name__ == "__main__":
    create_db_and_tables()
    seed_data()
