import 'package:flutter/material.dart';
import '../models/disease.dart';
import 'detail_screen.dart';

class DiseaseDetailScreen extends StatelessWidget {
  final Disease disease;

  DiseaseDetailScreen({required this.disease});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(disease.name),
        backgroundColor: Colors.green,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (disease.imageUrl.isNotEmpty)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  disease.imageUrl,
                  width: double.infinity,
                  height: 200,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) => Icon(
                    Icons.broken_image,
                    size: 80,
                    color: Colors.grey,
                  ),
                ),
              ),
            SizedBox(height: 16),
            _buildSectionTitle('Description'),
            SizedBox(height: 8),
            _buildCard(
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Text(
                  disease.description,
                  style: TextStyle(fontSize: 16, height: 1.5),
                ),
              ),
            ),
            SizedBox(height: 16),
            _buildSectionTitle('Symptômes'),
            SizedBox(height: 8),
            _buildCard(
              child: Column(
                children: disease.symptoms.map((symptom) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: Icon(Icons.check_circle, color: Colors.green),
                    title: Text(
                      symptom,
                      style: TextStyle(fontSize: 14),
                    ),
                  );
                }).toList(),
              ),
            ),
            SizedBox(height: 16),
            _buildSectionTitle('Plantes recommandées'),
            SizedBox(height: 8),
            _buildCard(
              child: disease.recommendedPlants.isEmpty
                  ? Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(
                        'Aucune plante recommandée.',
                        style: TextStyle(color: Colors.grey[600], fontSize: 14),
                      ),
                    )
                  : Column(
                      children: disease.recommendedPlants.map((plant) {
                        return ListTile(
                          contentPadding: EdgeInsets.zero,
                          leading: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              plant.imageUrl.isNotEmpty
                                  ? plant.imageUrl
                                  : 'https://via.placeholder.com/50',
                              width: 50,
                              height: 50,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) =>
                                  Icon(Icons.broken_image, color: Colors.grey),
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
                            style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                          ),
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => DetailScreen(plant: plant),
                              ),
                            );
                          },
                        );
                      }).toList(),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.green,
      ),
    );
  }

  Widget _buildCard({required Widget child}) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      elevation: 4,
      shadowColor: Colors.grey.withOpacity(0.3),
      child: child,
    );
  }
}
