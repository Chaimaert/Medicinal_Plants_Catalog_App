import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; // Import Firestore
import '../models/plant.dart';
import 'detail_screen.dart';
import 'favorites_screen.dart';
import 'recommendations_screen.dart';
import 'disease_library_screen.dart';
import 'user_profile_screen.dart';

class CatalogScreen extends StatefulWidget {
  @override
  _CatalogScreenState createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Plant> _plants = [];
  List<Plant> _filteredPlants = [];
  List<Plant> _popularPlants = [];
  int _selectedIndex = 0;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchPlantsFromFirestore();
  }

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

      final popularPlants = plants.take(3).toList();

      setState(() {
        _plants = plants;
        _filteredPlants = plants;
        _popularPlants = popularPlants;
        _isLoading = false;
      });
    } catch (e) {
      print('Erreur lors de la récupération des plantes : $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _filterPlants(String query) {
    setState(() {
      _filteredPlants = _plants
          .where((plant) =>
              plant.name.toLowerCase().contains(query.toLowerCase()) ||
              plant.properties.toLowerCase().contains(query.toLowerCase()) ||
              plant.region.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  void _resetSearch() {
    _searchController.clear();
    setState(() {
      _filteredPlants = _plants;
    });
  }

  void _toggleFavorite(Plant plant) {
    setState(() {
      plant.isFavorite = !plant.isFavorite;
    });
    FirebaseFirestore.instance.collection('plants').doc(plant.id).update({
      'isFavorite': plant.isFavorite,
    });
  }

  void _onItemTapped(int index) {
    if (index == 0) {
      setState(() {
        _selectedIndex = 0;
      });
    } else if (index == 1) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => RecommendationsScreen()),
      ).then((_) {
        setState(() {
          _selectedIndex = 0;
        });
      });
    } else if (index == 2) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => FavoritesScreen(
            favoritePlants: _plants.where((plant) => plant.isFavorite).toList(),
          ),
        ),
      ).then((_) {
        setState(() {
          _selectedIndex = 0;
        });
      });
    } else if (index == 3) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => DiseaseLibraryScreen()),
      ).then((_) {
        setState(() {
          _selectedIndex = 0;
        });
      });
    } else if (index == 4) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => UserProfileScreen()),
      ).then((_) {
        setState(() {
          _selectedIndex = 0;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Catalogue de Plantes Médicinales'),
        backgroundColor: Colors.green,
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      labelText: 'Rechercher une plante',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.search),
                      suffixIcon: IconButton(
                        icon: Icon(Icons.clear),
                        onPressed: _resetSearch,
                      ),
                    ),
                    onChanged: _filterPlants,
                  ),
                ),
                _buildPopularPlantsSection(),
                Expanded(
                  child: _filteredPlants.isEmpty
                      ? Center(child: Text('Aucune plante trouvée.'))
                      : GridView.builder(
                          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8,
                            childAspectRatio: 0.9,
                          ),
                          itemCount: _filteredPlants.length,
                          itemBuilder: (context, index) {
                            final plant = _filteredPlants[index];
                            return GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => DetailScreen(plant: plant)),
                                );
                              },
                              child: Card(
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                elevation: 5,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.stretch,
                                  children: [
                                    Stack(
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
                                          child: Image.network(
                                            plant.imageUrl,
                                            height: 120,
                                            width: double.infinity,
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                        Positioned(
                                          top: 8,
                                          right: 8,
                                          child: IconButton(
                                            icon: Icon(
                                              plant.isFavorite ? Icons.favorite : Icons.favorite_border,
                                              color: plant.isFavorite ? Colors.red : Colors.grey,
                                            ),
                                            onPressed: () => _toggleFavorite(plant),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Text(
                                        plant.name,
                                        style: TextStyle(fontWeight: FontWeight.bold),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 8),
                                      child: Text(
                                        plant.description,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ],
            ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Catalogue'),
          BottomNavigationBarItem(icon: Icon(Icons.recommend), label: 'Recommandations'),
          BottomNavigationBarItem(icon: Icon(Icons.favorite), label: 'Favoris'),
          BottomNavigationBarItem(icon: Icon(Icons.medical_services), label: 'Maladies'),
          BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: 'Profil'),
        ],
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
      ),
    );
  }

  Widget _buildPopularPlantsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(
            'Plantes les plus populaires',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(height: 10),
        Container(
          height: 150,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _popularPlants.length,
            itemBuilder: (context, index) {
              final plant = _popularPlants[index];
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DetailScreen(plant: plant)),
                    );
                  },
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    elevation: 5,
                    child: Column(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
                          child: Image.network(
                            plant.imageUrl,
                            height: 80,
                            width: 120,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            plant.name,
                            style: TextStyle(fontWeight: FontWeight.bold),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
