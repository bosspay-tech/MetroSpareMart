import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// We must use VITE_ prefix as these are the env vars Vite exposes
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY)."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const STORE_ID = "metro-spare-mart";

const RAW_PRODUCTS = [
  {
    title: "Synthetic Engine Oil 5W-30",
    description: "Premium synthetic engine oil designed to offer ultimate performance and protection.",
    price: 34.99,
    categories: ["engine", "fluids", "service"],
    type: "Filters & Fluids",
    image_url: "/products/engine_oil.png",
  },
  {
    title: "Ceramic Front Brake Pads",
    description: "Low-dust, noise-free ceramic brake pads offering exceptional stopping power.",
    price: 45.00,
    categories: ["brakes", "wheels", "safety"],
    type: "Brake System",
    image_url: "/products/brake_pads.png",
  },
  {
    title: "Heavy Duty Car Battery 12V",
    description: "Reliable, maintenance-free 12V automotive battery for all weather conditions.",
    price: 110.00,
    categories: ["electrical", "engine"],
    type: "Electrical",
    image_url: "/products/car_battery.png",
  },
  {
    title: "All-Season Tire 195/65 R15",
    description: "Durable all-season tire providing excellent grip in wet and dry conditions.",
    price: 85.50,
    categories: ["wheels", "exterior"],
    type: "Tires & Wheels",
    image_url: "/products/car_tire.png",
  },
  {
    title: "Premium Oil Filter",
    description: "High-efficiency oil filter trapping 99% of harmful engine contaminants.",
    price: 12.99,
    categories: ["filters", "engine", "service"],
    type: "Filters & Fluids",
    image_url: "/products/oil_filter.png",
  },
  {
    title: "Engine Timing Belt Kit",
    description: "Complete timing belt replacement kit including tensioners and water pump.",
    price: 135.00,
    categories: ["engine", "transmission"],
    type: "Engine Components",
    image_url: "/products/timing_belt.png",
  },
  {
    title: "Halogen Headlight Bulb H7",
    description: "Bright white halogen headlight bulb for enhanced night visibility.",
    price: 18.50,
    categories: ["lighting", "electrical", "exterior"],
    type: "Body & Lighting",
    image_url: "/products/headlight_bulb.png",
  },
  {
    title: "Performance Spark Plug Set",
    description: "Set of 4 iridium spark plugs for better fuel efficiency and smoother acceleration.",
    price: 28.00,
    categories: ["engine", "electrical"],
    type: "Engine Components",
    image_url: "/products/spark_plugs.png",
  },
  {
    title: "Front Suspension Strut",
    description: "Gas-charged front suspension strut for improved ride comfort and handling.",
    price: 95.00,
    categories: ["suspension", "wheels"],
    type: "Suspension",
    image_url: "/products/suspension_strut.png",
  },
  {
    title: "Engine Coolant / Antifreeze",
    description: "Long-life engine coolant providing protection against freezing and overheating.",
    price: 22.99,
    categories: ["fluids", "cooling", "service"],
    type: "Cooling System",
    image_url: "/products/engine_coolant.png",
  },
  {
    title: "Cabin Air Filter",
    description: "Activated carbon cabin air filter blocking dust, pollen, and exhaust odors.",
    price: 15.50,
    categories: ["filters", "interior"],
    type: "Filters & Fluids",
    image_url: "/products/cabin_filter.png",
  },
  {
    title: "Windshield Wiper Blades 22\"",
    description: "Silicone wiper blades offering streak-free clearing in heavy rain.",
    price: 24.00,
    categories: ["exterior", "safety"],
    type: "Interior Accessories",
    image_url: "/products/wiper_blades.png",
  },
  {
    title: "Brake Disc Rotor",
    description: "Vented brake disc rotor designed to prevent brake fade and warping.",
    price: 65.00,
    categories: ["brakes", "wheels"],
    type: "Brake System",
    image_url: "/products/brake_rotor.png",
  },
  {
    title: "Ignition Coil Pack",
    description: "High-voltage ignition coil pack ensuring reliable engine starts.",
    price: 48.00,
    categories: ["electrical", "engine"],
    type: "Electrical",
    image_url: "/products/ignition_coil.png",
  },
  {
    title: "Alternator 12V 90A",
    description: "High-output alternator for consistent battery charging and electrical supply.",
    price: 145.00,
    categories: ["electrical", "engine"],
    type: "Electrical",
    image_url: "/products/alternator.png",
  },
  {
    title: "Starter Motor Assembly",
    description: "Heavy-duty starter motor providing reliable cranking power in all temperatures.",
    price: 125.00,
    categories: ["electrical", "engine"],
    type: "Electrical",
    image_url: "/products/starter_motor.png",
  },
  {
    title: "Transmission Fluid ATF 1L",
    description: "Advanced automatic transmission fluid for smooth shifting and wear protection.",
    price: 14.50,
    categories: ["fluids", "transmission", "service"],
    type: "Filters & Fluids",
    image_url: "/products/transmission_fluid.png",
  },
  {
    title: "Radiator Cooling Fan",
    description: "Electric radiator cooling fan assembly to prevent engine overheating.",
    price: 75.00,
    categories: ["cooling", "engine", "electrical"],
    type: "Cooling System",
    image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Exhaust Muffler",
    description: "Aluminized steel exhaust muffler reducing engine noise and improving flow.",
    price: 88.00,
    categories: ["exhaust", "engine"],
    type: "Engine Components",
    image_url: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Premium Car Floor Mats",
    description: "Set of 4 all-weather rubber floor mats protecting your vehicle's interior.",
    price: 35.00,
    categories: ["interior", "accessories"],
    type: "Interior Accessories",
    image_url: "https://images.unsplash.com/photo-1606004921674-8b63fc3ff826?q=80&w=800&auto=format&fit=crop",
  }
];

async function seed() {
  try {
    console.log("Checking if store exists...");
    
    // Check if store exists, if not create it
    const { data: existingStore, error: storeCheckError } = await supabase
      .from('stores')
      .select('id')
      .eq('id', STORE_ID)
      .single();

    if (storeCheckError && storeCheckError.code !== 'PGRST116') {
      console.error("Error checking store:", storeCheckError);
      return;
    }

    if (!existingStore) {
      console.log(`Store ${STORE_ID} not found. Creating it...`);
      const { error: insertStoreError } = await supabase
        .from('stores')
        .insert([{ id: STORE_ID, name: 'Metro Spare Mart' }]);
      
      if (insertStoreError) {
        console.error("Failed to create store:", insertStoreError);
        return;
      }
    }

    console.log(`Deleting old products for store: ${STORE_ID}...`);
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("store_id", STORE_ID);

    if (deleteError) {
      console.error("Delete Error:", deleteError);
      return;
    }

    console.log("Inserting new products...");
    const productsToInsert = RAW_PRODUCTS.map((p) => ({
      store_id: STORE_ID,
      title: p.title,
      description: p.description,
      base_price: p.price,
      categories: p.categories,
      type: p.type,
      image_url: p.image_url,
      is_active: true,
    }));

    const { data, error: insertError } = await supabase
      .from("products")
      .insert(productsToInsert)
      .select();

    if (insertError) {
      console.error("Insert Error:", insertError);
      return;
    }

    console.log(`Successfully seeded ${data.length} products!`);
  } catch (err) {
    console.error("Unexpected Error:", err);
  }
}

seed();
