import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/plant.dart';
import '../models/disease.dart';

// Récupérer une plante par son ID
Future<Plant?> fetchPlantById(String plantId) async {
  try {
    DocumentSnapshot plantDoc = await FirebaseFirestore.instance
        .collection('plants')
        .doc(plantId)
        .get();

    if (plantDoc.exists) {
      final data = plantDoc.data() as Map<String, dynamic>;
      return Plant(
        id: plantDoc.id,
        name: data['name'] ?? '',
        description: data['description'] ?? '',
        properties: data['properties'] ?? '',
        uses: data['uses'] ?? '',
        imageUrl: data['imageUrl'] ?? '',
        isFavorite: data['isFavorite'] ?? false,
        precautions: data['precautions'],
        conditions: List<String>.from(data['conditions'] ?? []),
        externalLink: data['externalLink'],
        videoUrl: data['videoUrl'],
        region: data['region'] ?? '',
      );
    }
    return null;
  } catch (e) {
    print('Erreur lors de la récupération de la plante : $e');
    return null;
  }
}

// Récupérer plusieurs plantes par leurs IDs
Future<List<Plant>> fetchPlantsByIds(List<String> plantIds) async {
  List<Plant> plants = [];
  for (String id in plantIds) {
    Plant? plant = await fetchPlantById(id);
    if (plant != null) {
      plants.add(plant);
    }
  }
  return plants;
}

// Récupérer les maladies depuis Firestore et lier les plantes
Future<List<Disease>> fetchDiseasesWithPlants() async {
  try {
    QuerySnapshot snapshot =
        await FirebaseFirestore.instance.collection('diseases').get();

    List<Disease> diseases = [];
    for (var doc in snapshot.docs) {
      final data = doc.data() as Map<String, dynamic>;

      // Récupérer les IDs des plantes recommandées
      List<String> plantIds = List<String>.from(data['recommendedPlants'] ?? []);
      List<Plant> recommendedPlants = await fetchPlantsByIds(plantIds);

      // Créer un objet Disease avec les plantes liées
      diseases.add(
        Disease(
          id: doc.id,
          name: data['name'] ?? '',
          description: data['description'] ?? '',
          symptoms: List<String>.from(data['symptoms'] ?? []),
          recommendedPlants: recommendedPlants,
          imageUrl: data['imageUrl'] ?? '',
        ),
      );
    }

    return diseases;
  } catch (e) {
    print('Erreur lors de la récupération des maladies : $e');
    return [];
  }
}
