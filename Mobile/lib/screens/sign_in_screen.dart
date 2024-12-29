import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart'; // Importer Firebase Auth
import 'package:cloud_firestore/cloud_firestore.dart'; // Importer Cloud Firestore
import 'catalog_screen.dart';  // Assurez-vous que le fichier CatalogScreen existe
import 'sign_up_screen.dart';  // Import de la page d'inscription
import 'forgot_password_screen.dart'; // Import de la page ForgotPasswordScreen

class SignInScreen extends StatefulWidget {
  @override
  _SignInScreenState createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  // Fonction pour gérer la réinitialisation du mot de passe
  Future<void> _resetPassword() async {
    try {
      await FirebaseAuth.instance.sendPasswordResetEmail(email: _emailController.text);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Email de réinitialisation envoyé à ${_emailController.text}')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: ${e.toString()}')),
      );
    }
  }

  // Fonction pour gérer la connexion de l'utilisateur
  Future<void> _signIn() async {
    try {
      UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );

      if (userCredential.user != null) {
        // Si l'utilisateur est connecté, rediriger vers CatalogScreen
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => CatalogScreen()),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.green,
        elevation: 0,
        title: Text('Sign In'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Titre de l'écran
            Text(
              'Bienvenue !',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.green[900],
              ),
            ),
            SizedBox(height: 10),
            Text(
              'Connectez-vous pour continuer.',
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
            SizedBox(height: 30),

            // Champ Email
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                prefixIcon: Icon(Icons.person, color: Colors.green),
              ),
            ),
            SizedBox(height: 20),

            // Champ Mot de passe
            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Mot de passe',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                prefixIcon: Icon(Icons.lock, color: Colors.green),
                suffixIcon: Icon(Icons.visibility_off, color: Colors.grey),
              ),
            ),
            SizedBox(height: 10),

            // Lien pour mot de passe oublié
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () {
                  // Navigation vers la page ForgotPasswordScreen
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => ForgotPasswordScreen()),
                  );
                },
                child: Text(
                  'Mot de passe oublié ?',
                  style: TextStyle(color: Colors.green),
                ),
              ),
            ),
            SizedBox(height: 30),

            // Bouton de connexion
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _signIn, // Appel de la fonction de connexion
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  backgroundColor: Colors.green,
                ),
                child: Text(
                  'Se connecter',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            SizedBox(height: 20),

            // Texte pour redirection vers Sign Up
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Vous n'avez pas de compte ? ",
                  style: TextStyle(color: Colors.grey[700]),
                ),
                GestureDetector(
                  onTap: () {
                    // Redirigez vers la page Sign Up
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => SignUpScreen()),
                    );
                  },
                  child: Text(
                    "Inscrivez-vous",
                    style: TextStyle(
                      color: Colors.green,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
