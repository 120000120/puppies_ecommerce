const dogs = [
  {
    id: 1,
    name: "DALAMATA",
    litters: 1,
    price: "$3,500.00",
    characteristics: "Pelaje blanco con manchas negras, cuerpo atlético, orejas caídas.",
    size: "Large breeds",
    weight: "25 - 35 kg",
    height: "48 - 55 cm",
    image: "/perros_imagenenes/perro_1.jpg"
  },
  {
    id: 2,
    name: "AKITA AMERICANO",
    litters: 2,
    price: "$3,700.00",
    characteristics: "Cuerpo robusto y musculoso, cabeza ancha, pelaje grueso.",
    size: "Medium breeds",
    weight: "29.5 - 58 kg",
    height: "63.5 cm / 68.5 cm",
    image: "/perros_imagenenes/perro_2.jpg"
  },
  {
    id: 3,
    name: "AKITA INU (JAPONES)",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Cabeza ancha con hocico corto, orejas erectas, pelaje denso.",
    size: "Large breeds",
    weight: "29.5 - 58 kg",
    height: "63.5 cm / 68.5 cm",
    image: "/perros_imagenenes/perro_3.jpg"
  },
  {
    id: 4,
    name: "BERNES DE MONTAÑA",
    litters: 1,
    price: "$4,000.00",
    characteristics: "Pelaje largo y denso, cuerpo grande y robusto, tricolor.",
    size: "Large breeds",
    weight: "54 - 81 kg",
    height: "63 cm / 66 cm",
    image: "/perros_imagenenes/perro_4.jpg"
  },
  {
    id: 5,
    name: "BULLDOG FRANCES TRACIONAL",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Cuerpo compacto, cara arrugada y aplanada, pelaje corto.",
    size: "Small breeds",
    weight: "25 - 27 lbs.",
    height: "11 in. / 12in.",
    image: "/perros_imagenenes/perro_5.jpg"
  },
  {
    id: 6,
    name: "BULLDOG FRANCES EXOTICO",
    litters: 2,
    price: "$4,500.00",
    characteristics: "Cuerpo compacto, cara arrugada y aplanada, pelaje corto colorido.",
    size: "Small breeds",
    weight: "25 - 27 lbs.",
    height: "11 in. / 12 in.",
    image: "/perros_imagenenes/perro_6.jpg"
  },
  {
    id: 7,
    name: "BULLDOG FRANCES FLUFFY",
    litters: 1,
    price: "$8,000.00",
    characteristics: "Cuerpo compacto, cara arrugada y aplanada, pelaje largo y esponjoso.",
    size: "Small breeds",
    weight: "25 - 27 lbs.",
    height: "12 in. / 12in.",
    image: "/perros_imagenenes/perro_7.jpg"
  },
  {
    id: 8,
    name: "BORDER COLLIE EXOTICO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje variado (largo o corto), cuerpo ágil y atlético, ojos expresivos.",
    size: "Exotic breeds, Medium breeds",
    weight: "13 - 19 kg / 13 - 20 kg",
    height: "50 cm / 55 cm",
    image: "/perros_imagenenes/perro_8.jpg"
  },
  {
    id: 9,
    name: "BORDER COLLIE TRADICIONAL",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje largo y denso, cuerpo atlético, ojos expresivos.",
    size: "Medium breeds",
    weight: "13 - 20 kg",
    height: "51 cm / 55 cm",
    image: "/perros_imagenenes/perro_9.jpg"
  },
  {
    id: 10,
    name: "ALASKAN MALAMUTE HINMAN",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Tamaño gigante, pelaje extremadamente denso, músculos poderosos.",
    size: "Large breeds",
    weight: "34 - 50 kg / 38.5 - 55 kg",
    height: "59 cm / 63.5 cm",
    image: "/perros_imagenenes/perro_10.jpg"
  },
  {
    id: 11,
    name: "COCKER SPANIEL INGLES TRADICIONAL",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Pelaje largo y sedoso, orejas largas y caídas, ojos expresivos.",
    size: "Small breeds",
    weight: "11.5 - 14.5 kg",
    height: "35.5 - 43 cm",
    image: "/perros_imagenenes/perro_11.jpg"
  },
  {
    id: 12,
    name: "COCKER SPANIEL INGLES EXOTICO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje largo y sedoso, orejas largas y caídas, ojos expresivos.",
    size: "Small breeds",
    weight: "11.5 - 14.5 kg",
    height: "35.5 - 43 cm",
    image: "/perros_imagenenes/perro_12.jpg"
  },
  {
    id: 13,
    name: "COCKER SPANIEL AMERICANO CHOCOLATE & BEIGE",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje bicolor largo y sedoso, orejas largas y caídas, ojos expresivos.",
    size: "Small breeds",
    weight: "24 - 28 lbs",
    height: "14 in / 15 in",
    image: "/perros_imagenenes/perro_13.jpg"
  },
  {
    id: 14,
    name: "COCKER SPANIEL AMERICANO TRADICIONAL NEGRO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje largo y sedoso, orejas largas y caídas, ojos expresivos.",
    size: "Small breeds",
    weight: "24 - 28 lbs",
    height: "14 in / 15 in",
    image: "/perros_imagenenes/perro_14.jpg"
  },
  {
    id: 15,
    name: "COCKER SPANIEL AMERICANO EXOTICO TRICOLOR",
    litters: 1,
    price: "$4,000.00",
    characteristics: "Pelaje largo y sedoso, orejas largas y caídas, ojos expresivos.",
    size: "Small breeds",
    weight: "24 - 28 lbs",
    height: "14 in / 15 in",
    image: "/perros_imagenenes/perro_15.jpg"
  },
  {
    id: 16,
    name: "CHIHUAHUA PELO LARGO",
    litters: 2,
    price: "$3,700.00",
    characteristics: "Pelaje largo y sedoso, ojos grandes y saltones, cuerpo pequeño.",
    size: "Small breeds",
    weight: "1 - 3 kg",
    height: "13 - 20 cm",
    image: "/perros_imagenenes/perro_16.jpg"
  },
  {
    id: 17,
    name: "CHIHUAHUA CABEZA DE MANZANA BOLSILLO",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Cabeza redonda y grande, ojos grandes y saltones, cuerpo pequeño.",
    size: "Small breeds",
    weight: "1 - 3 kg",
    height: "13 - 20 cm",
    image: "/perros_imagenenes/perro_17.jpg"
  },
  {
    id: 18,
    name: "CHIHUAHUA CABEZA DE VENADO BOLSILLO",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Cabeza alargada, ojos grandes y saltones, cuerpo pequeño y agil.",
    size: "Small breeds",
    weight: "2 - 3 kg",
    height: "13 - 20 cm",
    image: "/perros_imagenenes/perro_18.jpg"
  },
  {
    id: 19,
    name: "POMERANIAN CARA DE OSO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Cara redonda y plana, pelaje denso y esponjoso.",
    size: "Small breeds",
    weight: "1.4 - 3 kg",
    height: "25 cm / 30 cm",
    image: "/perros_imagenenes/perro_19.jpg"
  },
  {
    id: 20,
    name: "POMERANIAN CARA DE ZORRO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Cara redonda y plana, pelaje denso y esponjoso.",
    size: "Small breeds",
    weight: "1.4 - 3 kg",
    height: "26 cm / 30 cm",
    image: "/perros_imagenenes/perro_20.jpg"
  },
  {
    id: 21,
    name: "POMERANIAN CARA DE OSO EXOTICO",
    litters: 1,
    price: "$5,000.00",
    characteristics: "Cara redonda y plana, pelaje denso y esponjoso.",
    size: "Small breeds",
    weight: "1.4 - 3 kg",
    height: "27 cm / 30 cm",
    image: "/perros_imagenenes/perro_21.jpg"
  },
  {
    id: 22,
    name: "BICHON HABANERO",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Pelaje largo y sedoso, cuerpo pequeño y robusto, ojos oscuros y expresivos.",
    size: "Small breeds",
    weight: "3.6 kg",
    height: "30 cm / 35 cm",
    image: "/perros_imagenenes/perro_22.jpg"
  },
  {
    id: 23,
    name: "LABRADOR RETRIEVIER CHOCOLATE LINEA INGLESA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje corto y denso de color chocolate, cuerpo robusto y musculoso.",
    size: "Large breeds",
    weight: "55 - 70 lbs.",
    height: "22 in. / 23 in.",
    image: "/perros_imagenenes/perro_23.jpg"
  },
  {
    id: 24,
    name: "LABRADOR RETRIEVIER CHOCOLATE LINEA AMERICANA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje corto y denso de color chocolate, cuerpo robusto y musculoso.",
    size: "Large breeds",
    weight: "56 - 70 lbs.",
    height: "23 in. / 23 in.",
    image: "/perros_imagenenes/perro_24.jpg"
  },
  {
    id: 25,
    name: "LABRADOR RETRIEVIER AMARILLO Y NEGRO LINEA INGLESA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje corto y denso de color chocolate, cuerpo robusto y musculoso.",
    size: "Large breeds",
    weight: "57 - 70 lbs.",
    height: "24 in. / 23 in.",
    image: "/perros_imagenenes/perro_25.jpg"
  },
  {
    id: 26,
    name: "LABRADOR RETRIEVIER AMARILLO Y NEGRO LINEA AMERICANA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje corto y denso de color chocolate, cuerpo robusto y musculoso.",
    size: "Large breeds",
    weight: "58 - 70 lbs.",
    height: "25 in. / 23 in.",
    image: "/perros_imagenenes/perro_26.jpg"
  },
  {
    id: 27,
    name: "GRAN DANES",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Cuerpo enorme y musculoso, pelaje corto, orejas naturalmente caídas o recortadas.",
    size: "Large breeds",
    weight: "45 - 59 kg",
    height: "81 cm / 76 cm",
    image: "/perros_imagenenes/perro_27.jpg"
  },
  {
    id: 28,
    name: "CHOW CHOW TRADICIONAL",
    litters: 2,
    price: "$3,700.00",
    characteristics: "Lengua azul, pelaje frondoso y llamativo",
    size: "Medium breeds",
    weight: "45 - 70 lbs.",
    height: "19 in. / 18 in",
    image: "/perros_imagenenes/perro_28.jpg"
  },
  {
    id: 29,
    name: "MASTIN TIBETANO DROG KHYI",
    litters: 1,
    price: "$15,000.00",
    characteristics: "Cuerpo grande y musculoso, pelaje denso y esponjoso.",
    size: "Large breeds",
    weight: "80 - 89 kg",
    height: "66 - 71 cm / 61 - 68 cm",
    image: "/perros_imagenenes/perro_29.jpg"
  },
  {
    id: 30,
    name: "PASTOR ALEMAN PELO LARGO",
    litters: 1,
    price: "$3,500.00",
    characteristics: "Pelaje largo y denso, cuerpo atlético, orejas erectas.",
    size: "Large breeds",
    weight: "34 - 43 kg",
    height: "64 cm / 58 cm",
    image: "/perros_imagenenes/perro_30.jpg"
  },
  {
    id: 31,
    name: "PASTOR ALEMAN PELO CORTO",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje corto y denso, cuerpo atlético, orejas erectas.",
    size: "Large breeds",
    weight: "35 - 43 kg",
    height: "64 cm / 58 cm",
    image: "/perros_imagenenes/perro_31.jpg"
  },
  {
    id: 32,
    name: "SAMOYEDO",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje denso y esponjoso, cuerpo robusto, sonrisa característica.",
    size: "Medium breeds",
    weight: "50 - 65 lbs.",
    height: "22 in./ 20 in.",
    image: "/perros_imagenenes/perro_32.jpg"
  },
  {
    id: 33,
    name: "FRENCH POODLE RED MINIARURA",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje rizado de color rojo, cuerpo pequeño y esbelto.",
    size: "Small breeds",
    weight: "5 - 9 kg",
    height: "20 cm / 18 cm",
    image: "/perros_imagenenes/perro_33.jpg"
  },
  {
    id: 34,
    name: "FRENCH POODLE APRICOT MINIATURA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje rizado de color albaricoque, cuerpo pequeño y esbelto.",
    size: "Small breeds",
    weight: "3 - 5 kg",
    height: "20 cm / 18 cm",
    image: "/perros_imagenenes/perro_34.jpg"
  },
  {
    id: 35,
    name: "FRENCH POODLE TRADICIONAL MINIATURA",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Pelaje rizado, cuerpo pequeño y esbelto, variedad de colores.",
    size: "Small breeds",
    weight: "3 - 5 kg",
    height: "20 cm / 18 cm",
    image: "/perros_imagenenes/perro_35.jpg"
  },
  {
    id: 36,
    name: "FRENCH POODLE CHOCOLATE MINIATURA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje rizado de color chocolate, cuerpo pequeño y esbelto.",
    size: "Small breeds",
    weight: "3 - 5 kg",
    height: "20 cm / 18 cm",
    image: "/perros_imagenenes/perro_36.jpg"
  },
  {
    id: 37,
    name: "FRENCH POODLE TRADICIONAL STANDARD",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Pelaje rizado, cuerpo mediano y esbelto, variedad de colores.",
    size: "Small breeds",
    weight: "5 - 9 kg",
    height: "34 cm / 28 cm",
    image: "/perros_imagenenes/perro_37.jpg"
  },
  {
    id: 38,
    name: "FRENCH POODLE APRICOT STANDARD",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje rizado de color albaricoque, cuerpo pequeño y esbelto.",
    size: "Small breeds",
    weight: "5 - 9 kg",
    height: "35 cm / 28 cm",
    image: "/perros_imagenenes/perro_38.jpg"
  },
  {
    id: 39,
    name: "FRENCH POODLE CHOCOLATE STANDARD",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje rizado de color chocolate, cuerpo pequeño y esbelto.",
    size: "Small breeds",
    weight: "5 - 9 kg",
    height: "36 cm / 28 cm",
    image: "/perros_imagenenes/perro_39.jpg"
  },
  {
    id: 40,
    name: "FRENCH POODLE RED STANDARD",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje rizado de color rojo, cuerpo mediano y esbelto.",
    size: "Small breeds",
    weight: "5 - 9 kg",
    height: "37 cm / 28 cm",
    image: "/perros_imagenenes/perro_40.jpg"
  },
  {
    id: 41,
    name: "FRENCH POODLE GIGANTE TRADICIONAL",
    litters: 1,
    price: "$4,300.00",
    characteristics: "Pelaje rizado, cuerpo grande y esbelto, variedad de colores.",
    size: "Large breeds",
    weight: "27 - 32 kg / 18 - 23 kg",
    height: "45 - 60 cm",
    image: "/perros_imagenenes/perro_41.jpg"
  },
  {
    id: 42,
    name: "FRENCH POODLE GIGANTE APRICOT",
    litters: 1,
    price: "$4,300.00",
    characteristics: "Pelaje rizado de color albaricoque, cuerpo grande y esbelto.",
    size: "Large breeds",
    weight: "27 - 32 kg",
    height: "48 cm / 44 cm",
    image: "/perros_imagenenes/perro_42.jpg"
  },
  {
    id: 43,
    name: "FRENCH POODLE GIGANTE CHOCOLATE",
    litters: 1,
    price: "$4,300.00",
    characteristics: "Pelaje rizado de color chocolate, cuerpo grande y esbelto.",
    size: "Large breeds",
    weight: "27 - 32 kg",
    height: "48 cm / 44 cm",
    image: "/perros_imagenenes/perro_43.jpg"
  },
  {
    id: 44,
    name: "FRENCH POODLE GIGANTE RED",
    litters: 1,
    price: "$4,700.00",
    characteristics: "Pelaje rizado de color rojo, cuerpo grande y esbelto.",
    size: "Large breeds",
    weight: "27 - 32 kg",
    height: "48 cm / 44 cm",
    image: "/perros_imagenenes/perro_44.jpg"
  },
  {
    id: 45,
    name: "SPRINGER SPANIEL INGLES",
    litters: 1,
    price: "$3,700.00",
    characteristics: "Pelaje largo y ondulado, orejas largas y caídas, cuerpo atlético.",
    size: "Medium breeds",
    weight: "40 - 53 lbs.",
    height: "20 in. / 19 in.",
    image: "/perros_imagenenes/perro_45.jpg"
  },
  {
    id: 46,
    name: "GOLDEN RETRIEVIER LINEA AMERICANA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje dorado y denso, cuerpo robusto y musculoso, cara amigable.",
    size: "Large breeds",
    weight: "29 - 32 kg",
    height: "58 - 62 cm / 53 - 55 cm",
    image: "/perros_imagenenes/perro_46.jpg"
  },
  {
    id: 47,
    name: "GOLDEN RETRIEVIER LINEA BRITANICA",
    litters: 1,
    price: "$3,000.00",
    characteristics: "Pelaje dorado y denso, cuerpo robusto y musculoso, cara amigable.",
    size: "Large breeds",
    weight: "29 - 32 kg",
    height: "58 - 62 cm / 53 - 55 cm",
    image: "/perros_imagenenes/perro_47.jpg"
  },
  {
    id: 48,
    name: "SHIH TZU",
    litters: 3,
    price: "$3,000.00",
    characteristics: "Pelaje largo y sedoso, cara plana y ancha, ojos grandes y redondos.",
    size: "Small breeds",
    weight: "9 - 16 lbs.",
    height: "10 in",
    image: "/perros_imagenenes/perro_48.jpg"
  },
  {
    id: 49,
    name: "PUG",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Cuerpo compacto, cara arrugada y plana, ojos grandes y redondos.",
    size: "Small breeds",
    weight: "14 - 18 lbs.",
    height: "11 in. / 12 in.",
    image: "/perros_imagenenes/perro_49.jpg"
  },
  {
    id: 50,
    name: "CAVALIER KING CHARLES SPANIEL",
    litters: 2,
    price: "$3,000.00",
    characteristics: "Pelaje largo y sedoso, orejas largas y caídas, ojos grandes y expresivos.",
    size: "Small breeds",
    weight: "6 – 8 kg.",
    height: "33 cm / 30 cm",
    image: "/perros_imagenenes/perro_50.jpg"
  }
];

// Exportamos solo los primeros 50 perros para no sobrecargar el archivo
export default dogs;

export const featuredDogs = [
  dogs[6], // Bulldog Francés Fluffy
  dogs[19], // Pomeranian Cara de Oso
  dogs[28], // Chow Chow Tradicional
  dogs[32], // Samoyedo
  dogs[46], // Golden Retriever Línea Americana
  dogs[48]  // Shih Tzu
];