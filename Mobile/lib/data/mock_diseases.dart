import '../models/disease.dart';
import '../data/mock_plants.dart';  // Assurez-vous que vous avez importé les plantes simulées

final List<Disease> allDiseases = [
  Disease(
    id: '1',
    name: 'Stress',
    description: 'Le stress est une réaction physique et émotionnelle à des facteurs externes.',
    symptoms: ['Anxiété', 'Tension musculaire', 'Fatigue'],
    recommendedPlants: [mockPlants[1], mockPlants[3]],  // Plantes recommandées pour traiter le stress
    imageUrl: 'assets/stress.jpg',
    
  ),
  Disease(
    id: '2',
    name: 'Insomnie',
    description: 'Trouble du sommeil où il est difficile de s’endormir ou de rester endormi.',
    symptoms: ['Réveils fréquents', 'Fatigue', 'Irritabilité'],
    recommendedPlants: [mockPlants[2], mockPlants[3]],  // Plantes recommandées pour traiter l'insomnie
    imageUrl: 'assets/stress.jpg',
  ),
    Disease(
    id: '3',
    name: 'Migraine',
    description: 'Une douleur intense dans la tête.',
    symptoms: ['Douleur à la tête', 'Nauses'],
    recommendedPlants: [mockPlants[2]],
    imageUrl: 'assets/migraine1.jpeg',
  ),
  // Ajouter d'autres maladies ici...
];
