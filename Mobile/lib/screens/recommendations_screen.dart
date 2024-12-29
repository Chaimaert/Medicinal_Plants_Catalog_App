import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; // Import Firestore
import 'detail_screen.dart'; // Pour afficher les détails d'une plante
import '../models/plant.dart'; // Modèle de données pour la plante

class RecommendationsScreen extends StatefulWidget {
  @override
  _RecommendationsScreenState createState() => _RecommendationsScreenState();
}

class _RecommendationsScreenState extends State<RecommendationsScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Plant> _recommendedPlants = [];
  List<Plant> _allPlants = [];

  // Récupérer les plantes depuis Firestore
  Future<void> _fetchPlantsFromFirestore() async {
    try {
      QuerySnapshot snapshot = await FirebaseFirestore.instance.collection('plants').get();
      final plants = snapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return Plant(
          id: doc.id,
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
      }).toList();

      setState(() {
        _allPlants = plants;
        _recommendedPlants = plants;
      });
    } catch (e) {
      print('Erreur lors de la récupération des plantes : $e');
    }
  }

  @override
  void initState() {
    super.initState();
    _fetchPlantsFromFirestore(); // Récupérer les plantes à l'initialisation
  }

  // Méthode pour générer des recommandations
  void _getRecommendations(String query) {
    setState(() {
      _recommendedPlants = _allPlants.where((plant) {
        // Vérifier si une condition de la plante correspond à la recherche
        return plant.conditions.any((condition) =>
            condition.toLowerCase().contains(query.toLowerCase()));
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Recommandations'),
        backgroundColor: Colors.green,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Champ de recherche pour entrer des symptômes ou maladies
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: 'Rechercher par symptôme ou maladie',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: _getRecommendations, // Appeler la méthode pour filtrer les plantes
            ),
            SizedBox(height: 20),
            // Affichage des recommandations
            _recommendedPlants.isEmpty
                ? Center(child: Text('Aucune recommandation pour ce symptôme.'))
                : Expanded(
                    child: ListView.builder(
                      itemCount: _recommendedPlants.length,
                      itemBuilder: (context, index) {
                        final plant = _recommendedPlants[index];
                        return GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => DetailScreen(plant: plant),
                              ),
                            );
                          },
                          child: Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            elevation: 5,
                            margin: EdgeInsets.symmetric(vertical: 8.0),
                            child: ListTile(
                              leading: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Image.network(
                                  plant.imageUrl,
                                  width: 50,
                                  height: 50,
                                  fit: BoxFit.cover,
                                ),
                              ),
                              title: Text(
                                plant.name,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              subtitle: Text(
                                plant.description,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey[600],
                                ),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
          ],
        ),
      ),
    );
  }
}
