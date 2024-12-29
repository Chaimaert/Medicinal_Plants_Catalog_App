import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; // Import Firestore
import 'package:url_launcher/url_launcher.dart'; // Import pour ouvrir des URL
import '../models/plant.dart';
import '../models/comment.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:video_player/video_player.dart'; // Pour les vidéos hébergées

class DetailScreen extends StatefulWidget {
  final Plant plant;

  DetailScreen({required this.plant});

  @override
  _DetailScreenState createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  List<Comment> comments = [];
  final TextEditingController _commentController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  int? _editingIndex;

  // Controllers pour la vidéo
  YoutubePlayerController? _youtubeController;
  VideoPlayerController? _videoController;
  Future<void>? _initializeVideoPlayerFuture;

  @override
  void initState() {
    super.initState();
    _fetchComments(); // Charger les commentaires depuis Firestore
    _initializeVideo();
  }
  
  @override
  void dispose() {
    _youtubeController?.dispose();
    _videoController?.dispose();
    super.dispose();
  }

  // Récupérer les commentaires depuis Firestore
  Future<void> _fetchComments() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('plants')
          .doc(widget.plant.id)
          .collection('comments')
          .orderBy('timestamp', descending: true)
          .get();

      setState(() {
        comments = snapshot.docs.map((doc) {
          final data = doc.data();
          return Comment(
            id: doc.id,
            userName: data['userName'] ?? '',
            text: data['text'] ?? '',
            timestamp: (data['timestamp'] as Timestamp).toDate(),
          );
        }).toList();
      });
    } catch (e) {
      print('Erreur lors de la récupération des commentaires : $e');
    }
  }

  // Initialiser la vidéo (YouTube ou locale)
  void _initializeVideo() {
    if (widget.plant.videoUrl != null) {
      if (widget.plant.videoUrl!.contains('youtube.com') || widget.plant.videoUrl!.contains('youtu.be')) {
        final videoId = YoutubePlayer.convertUrlToId(widget.plant.videoUrl!);
        if (videoId != null) {
          _youtubeController = YoutubePlayerController(
            initialVideoId: videoId,
            flags: YoutubePlayerFlags(
              autoPlay: false,
              mute: false,
            ),
          );
        }
      } else {
        _videoController = VideoPlayerController.network(widget.plant.videoUrl!);
        _initializeVideoPlayerFuture = _videoController!.initialize();
      }
    }
  }

  // Ajouter un commentaire dans Firestore
  Future<void> _addComment() async {
    if (_commentController.text.isNotEmpty && _nameController.text.isNotEmpty) {
      final newComment = Comment(
        id: '',
        userName: _nameController.text,
        text: _commentController.text,
        timestamp: DateTime.now(),
      );

      try {
        final commentDoc = await FirebaseFirestore.instance
            .collection('plants')
            .doc(widget.plant.id)
            .collection('comments')
            .add({
          'userName': newComment.userName,
          'text': newComment.text,
          'timestamp': newComment.timestamp,
        });

        setState(() {
          comments.add(newComment.copyWith(id: commentDoc.id));
        });

        _commentController.clear();
        _nameController.clear();
      } catch (e) {
        print('Erreur lors de l\'ajout du commentaire : $e');
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Veuillez entrer votre nom et un commentaire.'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  // Supprimer un commentaire dans Firestore
  Future<void> _deleteComment(int index) async {
    final commentId = comments[index].id;
    try {
      await FirebaseFirestore.instance
          .collection('plants')
          .doc(widget.plant.id)
          .collection('comments')
          .doc(commentId)
          .delete();

      setState(() {
        comments.removeAt(index);
      });
    } catch (e) {
      print('Erreur lors de la suppression du commentaire : $e');
    }
  }

  // Modifier un commentaire dans Firestore
  Future<void> _saveComment() async {
    if (_editingIndex != null) {
      final updatedComment = comments[_editingIndex!].copyWith(
        text: _commentController.text,
      );

      try {
        await FirebaseFirestore.instance
            .collection('plants')
            .doc(widget.plant.id)
            .collection('comments')
            .doc(updatedComment.id)
            .update({
          'text': updatedComment.text,
        });

        setState(() {
          comments[_editingIndex!] = updatedComment;
          _editingIndex = null;
          _commentController.clear();
        });
      } catch (e) {
        print('Erreur lors de la mise à jour du commentaire : $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.plant.name),
        backgroundColor: Colors.green,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image de la plante
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(
                  widget.plant.imageUrl,
                  width: double.infinity,
                  height: 250,
                  fit: BoxFit.cover,
                ),
              ),
              SizedBox(height: 20),

              // Nom de la plante
              Text(
                widget.plant.name,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[800],
                ),
              ),
              SizedBox(height: 10),

              // Affichage de la région
              _buildInfoSection(
                title: 'Région',
                content: widget.plant.region,
                icon: Icons.map,
                iconColor: Colors.blue[700],
              ),
              SizedBox(height: 8),

              // Propriétés, Utilisations, Conditions, Précautions
              _buildInfoSection(
                title: 'Propriétés',
                content: widget.plant.properties,
                icon: Icons.health_and_safety,
                iconColor: Colors.orange[700],
              ),
              SizedBox(height: 8),
              _buildInfoSection(
                title: 'Utilisations',
                content: widget.plant.uses,
                icon: Icons.local_florist,
                iconColor: Colors.blue[700],
              ),
              SizedBox(height: 8),
              _buildInfoSection(
                title: 'Conditions',
                content: widget.plant.conditions.join(', '),
                icon: Icons.medical_services,
                iconColor: Colors.purple[700],
              ),
              SizedBox(height: 8),
              _buildInfoSection(
                title: 'Précautions',
                content: widget.plant.precautions ?? 'Aucune précaution spécifiée.',
                icon: Icons.warning_amber_rounded,
                iconColor: Colors.red[700],
              ),
              SizedBox(height: 16),

              // Description de la plante
              Text(
                widget.plant.description,
                style: TextStyle(fontSize: 16, color: Colors.black87),
              ),
              SizedBox(height: 30),

              // Section vidéo
              Text(
                'Video du plante :',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[700],
                ),
              ),
              if (_youtubeController != null)
                YoutubePlayer(
                  controller: _youtubeController!,
                  showVideoProgressIndicator: true,
                )
              else if (_videoController != null)
                FutureBuilder(
                  future: _initializeVideoPlayerFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.done) {
                      return AspectRatio(
                        aspectRatio: _videoController!.value.aspectRatio,
                        child: VideoPlayer(_videoController!),
                      );
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                )
              else
                Text("Aucune vidéo disponible."),
              SizedBox(height: 20),

              // Section "En savoir plus"
              Text(
                'Pour en savoir plus :',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[700],
                ),
              ),
              SizedBox(height: 10),
              InkWell(
                onTap: () => _openUrl('https://www.wikipedia.org/wiki/${widget.plant.name}'),
                child: Text(
                  'En savoir plus sur ${widget.plant.name}',
                  style: TextStyle(
                    color: Colors.blue,
                    decoration: TextDecoration.underline,
                    fontSize: 16,
                  ),
                ),
              ),
              SizedBox(height: 30),

              // Section des commentaires
              Text(
                'Commentaires :',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[700],
                ),
              ),
              SizedBox(height: 10),

              // Affichage des commentaires
              Column(
                children: comments.map((comment) {
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8),
                    elevation: 5,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: ListTile(
                        title: Text(
                          comment.userName,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        subtitle: Text(comment.text),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: Icon(Icons.edit, color: Colors.blue),
                              onPressed: () {
                                setState(() {
                                  _editingIndex = comments.indexOf(comment);
                                  _commentController.text = comment.text;
                                });
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () {
                                _deleteComment(comments.indexOf(comment));
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
              SizedBox(height: 20),

              // Champs de texte pour ajouter un commentaire
              TextField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Votre nom',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: _commentController,
                maxLines: 3,
                decoration: InputDecoration(
                  labelText: 'Écrivez votre commentaire',
                  hintText: 'Exprimez-vous...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  suffixIcon: IconButton(
                    icon: Icon(Icons.send, color: Colors.green),
                    onPressed: _editingIndex == null ? _addComment : _saveComment,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoSection({
    required String title,
    required String content,
    required IconData icon,
    required Color? iconColor,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.green[50],
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 1,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: iconColor ?? Colors.green, size: 30),
          SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.green[700],
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  content,
                  style: TextStyle(fontSize: 16, color: Colors.green[600], height: 1.5),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _openUrl(String url) async {
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url));
    } else {
      print('Impossible d\'ouvrir le lien $url');
    }
  }
}
