import {
  BookOpen,
  CheckCircle,
  CircleCheck,
  DoorOpen,
  ExternalLink,
  Globe,
  Mail,
  Map,
  MapPin,
  Phone,
  QrCode,
  QrCodeIcon,
  Shield,
  ShieldCog,
  UserCheck,
  UserRoundCogIcon,
  Wifi,
} from "lucide-react";
import user from "../assets/user.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import admin from "../assets/admin.jpg";

export const FeatureDeatisl = [
  {
    icon: QrCode,
    title: "Anti-Proxy QR Shield",
    des: "Dynamic tokens refresh automatically to lock remote log entries out.",
    bg: "bg-blue-900/60",
    color: "text-blue-500",
    border: "border-blue-700",
  },
  {
    icon: ShieldCog,
    title: "Coordinate Bound Match",
    des: "Enforces safe GPS radial limits and matches connected SSIDs.",
    bg: "bg-purple-900/60",
    color: "text-purple-500",
    border: "border-purple-700",
  },
  {
    icon: CircleCheck,
    title: "Role Access Authority",
    des: "RBAC ensures Student Check-ins differ securely from Instructor panels.",
    bg: "bg-green-900/60",
    color: "text-green-500",
    border: "border-green-700",
  },
];

export const DetailAccount = [
  {
    image: admin,
    name: "Phuc",
    role: "admin",
    bg: "bg-red-900/60",
    color: "text-red-500",
  },
  {
    image: user,
    name: "Bao",
    role: "user",
    bg: "bg-gray-700",
    color: "text-gray-300",
  },
  {
    image: user2,
    name: "Huynh",
    role: "user",
    bg: "bg-gray-700",
    color: "text-gray-300",
  },
  {
    image: user3,
    name: "Nguyen",
    role: "user",
    bg: "bg-gray-700",
    color: "text-gray-300",
  },
];

export const Capabilities = [
  {
    icon: Map,
    name: "Expiring QR Generators",
  },
  {
    icon: Shield,
    name: "IP Subnet Guardrooms",
  },
  {
    icon: Globe,
    name: "GPS Radius Authorization",
  },
  {
    icon: ExternalLink,
    name: "Wi-Fi BSSID Mapping (Enterprise)",
  },
];

export const Policies = [
  {
    name: "GDPR Compliance & Opt-out",
  },
  {
    name: "Zero-knowledge GPS Auditing",
  },
  {
    name: "Enterprise Single-Sign On",
  },
  {
    name: "Developer API Docs",
  },
];

export const Support = [
  {
    icon: Mail,
    info: "nhbphuc2006@gmail.com",
  },
  {
    icon: Phone,
    info: "+1 234 567 890",
  },
  {
    icon: Globe,
    info: "HCM City",
  },
];

export const NavbarAdminSelect = [
  {
    icon: QrCodeIcon,
    name: "Broadcast QR",
    link: "/broadcast_qr",
  },
  {
    icon: BookOpen,
    name: "Past Attandace",
    link: "/past_attandance",
  },
  {
    icon: UserRoundCogIcon,
    name: "Roster Directory (RBAC)",
    link: "/roster_directory",
  },
  {
    icon: UserCheck,
    name: "Attandance Check-In",
    link: "/attandance_checkin",
  },
  {
    icon: DoorOpen,
    name: "Room Management",
    link: "/room",
  },
];

export const LocationFilterMethod = [
  {
    icon: CheckCircle,
    name: "None",
    color: "text-gray-500",
    type: "",
  },
  {
    icon: MapPin,
    name: "GPS Coordinates",
    color: "text-blue-500",
    type: "GPS",
  },
  {
    icon: Wifi,
    name: "Wifi SSID",
    color: "text-purple-500",
    type: "wifi",
  },
  {
    icon: Globe,
    name: "Allow IP Sub",
    color: "text-orange-500",
    type: "IpAddress",
  },
];
