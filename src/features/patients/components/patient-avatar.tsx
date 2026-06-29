import Image from "next/image";
import { User } from "lucide-react";
import type { Patient } from "../types/patient.types";

interface PatientAvatarProps {
  patient: Patient;
}

export function PatientAvatar({ patient }: PatientAvatarProps) {
  const initials = patient.full_name
    ? patient.full_name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PT";

  if (patient.photo_url) {
    return (
      <Image
        src={patient.photo_url}
        alt={patient.full_name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
      {initials || <User className="h-4 w-4" />}
    </div>
  );
}