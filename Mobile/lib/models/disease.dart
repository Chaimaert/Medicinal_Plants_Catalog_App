import '../models/plant.dart';
class Disease {
  final String id;
  final String name;
  final String description;
  final List<String> symptoms;
  final List<Plant> recommendedPlants; // Liste des plantes recommandées pour cette maladie
  final String imageUrl;

  Disease({
    required this.id,
    required this.name,
    required this.description,
    required this.symptoms,
    required this.recommendedPlants,
    required this.imageUrl,
  });
}
