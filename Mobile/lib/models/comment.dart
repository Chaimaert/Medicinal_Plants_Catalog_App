class Comment {
  final String id; // ID du commentaire
  final String userName;
  String text;
  final DateTime timestamp;

  Comment({
    required this.id,
    required this.userName,
    required this.text,
    required this.timestamp,
  });

  // Ajout de 'id' dans copyWith
  Comment copyWith({String? id, String? text}) {
    return Comment(
      id: id ?? this.id, // Si aucun nouvel ID n'est passé, on garde l'ID actuel
      userName: this.userName,
      text: text ?? this.text, // Si aucun texte n'est passé, on garde le texte actuel
      timestamp: this.timestamp,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'userName': userName,
      'text': text,
      'timestamp': timestamp,
    };
  }

  factory Comment.fromFirestore(String id, Map<String, dynamic> data) {
    return Comment(
      id: id,
      userName: data['userName'] ?? '',
      text: data['text'] ?? '',
      timestamp: (data['timestamp'] ).toDate(),
    );
  }
}
