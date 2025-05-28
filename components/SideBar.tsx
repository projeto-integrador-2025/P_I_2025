import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { LayoutDashboard, ChartBar as BarChart3, MessageCircle } from 'lucide-react-native';
import { theme } from '../constants/theme';

// ✅ Criei o tipo para os itens do menu
type MenuItem = {
  name: string;
  icon: JSX.Element;
  route: `../../${string}`; // rota começa com "/"
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  // ✅ Não renderiza no mobile
  if (Platform.OS !== 'web') {
    return null;
  }

  // ✅ Tipagem correta no menuItems
  const menuItems: MenuItem[] = [
    { name: 'Monitoramento', icon: <BarChart3 size={24} color={theme.colors.white} />, route: '../../monitoring' },
    { name: 'Dashboard', icon: <LayoutDashboard size={24} color={theme.colors.white} />, route: '../../' },
    { name: 'Chatbot', icon: <MessageCircle size={24} color={theme.colors.white} />, route: '../../chatbot' },
  ];

  const isActive = (route: string) => {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.includes(route)) return true;
    return false;
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>• • •</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              isActive(item.route) && styles.activeMenuItem
            ]}
            onPress={() => router.push(item.route)} // ✅ agora o item.route está corretamente tipado
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 140,
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuItem: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  activeMenuItem: {
    backgroundColor: theme.colors.secondary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 158, 120, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  menuText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});
