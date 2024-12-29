import 'package:flutter/material.dart';
import '../models/plant.dart';
import '../data/mock_plants.dart';
import 'detail_screen.dart';

class PlantSearchDelegate extends SearchDelegate {
  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        icon: Icon(Icons.clear),
        onPressed: () {
          query = ''; // Réinitialiser la requête de recherche
        },
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.arrow_back),
      onPressed: () {
        close(context, null); // Fermer la recherche
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    // Résultats basés sur la recherche
    final List<Plant> results = mockPlants.where((plant) {
      return plant.name.toLowerCase().contains(query.toLowerCase()) ||
          plant.properties.toLowerCase().contains(query.toLowerCase());
    }).toList();

    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) {
        final plant = results[index];
        return ListTile(
          title: Text(plant.name),
          subtitle: Text(plant.description),
          onTap: () {
            // Naviguer vers la page de détails de la plante
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailScreen(plant: plant),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // Suggestions en fonction de ce qui est tapé dans la recherche
    final List<Plant> suggestions = mockPlants.where((plant) {
      return plant.name.toLowerCase().contains(query.toLowerCase());
    }).toList();

    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        final plant = suggestions[index];
        return ListTile(
          title: Text(plant.name),
          subtitle: Text(plant.description),
          onTap: () {
            // Naviguer vers la page de détails de la plante
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailScreen(plant: plant),
              ),
            );
          },
        );
      },
    );
  }
}
