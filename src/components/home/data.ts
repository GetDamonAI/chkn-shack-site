import {
  DIP_TUB_9OZ_ADDON,
  EXTRA_DIP_2OZ,
  TAILGATE_ACTIVE,
} from "@/lib/menu-constants";

export type MenuItemV2 = {
  name: string;
  price?: string;
  note?: string;
  /** Customer-picked modifiers, rendered as the item's pick rules. */
  modifiers?: string[];
};

export type MenuCategory = {
  name: string;
  tagline: string;
  items: MenuItemV2[];
};

const FRIES_CHOICE_COMBO =
  "Fries choice (pick 1): Shack Cut Seasoned Fries · Dirty Curly Fries (+$3) · Parm Bomb Garlic Fries (+$3) · Hot Honey Fries (+$3)";

export const menuCategories: MenuCategory[] = [
  {
    name: "Wings",
    tagline: "Bone-in wings tossed in your flavour. Twelve to pick from.",
    items: [
      {
        name: "10pc Wings",
        price: "$18",
        modifiers: [
          "Wing Flavour (pick 1)",
          "Included Dip 2oz (pick 1)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      {
        name: "20pc Wings",
        price: "$28",
        modifiers: [
          "Wing Flavours (pick 1–2)",
          "Included Dips 2oz (pick 3)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      {
        name: "30pc Wings",
        price: "$39",
        modifiers: [
          "Wing Flavours (pick 1–3)",
          "Included Dips 2oz (pick 4)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
    ],
  },
  {
    name: "Combos",
    tagline: "One-person chaos with fries and a drink.",
    items: [
      {
        name: "Solo Combo",
        price: "$22",
        modifiers: [
          "Wing Flavour (pick 1)",
          "Included Dip 2oz (pick 1)",
          FRIES_CHOICE_COMBO,
          "Pop Flavour (pick 1): Coke · Diet Coke · Sprite · Ginger Ale",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      {
        name: "The Drop",
        price: "$36",
        modifiers: [
          "Wing Flavours (pick 2)",
          "Included Dips 2oz (pick 2)",
          FRIES_CHOICE_COMBO,
          "Pop Flavour (pick 1): Coke · Diet Coke · Sprite · Ginger Ale",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
    ],
  },
  {
    // Parallel render path in the accordion. crateOptions in
    // src/components/crates/data.ts stays the source of truth for /crates +
    // /group-orders. Taglines resolve from shared CRATE_TAGLINES via taglineFor.
    name: "Crates",
    tagline: "Group orders that actually feed the room. 50, 100, 200.",
    items: [
      {
        name: "CHKN Crate 50pc",
        price: "$75",
        note: "Same-day",
        modifiers: [
          "Wing Flavours (pick 1–2)",
          "Fry Choice (pick 1): Shack Cut Seasoned Fries (Large 16oz) · Parm Bomb Garlic Fries · Hot Honey Fries · Dirty Curly Fries",
          "Included Dips 2oz (pick 3)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      {
        name: "CHKN Crate 100pc",
        price: "$135",
        note: "24hr notice",
        modifiers: [
          "Wing Flavours (pick 1–3)",
          "Fry Choice (pick 2)",
          "Included Dips 2oz (pick 5)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      {
        name: "CHKN Crate 200pc",
        price: "$245",
        note: "24hr notice",
        modifiers: [
          "Wing Flavours (pick 1–4)",
          "Fry Choice (pick 4)",
          "Included Dips 2oz (pick 8)",
          EXTRA_DIP_2OZ,
          DIP_TUB_9OZ_ADDON,
        ],
      },
      // Seasonal SKU — gated on NEXT_PUBLIC_TAILGATE_ACTIVE (Football Season).
      ...(TAILGATE_ACTIVE
        ? [
            {
              name: "The Tailgate Crate",
              price: "$69",
              note: "Same-day · Seasonal",
              modifiers: [
                "Wing Flavours (pick 1–2 of 12)",
                "Included Dips 2oz (pick 4 of 10, no upcharge)",
                "Fry Choice (pick 1): Shack Cut Seasoned Fries (Large 16oz, included) · Dirty Curly Fries (+$3) · Parm Bomb Garlic Fries (+$3) · Hot Honey Fries (+$3)",
                "Pop Flavour (pick 3 — duplicates allowed): Coke · Diet Coke · Sprite · Ginger Ale",
                EXTRA_DIP_2OZ,
                DIP_TUB_9OZ_ADDON,
              ],
            },
          ]
        : []),
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      {
        name: "Shack Cut Seasoned Fries",
        price: "$6",
        modifiers: ["Size (pick 1): Regular (8oz) · Large (16oz) +$4"],
      },
      {
        name: "Parm Bomb Garlic Fries",
        price: "$11.75",
        modifiers: ["Remove ingredients (optional): No parsley"],
      },
      { name: "Hot Honey Fries", price: "$8" },
      {
        name: "Dirty Curly Fries",
        price: "$7",
        modifiers: [
          "Remove ingredients (optional): No green onion · No pickled onion",
        ],
      },
      {
        name: "Mac and Cheese (Side)",
        price: "$8",
        modifiers: ["Remove ingredients (optional): No green onion"],
      },
      {
        name: "Perogies (7pc Side)",
        price: "$9",
        modifiers: [
          "Remove ingredients (optional): No onions · No bacon · No sour cream",
        ],
      },
      {
        name: "Cauli Bites",
        price: "$10",
        note: "vegetarian",
        modifiers: ["Cauli Sauce (pick 1 of the 12 wing flavours)"],
      },
      { name: "Gravy (Add-on)", price: "$2" },
      { name: "Coleslaw (Add-on)", price: "$3" },
    ],
  },
  {
    name: "Sharing Trays",
    tagline: "Big-batch comfort food built for the whole table.",
    items: [
      {
        name: "Mac and Cheese Tray",
        price: "$29",
        note: "feeds 4-6",
        modifiers: ["Remove ingredients (optional): No green onion"],
      },
      {
        name: "Perogy Tray",
        price: "$30",
        note: "feeds 4-6",
        modifiers: [
          "Remove ingredients (optional): No onions · No bacon · No sour cream",
        ],
      },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "Single Dip (2oz)", price: "$1.50", note: "pick 1 of 10" },
      { name: "3 Dips (mix or match)", price: "$4", note: "pick 3" },
      { name: "Dip Flight (4 mini cups)", price: "$5", note: "pick 4 mini" },
      { name: "9oz Dip Tub", price: "$6", note: "pick 1 (no upcharge)" },
      { name: "12oz Dip Tub", price: "$9", note: "pick 1 (no upcharge, all-in)" },
    ],
  },
  {
    name: "Drinks",
    tagline: "Cold, fizzy, and built to cut the heat.",
    items: [
      {
        name: "Canned Pop",
        price: "$3.49",
        note: "355mL",
        modifiers: [
          "Pop Flavour (pick 1): Coke · Diet Coke · Sprite · Ginger Ale",
        ],
      },
      { name: "Iced Tea", price: "$3.49", note: "20oz · Sweet only" },
      { name: "Bottled Water", price: "$2.49", note: "591mL" },
      { name: "Red Bull", price: "$6", note: "250mL" },
    ],
  },
];

export type Location = {
  city: string;
  area: string;
  availability?: string;
  status: "live" | "coming-soon";
};

export const locations: Location[] = [
  {
    city: "Downtown",
    area: "Vancouver",
    availability: "Late lunch to midnight",
    status: "live",
  },
  {
    city: "Tsawwassen",
    area: "Metro Vancouver",
    status: "coming-soon",
  },
  {
    city: "Maple Ridge",
    area: "Metro Vancouver",
    status: "coming-soon",
  },
];
