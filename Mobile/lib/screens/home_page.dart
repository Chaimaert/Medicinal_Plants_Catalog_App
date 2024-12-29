import 'package:flutter/material.dart';
import 'sign_in_screen.dart'; // Importez la page Sign In
import 'sign_up_screen.dart'; // Importez la page Sign Up

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Image de fond qui prend toute la taille de l'écran
          Positioned.fill(
            child: Image.asset(
              'assets/plantes-medicinales-utiliser.jpg', // Remplacez par le chemin de votre image
              fit: BoxFit.cover, // L'image couvre toute la surface de l'écran
              color: Colors.black.withOpacity(0.3), // Légère opacité pour que le texte soit plus lisible
              colorBlendMode: BlendMode.darken, // Assombrir l'image pour plus de contraste
            ),
          ),
          // Contenu au-dessus de l'image
          Positioned.fill(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 40.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center, // Centrer tout le contenu
                children: [
                  // Titre et introduction
                  Text(
                    'Bienvenue sur Naturalis - Votre Guide des Plantes Médicinales',
                    style: TextStyle(
                      fontSize: 30, // Taille du texte plus grande
                      fontWeight: FontWeight.w600,
                      color: Colors.white, // Texte en blanc pour contraster avec l'image
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 15),
                  Text(
                    'Découvrez les bienfaits des plantes médicinales et apprenez à les utiliser pour votre bien-être.',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white70, // Gris clair pour le texte secondaire
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 40),

                  // Boutons "Sign In" et "Sign Up"
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Bouton "Sign In"
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => SignInScreen()), // Navigation vers Sign In
                          );
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 30.0, vertical: 15.0),
                          child: Text(
                            'Sign In',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.white, // Texte en blanc
                            ),
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green[700], // Couleur verte
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30), // Coins arrondis
                          ),
                          elevation: 8,
                          shadowColor: Colors.green.withOpacity(0.4),
                        ),
                      ),
                      SizedBox(width: 20), // Espace entre les deux boutons

                      // Bouton "Sign Up"
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => SignUpScreen()), // Navigation vers Sign Up
                          );
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 30.0, vertical: 15.0),
                          child: Text(
                            'Sign Up',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.white, // Texte en blanc
                            ),
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green[900], // Couleur verte plus foncée
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30), // Coins arrondis
                          ),
                          elevation: 8,
                          shadowColor: Colors.green.withOpacity(0.4),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
