// Products Data for Lumière & Co. Luxury Lighting & Chandelier Store
const PRODUCTS_DATA = [
  {
    id: "prod-1",
    name: "Aurelia Cascade Grand Chandelier",
    tagline: "Cascading hand-cut crystal drops set in rich polished brass",
    category: "foyer",
    categoryLabel: "Grand Foyer",
    style: "crystal",
    styleLabel: "Crystal & Luxury",
    price: 4850,
    rating: 5.0,
    reviews: 38,
    badge: "Bestseller",
    badgeType: "gold",
    dimensions: '48" Diameter × 68" Height',
    weight: "82 lbs (Ceiling reinforcement recommended)",
    finish: "Solid Polished Lacquered Brass",
    material: "Hand-Cut K9 Optical Crystal & Solid Brass",
    bulbs: "24 × E12 Candelabra (LED Compatible, Dimmable)",
    lumens: "7,200 Lumens (Equivalent to 600W incandescent)",
    kelvin: "2700K Warm Ambient",
    leadTime: "In Stock (Ships in 2-3 business days)",
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=80",
    description: "The Aurelia Cascade is our flagship grand foyer statement piece. Crafted with over 350 individual precision-cut optical crystals, it refracts light into radiant spectral prisms across double-height entryways and grand staircases. Solid brass framework provides structural permanence."
  },
  {
    id: "prod-2",
    name: "Vesper Linear Brass Dining Chandelier",
    tagline: "Architectural linear silhouette with fluted opaline globes",
    category: "dining",
    categoryLabel: "Dining Room",
    style: "modern",
    styleLabel: "Modern Minimalist",
    price: 2490,
    rating: 4.9,
    reviews: 42,
    badge: "Architect's Pick",
    badgeType: "stone",
    dimensions: '60" Length × 14" Width × 22" Height',
    weight: "34 lbs",
    finish: "Satin Brushed Champagne Brass",
    material: "Solid Drawn Brass Tubing & Hand-Blown Opaline Glass",
    bulbs: "Integrated 48W High-CRI (95+) Warm LED",
    lumens: "4,100 Lumens (Smooth 0-10V Dimming)",
    kelvin: "3000K Soft White",
    leadTime: "In Stock (Ships in 48 hours)",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description: "Designed specifically for 8-to-12-seater dining tables, the Vesper offers continuous, glare-free downward illumination while casting a soft ambient crown upward. Features telescoping downrods adjustable from 24\" to 72\" drop."
  },
  {
    id: "prod-3",
    name: "Seraphina Tiered Murano Glass Pendant",
    tagline: "Scalloped amber and clear Venetian art glass ribbons",
    category: "living",
    categoryLabel: "Living Room",
    style: "mid-century",
    styleLabel: "Mid-Century Modern",
    price: 3150,
    rating: 4.8,
    reviews: 29,
    badge: "Handcrafted",
    badgeType: "gold",
    dimensions: '36" Diameter × 32" Height',
    weight: "48 lbs",
    finish: "Antiqued Bronze Armature",
    material: "Mouth-Blown Murano Fluted Art Glass & Bronze",
    bulbs: "12 × G9 Bi-Pin LED (Included)",
    lumens: "3,600 Lumens",
    kelvin: "2700K Warm Sunset",
    leadTime: "Bespoke Order (2-3 weeks fabrication)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    description: "Each petal of the Seraphina is mouth-blown by Venetian artisans, creating organic micro-variations that make every fixture unique. When illuminated, the fluted glass diffuses a rich, warm glow that flatters skin tones and textures."
  },
  {
    id: "prod-4",
    name: "Celestia Sculptural Halo Chandelier",
    tagline: "Concentric floating rings of champagne gold and micro-diffusers",
    category: "living",
    categoryLabel: "Living Room",
    style: "modern",
    styleLabel: "Modern Minimalist",
    price: 3800,
    rating: 4.9,
    reviews: 51,
    badge: "Design Award 2025",
    badgeType: "gold",
    dimensions: '52" Outer Diameter × 18" Body Height',
    weight: "28 lbs (Ultra-light aircraft cable mount)",
    finish: "Anodized Champagne Gold & Matte Pearl White",
    material: "Aviation-Grade Anodized Aluminum & Optical Silicone",
    bulbs: "72W Continuous Perimeter High-CRI LED",
    lumens: "5,800 Lumens (Tunable White Compatible)",
    kelvin: "2700K - 4000K Tunable",
    leadTime: "In Stock (Ships in 24 hours)",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=900&q=80",
    description: "The Celestia creates the illusion of weightless light hovering in space. Suspended by whisper-thin aircraft cables that supply power without visible wiring, this fixture anchors open-concept living rooms with contemporary elegance."
  },
  {
    id: "prod-5",
    name: "Versailles Empire Heritage Chandelier",
    tagline: "Monumental historical tiered chandelier with 24K gilded iron",
    category: "foyer",
    categoryLabel: "Grand Foyer",
    style: "crystal",
    styleLabel: "Crystal & Luxury",
    price: 8900,
    rating: 5.0,
    reviews: 19,
    badge: "Masterpiece",
    badgeType: "gold",
    dimensions: '56" Diameter × 84" Height',
    weight: "145 lbs (Heavy-duty J-Box & Winch System Required)",
    finish: "24K Gold Leaf Gilded Wrought Iron",
    material: "30% PbO Austrian Strass Crystals & Hand-Forged Iron",
    bulbs: "36 × E12 Candelabra Sockets",
    lumens: "11,500 Lumens",
    kelvin: "2700K Warm Golden",
    leadTime: "Made to Order (4-6 weeks with White-Glove Delivery)",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    description: "Inspired by the Hall of Mirrors at the Palace of Versailles, this heirloom chandelier commands attention in cathedral ceilings and ballroom foyers. Features genuine full-lead Austrian crystals that shimmer with exceptional fire."
  },
  {
    id: "prod-6",
    name: "Calais Alabaster Disc Chandelier",
    tagline: "Natural Spanish carved alabaster shields with brass accents",
    category: "bedroom",
    categoryLabel: "Bedroom Suite",
    style: "alabaster",
    styleLabel: "Organic Alabaster",
    price: 2850,
    rating: 4.9,
    reviews: 34,
    badge: "Popular",
    badgeType: "stone",
    dimensions: '32" Diameter × 24" Height',
    weight: "39 lbs",
    finish: "Antiqued Burnished Brass",
    material: "Genuine Spanish Veined Alabaster Stone & Brass",
    bulbs: "8 × E26 Medium Base Bulbs",
    lumens: "3,200 Lumens (Soft diffused glow)",
    kelvin: "2400K - 2700K Intimate Warm",
    leadTime: "In Stock (Ships in 2-3 business days)",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    description: "No two alabaster stones are identical. The Calais features hand-turned Spanish alabaster plates with natural earthy veining. The stone filters illumination into an extraordinarily soft, soothing ambiance that makes it ideal for master bedroom retreats."
  },
  {
    id: "prod-7",
    name: "Solstice Art Deco Tiered Chandelier",
    tagline: "Prismatic fluted glass tubes arranged in roaring 20s geometric symmetry",
    category: "dining",
    categoryLabel: "Dining Room",
    style: "art-deco",
    styleLabel: "Art Deco",
    price: 3450,
    rating: 4.8,
    reviews: 26,
    badge: "Exclusive",
    badgeType: "gold",
    dimensions: '44" Diameter × 38" Height',
    weight: "52 lbs",
    finish: "Mirror Polished Nickel",
    material: "Ribbed Borosilicate Glass Cylinders & Polished Nickel",
    bulbs: "18 × E12 Candelabra Tubular LED",
    lumens: "5,400 Lumens",
    kelvin: "2700K Warm Dimming",
    leadTime: "In Stock",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    description: "Evoking the glamour of Manhattan penthouses during the Jazz Age, the Solstice layers concentric tiers of fluted glass cylinders over a polished nickel crown. Produces radiant linear reflections across dining tabletops."
  },
  {
    id: "prod-8",
    name: "Komorebi Sculptural Brass Branch",
    tagline: "Organic botanical branches with delicate cast porcelain petals",
    category: "dining",
    categoryLabel: "Dining Room",
    style: "modern",
    styleLabel: "Modern Minimalist",
    price: 4200,
    rating: 5.0,
    reviews: 22,
    badge: "Bespoke Art",
    badgeType: "gold",
    dimensions: '64" Length × 28" Width × 24" Height',
    weight: "41 lbs",
    finish: "Hand-Applied Patina Solid Brass",
    material: "Lost-Wax Cast Brass & Translucent Bone China",
    bulbs: "14 × G4 Micro LED (Integrated)",
    lumens: "3,800 Lumens",
    kelvin: "2700K Gentle Warm",
    leadTime: "Made to Order (3-4 weeks)",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=900&q=80",
    description: "Named after the Japanese word for sunlight filtering through trees, Komorebi brings nature inside through artisanal lost-wax casting. The hand-sculpted porcelain blossoms emit a poetic, delicate glow above dining and conference tables."
  },
  {
    id: "prod-9",
    name: "Nero Industrial Geode Chandelier",
    tagline: "Blackened steel armature with exposed brass knurled sockets",
    category: "kitchen",
    categoryLabel: "Kitchen & Bar",
    style: "industrial",
    styleLabel: "Industrial Brass",
    price: 1980,
    rating: 4.7,
    reviews: 31,
    badge: "Versatile",
    badgeType: "stone",
    dimensions: '38" Diameter × 28" Height',
    weight: "26 lbs",
    finish: "Gunmetal Black Steel & Raw Knurled Brass",
    material: "Structural Carbon Steel & Heavy Brass Hardware",
    bulbs: "10 × E26 Vintage Squirrel Cage Bulbs Included",
    lumens: "3,100 Lumens",
    kelvin: "2200K - 2700K Vintage Amber",
    leadTime: "In Stock (Ships Next Day)",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=80",
    description: "A confident statement for lofts, high-end kitchen islands, and private bars. Nero pairs precision-machined heavy brass fittings with industrial steel tubes, designed for authentic vintage-style filament illumination."
  },
  {
    id: "prod-10",
    name: "Paloma Slender Island Pendant Trio",
    tagline: "Set of three linear pendants with ribbed brass and marble rims",
    category: "kitchen",
    categoryLabel: "Kitchen & Bar",
    style: "modern",
    styleLabel: "Modern Minimalist",
    price: 1650,
    rating: 4.9,
    reviews: 47,
    badge: "Complete Set",
    badgeType: "stone",
    dimensions: '3× Pendants (8" D × 20" H each, Canopy 54" L)',
    weight: "22 lbs",
    finish: "Brushed Honey Brass",
    material: "Spun Solid Brass & Italian Carrara Marble Trim",
    bulbs: "Integrated 3 × 14W High-CRI Spot + Halo LED",
    lumens: "3,300 Lumens Total (Task & Ambient dual throw)",
    kelvin: "3000K Clean Warm",
    leadTime: "In Stock",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
    description: "Specifically engineered for luxury kitchen islands. Each pendant casts focused downward task light on countertops while projecting a warm decorative halo through translucent marble collars."
  },
  {
    id: "prod-11",
    name: "Monaco Outdoor Bronze Lantern Chandelier",
    tagline: "Weatherproof IP65 wet-rated bronze lantern for covered patios",
    category: "outdoor",
    categoryLabel: "Outdoor & Loggia",
    style: "industrial",
    styleLabel: "Industrial Brass",
    price: 2250,
    rating: 4.8,
    reviews: 18,
    badge: "IP65 Wet Rated",
    badgeType: "stone",
    dimensions: '28" Diameter × 42" Height',
    weight: "44 lbs",
    finish: "Marine-Grade Verdigris Bronze",
    material: "Heavy Solid Cast Bronze & Hand-Blown Seeded Glass",
    bulbs: "6 × E12 Wet-Rated LED Candelabra",
    lumens: "2,800 Lumens",
    kelvin: "2700K Warm Welcome",
    leadTime: "In Stock (Ships in 3 days)",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    description: "Elevate your outdoor living loggia, portico, or pool pavilion. Sealed with silicone gaskets and crafted from marine-grade bronze that patinas gracefully over decades while resisting salt air and humidity."
  },
  {
    id: "prod-12",
    name: "Aria Floating Cloud Alabaster Mobile",
    tagline: "Kinetic suspended translucent alabaster cloud shields",
    category: "bedroom",
    categoryLabel: "Bedroom Suite",
    style: "alabaster",
    styleLabel: "Organic Alabaster",
    price: 3600,
    rating: 5.0,
    reviews: 27,
    badge: "Sculptural Mobile",
    badgeType: "gold",
    dimensions: '46" Span × 34" Height (Custom drop available)',
    weight: "36 lbs",
    finish: "Satin Warm Gold Rods",
    material: "Hand-Milled Spanish Alabaster & Solid Brass",
    bulbs: "8 × Integrated Low-Voltage Puck LEDs (Dim-to-Warm)",
    lumens: "3,100 Lumens",
    kelvin: "2200K - 3000K Dim-to-Warm",
    leadTime: "Custom Assembled (3 weeks)",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    description: "Balancing physics and high art, the Aria features suspended alabaster discs that gently rotate on frictionless brass swivels with subtle air currents. Creates an ethereal, meditative focal point above the master bed."
  }
];

// Blog Posts Data for Lumière & Co.
const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "The 2026 Chandelier Trends: Sculptural Brass, Spanish Alabaster & Organic Forms",
    category: "trends",
    categoryName: "Trend Forecast",
    date: "February 24, 2026",
    readTime: "6 min read",
    author: "Elena Rostova",
    role: "Principal Lighting Curator",
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Discover the defining lighting shifts of 2026: how raw veined stone, kinetic mobile fixtures, and tactile warm brass are redefining grand residential architecture.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">As architectural spaces embrace warm minimalism and textured natural materiality, statement chandeliers have evolved from static centerpieces into dynamic, kinetic sculptures that harmonize with natural light throughout the day.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">1. Spanish Alabaster Replaces Stark Frosting</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Where frosted glass once dominated modern pendants, interior designers are now turning to genuine Spanish alabaster. Because no two quarried slabs possess identical veining, an alabaster fixture provides the warmth of candlelight while offering bespoke, museum-quality individuality.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">2. The Return to Warm Finishes: Champagne & Antiqued Honey Brass</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Cold chrome and harsh industrial black iron are yielding ground to nuanced, living finishes. Champagne gold, patinated unlacquered brass, and hand-rubbed bronze age gracefully over time, reacting to ambient humidity and handling with a rich patina that echoes heirloom European estates.</p>

      <blockquote class="border-l-2 border-amber-600 pl-6 py-2 my-8 italic text-stone-800 text-lg font-serif">
        "A chandelier should not merely illuminate a room; it must be its heartbeat when unlit, and its soul when dusk falls."
      </blockquote>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">3. Tunable Circadian LED Integration</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">The finest statement fixtures now feature invisible, high-CRI (95+) warm-dimming LED engines. These systems mimic the solar cycle—providing crisp, energizing 3000K light during midday gatherings and transitioning seamlessly to an intimate 2200K amber glow as cocktails are served.</p>
    `
  },
  {
    id: "blog-2",
    title: "7 Critical Dining Room Lighting Mistakes (And How to Fix Them)",
    category: "styling",
    categoryName: "Room Styling",
    date: "February 12, 2026",
    readTime: "8 min read",
    author: "Julian Vance",
    role: "Senior Architectural Consultant",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    excerpt: "From hanging your chandelier at eye level to ignoring the CRI rating of your bulbs, avoid the common pitfalls that compromise your dining sanctuary.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">The dining room is where intimacy meets celebration. Yet, it is the room where homeowners most frequently stumble with lighting proportions, fixture drop heights, and glare.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Mistake 1: Hanging Too High or Obstructing Sightlines</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">The golden rule for dining tables is 30 to 36 inches between the bottom of the chandelier and the tabletop for standard 8-foot ceilings. For every additional foot of ceiling height, raise the fixture by 3 inches. This ensures conversational sightlines across the table remain completely unobstructed.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Mistake 2: Choosing Circular Fixtures for Oblong Tables</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">A round chandelier over a 120-inch dining table leaves the ends in gloomy shadow while overpowering the center. Opt for a linear chandelier measuring between 50% and 70% of the total table length, or pair two matching sculptural pendants for rhythmic balance.</p>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Mistake 3: Forgetting Ambient Dimmers</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Never install a dining chandelier without an architectural-grade trailing-edge dimmer. The intensity required for setting Sunday brunch is entirely different from the sensual mood required for an eight-course anniversary dinner.</p>
    `
  },
  {
    id: "blog-3",
    title: "How to Scale Lighting for 18-Foot Foyers & Cathedral Ceilings",
    category: "architecture",
    categoryName: "Architecture & Tech",
    date: "January 28, 2026",
    readTime: "7 min read",
    author: "Julian Vance",
    role: "Senior Architectural Consultant",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Tall double-height spaces can swallow standard fixtures whole. Learn how to calculate multi-tier diameters, chain drops, and motor winch installations.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">A grand foyer is your residence's overture. Double-height entries present unique structural, aesthetic, and maintenance challenges that require specialized architectural planning.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">The Sizing Formula for Grand Foyers</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Add the room width and length in feet; convert that total to inches to find your minimum base diameter. For an 18' × 22' grand foyer, the chandelier should be at least 40 inches in diameter. For double-height ceilings exceeding 16 feet, increase the height of the fixture to 2.5 to 3 inches per vertical foot of ceiling.</p>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Ceiling Reinforcement & Motorized Lift Systems</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Monumental chandeliers weighing 80 to 250+ pounds require dedicated unistrut steel blocking across ceiling joists. For fixtures hung at heights above 14 feet, we always recommend installing a motorized hoist winch. This allows single-button lowering to floor level for biannual crystal dusting and effortless bulb maintenance.</p>
    `
  },
  {
    id: "blog-4",
    title: "The Science of Warm Light: Why 2700K Is the Golden Standard for Living Rooms",
    category: "architecture",
    categoryName: "Architecture & Tech",
    date: "January 14, 2026",
    readTime: "5 min read",
    author: "Marcus Thorne",
    role: "Master Artisan & Engineer",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Demystifying Kelvin ratings, Color Rendering Index (CRI), and R9 saturated red values so you can recreate candlelight luxury in your home.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">Have you ever entered an impeccably furnished room that felt sterile, clinical, or cold? The culprit is almost universally high Kelvin temperature bulbs with poor spectral color rendering.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Kelvin Temperature vs. Lumens</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Lumens measure brightness; Kelvin measures the warmth or coolness of light color. 2700K produces the golden, flattering radiation reminiscent of original incandescent filament bulbs, softening facial contours and accentuating natural hardwood and velvet upholstery.</p>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Why High CRI 95+ Matters</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Cheap LEDs often score an 80 CRI, muting rich emeralds, ruby reds, and warm wood stains into lifeless grey-browns. All Lumière & Co. fixtures are tuned with 95+ CRI chips with high R9 red reproduction, ensuring your artwork, upholstery, and fine furnishings appear in true museum fidelity.</p>
    `
  },
  {
    id: "blog-5",
    title: "Restoring Antique Crystal Chandeliers: Master Artisan Insights",
    category: "crystal",
    categoryName: "Crystal Care & Heritage",
    date: "December 30, 2025",
    readTime: "9 min read",
    author: "Marcus Thorne",
    role: "Master Artisan & Engineer",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80",
    excerpt: "A glimpse behind the scenes at our atelier: ultrasonic crystal cleaning, hand-rewiring historical sockets, and re-pinning antique brass bowties.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">Heirloom crystal chandeliers carry decades—sometimes centuries—of aristocratic celebrations and family milestones. Restoring them requires the precision of a watchmaker combined with the electrical mastery of modern engineering.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Ultrasonic De-greasing & Hand Polishing</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Household glass sprays contain ammonia that eats into crystal coatings and corrodes brass connector pins. In our conservation laboratory, each prism is individually detached, ultrasonically cleaned in de-ionized bath solutions, and hand-polished with lint-free microfiber to restore full chromatic sparkle.</p>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Concealed Modern Rewiring</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">Vintage fabric wiring poses genuine fire risks. We thread high-temperature PTFE teflon wiring through original hollow casting arms without compromising the historical integrity of the piece, allowing seamless integration with modern dimmers and smart home controls.</p>
    `
  },
  {
    id: "blog-6",
    title: "Smart Lighting Meets Haute Éclairage: Invisible Automation for Chandeliers",
    category: "architecture",
    categoryName: "Architecture & Tech",
    date: "December 15, 2025",
    readTime: "6 min read",
    author: "Julian Vance",
    role: "Senior Architectural Consultant",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    excerpt: "How to integrate luxury statement fixtures into Lutron HomeWorks, Crestron, and Control4 systems without visible wall clutter.",
    content: `
      <p class="lead text-lg font-light text-stone-700 mb-6">True luxury in 2026 is effortless. The days of unsightly six-gang plastic wall switch plates cluttering your Venetian plaster walls are over.</p>
      
      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Centralized Panelized Dimming</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">By locating dimming modules in a discreet equipment closet, living areas feature only minimalist keypad controls in matching custom brass finishes. A single press of 'Entertain' dims the perimeter downlights to 15%, illuminates the grand chandelier at 45% warm amber, and activates under-shelf LED accents.</p>

      <h3 class="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">Phase-Adaptive Reverse Phase Technology</h3>
      <p class="text-stone-600 mb-6 leading-relaxed">High-end crystal chandeliers containing dozens of individual LED lamps require reverse-phase (electronic low-voltage) dimming to eliminate buzzing, lamp flickering, and premature component degradation.</p>
    `
  }
];
