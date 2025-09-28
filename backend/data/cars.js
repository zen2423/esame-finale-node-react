// Mock database of Nissan GTR cars (all editions)
// Images use external URLs to avoid managing local assets.

const cars = [
  {
    id: "1",
    model: "Nissan Skyline GT-R R32 V-Spec",
    edition: "R32",
    year: 1993,
    price: 95000,
    km: 78000,
    powerHP: 280,
    powerKW: Math.round(280 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/90/No.12_R32_SKYLINE_GT-R_at_Nissan_Global_Headquarters_Gallery_%282%29.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Nissan_Skyline_GT-R_R32_%28Orange_Julep%29.JPG"
    ]
  },
  {
    id: "2",
    model: "Nissan Skyline GT-R R33",
    edition: "R33",
    year: 1997,
    price: 88000,
    km: 64000,
    powerHP: 305,
    powerKW: Math.round(305 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Nissan_Skyline_R33_GT-R_manufactured_1995_first_registered_in_UK_April_2006_declared_engine_capacity_2560cc.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Nissan_Skyline_GT-R_V-Spec_%28R33%2C_1995%29_%2852573954333%29.jpg"
    ]
  },
  {
    id: "3",
    model: "Nissan Skyline GT-R R34 V-Spec II",
    edition: "R34",
    year: 2001,
    price: 265000,
    km: 42000,
    powerHP: 330,
    powerKW: Math.round(330 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg"
    ]
  },
  {
    id: "4",
    model: "Nissan GT-R R35 Premium",
    edition: "R35",
    year: 2017,
    price: 118000,
    km: 38000,
    powerHP: 570,
    powerKW: Math.round(570 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Nissan_GT-R_Premium_Edition_%28CBA-R35%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/c/c5/Nissan_GT-R_Premium_Edition_%28CBA-R35%29_rear.JPG"
    ]
  },
  {
    id: "5",
    model: "Nissan GT-R R35 Nismo",
    edition: "R35", // normalized for filters
    year: 2020,
    price: 235000,
    km: 12000,
    powerHP: 600,
    powerKW: Math.round(600 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/00/Nissan_GT-R_NISMO_N_Attack_Package_%28DBA-R35%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/Nissan_GT-R_NISMO_N_Attack_Package_%28DBA-R35%29_rear.JPG"
    ]
  },
  {
    id: "6",
    model: "Nissan Skyline GT-R R34 M-Spec Nur",
    edition: "R34", // normalized for filters
    year: 2002,
    price: 420000,
    km: 22000,
    powerHP: 330,
    powerKW: Math.round(330 * 0.7457),
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Nissan_Skyline_R34_GT-R_N%C3%BCr_002.jpg"
    ]
  }
];

module.exports = { cars };
