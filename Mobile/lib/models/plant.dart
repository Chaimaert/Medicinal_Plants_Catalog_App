class Plant {
  final String id;
  final String name;
  final String description;
  final String properties;
  final String uses;
  final String imageUrl;
   bool isFavorite; 
  // final String notes; // Note supplémentaire
  // final double rating;
  final String? precautions;
  final List<String> conditions;
  final String? externalLink;
  final String? videoUrl;
  final String region;

  Plant({
    required this.id,
    required this.name,
    required this.description,
    required this.properties,
    required this.uses,
    required this.imageUrl,
    this.isFavorite = false,
    // this.notes = '',
    // this.rating = 0.0,
    this.precautions,
    required this.conditions,
    this.externalLink,
    this.videoUrl,
    required this.region,
  });
}
