import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";

WebBrowser.maybeCompleteAuthSession();
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function LoginScreen() {
  const { theme, toggleTheme, mode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 Google Auth (WEB – Expo)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    responseType: "id_token",
    scopes: ["profile", "email"],
  });

  // 🔁 Handle Google response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(() => setError("Erreur Google Sign-In"));
    }
  }, [response]);

  const getFirebaseError = (err) => {
    console.log("Firebase Error:", err.code);
    switch (err.code) {
      case "auth/email-already-in-use":
        return "Cette adresse email est déjà associée à un compte.";
      case "auth/invalid-email":
        return "L'adresse email est invalide.";
      case "auth/weak-password":
        return "Le mot de passe doit contenir au moins 6 caractères.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Email ou mot de passe incorrect.";
      case "auth/too-many-requests":
        return "Trop de tentatives. Veuillez réessayer plus tard.";
      default:
        return "Une erreur est survenue (" + err.code + ").";
    }
  };

  const login = async () => {
    if (!email || !password) return setError("Veuillez remplir tous les champs.");
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(getFirebaseError(e));
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!email || !password) return setError("Veuillez remplir tous les champs.");
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(getFirebaseError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>

        {/* Header / Logo Place */}
        <View style={{ marginBottom: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: theme.primary, marginBottom: 5 }}>MonApp</Text>
          <Text style={{ fontSize: 16, color: theme.text, opacity: 0.7 }}>Bienvenue, connectez-vous !</Text>
        </View>

        {/* Card Container */}
        <View style={{
          backgroundColor: theme.card,
          padding: 25,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5
        }}>

          {error !== "" && (
            <View style={{ backgroundColor: "#ffdddd", padding: 10, borderRadius: 8, marginBottom: 15 }}>
              <Text style={{ color: "#d8000c", textAlign: "center", fontWeight: "600" }}>{error}</Text>
            </View>
          )}

          <Text style={{ color: theme.text, marginBottom: 5, fontWeight: "600", marginLeft: 5 }}>Adresse Email</Text>
          <TextInput
            placeholder="exemple@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              backgroundColor: mode === "dark" ? "#2c2c2c" : "#f9f9f9",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
              color: theme.text,
              borderWidth: 1,
              borderColor: mode === "dark" ? "#444" : "#eee"
            }}
          />

          <Text style={{ color: theme.text, marginBottom: 5, fontWeight: "600", marginLeft: 5 }}>Mot de passe</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              backgroundColor: mode === "dark" ? "#2c2c2c" : "#f9f9f9",
              borderRadius: 12,
              padding: 15,
              marginBottom: 25,
              color: theme.text,
              borderWidth: 1,
              borderColor: mode === "dark" ? "#444" : "#eee"
            }}
          />

          {loading ? (
            <ActivityIndicator size="large" color={theme.primary} />
          ) : (
            <View>
              <TouchableOpacity
                onPress={login}
                style={{
                  backgroundColor: theme.primary,
                  paddingVertical: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  alignItems: "center"
                }}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Se connecter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={register}
                style={{
                  backgroundColor: "transparent",
                  paddingVertical: 16,
                  borderRadius: 12,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: theme.primary,
                  alignItems: "center"
                }}>
                <Text style={{ color: theme.primary, fontWeight: "bold", fontSize: 16 }}>Créer un compte</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: "#ccc", opacity: 0.3 }} />
                <Text style={{ marginHorizontal: 10, color: theme.text, opacity: 0.5 }}>OU</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: "#ccc", opacity: 0.3 }} />
              </View>

              <TouchableOpacity
                disabled={!request}
                onPress={() => promptAsync()}
                style={{
                  backgroundColor: "#DB4437",
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center"
                }}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Continuer avec Google</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 30, padding: 10 }}>
          <Text style={{ textAlign: "center", color: theme.text, opacity: 0.6 }}>
            Mode: {mode === "light" ? "🌙 Sombre" : "☀️ Clair"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
