import { HouseIcon, WallIcon, PiggyBankIcon, StorefrontIcon, UserIcon } from '@phosphor-icons/react';

// Dejo las secciones en un solo archivo para que la barra inferior y la lateral compartan la lista y sumar una lleve una sola línea
export const secciones = [
    { clave: 'inicio', nombre: 'Inicio', Icono: HouseIcon, href: '/familia/inicio' },
    { clave: 'proyecto', nombre: 'Mi proyecto', Icono: WallIcon, href: '/familia/proyecto' },
    { clave: 'ahorro', nombre: 'Ahorro', Icono: PiggyBankIcon },
    { clave: 'marketplace', nombre: 'Marketplace', Icono: StorefrontIcon },
    { clave: 'perfil', nombre: 'Perfil', Icono: UserIcon, href: '/familia/perfil' },
];