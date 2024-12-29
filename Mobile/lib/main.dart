import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'screens/catalog_screen.dart';  // Importer la page CatalogScreen
import 'screens/sign_in_screen.dart'; // Importer la page SignIn
import 'screens/home_page.dart'; // Importer la page d'accueil

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (kIsWeb) {
    await Firebase.initializeApp(
      options: FirebaseOptions(
        apiKey: "AIzaSyB-XuvZN2fof2yUkwkZgn8pfDduY02t80M",
        authDomain: "catalogueplantes.firebaseapp.com",
        projectId: "catalogueplantes",
        storageBucket: "catalogueplantes.firebaseapp.com",
        messagingSenderId: "475933883372",
        appId: "1:475933883372:web:2889dff1af81189b081ec9",
        measurementId: "G-0GHYXSS2JH",
      ),
    );
  } else {
    await Firebase.initializeApp();
  }

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Catalogue de Plantes Médicinales',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
      ),
      // Utilisation de StreamBuilder pour surveiller l'état de l'authentification
      home: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur : ${snapshot.error}'));
          } else if (snapshot.hasData) {
            // Si l'utilisateur est connecté, afficher le catalogue
            return CatalogScreen();
          } else {
            // Si l'utilisateur n'est pas connecté, afficher HomePage
            return HomePage();
          }
        },
      ),
    );
  }
}
