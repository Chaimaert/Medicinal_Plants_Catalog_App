import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart'; // Importer Firebase Auth
import 'package:cloud_firestore/cloud_firestore.dart'; // Importer Cloud Firestore
import 'catalog_screen.dart';

class SignUpScreen extends StatefulWidget {
  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  // Fonction pour l'inscription de l'utilisateur
  Future<void> _signUp() async {
    try {
      // Créer un utilisateur avec email et mot de passe
      UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );

      // Ajouter l'utilisateur à Firestore
      await FirebaseFirestore.instance.collection('users').doc(userCredential.user?.uid).set({
        'username': _usernameController.text, // Nom d'utilisateur
        'email': _emailController.text, // Email
        'createdAt': FieldValue.serverTimestamp(), // Date et heure de création
      });

      // Afficher un message de succès
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Inscription réussie')),
      );

      // Rediriger vers CatalogScreen après l'inscription
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => CatalogScreen()), // Utiliser CatalogScreen
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur : ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.green,
        elevation: 0,
        title: Text('Sign Up'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Créer un nouveau compte',
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.green[900]),
            ),
            SizedBox(height: 10),
            Text('Rejoignez-nous et découvrez les plantes médicinales.', style: TextStyle(fontSize: 16, color: Colors.grey[700])),
            SizedBox(height: 30),
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                labelText: 'Nom Complet',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                prefixIcon: Icon(Icons.person, color: Colors.green),
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                prefixIcon: Icon(Icons.email, color: Colors.green),
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Mot de passe',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                prefixIcon: Icon(Icons.lock, color: Colors.green),
                suffixIcon: Icon(Icons.visibility_off, color: Colors.grey),
              ),
            ),
            SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _signUp,
                style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(vertical: 15), backgroundColor: Colors.green),
                child: Text("S'inscrire", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Vous avez déjà un compte ? ", style: TextStyle(color: Colors.grey[700])),
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Text("Connectez-vous", style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
