import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart'; 
import 'package:cloud_firestore/cloud_firestore.dart'; // Import Firestore
import 'home_page.dart';

class UserProfileScreen extends StatelessWidget {
  // Instance de FirebaseAuth et Firestore
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  Widget build(BuildContext context) {
    // Récupérer l'utilisateur actuellement connecté
    User? user = _auth.currentUser;

    // Vérifier si un utilisateur est connecté
    if (user == null) {
      // Si aucun utilisateur n'est connecté, redirigez vers la page de connexion ou d'accueil
      return Scaffold(
        body: Center(
          child: Text("Aucun utilisateur connecté."),
        ),
      );
    }

    // Récupérer les informations utilisateur à partir de Firestore
    return FutureBuilder<DocumentSnapshot>(
      future: _firestore.collection('users').doc(user.uid).get(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }
        
        if (snapshot.hasError) {
          return Scaffold(
            body: Center(child: Text("Erreur de chargement des données.")),
          );
        }

        if (!snapshot.hasData || !snapshot.data!.exists) {
          return Scaffold(
            body: Center(child: Text("Aucune donnée utilisateur trouvée.")),
          );
        }

        // Récupérer les données du document Firestore
        var userData = snapshot.data!;
        String userName = userData['username'] ?? "Utilisateur"; // Nom utilisateur depuis Firestore
        String userEmail = user.email ?? "Email non disponible";
        String initials = _getInitials(userName); // Récupérer les initiales

        return Scaffold(
          appBar: AppBar(
            title: Text("Mon Profil"),
            backgroundColor: Colors.green,
            actions: [
              IconButton(
                icon: Icon(Icons.logout),
                onPressed: () {
                  // Déconnecter l'utilisateur et revenir à la page d'accueil
                  _logoutAndNavigateToHome(context);
                },
              ),
            ],
          ),
          body: ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              // Avatar avec les initiales
              Center(
                child: CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.green[700], // Fond du cercle
                  child: Text(
                    initials, // Affiche les initiales
                    style: TextStyle(
                      fontSize: 30, // Taille du texte
                      color: Colors.white, // Couleur du texte (blanc)
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),

              // Nom de l'utilisateur
              Container(
                padding: EdgeInsets.all(12.0),
                decoration: BoxDecoration(
                  color: Colors.green[50],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  "Nom : $userName",
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.green[700],
                  ),
                ),
              ),
              SizedBox(height: 10),

              // Email de l'utilisateur
              Container(
                padding: EdgeInsets.all(12.0),
                decoration: BoxDecoration(
                  color: Colors.green[50],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  "Email : $userEmail",
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.grey[700],
                  ),
                ),
              ),
              SizedBox(height: 20),
            ],
          ),
        );
      },
    );
  }

  // Fonction pour obtenir les initiales du nom de l'utilisateur
  String _getInitials(String name) {
    List<String> nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0]; // Initiales du prénom et nom
    } else {
      return nameParts[0].substring(0, 2).toUpperCase(); // Initiales du prénom
    }
  }

  // Fonction pour déconnecter l'utilisateur et rediriger vers la page d'accueil
  void _logoutAndNavigateToHome(BuildContext context) async {
    await _auth.signOut(); // Déconnexion Firebase

    // Puis, rediriger vers la page d'accueil
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomePage()), // Remplacer par votre page d'accueil
    );
  }
}
