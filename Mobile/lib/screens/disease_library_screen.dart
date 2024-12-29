import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/disease.dart';
import '../models/plant.dart';
import 'disease_detail_screen.dart';

class DiseaseLibraryScreen extends StatefulWidget {
  @override
  _DiseaseLibraryScreenState createState() => _DiseaseLibraryScreenState();
}

class _DiseaseLibraryScreenState extends State<DiseaseLibraryScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Disease> _diseases = [];
  List<Disease> _filteredDiseases = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchDiseasesFromFirestore();
  }

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

  Future<void> _fetchDiseasesFromFirestore() async {
    try {
      QuerySnapshot snapshot =
          await FirebaseFirestore.instance.collection('diseases').get();

      List<Disease> diseases = [];
      for (var doc in snapshot.docs) {
        final data = doc.data() as Map<String, dynamic>;

        List<String> plantIds = List<String>.from(data['recommendedPlants'] ?? []);
        List<Plant> recommendedPlants = await fetchPlantsByIds(plantIds);

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

      setState(() {
        _diseases = diseases;
        _filteredDiseases = diseases;
        _isLoading = false;
      });
    } catch (e) {
      print('Erreur lors de la récupération des maladies : $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _filterDiseases(String query) {
    setState(() {
      _filteredDiseases = _diseases
          .where((disease) =>
              disease.name.toLowerCase().contains(query.toLowerCase()) ||
              disease.description.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  void _resetSearch() {
    _searchController.clear();
    setState(() {
      _filteredDiseases = _diseases;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bibliothèque des Maladies'),
        backgroundColor: Colors.green,
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  labelText: 'Rechercher une maladie',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.search),
                  suffixIcon: IconButton(
                    icon: Icon(Icons.clear),
                    onPressed: _resetSearch,
                  ),
                ),
                onChanged: _filterDiseases,
              ),
            ),
            _isLoading
                ? Center(child: CircularProgressIndicator())
                : _filteredDiseases.isEmpty
                    ? Center(child: Text('Aucune maladie trouvée.'))
                    : Expanded(
                        child: ListView.builder(
                          itemCount: _filteredDiseases.length,
                          itemBuilder: (context, index) {
                            final disease = _filteredDiseases[index];
                            return GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) =>
                                        DiseaseDetailScreen(disease: disease),
                                  ),
                                );
                              },
                              child: Card(
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 5,
                                margin: EdgeInsets.symmetric(vertical: 8),
                                child: ListTile(
                                  contentPadding: EdgeInsets.all(12),
                                  leading: ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: Image.network(
                                      disease.imageUrl,
                                      height: 50.0,
                                      width: 50.0,
                                      fit: BoxFit.cover,
                                      errorBuilder:
                                          (context, error, stackTrace) {
                                        return Icon(
                                          Icons.broken_image,
                                          color: Colors.grey,
                                          size: 50.0,
                                        );
                                      },
                                    ),
                                  ),
                                  title: Text(
                                    disease.name,
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                  subtitle: Text(
                                    disease.description,
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
