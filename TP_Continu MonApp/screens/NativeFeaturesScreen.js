import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function NativeFeaturesScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    const features = [
        { id: 1, name: "Caméra", icon: "📷", route: "Caméra", desc: "Prendre des photos" },
        { id: 2, name: "Géolocalisation", icon: "📍", route: "Localisation", desc: "Voir ma position" },
        { id: 3, name: "Contacts", icon: "👥", route: "Contacts", desc: "Accéder au répertoire" },
        { id: 4, name: "Notifications", icon: "🔔", route: "Notifications", desc: "Gérer les alertes" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <AppBar title="Fonctionnalités natives" />

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text, marginBottom: 20 }}>
                    Explorer les modules
                </Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {features.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate(item.route)}
                            style={{
                                width: "48%",
                                backgroundColor: theme.card,
                                borderRadius: 16,
                                padding: 20,
                                marginBottom: 15,
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3
                            }}
                        >
                            <Text style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text, textAlign: "center" }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 12, color: theme.text, opacity: 0.6, textAlign: "center", marginTop: 5 }}>
                                {item.desc}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
