import '../models/plant.dart';

final List<Plant> mockPlants = [
  Plant(
    id: '1',
    name: 'Aloe Vera',
    description: 'Une plante médicinale utilisée pour les soins de la peau.',
    properties: 'Apaisant, cicatrisant',
    uses: 'Brûlures, coupures',
    imageUrl:
        'assets/Aloe_Vera.jpeg',
    precautions: 'Ne pas appliquer sur des plaies ouvertes.',
    isFavorite: false,
    conditions: ['brûlures', 'fièvre'],
    videoUrl: 'https://youtu.be/SpCK9eTrc-c?si=up8IVR61uPl4EZBm',
    region: 'Afrique',
  ),
  Plant(
    id: '2',
    name: 'Camomille',
    description: 'Utilisée pour apaiser et calmer.',
    properties: 'Anti-inflammatoire, calmant',
    uses: 'Anxiété, insomnie',
    imageUrl:
        'assets/camomille.jpeg',
    isFavorite: false,
    conditions: ['stress', 'insomnie'],
    videoUrl: 'https://youtu.be/SpCK9eTrc-c?si=up8IVR61uPl4EZBm',
    region: 'Europe',
  ),
  Plant(
    id: '3',
    name: 'Menthe',
    description: 'Une plante utilisée pour ses propriétés digestives.',
    properties: 'Digestive, rafraîchissante',
    uses: 'Infusions, plats culinaires',
    imageUrl:
        'assets/MENTHE.jpg',
    isFavorite: false,
    conditions: ['digestion', 'maux de tête'],
    region: 'Asie',
  ),
  Plant(
    id: '3',
    name: 'Menthe',
    description: 'Une plante utilisée pour ses propriétés digestives.',
    properties: 'Digestive, rafraîchissante',
    uses: 'Infusions, plats culinaires',
    imageUrl:
        'assets/MENTHE.jpg',
    isFavorite: false,
    conditions: ['digestion', 'maux de tête'],
    region: 'Europe',
  ),
];
